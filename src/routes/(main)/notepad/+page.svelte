<script lang="ts">
  /**
   * TODO:
   * - add slash commands
   * - create the theme colors/sizing variables
   * - double click to edit tab title
   * - debounce resizing tabs
   */
  import { afterUpdate, onMount } from "svelte";
  import * as gestures from "$lib/modules/gestures";

  interface Tab {
    id: string;
    title: string;
    text: string;
  }

  let tabs: Tab[] = [];
  let tabsOrder: string[] = [];
  let activeTabID: string | null = null;
  $: activeTab = tabs.find((tab) => tab.id == activeTabID) || {
    text: "NEW TAB",
  };
  let tabsElm: HTMLDivElement;
  let dragElm: HTMLElement;
  let placeholderElm: HTMLElement;
  let offsetX = 0;
  let pointerX = 0;
  let isDragging = false;
  let isTabsElmOverflowed = false;

  const debounce = (func: Function, timeout = 300) => {
    //@ts-ignore
    let timer;
    //@ts-ignore
    return (...args) => {
      //@ts-ignore
      clearTimeout(timer);
      //@ts-ignore
      timer = setTimeout(() => {
        //@ts-ignore
        func.apply(this, args);
      }, timeout);
    };
  };

  const checkTabsOverflow = () => {
    isTabsElmOverflowed = tabsElm.scrollWidth > tabsElm.clientWidth;
  };

  const scrollTabsElm = (direction: number) => {
    tabsElm.scrollBy({
      left: direction,
      behavior: "smooth",
    });
  };

  const newTab = () => {
    let newID = Date.now().toString();
    tabs.push({ id: newID, title: "Untitled", text: "" });
    tabsOrder.push(newID);
    tabs = tabs; // force reactivity
    setActiveTab(newID);

    setTimeout(() => {
      tabsElm.scrollLeft = tabsElm.scrollWidth;
    }, 0);
  };

  const closeTab = (id: string) => {
    let tabIndex = tabsOrder.indexOf(id);

    tabs = tabs.filter((tab) => tab.id != id);
    tabsOrder = tabsOrder.filter((tabID) => tabID != id);

    let fillerElm = document.createElement("div");
    fillerElm.classList.add("tab");
    tabsElm.insertAdjacentElement("beforeend", fillerElm);
    debounce(() => fillerElm.remove(), 2000)();

    if (activeTabID != id) return;
    setActiveTab(tabsOrder[Math.min(tabIndex, tabsOrder.length - 1)] || null);
  };

  const setActiveTab = (id: string | null) => {
    if (activeTabID == id) return;
    if (id == null || !tabsOrder.includes(id)) activeTabID = null;
    activeTabID = id;
  };

  const dragStartHandler = (e: CustomEvent) => {
    isDragging = true;
    dragElm = e.target as HTMLElement;
    offsetX = e.detail.x - dragElm.getBoundingClientRect().x;

    dragElm.insertAdjacentElement("afterend", placeholderElm);
    tabsElm.insertAdjacentElement("afterend", dragElm);

    dragElm.classList.add("dragging");
    dragElm.style.setProperty("--max-width", `${placeholderElm.clientWidth}px`);
    requestAnimationFrame(scrollTabsElmWhileDragging);
  };

  const draggingHandler = (e: CustomEvent) => {
    pointerX = e.detail.x;
    dragElm.style.setProperty("--x", `${pointerX - offsetX}px`);

    let threshold = dragElm.getBoundingClientRect().x + dragElm.offsetWidth / 2;

    for (let i = 0; i < tabsElm.children.length; i++) {
      let tabElm = tabsElm.children[i] as HTMLElement;
      if (tabElm === placeholderElm) continue;

      let tabRect = tabElm.getBoundingClientRect();
      if (threshold < tabRect.left || threshold > tabRect.right) continue;

      if (placeholderElm.getBoundingClientRect().left > tabRect.left) {
        tabElm.insertAdjacentElement("beforebegin", placeholderElm);
      } else {
        tabElm.insertAdjacentElement("afterend", placeholderElm);
      }
      break;
    }
  };

  const dragEndHandler = () => {
    isDragging = false;
    dragElm.classList.remove("dragging");
    placeholderElm.insertAdjacentElement("afterend", dragElm);
    placeholderElm.remove();

    tabsOrder = [];
    for (let i = 0; i < tabsElm.children.length; i++) {
      let tabElm = tabsElm.children[i] as HTMLElement;
      if (!tabElm.classList.contains("tab")) continue;
      tabsOrder.push(tabElm.id);
    }

    resetGestures();
  };

  const scrollTabsElmWhileDragging = () => {
    if (!isDragging) return;
    if (pointerX < tabsElm.offsetLeft) tabsElm.scrollLeft -= 2;
    if (pointerX > tabsElm.offsetLeft + tabsElm.clientWidth)
      tabsElm.scrollLeft += 2;
    requestAnimationFrame(scrollTabsElmWhileDragging);
  };

  const resetGestures = () => {
    gestures.disable();
    for (let i = 0; i < tabsElm.children.length; i++) {
      let tab = tabsElm.children[i] as HTMLElement;
      if (!tab.classList.contains("tab")) continue;
      gestures.enable(tab);
      tab.addEventListener("gesture", handleTabGestures as EventListener);
    }
  };

  const handleTabGestures = (e: CustomEvent) => {
    switch (e.detail.name) {
      case "left-click-drag-start":
      case "longpress-drag-start":
        dragStartHandler(e);
        break;
      case "left-click-dragging":
      case "longpress-dragging":
        draggingHandler(e);
        break;
      case "left-click-drag-end":
      case "longpress-drag-end":
        dragEndHandler();
        break;
      case "left-click":
      case "tap":
        setActiveTab((e.target as HTMLElement).id);
        break;
    }
  };

  onMount(() => {
    placeholderElm.remove();
  });

  afterUpdate(() => {
    checkTabsOverflow();
    resetGestures();
  });
</script>

<svelte:window on:resize={checkTabsOverflow} />

<div class="main-grid">
  <div class="tab-bar" class:minimal={!isTabsElmOverflowed}>
    <!-- svelte-ignore a11y-click-events-have-key-events -->
    <div
      id="back"
      class="tab-bar-btn"
      class:hide={!isTabsElmOverflowed}
      on:click={() => scrollTabsElm(-80)}
    >
      <svg
        viewBox="-3 -3 22 22"
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        transform="rotate(270)"
      >
        <path
          fill="currentColor"
          d="M8 1.25a2.101 2.101 0 00-1.785.996l.64.392-.642-.388-5.675 9.373-.006.01a2.065 2.065 0 00.751 2.832c.314.183.67.281 1.034.285h11.366a2.101 2.101 0 001.791-1.045 2.064 2.064 0 00-.006-2.072L9.788 2.25l-.003-.004A2.084 2.084 0 008 1.25z"
        />
      </svg>
    </div>
    <div id="tabs" bind:this={tabsElm}>
      {#each tabs as tab, i}
        <div id={tab.id} class="tab" class:active={tab.id === activeTabID}>
          <div class="tab-divider"></div>
          <p>{tab.title}</p>
          <!-- svelte-ignore a11y-click-events-have-key-events -->
          <div
            id="close-tab"
            class="tab-bar-btn"
            on:click={() => closeTab(tab.id)}
          >
            <svg
              fill="currentColor"
              version="1.1"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 42 42"
            >
              <path
                fill-rule="evenodd"
                d="M21.002,26.588l10.357,10.604c1.039,1.072,1.715,1.083,2.773,0l2.078-2.128 c1.018-1.042,1.087-1.726,0-2.839L25.245,21L36.211,9.775c1.027-1.055,1.047-1.767,0-2.84l-2.078-2.127 c-1.078-1.104-1.744-1.053-2.773,0L21.002,15.412L10.645,4.809c-1.029-1.053-1.695-1.104-2.773,0L5.794,6.936 c-1.048,1.073-1.029,1.785,0,2.84L16.759,21L5.794,32.225c-1.087,1.113-1.029,1.797,0,2.839l2.077,2.128 c1.049,1.083,1.725,1.072,2.773,0L21.002,26.588z"
              />
            </svg>
          </div>
        </div>
      {/each}
      <div id="placeholder" bind:this={placeholderElm} class="tab"></div>
    </div>
    <!-- svelte-ignore a11y-click-events-have-key-events -->
    <div
      id="forward"
      class="tab-bar-btn"
      class:hide={!isTabsElmOverflowed}
      on:click={() => {
        scrollTabsElm(80);
      }}
    >
      <svg
        viewBox="-3 -3 22 22"
        xmlns="http://www.w3.org/2000/svg"
        transform="rotate(90)"
      >
        <path
          fill="currentColor"
          d="M8 1.25a2.101 2.101 0 00-1.785.996l.64.392-.642-.388-5.675 9.373-.006.01a2.065 2.065 0 00.751 2.832c.314.183.67.281 1.034.285h11.366a2.101 2.101 0 001.791-1.045 2.064 2.064 0 00-.006-2.072L9.788 2.25l-.003-.004A2.084 2.084 0 008 1.25z"
        />
      </svg>
    </div>
    <!-- svelte-ignore a11y-click-events-have-key-events -->
    <div id="new-tab" class="tab-bar-btn" on:click={newTab}>
      <svg
        fill="currentColor"
        version="1.1"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 42 42"
        xml:space="preserve"
      >
        <path
          d="M39.5,22.5v-3c0-1.48-0.43-2-2-2h-13v-13c0-1.48-0.49-2-2-2h-3c-1.55,0-2,0.52-2,2v13h-14c-1.48,0-2,0.49-2,2v3
                c0,1.55,0.52,2,2,2h14v14c0,1.51,0.48,2,2,2h3c1.48,0,2-0.43,2-2v-14h13C39.01,24.5,39.5,24.02,39.5,22.5z"
        />
      </svg>
    </div>
  </div>

  <div class="toolbar"></div>
  <div class="editor">
    <textarea
      bind:value={activeTab.text}
      spellcheck="false"
      name="editor"
      id="text"
    ></textarea>
  </div>
  <div class="status-bar"></div>
</div>

<style>
  .main-grid {
    --text-color: #fff;
    --text-grey-color: #cfcfcf;
    --background-color: #272727;
    --toolbar-color: #1a2220;
    --highlight-color: #9f9f9f; /* scrollbar, badges, etc.*/
    --tab-hover-color: #0c1919;
    --dark-color: #000e0f;
    --editor-font-family: "Consolas", monospace;
    --default-font-family: "Segoe UI", sans-serif;
    --slight-transparent: rgba(120, 120, 120, 0.1);
    --tab-radius: 8px;

    height: 100%;
    display: grid;
    grid-template-rows: 2.5rem 2rem 1fr 2rem;
  }

  .tab-bar {
    background: var(--dark-color);
    position: relative;
    display: grid;
    grid-auto-flow: column;
    grid-template-columns: min-content auto min-content 1fr;
  }
  .tab-bar.minimal {
    grid-template-columns: auto 1fr;
  }

  #tabs {
    overflow-x: scroll;
    max-width: max-content;
    display: flex;
    column-gap: 2px;
    align-items: end;

    padding-inline: var(--tab-radius);
  }
  .tab-bar.minimal #tabs {
    padding-left: 20px;
  }
  #tabs::-webkit-scrollbar {
    display: none;
  }

  .tab-divider {
    position: absolute;
    bottom: 7px;
    left: -2px;
    width: 2px;
    height: 14px;
    border-radius: 1px;
    background: var(--toolbar-color);
  }
  .tab:first-child .tab-divider,
  .tab.active .tab-divider,
  .tab.active + .tab .tab-divider,
  .tab:hover .tab-divider,
  .tab:hover + .tab .tab-divider,
  .tab-bar > .tab .tab-divider,
  #placeholder + .tab .tab-divider {
    display: none;
  }

  .tab {
    color: var(--text-grey-color);
    font-family: var(--default-font-family);

    min-width: 80px;
    width: 140px;
    height: 30px;

    display: grid;
    grid-template-columns: 1fr auto;

    border-top-left-radius: var(--tab-radius);
    border-top-right-radius: var(--tab-radius);

    position: relative;
  }
  .tab:hover {
    background-color: var(--tab-hover-color);
  }
  .tab.active {
    background-color: var(--toolbar-color);
  }
  .tab:not(:hover, .active, .dragging) .tab-bar-btn {
    display: none;
  }
  .tab p {
    font-family: var(--default-font-family);
    font-size: 12px;
    margin: auto 0 7px 9px;

    pointer-events: none;
    user-select: none;
    overflow: hidden;
    white-space: nowrap;
  }
  .tab.active:before {
    content: "";
    position: absolute;
    bottom: 0;
    width: var(--tab-radius);
    height: calc(2 * var(--tab-radius));
    left: calc(var(--tab-radius) * -1);
    border-bottom-right-radius: 100vw;
    background-color: transparent;
    box-shadow: 0 var(--tab-radius) 0 0 var(--toolbar-color);
    z-index: 1;
  }
  .tab.active:after {
    content: "";
    position: absolute;
    bottom: 0;
    width: var(--tab-radius);
    height: calc(2 * var(--tab-radius));
    right: calc(var(--tab-radius) * -1);
    border-bottom-left-radius: 100vw;
    background-color: transparent;
    box-shadow: 0 var(--tab-radius) 0 0 var(--toolbar-color);
    z-index: 1;
  }

  .tab:global(.dragging) {
    position: absolute;
    left: var(--x);
    max-width: var(--max-width);
    bottom: 0;
    z-index: 2;
  }
  .tab:global(.dragging):not(.active) {
    background-color: var(--tab-hover-color);
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
    font-family: var(--editor-font-family);
    font-size: 12px;
    color: var(--text-color);
    background: var(--background-color);

    padding: 1rem;
    border: none;
    outline: none;
    width: calc(100% - 1rem);
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
    background: var(--toolbar-color);
  }

  .tab-bar-btn {
    width: 28px;
    height: 22px;
    margin: 4px;
    border-radius: 4px;

    margin-top: auto;
    display: flex;
    justify-content: center;
  }
  .tab-bar-btn:hover {
    background-color: var(--slight-transparent);
  }
  .tab-bar-btn:active {
    opacity: 0.8;
  }
  .tab-bar-btn svg {
    width: 10px;
    color: var(--highlight-color);
  }

  .hide {
    display: none !important;
  }
</style>
