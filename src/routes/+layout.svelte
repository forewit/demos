<script lang="ts">

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
  :global(:root) {
    --theme-background: #333;
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
