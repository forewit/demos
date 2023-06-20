<script lang="ts" context="module">
  export interface Card {
    id: number;
  }
</script>

<script lang="ts">
  import { onMount } from "svelte";
  import RemoveCardButton from "./RemoveCardButton.svelte";

  export let card: Card;
  export let removeCard: (cardId: number) => void;

  let cardElement: HTMLElement;

  onMount(() => {
    cardElement.draggable = true;
  });

  function handleDragStart(event: DragEvent) {
    if (event.dataTransfer) {
      event.dataTransfer.setData("text/plain", card.id.toString());
    }
  }
</script>

<style>
  .card {
    padding: 16px;
    background-color: #ffffff;
    border: 1px solid #ccc;
    border-radius: 4px;
    position: relative;
    user-select: none;
  }
</style>

<div class="card" bind:this={cardElement} on:dragstart={handleDragStart}>
  <slot></slot>
  <RemoveCardButton on:click={() => removeCard(card.id)} />
</div>
