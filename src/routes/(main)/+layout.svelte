<script lang="ts">
  import { page } from "$app/stores";
  import { base } from "$app/paths";
</script>

<div class="grid">
  <div class="content">
    <slot />
  </div>
  <nav>
    <a class="homeButton" href="{base}/">
      <img src="{base}/images/pen-square.svg" alt="Home" />
    </a>
    <a
      class="navButton"
      href="{base}/Articles"
      class:selected={$page.url.pathname === `${base}/Articles/`}>Articles</a
    >
    <a
      class="navButton"
      href="{base}/Fireworks"
      class:selected={$page.url.pathname === `${base}/Fireworks/`}>Fireworks</a
    >
    <a
      class="navButton"
      href="{base}/Typewriter"
      class:selected={$page.url.pathname === `${base}/Typewriter/`}
      >Typewriter</a
    >
    <a
      class="navButton"
      href="{base}/Drawing"
      class:selected={$page.url.pathname === `${base}/Drawing/`}>Drawing</a
    >
    <a
      class="navButton"
      href="{base}/Firebase"
      class:selected={$page.url.pathname === `${base}/Firebase/`}>Firebase</a
    >
    <a
      class="navButton"
      href="{base}/DiceThronesSim"
      class:selected={$page.url.pathname === `${base}/DiceThronesSim/`}
      >Dice Thrones Simulator</a
    >
    <a
      class="navButton"
      href="{base}/Ascii"
      class:selected={$page.url.pathname === `${base}/Ascii/`}
      style="font-family: monospace;">Ascii</a
    >
  </nav>
</div>

<style>
  img {
    align-self: center;
  }
  .grid {
    display: grid;
    height: 100%;

    grid-template:
      "nav" max-content
      "content" 1fr;
  }
  .content {
    grid-area: content;
    position: relative;
    width: 100%;
    background: whitesmoke;
    overflow: scroll;
    margin-top: env(safe-area-inset-top);

    /* Hide scrollbar for IE, Edge and Firefox */
    -ms-overflow-style: none; /* IE and Edge */
    scrollbar-width: none; /* Firefox */
  }
  /* Hide scrollbar for Chrome, Safari and Opera */
  .content::-webkit-scrollbar {
    display: none;
  }
  .homeButton {
    width: 2em;
  }
  nav {
    grid-area: nav;
    display: flex;
    justify-content: center;
    flex-wrap: wrap;
    padding: 10px;
    gap: 10px;
  }

  .navButton {
    background-color: #444;
    color: white;
    text-decoration: none;
    font-size: 16px;
    padding: 5px 10px;
    transition: background-color 0.3s;
    border-radius: 4px;

    display: flex;
    align-items: center;
  }

  .navButton:hover:not(.selected) {
    background-color: #555;
  }

  .selected {
    background-color: #777;
  }
</style>
