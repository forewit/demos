<script lang="ts">
  import { writable } from "svelte/store";
  import Card from "./Card.svelte";
  import AddCardButton from "./AddCardButton.svelte";

  export let title = "";

  interface Card {
    id: number;
  }
  const cards = writable<Card[]>([]);

  function addCard() {
    cards.update((cards) => [...cards, { id: Date.now() }]);
  }

  function removeCard(cardId: number) {
    cards.update((cards) => cards.filter((card) => card.id !== cardId));
  }
</script>

<style>
  .list {
    display: flex;
    flex-direction: column;
    gap: 8px;
    padding: 16px;
    background-color: #f0f0f0;
    border-radius: 8px;
    max-width: 240px;
  }

  h3 {
    margin-bottom: 16px;
  }
</style>

<div class="list">
  <h3>{title}</h3>
  {#each $cards as card (card.id)}
    <Card {card} {removeCard}></Card>
  {/each}
  <AddCardButton on:click={addCard} />
</div>