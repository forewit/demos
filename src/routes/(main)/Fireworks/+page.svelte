<script lang="ts">
  import Fireworks from "$lib/Components/Fireworks.svelte";

  let fireworks: Fireworks;

  function launch() {
    fireworks.launch(
      3,
      {
        color: "lightgreen",
        left: 50,
        top: 50,
        initialLeft: 45,
        initialTop: 100,
        size: 30,
      },
      {
        color: "red",
        left: 50,
        top: 50,
        initialLeft: 50,
        initialTop: 100,
        delay: 0.25,
      },
      {
        color: "yellow",
        left: 50,
        top: 40,
        initialLeft: 55,
        initialTop: 100,
        delay: 0.5,
        size: 60,
      }
    );
  }
</script>

<svelte:head>
  <title>Fireworks</title>
</svelte:head>

<div id="container">
  <Fireworks bind:this={fireworks} />

  <div id="button-container">
    <button on:click={launch}>Launch</button>
  </div>
</div>

<style>
  #container {
    width: 100%;
    height: 100%;
    background: #234;
  }
  #button-container {
    position: absolute;
    bottom: 30%;
    width: 100%;
    display: flex;
    justify-content: center;
    z-index: 1;
  }
  button {
    padding: 10px;
  }
</style>
