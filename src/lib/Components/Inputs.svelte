<script lang="ts">
  type Prop = {
    title: string;
  } & (
    | { type: "string"; onInput: (value?: string) => any; value?: string }
    | { type: "color"; onInput: (value?: string) => any; value?: string }
    | { type: "number"; onInput: (value?: number) => any; value?: number }
    | { type: "checkbox"; onInput: (value?: boolean) => any; value?: boolean }
    | { type: "button"; onClick: () => any; label?: string }
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
    {:else if prop.type == "button"}
      <button id={i.toString()} on:click={prop.onClick()}>{prop.label}</button>
    {:else}
      <div>Invalid input type!</div>
    {/if}
  {/each}
</div>

<style>
  .container {
    padding: 1.5em;
    border-radius: 0.5em;
    display: grid;
    grid-template-columns: min-content 2fr;
    column-gap: 0.8em;
    row-gap: 1em;

    background: rgba(255, 255, 255, 0.5);
    box-shadow: 0 8px 32px 0 rgba(31, 38, 135, 0.37);
    backdrop-filter: blur(4px);
    border: 1px solid rgba(255, 255, 255, 0.18);
  }

  label {
    justify-self: right;
  }
  input {
    justify-self: left;
  }
  input[type="color"] {
    
  }
  button {
    justify-self: left;
    padding: 0px 10px;
  }

</style>
