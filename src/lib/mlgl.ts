/**
 * Machine Learning Graphics Library (MLGL)
 * training and visualization of simple neural networks
 * using webgl compute shaders.
 * 
 * Typescript webgpu types: https://www.npmjs.com/package/@webgpu/types
 * js bitwise operations: https://www.w3schools.com/js/js_bitwise.asp
 * ML in shaders: https://www.diva-portal.org/smash/get/diva2:829298/FULLTEXT01.pdf
 * Neural Net in shader: https://github.com/SCRN-VRC/SimpNet-Deep-Learning-in-a-Shader
 * WebGPU Compute pipeline: https://developer.mozilla.org/en-US/docs/Web/API/GPUComputePipeline
 * Compute shader in practice: https://webgpu.github.io/webgpu-samples/samples/gameOfLife#main.ts
 */


// Utility Functions ********************
function sigmoid(x: number): number { return 1 / 1 + Math.exp(-x) }
function logit(x: number): number { return Math.log(x / (1 - x)) }
// **************************************

// Exports ******************************
export function ml_train() { } // returns a model
export function ml_run() { } // returns output of a model given inputs
export let ml_init = initWebGPU
// **************************************

// Setup webgpu *************************
// Define global buffer size
const BUFFER_SIZE = 64; // bytes (must be multiple of 4)

// Compute shader
const shader = `
@group(0) @binding(0)
var<storage, read_write> output: array<f32>;

@compute @workgroup_size(64)
fn main(
  @builtin(global_invocation_id)
  global_id : vec3u,

  @builtin(local_invocation_id)
  local_id : vec3u,
) {
  // Avoid accessing the buffer out of bounds
  if (global_id.x >= ${BUFFER_SIZE}) {
    return;
  }

  output[global_id.x] =
    f32(global_id.x) * 1000. + f32(local_id.x);
}
`;

async function initWebGPU() {
  // 1: request adapter and device
  if (!navigator.gpu) {
    throw Error('WebGPU not supported.');
  }

  const adapter = await navigator.gpu.requestAdapter();
  if (!adapter) {
    throw Error('Couldn\'t request WebGPU adapter.');
  }

  const device = await adapter.requestDevice();

  // 2: Create a shader module from the shader template literal
  const shaderModule = device.createShaderModule({
    code: shader
  });

  // 3: Create an output buffer to read GPU calculations to, and a staging buffer to be mapped for JavaScript access

  const output = device.createBuffer({
    size: BUFFER_SIZE,
    usage: GPUBufferUsage.STORAGE | GPUBufferUsage.COPY_SRC
  });

  const stagingBuffer = device.createBuffer({
    size: BUFFER_SIZE,
    usage: GPUBufferUsage.MAP_READ | GPUBufferUsage.COPY_DST
  });

  // 4: Create a GPUBindGroupLayout to define the bind group structure, create a GPUBindGroup from it,
  // then use it to create a GPUComputePipeline

  const bindGroupLayout =
  device.createBindGroupLayout({
    entries: [{
      binding: 0,
      visibility: GPUShaderStage.COMPUTE,
      buffer: {
        type: "storage"
      }
    }]
  });

  const bindGroup = device.createBindGroup({
    layout: bindGroupLayout,
    entries: [{
      binding: 0,
      resource: {
        buffer: output,
      }
    }]
  });

  const computePipeline = device.createComputePipeline({
    layout: device.createPipelineLayout({
      bindGroupLayouts: [bindGroupLayout]
    }),
    compute: {
      module: shaderModule,
      entryPoint: 'main'
    }
  });

  // 5: Create GPUCommandEncoder to issue commands to the GPU
  const commandEncoder = device.createCommandEncoder();

  // 6: Initiate render pass
  const passEncoder = commandEncoder.beginComputePass();
    
  // 7: Issue commands
  passEncoder.setPipeline(computePipeline);
  passEncoder.setBindGroup(0, bindGroup);
  passEncoder.dispatchWorkgroups(Math.ceil(BUFFER_SIZE / 64));

  // End the render pass
  passEncoder.end();

  // Copy output buffer to staging buffer
  commandEncoder.copyBufferToBuffer(
    output,
    0, // Source offset
    stagingBuffer,
    0, // Destination offset
    BUFFER_SIZE
  );

  // 8: End frame by passing array of command buffers to command queue for execution
  device.queue.submit([commandEncoder.finish()]);

  // map staging buffer to read results back to JS
  await stagingBuffer.mapAsync(
    GPUMapMode.READ,
    0, // Offset
    BUFFER_SIZE // Length
  );

  const copyArrayBuffer = stagingBuffer.getMappedRange(0, BUFFER_SIZE);
  const data = copyArrayBuffer.slice(0);
  stagingBuffer.unmap();
  console.log(new Float32Array(data));
}
// **************************************
