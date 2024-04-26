<script lang="ts">
  import Drawing from "$lib/Components/Drawing.svelte";
  import Inputs from "$lib/Components/Inputs.svelte";

  let drawing: Drawing;
  let stroke = 10;
  let radius = 3;
  let smoothness = 2;
  let color = "#429A53";

</script>

<svelte:head>
  <title>Draw</title>
</svelte:head>

<div class="inputs-container">
  <Inputs
    props={[
      {
        title: "Stroke",
        type: "slider",
        max:50,
        onInput: (newStroke) => {
          if (newStroke != null) stroke = newStroke;
        },
        value: stroke,
      },
      {
        title: "Radius",
        type: "slider",
        max:50,
        onInput: (newRadius) => {
          if (newRadius != undefined) radius = newRadius;
        },
        value: radius,
      },
      {
        title: "Smoothness",
        type: "slider",
        max:50,
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
        title: "Clear",
        type: "button",
        onClick: ()=>{drawing.clear()},
        label: "🧹"
      },
      {
        title: "Undo",
        type: "button",
        onClick: ()=>{drawing.undo()},
        label: "🔙"
      }
    ]}
  />
</div>

<Drawing {color} {stroke} {radius} {smoothness} bind:this={drawing}/>


<style>
  .inputs-container {
    position: absolute;
    bottom: 20px;
    right: 20px;
    z-index: 999;
  }
</style>
