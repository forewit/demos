<script lang="ts">
  import Drawing from "$lib/Components/Drawing.svelte";
  import Inputs from "$lib/Components/Inputs.svelte";

  function onSizeChange(size?: number) {
    console.log(size);
  }

  function onColorChange(color?: string) {
    console.log(color);
  }

  function onNameChange(name?: string) {
    console.log(name);
  }

  function onCheckboxChange(enabled?: boolean) {
    console.log(enabled);
  }
</script>

<svelte:head>
  <title>Drawing</title>
</svelte:head>

<div class="inputs-container">
  <Inputs
    props={[
      { title: "size", type: "number", onInput: onSizeChange, value: 1 },
      {
        title: "name",
        type: "string",
        onInput: onColorChange,
        value: "My name",
      },
      {
        title: "color",
        type: "color",
        onInput: onNameChange,
        value: "#333333",
      },
      { title: "enabled", type: "checkbox", onInput: onCheckboxChange },
    ]}
  />
</div>

  <Drawing />

<style>
  .inputs-container {
    position: absolute;
    top: 10px;
    right: 10px;
  }
</style>
