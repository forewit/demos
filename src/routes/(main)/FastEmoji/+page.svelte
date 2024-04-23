<script>
  // @ts-nocheck

  import { base } from "$app/paths";

  let letterMasks = {
    a: `¶¶©¶¶
¶¶©©¶
¶©¶©¶
¶©©©©
©¶¶¶©`,
    b: `©©©¶
©¶¶©
©©©¶
©¶¶©
©©©©`,
    c: `¶©©©
©¶¶¶
©¶¶¶
©¶¶¶
¶©©©`,
    d: `©©©¶
©¶¶©
©¶¶©
©¶¶©
©©©¶`,
    e: `©©©
©¶¶
©©©
©¶¶
©©©`,
    f: `©©©
©¶¶
©©©
©¶¶
©¶¶`,
    g: `¶©©©
©¶¶¶
©¶©©
©¶¶©
¶©©©`,
    h: `©¶¶©
©¶¶©
©©©©
©¶¶©
©¶¶©`,
    i: `©©©
¶©¶
¶©¶
¶©¶
©©©`,
    j: `©©©©
¶¶©¶
¶¶©¶
©¶©¶
©©©¶`,
    k: `©¶©©
©©¶¶
©©©¶
©¶©©
©¶¶©`,
    l: `©¶¶
©¶¶
©¶¶
©¶¶
©©©`,
    m: `©¶¶¶©
©©¶©©
©¶©¶©
©¶©¶©
©¶©¶©`,
    n: `©¶¶©
©©¶©
©©©©
©¶©©
©¶¶©`,
    o: `©©©©
©¶¶©
©¶¶©
©¶¶©
©©©©`,
    p: `©©©
©¶©
©©©
©¶¶
©¶¶`,
    q: `¶©©¶¶
©¶¶©¶
©¶¶©¶
©¶©©¶
¶©©©©`,
    r: `©©©
©¶©
©©©
©©¶
©¶©`,
    s: `©©©
©¶¶
©©©
¶¶©
©©©`,
    t: `©©©
¶©¶
¶©¶
¶©¶
¶©¶`,
    u: `©¶¶©
©¶¶©
©¶¶©
©¶¶©
¶©©¶`,
    v: `©¶©
©¶©
©¶©
©¶©
¶©¶`,
    w: `©¶©¶©
©¶©¶©
©¶©¶©
©¶©¶©
¶©¶©¶`,
    x: `©¶¶©
©¶©¶
¶©©¶
¶©¶©
©¶¶©`,
    y: `©¶©
©¶©
©©©
¶©¶
¶©¶`,
    z: `©©©
¶¶©
¶©¶
©¶¶
©©©`,
  };

  let input = "boom";
  let text = ":hmmm:";
  let fill = ":nuclear_bomb:";
  let border = ":sunny:";

  let output = "";
  let message = "";

  async function copyToClipboard() {
    try {
      await navigator.clipboard.writeText(output);
      message = "Copied to clipboard!";
      console.log("Text copied to clipboard");
    } catch (err) {
      console.error("Failed to copy text: ", err);
    }
  }

  function clearValues() {
    input = text = fill = border = message = "";
  }

  function isInputValid() {
    let lettersRegex = /^[A-Za-z]+$/;
    return input.match(lettersRegex) || input == "";
  }
  function updateOutput() {
    // "¶" = fill
    // "©" = text
    // "±" = border

    if (input == "") return "";

    // make sure the input is all letters
    if (!isInputValid()) {
      message = "Input must be only letters A-Z!";
      return "";
    }
    message = "";

    // make the input lowercase and reset
    let lowerInput = input.toLowerCase();

    let newOutput = ``;

    // for each of the 5 lines
    for (let i = 0; i < 5; i++) {
      newOutput += "±¶";

      // for each character
      for (let j = 0; j < lowerInput.length; j++) {
        newOutput += letterMasks[lowerInput.charAt(j)].split("\n")[i];
        newOutput += "¶";
      }
      newOutput += "±\n";
    }

    // add top and bottom fill
    let buffer = "¶".repeat(newOutput.split("\n")[0].length - 2);
    newOutput = "±" + buffer + "±\n" + newOutput + "±" + buffer + "±";

    // add border to top and bottom
    let borderFill = "±".repeat(newOutput.split("\n")[0].length);
    newOutput = borderFill + "\n" + newOutput + "\n" + borderFill;

    // replace "¶" with "fill"
    newOutput = newOutput.replaceAll("¶", fill);

    // replace "©" with "text"
    newOutput = newOutput.replaceAll("©", text);

    // replace "±" with "border"
    newOutput = newOutput.replaceAll("±", border);

    // return the new output
    output = newOutput;
    return newOutput;
  }
</script>

<div class="grid">
  <h3>Text to convert</h3>
  <input name="input" type="text" bind:value={input} />
  <h3>Replacement emojis</h3>
  <label for="text">Text:</label>
  <input name="text" type="text" bind:value={text} />
  <label for="fill">Fill:</label>
  <input name="fill" type="text" bind:value={fill} />
  <label for="border">Border:</label>
  <input name="border" type="text" bind:value={border} />
  <h3>Output</h3>
  {#key [input, text, fill, border]}
    <textarea id="output" name="output" value={updateOutput()}></textarea>
  {/key}

  <div class="buttons">
    <button id="btn-copy" on:click={copyToClipboard}
      ><img src="{base}/images/copy-icon.svg" alt="copy" /></button
    >
    <button id="btn-clear" on:click={clearValues}
      ><img src="{base}/images/clear-icon.svg" alt="clear" /></button
    >
    <p id="message">{message}</p>
  </div>
</div>

<style>
  .grid {
    display: grid;
    grid-auto-flow: row;
    width: 90%;
    max-width: 300px;
    margin: auto;
    margin-top: 30px;
  }
  h3 {
    padding-top: 10px;
  }
  #btn-clear {
    height: 1.8rem;
    aspect-ratio: 1;
    margin: 5px;
  }
  #btn-clear img {
    height: 100%;
    padding: 5px;
  }
  #btn-copy {
    height: 1.8rem;
    aspect-ratio: 1;
    margin: 5px;
  }
  #btn-copy img {
    height: 100%;
    padding: 3px;
  }
  .buttons {
    padding-top: 5px;
    display: flex;
  }
  #message {
    color: lightsalmon;
    font-size: 14px;
    padding: 10px;
  }
  #output {
    height: 200px;
  }
</style>
