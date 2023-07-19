<script lang="ts">
  import * as ml from "$lib/mlgl";

  function onSubmit(e: any) {
    ml.ml_init();
  }
</script>

<!-- HTML -->
<form id="form" on:submit={onSubmit}>
  <input type="checkbox" id="option_1" />
  <label for="option_1">Enable option one</label>
  <br />
  <button type="submit">Run ml_init</button>
</form>

<button on:click={ml.ml_test}>Run ml_test</button>
