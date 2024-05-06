<script lang="ts">
  import { page } from "$app/stores";
  import { base } from "$app/paths";
  import { onMount } from "svelte";
  import { isMobile } from "$lib/modules/utils";

  let mobile: boolean;

  let navigationButtons = [
    { name: "📃", path: "/articles" },
    { name: "✏️", path: "/drawing" },
    { name: "🔥", path: "/firebase" },
    { name: "🎲", path: "/dicethrones" },
    { name: "⌨️", path: "/typewriter" },
    { name: "🎆", path: "/fireworks" },
    { name: "ASCII", path: "/ascii" },
  ];

  onMount(() => {
    let resizeObserver = new ResizeObserver(() => {
      mobile = isMobile();
    });

    resizeObserver.observe(document.body);
  });
</script>

<div class="grid" class:mobile>
  <div class="content">
    <slot />
  </div>
  <nav>
    <a class="homeButton" href="{base}/">
      <img src="{base}/images/pen-square.svg" alt="Home" />
    </a>

    {#each navigationButtons as { name, path }}
      <a
        class="navButton"
        href="{base}{path}"
        class:selected={$page.url.pathname === `${base}${path}/`}>{name}</a
      >
    {/each}
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

  .grid.mobile {
    grid-template:
      "content" 1fr
      "nav" max-content;
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
    margin-top: 2px;
    margin-bottom: -2px;
    margin-right: 1em;
  }
  nav {
    grid-area: nav;
    display: flex;
    justify-content: center;
    flex-wrap: wrap;
    padding: 10px;
    gap: 0.5em;
  }

  .navButton {
    background-color: #444;
    color: white;
    text-decoration: none;
    font-size: 16px;
    padding: 5px 10px;
    transition: background-color 0.3s;
    border-radius: 4px;
    height: 2em;

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
