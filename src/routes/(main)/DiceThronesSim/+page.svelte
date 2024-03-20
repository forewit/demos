<script>
  // @ts-nocheck

  import Fireworks from "$lib/Components/Fireworks.svelte";

  let fireworks;

  function launch() {
    fireworks.launch(
      3,
      {
        color: "lightgreen",
        left: 50,
        top: 50,
        initialLeft: 45,
        initialTop: 100,
        size: 30,
      },
      {
        color: "red",
        left: 50,
        top: 50,
        initialLeft: 50,
        initialTop: 100,
        delay: 0.25,
      },
      {
        color: "yellow",
        left: 50,
        top: 40,
        initialLeft: 55,
        initialTop: 100,
        delay: 0.5,
        size: 60,
      }
    );
  }

  // Initial message to be displayed
  let message = "Simulation results here...";

  // Array to hold the characters
  let characters = [];

  // Add three characters to start with
  addCharacterForm();
  addCharacterForm();
  addCharacterForm();

  // Number of iterations for the simulation
  let iterations = 100000;

  // Function to add a character with a random name
  async function addCharacterForm() {
    // Fetch a random user from the API
    let response = await fetch("https://randomuser.me/api/");
    let data = await response.json();
    let randomName = data.results[0].name.first;

    // Add the new character to the array
    characters = [
      ...characters,
      {
        id: randomName,
        hp: 50,
        attack: 9,
        heal: 0,
        defense_attack: 1,
        wins: 0,
      },
    ];
  }

  // Function to remove a character
  function removeCharacterForm() {
    if (characters.length > 1) {
      characters = characters.slice(0, -1);
    }
  }

  // Function to start the simulation
  async function submitForm() {
    // Check if all character IDs are unique and not blank
    let ids = characters.map((character) => character.id);
    let uniqueIds = [...new Set(ids)];
    if (uniqueIds.length !== characters.length || ids.includes("")) {
      alert("All character names must be unique and not blank.");
      return;
    }

    // Start the simulation
    message = "Simulating...";
    setTimeout(async () => {
      message = await simulate(characters, iterations, {
        log_turns: false,
        log_games: false,
      });
      launch();
    }, 0);
  }

  // Function to simulate the game
  async function simulate(players, iterations, options) {
    options = options || {};

    // reset players wins to 0
    players.forEach((player) => (player.wins = 0));

    console.log(
      "%cStarting simulation...",
      "color:green; font-size:16px; font-weight: bold;"
    );
    // play rounds of the game
    for (let i = 0; i < iterations; i++) {
      // copy the player data to use in this iteration
      let iteration_players = JSON.parse(JSON.stringify(players));

      // chose a random starting player
      let current_player_index = Math.floor(Math.random() * players.length);

      // log the start of the game
      let game_log = `%cGame ${i + 1}... ${
        players[current_player_index].id
      } starts, `;

      // play a game
      while (true) {
        // end the round if everyone is dead

        if (iteration_players.every((player) => player.hp <= 0)) {
          // log a tie
          game_log += `Tie!`;
          break;
        }

        // end the round if one player is alive and add a win

        if (iteration_players.filter((player) => player.hp > 0).length === 1) {
          players[iteration_players.findIndex((player) => player.hp > 0)]
            .wins++;
          // log a win
          game_log += `${
            iteration_players[
              iteration_players.findIndex((player) => player.hp > 0)
            ].id
          } wins!`;
          break;
        }

        // otherwise, play a turn
        // make sure current player is alive

        while (iteration_players[current_player_index].hp <= 0) {
          current_player_index =
            (current_player_index + 1) % iteration_players.length;
        }

        // get targetable enemies (there will always at least be one)
        let targetable_enemies = iteration_players.filter(
          (player) =>
            player.hp > 0 &&
            player.id !== iteration_players[current_player_index].id
        );
        let target_id =
          targetable_enemies[
            Math.floor(Math.random() * targetable_enemies.length)
          ].id;
        let target_index = iteration_players.findIndex(
          (player) => player.id === target_id
        );

        // log the player hp changes
        let player_hp_change = 0;
        let target_hp_change = 0;

        // if you can heal and there are more than 1 enemies alive, then heal
        if (
          iteration_players[current_player_index].heal > 0 &&
          targetable_enemies.length > 1
        ) {
          iteration_players[current_player_index].hp +=
            iteration_players[current_player_index].heal;

          //update hp changes
          player_hp_change += iteration_players[current_player_index].heal;
        }
        // otherwise, attack the target and take damage from the target's "defense_attack"
        else {
          iteration_players[target_index].hp -=
            iteration_players[current_player_index].attack;
          iteration_players[current_player_index].hp -=
            iteration_players[target_index].defense_attack;

          //update hp changes
          player_hp_change -= iteration_players[target_index].defense_attack;
          target_hp_change -= iteration_players[current_player_index].attack;
        }

        // log a summary of the turn. example: attacker ❤️[current health] ([health change]) ⚔️ slayer ❤️[current health] ([health change])
        if (options.log_turns) {
          console.log(
            `${iteration_players[current_player_index].id} ${iteration_players[current_player_index].hp}(${player_hp_change}) ⚔️ ${target_id} ${iteration_players[target_index].hp}(${target_hp_change})`
          );
        }

        // next player
        current_player_index =
          (current_player_index + 1) % iteration_players.length;
      }
      // log game
      if (options.log_games) console.log(game_log, "font-weight: bold;");
    }

    // log the simulation results
    let winner_id = players.reduce((a, b) => (a.wins > b.wins ? a : b)).id;
    console.log(
      "%cResults...",
      "color:green; font-size:16px; font-weight: bold;"
    );
    console.log(
      players
        .map(
          (player) =>
            `${player.id === winner_id ? "🏆" : ""}${player.id}:${player.wins}`
        )
        .join(" | ")
    );

    return players
      .map(
        (player) =>
          `${player.id === winner_id ? "🏆" : ""}${player.id}: ${player.wins}`
      )
      .join(" \n ");
  }
</script>

<div id="mainContainer">
  <Fireworks bind:this={fireworks} />

  <div id="formContainer">
    {#each characters as character, i}
      <div class="characterForm">
        <div class="inputWrapper" data-emoji="👤">
          <input
            bind:value={character.id}
            type="text"
            class="name"
            name="name"
          />
        </div>
        <div class="inputWrapper" data-emoji="❤️‍🩹">
          <input bind:value={character.hp} type="number" class="hp" name="hp" />
        </div>
        <div class="inputWrapper" data-emoji="⚔️">
          <input
            bind:value={character.attack}
            type="number"
            class="attack"
            name="attack"
          />
        </div>
        <div class="inputWrapper" data-emoji="💖">
          <input
            bind:value={character.heal}
            type="number"
            class="heal"
            name="heal"
          />
        </div>
        <div class="inputWrapper" data-emoji="🛡️">
          <input
            bind:value={character.defense_attack}
            type="number"
            class="defense"
            name="defense"
          />
        </div>
      </div>
    {/each}
  </div>
  <div id="overlayContainer">
    <div id="buttonContainer">
      <button on:click={removeCharacterForm}>-</button>
      <button on:click={addCharacterForm}>+</button>
      <div style="width: 20px"></div>
      <button on:click={submitForm}>▶</button>
      <input
        bind:value={iterations}
        id="iterations"
        type="number"
        name="iterations"
      />
    </div>
    <pre id="results">{message}</pre>
  </div>
</div>

<style>
  #formContainer {
    width: 80%;
    max-width: 600px; /* Adjust this value as needed */
    background: rgba(255, 255, 255, 0.1);
    border-radius: 10px;
    box-shadow: 0 8px 32px 0 rgba(31, 38, 135, 0.37);
    backdrop-filter: blur(4px);
    border: 1px solid rgba(255, 255, 255, 0.18);
    padding: 10px;
  }

  #formContainer input {
    padding: 10px;
    border-radius: 5px;
    border: 1px solid rgba(255, 255, 255, 0.18);
    width: 100%;
    background-color: rgba(255, 255, 255, 0.2);
    color: #ddd;
  }
  input[type="number"] {
    -moz-appearance: textfield;
  }
  input::-webkit-outer-spin-button,
  input::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }
  .characterForm {
    display: flex;
    column-gap: 6px;
    padding: 3px;
  }
  .inputWrapper {
    position: relative;
  }
  .inputWrapper::after {
    pointer-events: none;
    content: attr(data-emoji);
    position: absolute;
    right: 12px;
    top: 50%;
    transform: translateY(-50%);
    opacity: 0.5;
  }
  #iterations {
    width: 100px;
    border-radius: 5px;
    padding-left: 8px;
    border: 1px solid rgba(255, 255, 255, 0.18);
    background-color: rgba(255, 255, 255, 0.2);
    color: #ddd;
  }
  #overlayContainer {
    background: rgba(255, 255, 255, 0.1);
    border-radius: 10px;
    box-shadow: 0 8px 32px 0 rgba(31, 38, 135, 0.37);
    backdrop-filter: blur(4px);
    border: 1px solid rgba(255, 255, 255, 0.18);
    padding: 13px;
    position: absolute;
    top: 20%;
    display: flex;
    flex-direction: column;
    row-gap: 15px;
  }
  #buttonContainer {
    display: flex;
    column-gap: 5px;
    flex-wrap: wrap;
  }
  button {
    background: rgba(255, 255, 255, 0.1);
    border: 1px solid rgba(255, 255, 255, 0.18);
    border-radius: 5px;
    padding: 3px 7px;
    color: #ddd;
  }
  button:hover {
    background: rgba(255, 255, 255, 0.3);
  }
  button:active {
    background: rgba(255, 255, 255, 0.5);
  }
  #results {
    text-align: center;
    flex-basis: 100%;
  }

  #mainContainer {
    background: #234; /* Change this to your preferred color */
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    height: 100%;
    width: 100%;
    margin: 0;
    font-family: Arial, sans-serif;
    color: #ddd;
  }
</style>
