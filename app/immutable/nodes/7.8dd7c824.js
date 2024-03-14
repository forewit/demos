import{S as o,i as p,s,M as d,e as i,N as c,b as h,I as a,h as m}from"../chunks/index.b8f8e0ce.js";const u=`<!DOCTYPE html>\r
<html>\r
  <head>\r
    <script>  \r
      var characters = [];\r
  \r
      function addCharacterForm() {\r
        var formContainer = document.getElementById("formContainer");\r
        var newForm = document\r
          .querySelector(".characterForm")\r
          .cloneNode(true);\r
        formContainer.appendChild(newForm);\r
      }\r
  \r
      function removeCharacterForm() {\r
        var formContainer = document.getElementById("formContainer");\r
        var formCount = formContainer.childElementCount;\r
        if (formCount > 1) {\r
          formContainer.removeChild(formContainer.lastChild);\r
        }\r
      }\r
  \r
      function submitForm() {\r
        var forms = document.querySelectorAll(".characterForm");\r
        characters = Array.from(forms).map((form) => {\r
          return {\r
            id: form.querySelector(".name").value,\r
            hp: Number(form.querySelector(".hp").value),\r
            attack: Number(form.querySelector(".attack").value),\r
            heal: Number(form.querySelector(".heal").value),\r
            defense_attack: Number(form.querySelector(".defense").value),\r
            wins: 0,\r
          };\r
        });\r
        document.getElementById("results").textContent = simulate(\r
          characters,\r
          document.getElementById("iterations").value,\r
          { log_turns: false, log_games: false }\r
        );\r
      }\r
  \r
      function simulate(players, iterations, options) {\r
        options = options || {};\r
  \r
        console.log(players, iterations, options);\r
  \r
        console.log(\r
          "%cStarting simulation...",\r
          "color:green; font-size:16px; font-weight: bold;"\r
        );\r
        // play rounds of the game\r
        for (let i = 0; i < iterations; i++) {\r
          // copy the player data to use in this iteration\r
          let iteration_players = JSON.parse(JSON.stringify(players));\r
  \r
          // chose a random starting player\r
          let current_player_index = Math.floor(\r
            Math.random() * players.length\r
          );\r
  \r
          // log the start of the game\r
          let game_log = \`%cGame \${i + 1}... \${\r
            players[current_player_index].id\r
          } starts, \`;\r
  \r
          // play a game\r
          while (true) {\r
            // end the round if everyone is dead\r
            if (iteration_players.every((player) => player.hp <= 0)) {\r
              // log a tie\r
              game_log += \`Tie!\`;\r
              break;\r
            }\r
  \r
            // end the round if one player is alive and add a win\r
            if (\r
              iteration_players.filter((player) => player.hp > 0).length === 1\r
            ) {\r
              players[iteration_players.findIndex((player) => player.hp > 0)]\r
                .wins++;\r
              // log a win\r
              game_log += \`\${\r
                iteration_players[\r
                  iteration_players.findIndex((player) => player.hp > 0)\r
                ].id\r
              } wins!\`;\r
              break;\r
            }\r
  \r
            // otherwise, play a turn\r
            // make sure current player is alive\r
  \r
            while (iteration_players[current_player_index].hp <= 0) {\r
              current_player_index =\r
                (current_player_index + 1) % iteration_players.length;\r
            }\r
  \r
            // get targetable enemies (there will always at least be one)\r
            let targetable_enemies = iteration_players.filter(\r
              (player) =>\r
                player.hp > 0 &&\r
                player.id !== iteration_players[current_player_index].id\r
            );\r
            let target_id =\r
              targetable_enemies[\r
                Math.floor(Math.random() * targetable_enemies.length)\r
              ].id;\r
            let target_index = iteration_players.findIndex(\r
              (player) => player.id === target_id\r
            );\r
  \r
            // log the player hp changes\r
            let player_hp_change = 0;\r
            let target_hp_change = 0;\r
  \r
            // if you can heal and there are more than 1 enemies alive, then heal\r
            if (\r
              iteration_players[current_player_index].heal > 0 &&\r
              targetable_enemies.length > 1\r
            ) {\r
              iteration_players[current_player_index].hp +=\r
                iteration_players[current_player_index].heal;\r
  \r
              //update hp changes\r
              player_hp_change +=\r
                iteration_players[current_player_index].heal;\r
            }\r
            // otherwise, attack the target and take damage from the target's "defense_attack"\r
            else {\r
              iteration_players[target_index].hp -=\r
                iteration_players[current_player_index].attack;\r
              iteration_players[current_player_index].hp -=\r
                iteration_players[target_index].defense_attack;\r
  \r
              //update hp changes\r
              player_hp_change -=\r
                iteration_players[target_index].defense_attack;\r
              target_hp_change -=\r
                iteration_players[current_player_index].attack;\r
            }\r
  \r
            // log a summary of the turn. example: attacker ❤️[current health] ([health change]) ⚔️ slayer ❤️[current health] ([health change])\r
            if (options.log_turns) {\r
              console.log(\r
                \`\${iteration_players[current_player_index].id} \${iteration_players[current_player_index].hp}(\${player_hp_change}) ⚔️ \${target_id} \${iteration_players[target_index].hp}(\${target_hp_change})\`\r
              );\r
            }\r
  \r
            // next player\r
            current_player_index =\r
              (current_player_index + 1) % iteration_players.length;\r
          }\r
          // log game\r
          if (options.log_games) console.log(game_log, "font-weight: bold;");\r
        }\r
  \r
        // log the simulation results\r
        let winner_id = players.reduce((a, b) =>\r
          a.wins > b.wins ? a : b\r
        ).id;\r
        console.log(\r
          "%cResults...",\r
          "color:green; font-size:16px; font-weight: bold;"\r
        );\r
        console.log(\r
          players\r
            .map(\r
              (player) =>\r
                \`\${player.id === winner_id ? "🏆" : ""}\${player.id}:\${\r
                  player.wins\r
                }\`\r
            )\r
            .join(" | ")\r
        );\r
  \r
        return players\r
          .map(\r
            (player) =>\r
              \`\${player.id === winner_id ? "🏆" : ""}\${player.id}: \${\r
                player.wins\r
              }\`\r
          )\r
          .join(" | ");\r
      }\r
    <\/script>\r
    <title>Game Character Form</title>\r
    <style>\r
      #mainContainer {\r
        background-color: #f0f0f0; /* Change this to your preferred color */\r
        display: flex;\r
        flex-direction: column;\r
        justify-content: center;\r
        align-items: center;\r
        height: 100vh;\r
        margin: 0;\r
        font-family: Arial, sans-serif;\r
        color: black;\r
        overflow: hidden;\r
      }\r
\r
      #formContainer {\r
        width: 80%;\r
        max-width: 600px; /* Adjust this value as needed */\r
        background: rgba(255, 255, 255, 0.1);\r
        border-radius: 10px;\r
        box-shadow: 0 8px 32px 0 rgba(31, 38, 135, 0.37);\r
        backdrop-filter: blur(4px);\r
        border: 1px solid rgba(255, 255, 255, 0.18);\r
        padding: 10px;\r
      }\r
\r
      #formContainer input {\r
        padding: 10px;\r
        border-radius: 5px;\r
        border: 1px solid #ccc;\r
        width: 100%;\r
      }\r
      input::-webkit-outer-spin-button,\r
      input::-webkit-inner-spin-button {\r
        -webkit-appearance: none;\r
        margin: 0;\r
      }\r
      .characterForm {\r
        display: flex;\r
        column-gap: 6px;\r
        padding: 3px;\r
      }\r
      .inputWrapper {\r
        position: relative;\r
      }\r
      .inputWrapper::after {\r
        pointer-events: none;\r
        content: attr(data-emoji);\r
        position: absolute;\r
        right: 12px;\r
        top: 50%;\r
        transform: translateY(-50%);\r
        opacity: 0.5;\r
      }\r
      #buttonContainer {\r
        position: absolute;\r
        top: 20%;\r
        margin-top: 30px;\r
        background: rgba(255, 255, 255, 0.1);\r
        border-radius: 10px;\r
        box-shadow: 0 8px 32px 0 rgba(31, 38, 135, 0.37);\r
        backdrop-filter: blur(4px);\r
        border: 1px solid rgba(255, 255, 255, 0.18);\r
        padding: 10px;\r
        display: flex;\r
        column-gap: 3px;\r
        padding: 13px;\r
      }\r
      #results {\r
        position: absolute;\r
        padding: 10px;\r
        top: 15%;\r
        color: white;\r
      }\r
      #iterations {\r
        width: 100px;\r
      }\r
      .area {\r
        position: absolute;\r
        background: #4e54c8;\r
        background: -webkit-linear-gradient(to left, #8f94fb, #4e54c8);\r
        width: 100%;\r
        height: 100vh;\r
      }\r
\r
      .circles {\r
        position: absolute;\r
        top: 0;\r
        left: 0;\r
        width: 100%;\r
        height: 100%;\r
        overflow: hidden;\r
      }\r
\r
      .circles li {\r
        position: absolute;\r
        display: block;\r
        list-style: none;\r
        width: 20px;\r
        height: 20px;\r
        background: rgba(255, 255, 255, 0.2);\r
        animation: animate 25s linear infinite;\r
        bottom: -150px;\r
      }\r
\r
      .circles li:nth-child(1) {\r
        left: 25%;\r
        width: 80px;\r
        height: 80px;\r
        animation-delay: 0s;\r
      }\r
\r
      .circles li:nth-child(2) {\r
        left: 10%;\r
        width: 20px;\r
        height: 20px;\r
        animation-delay: 2s;\r
        animation-duration: 12s;\r
      }\r
\r
      .circles li:nth-child(3) {\r
        left: 70%;\r
        width: 20px;\r
        height: 20px;\r
        animation-delay: 4s;\r
      }\r
\r
      .circles li:nth-child(4) {\r
        left: 40%;\r
        width: 60px;\r
        height: 60px;\r
        animation-delay: 0s;\r
        animation-duration: 18s;\r
      }\r
\r
      .circles li:nth-child(5) {\r
        left: 65%;\r
        width: 20px;\r
        height: 20px;\r
        animation-delay: 0s;\r
      }\r
\r
      .circles li:nth-child(6) {\r
        left: 75%;\r
        width: 110px;\r
        height: 110px;\r
        animation-delay: 3s;\r
      }\r
\r
      .circles li:nth-child(7) {\r
        left: 35%;\r
        width: 150px;\r
        height: 150px;\r
        animation-delay: 7s;\r
      }\r
\r
      .circles li:nth-child(8) {\r
        left: 50%;\r
        width: 25px;\r
        height: 25px;\r
        animation-delay: 15s;\r
        animation-duration: 45s;\r
      }\r
\r
      .circles li:nth-child(9) {\r
        left: 20%;\r
        width: 15px;\r
        height: 15px;\r
        animation-delay: 2s;\r
        animation-duration: 35s;\r
      }\r
\r
      .circles li:nth-child(10) {\r
        left: 85%;\r
        width: 150px;\r
        height: 150px;\r
        animation-delay: 0s;\r
        animation-duration: 11s;\r
      }\r
\r
      @keyframes animate {\r
        0% {\r
          transform: translateY(0) rotate(0deg);\r
          opacity: 1;\r
          border-radius: 0;\r
        }\r
\r
        100% {\r
          transform: translateY(-1000px) rotate(720deg);\r
          opacity: 0;\r
          border-radius: 50%;\r
        }\r
      }\r
    </style>\r
  </head>\r
  <body>\r
    <div id="mainContainer">\r
      <div class="area">\r
        <ul class="circles">\r
          <li></li>\r
          <li></li>\r
          <li></li>\r
          <li></li>\r
          <li></li>\r
          <li></li>\r
          <li></li>\r
          <li></li>\r
          <li></li>\r
          <li></li>\r
        </ul>\r
      </div>\r
\r
      <div id="formContainer">\r
        <div class="characterForm">\r
          <div class="inputWrapper" data-emoji="👤">\r
            <input type="text" value="Joe" class="name" name="name" />\r
          </div>\r
          <div class="inputWrapper" data-emoji="❤️‍🩹">\r
            <input type="number" value="30" class="hp" name="hp" />\r
          </div>\r
          <div class="inputWrapper" data-emoji="⚔️">\r
            <input type="number" value="9" class="attack" name="attack" />\r
          </div>\r
          <div class="inputWrapper" data-emoji="💖">\r
            <input type="number" value="0" class="heal" name="heal" />\r
          </div>\r
          <div class="inputWrapper" data-emoji="🛡️">\r
            <input type="number" value="1" class="defense" name="defense" />\r
          </div>\r
        </div>\r
        <div class="characterForm">\r
          <div class="inputWrapper" data-emoji="👤">\r
            <input type="text" value="Sam" class="name" name="name" />\r
          </div>\r
          <div class="inputWrapper" data-emoji="❤️‍🩹">\r
            <input type="number" value="30" class="hp" name="hp" />\r
          </div>\r
          <div class="inputWrapper" data-emoji="⚔️">\r
            <input type="number" value="9" class="attack" name="attack" />\r
          </div>\r
          <div class="inputWrapper" data-emoji="💖">\r
            <input type="number" value="0" class="heal" name="heal" />\r
          </div>\r
          <div class="inputWrapper" data-emoji="🛡️">\r
            <input type="number" value="1" class="defense" name="defense" />\r
          </div>\r
        </div>\r
        <div class="characterForm">\r
          <div class="inputWrapper" data-emoji="👤">\r
            <input type="text" value="Paladin" class="name" name="name" />\r
          </div>\r
          <div class="inputWrapper" data-emoji="❤️‍🩹">\r
            <input type="number" value="30" class="hp" name="hp" />\r
          </div>\r
          <div class="inputWrapper" data-emoji="⚔️">\r
            <input type="number" value="9" class="attack" name="attack" />\r
          </div>\r
          <div class="inputWrapper" data-emoji="💖">\r
            <input type="number" value="3" class="heal" name="heal" />\r
          </div>\r
          <div class="inputWrapper" data-emoji="🛡️">\r
            <input type="number" value="1" class="defense" name="defense" />\r
          </div>\r
        </div>\r
      </div>\r
      <div id="buttonContainer">\r
        <button onclick="removeCharacterForm()">➖</button>\r
        <button onclick="addCharacterForm()">➕</button>\r
        <div style="width: 20px"></div>\r
        <button onclick="submitForm()">▶️</button>\r
        <input\r
          id="iterations"\r
          type="number"\r
          placeholder="Interations"\r
          name="iterations"\r
          value="1000"\r
        />\r
      </div>\r
      <div id="results">You may need to refresh for the page to function properly...</div>\r
    </div>\r
  </body>\r
</html>\r
`;function y(l){let r,e;return{c(){r=new d(!1),e=i(),this.h()},l(n){r=c(n,!1),e=i(),this.h()},h(){r.a=e},m(n,t){r.m(u,n,t),h(n,e,t)},p:a,i:a,o:a,d(n){n&&m(e),n&&r.d()}}}class f extends o{constructor(r){super(),p(this,r,null,y,s,{})}}export{f as component};
