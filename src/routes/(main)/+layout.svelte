<script lang="ts">
  import { page } from "$app/stores";
  import { base } from "$app/paths";
</script>

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
    class:selected={$page.url.pathname === `${base}/Typewriter/`}>Typewriter</a
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
</nav>

<div class="content">
  <slot />
</div>

<style>
  img {
    align-self: center;
  }
  .content {
    position: absolute;
    width: 100%;
    /* offset height by size of the nav bar */
    height: calc(100% - 50px);
  }

  #navContainer {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    gap: 10px;
  }
  .homeButton {
    width: 2em;
  }
  nav {
    display: flex;
    justify-content: center;
    flex-wrap: wrap;
    background-color: #333;
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
  }

  .navButton:hover {
    background-color: #555;
  }

  .selected {
    background-color: #777;
  }
</style>
