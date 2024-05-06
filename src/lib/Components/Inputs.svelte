<script lang="ts">
  import { base } from "$app/paths";

  type Prop = {
    title: string;
  } & (
    | { type: "text"; onInput: (value: string) => any; value?: string }
    | { type: "color"; onInput: (value: string) => any; value?: string }
    | { type: "number"; onInput: (value: number) => any; value?: number }
    | { type: "checkbox"; onInput: (value: boolean) => any; value?: boolean }
    | { type: "button"; onClick: () => any; label?: string }
    | {
        type: "slider";
        onInput: (value: number) => any;
        value?: number;
        min?: number;
        max?: number;
        step?: number;
      }
  );

  export let props: Prop[];

  let opened = false;
</script>

{#if opened}
  <button class="close-btn" on:click={() => (opened = false)}
    ><img src="{base}/images/close-icon.svg" alt="" /></button
  >
{/if}
<div class="container glass" class:closed={!opened}>
  {#if opened}
    {#each props as prop, i}
      <label class="label" for={i.toString()}>{prop.title}</label>
      {#if prop.type == "number"}
        <input
          class="input"
          id={i.toString()}
          type="number"
          bind:value={prop.value}
          on:input={prop.onInput(prop.value || 0)}
        />
      {:else if prop.type == "text"}
        <input
          class="input"
          id={i.toString()}
          type="text"
          bind:value={prop.value}
          on:input={prop.onInput(prop.value || "")}
        />
      {:else if prop.type == "color"}
        <input
          class="input"
          id={i.toString()}
          type="color"
          bind:value={prop.value}
          on:input={prop.onInput(prop.value || "#000000")}
        />
      {:else if prop.type == "checkbox"}
        <input
          class="input"
          id={i.toString()}
          type="checkbox"
          bind:checked={prop.value}
          on:input={prop.onInput(!prop.value)}
        />
      {:else if prop.type == "button"}
        <button class="btn" id={i.toString()} on:click={prop.onClick()}
          >{prop.label}</button
        >
      {:else if prop.type == "slider"}
        <input
          id={i.toString()}
          type="range"
          min={prop.min || 0}
          max={prop.max || 100}
          step={prop.step || 1}
          bind:value={prop.value}
          on:input={prop.onInput(prop.value || prop.min || 0)}
        />
      {:else}
        <div>Invalid input type!</div>
      {/if}
    {/each}
  {:else}
    <button
      class="open-btn"
      on:click={() => {
        opened = true;
      }}
    >
      <img src="{base}/images/settings-icon.svg" alt="Open" />
    </button>
  {/if}
</div>

<style>
  .glass {
    background: rgba(255, 255, 255, 0.5);
    box-shadow: 0 8px 32px 0 rgba(31, 38, 135, 0.37);
    backdrop-filter: blur(4px);
    border: 1px solid rgba(255, 255, 255, 0.18);
  }
  .container {
    padding: 1.5em;
    border-radius: 0.5em;

    display: grid;
    grid-template-columns: min-content 2fr;
    column-gap: 0.8em;
    row-gap: 1em;

    transition: all 100ms;
  }

  .container.closed {
    grid-template-columns: 1fr;
    row-gap: 0;
    padding: 0;
    cursor: pointer;
  }

  .container > .label {
    justify-self: right;
  }
  .container > .input {
    justify-self: left;
    cursor: pointer;
  }
  .container > .btn {
    justify-self: left;
    padding: 0px 10px;
    cursor: pointer;
  }

  .close-btn {
    width: 3em;
    height: 3em;
    opacity: 0.5;

    z-index: 1;

    position: absolute;
    right: 1.5em;
    bottom: 1.5em;

    border: none;
    background: none;
    cursor: pointer;
  }
  .close-btn img {
    width: 100%;
    height: 100%;

    transition: transform 0.3s;
  }
  .close-btn:hover img {
    transform: rotate(90deg);
  }

  .open-btn {
    width: 3.5em;
    height: 3.5em;

    background: none;
    border: none;
    cursor: pointer;
  }
  .open-btn img {
    width: 100%;
    height: 100%;
    padding: 0.5em;
    transition: transform 0.3s;
  }
  .open-btn:hover img {
    /* rotate: 90deg; */
    transform: rotate(90deg);
  }
</style>
