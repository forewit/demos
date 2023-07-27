
// represents all the layers in one long f32 array 
@group(0) @binding(0) var<storage> layers: array<f32>;

// output of the network
@group(0) @binding(1) var<storage, read_write> output: array<f32>;

/*
// squashes its input value into the range (0,1)
fn sigmoid(x: f32) -> f32 {
    return 1.0 / (1.0 + exp(-x));
}
*/

// workgroup size is the byte size of a single layer (32 * layer size)
@compute @workgroup_size(32 * ${layer_size}) 
fn main(@builtin(local_invocation_id) local_id : vec3<u32>, @builtin(global_invocation_id) global_id : vec3<u32>) {


  output[]
}