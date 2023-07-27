/**
 * ML in shaders: https://www.diva-portal.org/smash/get/diva2:829298/FULLTEXT01.pdf
 * Neural Net in shader: https://github.com/SCRN-VRC/SimpNet-Deep-Learning-in-a-Shader
 *
 ** colors.rgba = [0.0 - 1.0, *, *, *]

 */

// imports
import gpu from "$lib/gpu";

//! --------- exports -------------
let mlgl = { test: test}
export default mlgl;
//! -------------------------------

// helper functions
function sigmoid(x: number): number { return 1 / 1 + Math.exp(-x) }
function logit(x: number): number { return Math.log(x / (1 - x)) }

type Network = {
    layer_size: number, // must be a square
    layer_count: number,
    layers: Float32Array // each layer has layer_size number of elements

    // Input Bias, input Weights, and output Bias layers are required
    // hidden Bias and hidden Weights layers are optional
}

let myNetwork: Network = {
    layer_size: 4, // number of nodes per layer
    layer_count: 5,
    layers: Float32Array.from([
        1, 1, 1, 1, // required input bias
        1, 1, 1, 1, // required input weights
        1, 1, 1, 1, // [hidden bias]
        1, 1, 1, 1, // [hidden weights]
        1, 1, 1, 1  // output bias
    ]) // total length must equal layer_size * layer_count
}

const ml_shader = /* wgsl */`
// represents all the layers in one long f32 array 
@group(0) @binding(0) var<storage> layers: array<f32, ${myNetwork.layers.length}>;

// output of the network
@group(0) @binding(1) var<storage, read_write> output: array<f32, ${myNetwork.layer_size}>;

/*
// squashes its input value into the range (0,1)
fn sigmoid(x: f32) -> f32 {
    return 1.0 / (1.0 + exp(-x));
}
*/

// workgroup size is the byte size of a single layer (32 * layer size)
@compute @workgroup_size(32 * ${myNetwork.layer_size}) 
fn main(
    @builtin(local_invocation_id) local_id : vec3<u32>, 
    @builtin(global_invocation_id) global_id : vec3<u32>,
    @builtin(workgroup_id) workgroup_id : vec3<u32>
) {
    output[workgroup_id.x] = f32(1) + layers[0]*0;
}`;


function test() {
    gpu.compute(
        ml_shader,
        myNetwork.layer_count,
        {
            id: 0,
            byteSize: myNetwork.layers.byteLength,
            data: myNetwork.layers,
            usage: GPUBufferUsage.STORAGE | GPUBufferUsage.COPY_DST,
        },
        {
            id: 1,
            byteSize: myNetwork.layers.byteLength / myNetwork.layer_count,
            usage: GPUBufferUsage.STORAGE | GPUBufferUsage.COPY_SRC,
        }
    ).then(result => {
        console.log(result[1]);
    });
}