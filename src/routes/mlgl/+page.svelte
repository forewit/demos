<script lang="ts">
  import gpu from "$lib/gpu";

  async function onSubmit() {
    let data = new Float32Array(
      Array.from({ length: 32 }, (_, index) => index)
    );
    const BATCHES = 2;

    const shader = `
@group(0) @binding(0) var<storage> input: array<f32>;
@group(0) @binding(1) var<storage, read_write> output: array<f32>;

@compute @workgroup_size(${data.byteLength/BATCHES})
fn main(@builtin(local_invocation_id) local_id : vec3<u32>) {

  output[local_id.x] = input[local_id.x];
}`;

    let result = gpu.compute(
      shader,
      BATCHES,
      {
        binding: 0,
        byteSize: data.byteLength,
        data: data,
        usage: GPUBufferUsage.STORAGE | GPUBufferUsage.COPY_DST,
      },
      {
        binding: 1,
        byteSize: data.byteLength,
        usage: GPUBufferUsage.STORAGE | GPUBufferUsage.COPY_SRC,
      }
    ).then(result => {
      console.log(result);
    })
  }
</script>

<!-- HTML -->
<form id="form" on:submit={onSubmit}>
  <input type="checkbox" id="option_1" />
  <label for="option_1">Enable option one</label>
  <br />
  <button type="submit">Run</button>
</form>
