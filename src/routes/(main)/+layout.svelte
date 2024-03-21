<script lang="ts">
  import { page } from "$app/stores";
  import { base } from "$app/paths";
</script>

<div class="grid">
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
  </nav>

  <div class="content">
    <slot />
  </div>
</div>

<style>
  img {
    align-self: center;
  }
  .grid {
    display: grid;
    grid-template-columns: 1fr;
    grid-template-rows: max-content 1fr;
    height: 100%;
  }
  .content {
    position: relative;
    width: 100%;
    background: whitesmoke;
    overflow: scroll;

    /* account for notch */
    padding-left: env(safe-area-inset-left);
    padding-right: env(safe-area-inset-right);
  }
  .homeButton {
    width: 2em;
  }
  nav {
    display: flex;
    justify-content: center;
    flex-wrap: wrap;
    padding: 10px;
    gap: 10px;

    /* account for notch */
    margin-left: calc(var(--notch-area-left) + var(--notch-area-right));
    margin-right: calc(var(--notch-area-left) + var(--notch-area-right));
    margin-top: var(--notch-area-top);
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

  .navButton:hover:not(.selected) {
    background-color: #555;
  }

  .selected {
    background-color: #777;
  }
</style>
