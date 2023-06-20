<!-- 
this is a single svelte3 component for a grid of squares that fills the screen evenly.
use the #each directive to create a grid of square elements

this is not for a game, but rather for using the hover feature on each square to detect where the mouse is at
-->
<script lang="ts">
  import { onMount } from "svelte";

  const MIN_SQUARE_SIZE = 20,
        MAX_SQUARE_SIZE = 100;

  let squareSize = 50,
    gridWidth = 0,
    gridHeight = 0;

  function handleScroll(e: WheelEvent) {
    if (e.deltaY > 0) {
      squareSize = Math.max(squareSize - 5, MIN_SQUARE_SIZE);
    } else {
      squareSize = Math.min(squareSize + 5, MAX_SQUARE_SIZE);
    }
    handleResize();
  }

  function handleResize() {
    gridWidth = Math.floor(window.innerWidth / squareSize);
    gridHeight = Math.floor(window.innerHeight / squareSize);
  }

  onMount(() => {
    handleResize();
  });
</script>

<svelte:window on:resize={handleResize} on:wheel={handleScroll} />

<div
  class="grid"
  style="--grid-width: {gridWidth}; --grid-height: {gridHeight}"
>
  {#each Array(gridWidth * gridHeight) as _, i}
    <div class="square" />
  {/each}
</div>

<style>
  .grid {
    display: grid;
    grid-template-columns: repeat(var(--grid-width), 1fr);
    grid-template-rows: repeat(var(--grid-height), 1fr);
    width: 100%;
    height: 100%;
  }

  .square {
    background-color: #fff;
    border: 1px solid #f5f5f5;
    width: 100%;
    height: 100%;
  }

  .square:hover {
    background-color: aliceblue;
  }
</style>
