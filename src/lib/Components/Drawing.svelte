<script lang="ts">
 import Drawing from "$lib/modules/drawing";
  import { onMount } from "svelte";

 let canvas: HTMLCanvasElement;

 onMount(()=>{
    new Drawing(canvas);
 })
</script>

<canvas bind:this={canvas}></canvas>

<style>
    canvas {
        background: cornsilk;
        width: 100%;
        height: 100%;
    }
</style>