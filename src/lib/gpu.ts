/**
 * init gpu
 * 
 * run shader
 */

//! --------- exports -------------
let gpu = {
    compute: gpu_init_compute
}
export default gpu;
//! -------------------------------

const MAX_BUFFER_SIZE = 1000 //todo set to actual max buffersize

type Binding = {
    usage: GPUBufferUsageFlags,
    size?: number,
}

// setup a webgpu compute pipeline
async function gpu_init_compute(shader: string, ...bindings: Binding[]) {

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

    // create buffers
    const buffers = bindings.map(binding => device.createBuffer({
        size: binding.size || MAX_BUFFER_SIZE,
        usage: binding.usage
    }))

    // create a bindGroup for the buffers
    const bindGroup = device.createBindGroup({
        layout: computePipeline.getBindGroupLayout(0),
        entries: buffers.map((buffer, index) => {
            return { binding: index, resource: { buffer: buffer } };
        })
    })

    // create command encoder
    const commandEncoder = device.createCommandEncoder();

    // run compute pass
    const passEncoder = commandEncoder.beginComputePass();
    passEncoder.setPipeline(computePipeline);
    passEncoder.setBindGroup(0, bindGroup);
    passEncoder.dispatchWorkgroups(Math.ceil(MAX_BUFFER_SIZE / 64));
    passEncoder.end();

    // todo: output buffers to staging buffers if buffer usage = GPUBufferUsage.MAP_READ
    
    device.queue.submit([commandEncoder.finish()]);

    // todo: map staging buffers to javascript and return
}   
