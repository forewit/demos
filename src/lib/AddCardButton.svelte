<script lang="ts">
  import { createEventDispatcher } from "svelte";
  const dispatch = createEventDispatcher<{ click: CustomEvent }>();
</script>

<button class="add-card-button" on:click={() => dispatch("click")}> + </button>

<style>
  .add-card-button {
    background-color: #4caf50;
    border: none;
    color: white;
    padding: 8px 16px;
    text-align: center;
    text-decoration: none;
    display: inline-block;
    font-size: 16px;
    margin: 4px 2px;
    cursor: pointer;
    border-radius: 4px;
  }
</style>
