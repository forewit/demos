/**

 * RESOURCES:
 * Typescript webgpu types: https://www.npmjs.com/package/@webgpu/types
 * js bitwise operations: https://www.w3schools.com/js/js_bitwise.asp
 * WebGPU Compute pipeline: https://developer.mozilla.org/en-US/docs/Web/API/GPUComputePipeline
 * Compute shader in practice: https://webgpu.github.io/webgpu-samples/samples/gameOfLife#main.ts
 * 
 * NOTES:
 * WebGPU API: https://developer.mozilla.org/en-US/docs/Web/API/WebGPU_API
 * The GPU stack:
 * web app > logical device > adapter > native gpu api > gpu
 * 
 * todo: consider bindgroup best practices: https://toji.dev/webgpu-best-practices/bind-groups.html
 * 
 * Process
 * 1. create shader modules (packaged wgsl code)
 * 2. setup the canvas context (optional for compute only pipelines)
 * 3. store data in buffers or textures on the gpu
 *    buffer types: index, uniform, vertex, storage, map_write, copy_dst, indirect, etc... |
 * 4. create pipelines (describe data structure, bindings, shaders, and resource layouts)
 *      A. render pipeline (vertex and fragment stages)
 *      B. compute pipeline (singe compute stage)
 * 5. run a pass (compute or rendering)
 *      A. command encoder -- sets of commands for the GPU
 *      B. encoder object -- the commands run on that object
 *      C. command list -- specifies which pipeline, buffers, and how many draw operations
 *      D. merge it all into a command buffer
 * 
 * todo: learn types of gpu buffers 
 */

//! --------- exports -------------
let gpu = {
    compute: compute
}
export default gpu;
//! -------------------------------

const DEFAULT_BUFFER_SIZE = 1000, // todo: set to max buffer size availalbe on gpu
    DEFAULT_WORKGROUP_SIZE = 8;

type Binding = {
    binding: number,
    usage: GPUBufferUsageFlags,
    data?: Float32Array
    size?: number,
}

// setup a webgpu compute pipeline
async function compute(shader: string, number_of_workgroups: number, ...bindings: Binding[]) {
    // check compatibility
    if (!navigator.gpu) throw Error('WebGPU not supported.');

    // create gpu adapter
    const adapter = await navigator.gpu.requestAdapter({ powerPreference: "high-performance" })
    if (!adapter) throw Error('Couldn\'t request WebGPU adapter.');
    if (adapter.isFallbackAdapter) console.warn("WebGPU is using a fallback adapter!")

    // create gpu device from the adapter
    const device = await adapter.requestDevice(); // you can pass options to request a device with specific GPU features

    // create shader module
    const shaderModule = device.createShaderModule({ code: shader })

    // create pipeline
    const computePipeline = device.createComputePipeline({
        layout: "auto",
        compute: {
            module: shaderModule,
            entryPoint: 'main'
        }
    })

    // create uniform & output buffers used by the shader
    const shaderBuffers = bindings.map(binding => {
        return {
            binding: binding.binding,
            GPUBuffer: device.createBuffer({
                usage: binding.usage,
                size: binding.size ? binding.size : (binding.data ? binding.data.byteLength : DEFAULT_BUFFER_SIZE)
            }),
            data: binding.data
        }
    });

    // create staging buffers used to copy data back to JS
    const stagingBuffers = shaderBuffers
        .filter(buffer => !buffer.data) // create a staging buffer for each output buffer
        .map(buffer => {
            return {
                binding: buffer.binding,
                source: buffer.GPUBuffer,
                destination: device.createBuffer({
                    usage: GPUBufferUsage.MAP_READ | GPUBufferUsage.COPY_DST,
                    size: buffer.GPUBuffer.size
                })
            }
        });

    // create a bindGroup for the uniform & output buffers
    const bindGroup = device.createBindGroup({
        layout: computePipeline.getBindGroupLayout(0),
        entries: shaderBuffers.map((buffer) => {
            return { binding: buffer.binding, resource: { buffer: buffer.GPUBuffer } };
        })
    })

    // create command encoder
    const commandEncoder = device.createCommandEncoder();

    // run compute pass
    const passEncoder = commandEncoder.beginComputePass();
    passEncoder.setPipeline(computePipeline);
    passEncoder.setBindGroup(0, bindGroup);
    passEncoder.dispatchWorkgroups(number_of_workgroups);
    passEncoder.end();

    // Copy output buffers to staging buffers
    for (const buffer of stagingBuffers) {
        commandEncoder.copyBufferToBuffer(
            buffer.source,
            0, // source offset
            buffer.destination,
            0, // destination offset
            buffer.destination.size
        )
    }

    // end frame by passing array of command buffers to command queue for execution
    device.queue.submit([commandEncoder.finish()]);

    // map staging buffers to read results back to JS
    let data: Record<number, Float32Array> = {};
    for (const buffer of stagingBuffers) {
        await buffer.destination.mapAsync(
            GPUMapMode.READ,
            0, // offset
            buffer.destination.size // length
        );

        const copyArrayBuffer = buffer.destination.getMappedRange(0, buffer.destination.size);
        data[buffer.binding] = new Float32Array(copyArrayBuffer.slice(0));
        buffer.destination.unmap();
    }

    console.log(data);
    return data;
}   