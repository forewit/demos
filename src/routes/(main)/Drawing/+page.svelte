<script lang="ts">
  import Drawing from "$lib/Components/Drawing.svelte";
  import Inputs from "$lib/Components/Inputs.svelte";

  let stroke = 5;
  let color = "#ff0000";
  let dashed = false;

  function onColorChange(newColor?: string) {
    if (newColor != null) color = newColor;
  }

  function onDashChange(newDashed?: boolean) {
    if (newDashed != null) dashed = newDashed;
  }
</script>

<svelte:head>
  <title>Draw</title>
</svelte:head>

<div class="inputs-container">
  <Inputs
    props={[
      {
        title: "Stroke",
        type: "number",
        onInput: (newStroke) => {
          if (newStroke != null) stroke = newStroke;
        },
        value: stroke,
      },
      {
        title: "Color",
        type: "color",
        onInput: (newColor) => {
          if (newColor != null) color = newColor;
        },
        value: color,
      },
      {
        title: "Dashed",
        type: "checkbox",
        onInput: (newDashed) => {
          if (newDashed != null) dashed = newDashed;
        },
        value: dashed,
      },
    ]}
  />
</div>

<Drawing {dashed} {color} {stroke} />

<style>
  .inputs-container {
    position: absolute;
    bottom: 20px;
    right: 20px;
  }
</style>
