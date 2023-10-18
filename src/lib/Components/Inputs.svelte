<script lang="ts">
  type Prop = {
    title: string;
  } & (
    | {
        type: "string" | "color";
        onInput: (value?: string) => any;
        value?: string;
      }
    | { type: "number"; onInput: (value?: number) => any; value?: number }
    | { type: "checkbox"; onInput: (value?: boolean) => any; value?: boolean }
  );

  export let props: Prop[];
</script>

<div class="container">
  {#each props as prop, i}
    <label for={i.toString()}>{prop.title}</label>
    {#if prop.type == "number"}
      <input
        id={i.toString()}
        type="number"
        bind:value={prop.value}
        on:input={prop.onInput(prop.value)}
      />
    {:else if prop.type == "string"}
      <input
        id={i.toString()}
        type="text"
        bind:value={prop.value}
        on:input={prop.onInput(prop.value)}
      />
    {:else if prop.type == "color"}
      <input
        id={i.toString()}
        type="color"
        bind:value={prop.value}
        on:input={prop.onInput(prop.value)}
      />
    {:else if prop.type == "checkbox"}
      <input
        id={i.toString()}
        type="checkbox"
        bind:checked={prop.value}
        on:input={prop.onInput(!prop.value)}
      />
    {:else}
      <div>Invalid input type!</div>
    {/if}
  {/each}
</div>

<style>
  .container {
    padding: 0.5em;
    padding-left: 1em;
    border-radius: 0.5em;
    background: #333;
    color: #fff;
    display: grid;
    grid-template-columns: min-content 2fr;
    column-gap: 0.8em;
    row-gap: 1em;
  }

  label {
    justify-self: right;
  }
  input {
    justify-self: left;
  }
</style>
