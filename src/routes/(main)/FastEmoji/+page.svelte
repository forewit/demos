<script>
// @ts-nocheck

  import { base } from "$app/paths";

  let letterMasks = {
    a: `00100
00110
01010
01111
10001`,
    b: `1110
1001
1110
1001
1111`,
    c: `0111
1000
1000
1000
0111`,
    d: `1110
1001
1001
1001
1110`,
    e: `111
100
111
100
111`,
    f: `111
100
111
100
100`,
    g: `0111
1000
1011
1001
0111`,
    h: `1001
1001
1111
1001
1001`,
    i: `111
010
010
010
111`,
    j: `1111
0010
0010
1010
1110`,
    k: `1011
1100
1110
1011
1001`,
    l: `100
100
100
100
111`,
    m: `10001
11011
10101
10101
10101`,
    n: `1001
1101
1111
1011
1001`,
    o: `1111
1001
1001
1001
1111`,
    p: `111
101
111
100
100`,
    q: `01100
10010
10010
10110
01111`,
    r: `111
101
111
110
101`,
    s: `111
100
111
001
111`,
    t: `111
010
010
010
010`,
    u: `1001
1001
1001
1001
0110`,
    v: `101
101
101
101
010`,
    w: `10101
10101
10101
10101
01010`,
    x: `1001
1010
0110
0101
1001`,
    y: `101
101
111
010
010`,
    z: `111
001
010
100
111`,
  };

  let input = "";
  let text = "";
  let fill = "";
  let border = "";
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
    // make sure the input is all letters
    if (!isInputValid()) {
      message = "Input must be only letters A-Z";
      return "";
    }
    message = "";

    // make the input lowercase and reset
    let lowerInput = input.toLowerCase();

    let newOutput = ``;

    // for each of the 5 lines
    for (let i=0; i<5; i++) {
        newOutput +="2";

        // for each character
        for (let j=0; j<lowerInput.length; j++) {
            newOutput += letterMasks[lowerInput.charAt(j)].split("\n")[i];
            newOutput += "2";
        }
        newOutput += "\n"
    }

    // return the new output
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
