<script lang="ts">
  import { page } from "$app/stores";
</script>

<nav>
  <a href="/" class:selected={$page.url.pathname === `/`}>
    <img src="/images/pen-square.svg" alt="Home" style="width:1em" />
  </a>
  <a href="/Articles" class:selected={$page.url.pathname === `/Articles`}
    >Articles</a
  >
  <a href="/Fireworks" class:selected={$page.url.pathname === `/Fireworks`}
    >Fireworks</a
  >
  <a href="/Typewriter" class:selected={$page.url.pathname === `/Typewriter`}
    >Typewriter</a
  >
  <a href="/Drawing" class:selected={$page.url.pathname === `/Drawing`}
    >Drawing</a
  >
  <a href="/Firebase" class:selected={$page.url.pathname === `/Firebase`}
  >Firebase</a
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

  nav {
    height: 50px;
    display: flex;
    justify-content: flex-start;
    align-items: center;
    background-color: #333;
    padding: 10px;
    column-gap: 10px;
  }

  a {
    background-color: #444;
    color: white;
    text-decoration: none;
    font-size: 16px;
    padding: 5px 10px;
    transition: background-color 0.3s;
    border-radius: 4px;
  }

  a:hover {
    background-color: #555;
  }

  a.selected {
    background-color: #777;
  }
</style>
