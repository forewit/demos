<script lang="ts">
  import { onMount } from "svelte/internal";
  import { page } from "$app/stores";
  import { dev } from "$app/environment";
  import { base } from "$app/paths";


  let pathname = dev ? "" : base;
  export let markdownURL: string;
  export let offsetTop: number = 0;

  let main: HTMLElement;

  function markdownToHTML(markdown: string): string {
    // extract each <style> tags from the markdown (they start with "<style>" and end with "</style>") and merge them into a single style tag string
    const css = markdown.match(/<style>[\s\S]*?<\/style>/g)?.join("") || "";

    return (
      css +
      markdown
        .replace(/\n<style>[\s\S]*?<\/style>/g, "")
        .split("\n")
        .map((line) => {
          /*
        if a line ends with {}, then it includes metadata
        metadata looks like this: {!url #id .class @state}
        each of the following are optional and can be in any order:
        - url: starts with ! and is the url of the image (you can only have one url)
        - id: starts with # and is the id of the heading/image paragraph tag (you can only have one id)
        - class: starts with . and is the class of the heading/image/pargraph tag (you can have multiple classes)
        - state: starts with @ and is the "state" html attribute of the heading/image/paragraph tag (you can have multiple states)
        */
          line = line.trim(); // remove whitespace from the start and end of the line (needed for DEV)

          //regex with lookbehind: /(?<=\{)[^{}]+(?=\})/g
          const metadata =
            line
              .match(/\{([^{}]+)\}/g)
              ?.map((m) => m.replace(/(\{|\})/g, "")) || []; // get all the metadata tags in the line

          let lineID = "",
            lineClasses = [],
            lineStates = [];

          for (let i = 0; i < metadata.length; i++) {
            const data = metadata[i];
            const url = data.match(/!([^ ]+)/)?.[1];
            const id = data.match(/#([^ ]+)/)?.[1];
            const classes =
              data
                .match(/(^\.| \.)([^ ]+)/g)
                ?.map((c) => c.replace(/(^\.| \.)/, "")) || [];
            const states =
              data.match(/@([^ ]+)/g)?.map((s) => s.replace(/@/, "")) || [];

            // if there is a url, replace that metadata tag {} with an image tag
            if (url) {
              line = line.replace(
                `{${data}}`,
                `<img src="${pathname}${url}" alt="${url}"${id ? ` id="${id}"` : ""}${
                  classes.length ? ` class="${classes.join(" ")}"` : ""
                }${states.length ? ` state="${states.join(" ")}"` : ""}/>`
              );
            } else {
              lineID = id;
              lineClasses = classes;
              lineStates = states;

              // remove the metadata tag {} from the line
              line = line.replace(`{${data}}`, "").trim();
            }
          }

          // if line starts with "#", it's a heading
          if (line.startsWith("#")) {
            const level = line.match(/^(#+)/)?.[0].length || 1;
            const text = line.replace(/^(#+\s*)/, "").trim();

            return `<h${level}${lineID ? ` id="${lineID}"` : ""}${
              lineClasses.length > 0 ? ` class="${lineClasses.join(" ")}"` : ""
            }${
              lineStates.length > 0 ? ` state="${lineStates.join(" ")}"` : ""
            }>${text}</h${level}>`;
          }

          // if line starts with "{", its a opening div tag including metadata
          else if (line.startsWith("{")) {
            const text = line.replace(/^{/, "").replace(/}$/, "").trim();

            return `<div${lineID ? ` id="${lineID}"` : ""}${
              lineClasses.length > 0 ? ` class="${lineClasses.join(" ")}"` : ""
            }${
              lineStates.length > 0 ? ` state="${lineStates.join(" ")}"` : ""
            }>${text}${line.endsWith("}") ? "</div>" : ""}`;
          }

          // if line starts with "}", its a closing div tag
          else if (line.startsWith("}")) {
            return "</div>";
          }

          // skip if the line is made up entirely of one image tag
          else if (line.match(/^<img[^>]+>$/)) {
            return line;
          }

          // if line is empty and there is no metadata, its a line break
          else if (line === "" && metadata.length === 0) {
            return "<br>";
          }
          // otherwise, its a paragraph
          else {
            return `<p${lineID ? ` id="${lineID}"` : ""}${
              lineClasses.length > 0 ? ` class="${lineClasses.join(" ")}"` : ""
            }${
              lineStates.length > 0 ? ` state="${lineStates.join(" ")}"` : ""
            }>${line}</p>`;
          }
        })
        .join("")
    );
  }

  // toggle classes on the main element when an element with the state attribute is intersected
  function onIntersection(entries: IntersectionObserverEntry[]): void {
    if (!main) return;
    entries.forEach((entry) => {
      const mainClasses = entry.target.getAttribute("state")?.split(" ") || [];

      mainClasses.forEach((className) => {
        main.classList.toggle(className, entry.isIntersecting);
      });
    });
  }

  // fetch the markdown file from the url
  async function getArticle(url: string): Promise<string> {
    const res = await fetch(url);
    return await res.text();
  }

  onMount(() => {
    // get the markdown file
    getArticle(markdownURL).then((text) => {
      // convert markdown to html
      const html = markdownToHTML(text);

      // set the markdown as the innerHTML of the article
      main.innerHTML = html;

      // create an observer to watch for elements with the trigger attribute
      const observer = new IntersectionObserver(onIntersection, {
        root: main,
        rootMargin: "0px",
        threshold: 0.5,
      });

      // observe all elements with the trigger attribute
      main
        .querySelectorAll("[state]")
        .forEach((element) => observer.observe(element));
    });
  });
</script>

<main bind:this={main} style="height: calc(100% - {offsetTop}px);" />

<style>
  main {
    overflow: auto;
    scroll-behavior: smooth;
    overflow: overlay;
  }
  :global(.centered) {
    text-align: center;
    display: block;
    margin: 0 auto;
  }
  :global(.indent) {
    padding-left: 30px;
  }
  /*
 *  Scrollbar Styles
 */
  main::-webkit-scrollbar-track {
    background-color: transparent;
    margin-block: 0.2em;
  }

  main::-webkit-scrollbar {
    width: 0.5em;
    background-color: transparent;
  }

  main::-webkit-scrollbar-thumb {
    border-radius: 100vw;
    background-color: lightslategrey;
  }
</style>
