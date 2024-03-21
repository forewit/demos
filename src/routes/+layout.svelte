<script lang="ts">
  import { onMount } from "svelte";

  function handleOrientation() {
    document.documentElement.style.setProperty("--is-notch-left", screen.orientation.type == "landscape-primary" ? "1" : "0")
    document.documentElement.style.setProperty("--is-notch-right", screen.orientation.type == "landscape-secondary" ? "1" : "0");
    document.documentElement.style.setProperty("--is-notch-top", screen.orientation.type == "portrait-primary" ? "1" : "0");
  }

  onMount(() => {
    screen.orientation.onchange = handleOrientation;
    handleOrientation();
  });
</script>

<svelte:head>
  <meta
    name="viewport"
    content="width=device-width, user-scalable=0, initial-scale=1.0, maximum-scale=1.0, viewport-fit=cover"
  />
</svelte:head>

<div class="container">
  <div class="content">
    <slot />
  </div>
</div>

<style>
  .container {
    /* make fullscreen */
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
  }

  .content {
    /* fill container */
    position: absolute;
    width: 100%;
    height: 100%;
  }

  /* Import the Ysabeau font */
  @font-face {
    font-family: "Poltawski Nowy";
    src: url("/fonts/PoltawskiNowy.ttf") format("truetype");
    font-weight: normal;
    font-style: normal;
  }
  :root {
    --is-notch-left: 0;
    --is-notch-right: 0;
    --is-notch-top: 0;
  }
  :global(:root) {
    --notch-area-left: calc(env(safe-area-inset-left) * var(--is-notch-left));
    --notch-area-right: calc(env(safe-area-inset-right) * var(--is-notch-right));
    --notch-area-top: calc(env(safe-area-inset-top) * var(--is-notch-top));
  }
  :global(*) {
    box-sizing: border-box;
    font-family: "Poltawski Nowy";
    margin: 0;
    padding: 0;
  }
  :global(html, body) {
    background: #333;
  }
</style>
