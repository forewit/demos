/**
 * ML in shaders: https://www.diva-portal.org/smash/get/diva2:829298/FULLTEXT01.pdf
 * Neural Net in shader: https://github.com/SCRN-VRC/SimpNet-Deep-Learning-in-a-Shader
 *
 ** colors.rgba = [0.0 - 1.0, *, *, *]

 */

// imports
import gpu from "$lib/gpu";

//! --------- exports -------------
let mlgl = { test: test }
export default mlgl;
//! -------------------------------

// helper functions
function sigmoid(x: number): number { return 1 / 1 + Math.exp(-x) }
function logit(x: number): number { return Math.log(x / (1 - x)) }

type Network = {
    layer_size: number, // must be a square
    layer_count: number,
    layers: Float32Array, // each layer has layer_size^2 number of elements

    // Input Bias, input Weights, and output Bias layers are required
    // hidden Bias and hidden Weights layers are optional
}
/**
 * in parallel -> first layer
 
feed forward a nodes output to all next layer nodes



 */

let myNetwork: Network = {
    layer_size: 3, // number of nodes per layer
    layer_count: 3, // number of layers
    layers: Float32Array.from([
        /*input*/0, /*weights*/1, 1, 1, /*input*/0, /*weights*/1, 1, 1, //* input layer
        /*bias*/0, /*weights*/1, 1, 1, /*bias*/0, /*weights*/1, 1, 1,   //* hidden layer
        /*output*/0,
    ]), // output layers do not have weights

}


/**
 * layerlessNN in order to run in parralel
 */



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
@compute @workgroup_size(${myNetwork.layer_count}) //! workgroup size 
fn main(
    @builtin(local_invocation_id) local_id : vec3<u32>, 
    @builtin(global_invocation_id) global_id : vec3<u32>,
    @builtin(workgroup_id) workgroup_id : vec3<u32>,
    @builtin(num_workgroups) num_workgroups : vec3<u32>

) {
    // feed forward algorithm causes race condition! (accessing same resource at same time)
    output[local_id.x] = f32(workgroup_id.x) + layers[0]*0;

}`;


function test() {
    /*
    gpu.compute(
        ml_shader,
        myNetwork.layer_size, //! number of workgroups
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
    */
}