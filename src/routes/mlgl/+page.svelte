<script lang="ts">
  import gpu from "$lib/gpu";
  import mlgl from "$lib/mlgl";
  import { onMount } from "svelte";

  async function onSubmit() {
    let data = new Float32Array(
      Array.from({ length: 32 }, (_, index) => index)
    );

    const workgroup_size = 8;
    const number_of_workgroups = 4;

    const shader = /* wgsl */`
@group(0) @binding(0) var<storage> input: array<f32>;
@group(0) @binding(1) var<storage, read_write> output: array<f32>;

@compute @workgroup_size(${workgroup_size})
fn main(
  @builtin(local_invocation_id) local_id : vec3<u32>, 
  @builtin(global_invocation_id) global_id : vec3<u32>,
  @builtin(workgroup_id) workgroup_id : vec3<u32>
) {
  output[global_id.x] = f32(global_id.x)*1000 + f32(local_id.x) + 0*input[0];
  //output[global_id.x] = f32(workgroup_id.x);
}`;

    gpu.compute(
      shader,
      number_of_workgroups,
      {
        id: 0,
        byteSize: data.byteLength,
        data: data,
        usage: GPUBufferUsage.STORAGE | GPUBufferUsage.COPY_DST,
      },
      {
        id: 1,
        byteSize: data.byteLength,
        usage: GPUBufferUsage.STORAGE | GPUBufferUsage.COPY_SRC,
      }
    ).then(result => {
      console.log(result[1]);
    })
  }

  onMount(()=>{
    mlgl.test();
    onSubmit();
  });
</script>

<!-- HTML -->
<form id="form" on:submit={onSubmit}>
  <input type="checkbox" id="option_1" />
  <label for="option_1">Enable option one</label>
  <br />
  <button type="submit">Run</button>
</form>
