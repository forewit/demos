<!-- backpropagation algorthm & visualization-->
<script lang="ts">
function onSubmit(e: any) {
  console.log(e)
}
</script>

<!-- HTML -->
<form id="form" on:submit={onSubmit}>
  <input type="checkbox" id="option_1">
  <label for="option_1">Enable option one</label>
  <br>
  <button type="submit">Run</button>
</form>


