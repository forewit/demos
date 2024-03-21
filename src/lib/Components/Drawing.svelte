<!-- Dependancies: Drawing.ts >> Gestures.ts -->

<script lang="ts">
  import Drawing from "$lib/modules/drawing";
  import { onMount } from "svelte";

  let canvas: HTMLCanvasElement;

  onMount(() => {
    new Drawing(canvas);
  });
</script>

<canvas bind:this={canvas} />

<style>
  canvas {
    background: cornsilk;
    height: 100%;
    width: 100%;
  }
</style>
