<script lang="ts">
  import Typewriter from "$lib/Components/Typewriter.svelte";

  let typewriter: Typewriter;
  let text = "Hey 👋,\n\nYou made it here 🎉\n\nForewit";

</script>

<svelte:head>
  <title>Typewriter</title>
</svelte:head>

<div id="text-container">
  <Typewriter bind:this={typewriter} text={text} />
</div>

<div id="button-container">
  <button on:click={typewriter.type}>Go</button>
</div>

<style>
    #text-container {
      position: absolute;
      top: 30%;
      width: 100%;
      display: flex;
      justify-content: center;
      text-align: center;
    }
    #button-container {
      position: absolute;
      bottom: 30%;
      width: 100%;
      display: flex;
      justify-content: center;
    }
    button {
      padding: 10px;
    }
  </style>