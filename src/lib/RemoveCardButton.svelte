<script lang="ts">
  import { createEventDispatcher } from "svelte";
  const dispatch = createEventDispatcher<{ click: CustomEvent }>();
</script>

<button class="remove-card-button" on:click={() => dispatch("click")}>
  ×
</button>

<style>
  .remove-card-button {
    position: absolute;
    top: 4px;
    right: 4px;
    background-color: transparent;
    border: none;
    color: #888;
    font-size: 16px;
    cursor: pointer;
  }
</style>
