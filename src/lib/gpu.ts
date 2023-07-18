/**
 * init gpu
 * 
 * run shader
 */

interface Bindings {
    // todo: define interface (used to link wgsl uniforms with js variables)
}[]
interface Options {
    powerPreference?: "high-performance" | "low-power"
}

// setup a webgpu compute pipeline
export async function gpu_init_compute(shader: string, inputs: Bindings, options?: Options) {
    options = options || {};

    // check compatibility
    if (!navigator.gpu) throw Error('WebGPU not supported.');

    // create gpu adapter
    const adapter = await navigator.gpu.requestAdapter(options.powerPreference ? {powerPreference: options.powerPreference} : undefined)

    // create gpu device from the adapter

}