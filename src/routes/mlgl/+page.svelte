<script lang="ts">
  import gpu from "$lib/gpu";

  async function onSubmit() {
    const shader = `
@group(0) @binding(0) var<storage> input: array<f32>;
@group(0) @binding(1) var<storage, read_write> output: array<f32>;

@compute @workgroup_size(1)
fn main(@builtin(local_invocation_id) local_id : vec3<u32>) {

  output[local_id.x] = input[local_id.x];
}`;

    let data = new Float32Array(
      Array.from({ length: 32 }, (_, index) => index)
    );
    console.log(data);
    gpu.compute(
      shader,
      32,
      { binding: 0, size: 32, usage: GPUBufferUsage.STORAGE, data: data },
      {
        binding: 1,
        size: 32,
        usage: GPUBufferUsage.STORAGE | GPUBufferUsage.COPY_SRC,
      }
    );
  }
</script>

<!-- HTML -->
<form id="form" on:submit={onSubmit}>
  <input type="checkbox" id="option_1" />
  <label for="option_1">Enable option one</label>
  <br />
  <button type="submit">Run</button>
</form>
