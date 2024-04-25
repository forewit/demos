<script lang="ts">
  import Drawing from "$lib/Components/Drawing/Drawing.svelte";
  import Inputs from "$lib/Components/Inputs.svelte";

  let drawing: Drawing;
  let stroke = 10;
  let radius = 3;
  let smoothness = 2;
  let color = "#429A53";
  let dashed = false;

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
        title: "Radius",
        type: "number",
        onInput: (newRadius) => {
          if (newRadius != null) radius = newRadius;
        },
        value: radius,
      },
      {
        title: "Smoothness",
        type: "number",
        onInput: (newSmoothness) => {
          if (newSmoothness != null) smoothness = newSmoothness;
        },
        value: smoothness,
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
      {
        title: "Clear",
        type: "button",
        onClick: ()=>{drawing.clear()},
        label: "🧹"
      }
    ]}
  />
</div>

<Drawing {dashed} {color} {stroke} {radius} {smoothness} bind:this={drawing}/>


<style>
  .inputs-container {
    position: absolute;
    bottom: 20px;
    right: 20px;
    z-index: 999;
  }
</style>
