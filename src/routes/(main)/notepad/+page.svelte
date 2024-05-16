<script>
  let tabs = [
    { title: "tab 1", text: "" },
    { title: "tab 2", text: "" },
    { title: "tab 3", text: "" },
  ];
</script>

<div class="main-grid">
  <div class="top-grid">
    <div class="tabs-container">
      <div class="tabs">
        {#each tabs as tab}
          <div class="tab">{tab.title}</div>
        {/each}
      </div>
    </div>
    <div class="controls-container"></div>
  </div>
  <div class="toolbar"></div>
  <div class="editor">
    <textarea name="editor" id="text"></textarea>
  </div>
  <div class="status-bar"></div>
</div>

<style>
  .main-grid {
    --text-color: #fff;
    --background-color: #272727;
    --toolbar-color: #1a2220;
    --highlight-color: #9f9f9f; /* scrollbar, badges, etc.*/
    --dark-color: #000e0f;
    --font-family: "Consolas", monospace;    

    height: 100%;
    display: grid;
    grid-template-rows: 2rem 2rem 1fr 2rem;
  }

  .top-grid {
    background: var(--dark-color);
    display: grid;
    grid-template-columns: 1fr 4rem;
  }
  .controls-container {
    border: 1px solid green;
    
}
  .tabs-container {
    border: 1px solid red;
    overflow-x: scroll;
  }
  .tabs {
    min-width: 200px;
    display: flex;

  }
  .tab {
    color: var(--text-color);
    max-width: 100px;
    flex-grow: 1;
    padding-inline: 10px;
    margin: 5px;
    background-color: var(--toolbar-color);
  }
  .toolbar {
    background: var(--toolbar-color);
  }
  .editor {
    display: grid;
    grid-template-columns: 1fr 5px; /*spacing for scrollbar*/
    background-color: var(--background-color);
  }
  #text {
    resize: none;
    font-family: var(--font-family);
    color: var(--text-color);
    background: var(--background-color);

    padding: 1rem;
    border: none;
    outline: none;
    width: calc(100%-1rem);
    height: 100%;
    width: 100%;
  }
  #text::-webkit-scrollbar {
    width: 5px;
    color: white;
    /**add margin top and bottom*/
    margin-inline: 0.5rem;
  }
  #text::-webkit-scrollbar-thumb {
    background-color: var(--highlight-color);
    border-radius: 8px;
  }
  #text::-webkit-scrollbar-button:vertical:decrement {
    background-size: contain;
    background-repeat: no-repeat;
    background-position: center center;
    background-image: url('data:image/svg+xml,<svg width="16px" height="16px" viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg" fill="none"><path fill="%239f9f9f" d="M8 1.25a2.101 2.101 0 00-1.785.996l.64.392-.642-.388-5.675 9.373-.006.01a2.065 2.065 0 00.751 2.832c.314.183.67.281 1.034.285h11.366a2.101 2.101 0 001.791-1.045 2.064 2.064 0 00-.006-2.072L9.788 2.25l-.003-.004A2.084 2.084 0 008 1.25z"/></svg>');
  }
  #text::-webkit-scrollbar-button:vertical:increment {
    background-size: contain;
    background-repeat: no-repeat;
    background-position: center center;
    background-image: url('data:image/svg+xml,<svg width="16px" height="16px" viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg" fill="none" transform="rotate(180)"><path fill="%23f9f9f9" d="M8 1.25a2.101 2.101 0 00-1.785.996l.64.392-.642-.388-5.675 9.373-.006.01a2.065 2.065 0 00.751 2.832c.314.183.67.281 1.034.285h11.366a2.101 2.101 0 001.791-1.045 2.064 2.064 0 00-.006-2.072L9.788 2.25l-.003-.004A2.084 2.084 0 008 1.25z"/></svg>');
  }

  .status-bar {
    /* theme */
    background: var(--toolbar-color);
  }
</style>
