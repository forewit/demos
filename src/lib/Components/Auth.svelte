<script lang="ts">
  import { authHandlers, authStore } from "../../stores/authStore";
  import { base } from "$app/paths";


  let email = "";
  let password = "";
  let failedLogin = false;

  async function handleSubmit() {
    try {
      failedLogin = false;
      await authHandlers.login(email, password);
    } catch (err) {
      console.log("Login failed!");
      failedLogin = true;
    }
  }
</script>
  <form class="container" on:submit={handleSubmit}>
    <img class="logo" src="{base}/images/pen.svg" alt="logo" />
    <input
      class="email"
      bind:value={email}
      type="email"
      placeholder="Email"
      required
    />
    <input
      class="password"
      bind:value={password}
      type="password"
      placeholder="Password"
      required
    />
    {#if failedLogin}
      <p class="error">Failed to login!</p>
    {/if}
    <input type="submit" value="Login" class="btn" />
  </form>

<style>
  .container {
    position: absolute;
    top: 40px;
    left: 50%;
    transform: translateX(-50%);
    width: 305px;
    background-color: #fff;
    padding: 20px 24px;
    border-radius: 8px;
    box-shadow: 0 1px 6px rgba(0, 0, 0, 0.1);
    font-size: 14px;

    display: grid;
    grid-template-columns: min-content max-content 1fr;
    grid-template-rows: 40px 40px 40px;
    row-gap: 10px;
    grid-template-areas:
      "logo email email"
      "logo pass pass"
      "logo error btn";
  }

  .logo {
    height: 120px;
    padding-right: 16px;
    align-self: center;
    pointer-events: none;
    grid-area: logo;
  }
  .email {
    grid-area: email;
  }
  .password {
    grid-area: pass;
  }
  .error {
    grid-area: error;
    color: red;
    font-size: 12px;
    align-self: center;
    justify-self: left;
    border: 1px solid red;
    border-radius: 4px;
    padding: 5px 6px;
  }

  .password,
  .email {
    width: 100%;
    padding: 10px;
    border: 1px solid #ccc;
    border-radius: 4px;
    outline: none;
  }

  .password:focus,
  .email:focus {
    border: 2px solid #00a1a7;
    padding: 9px;
  }

  .password::placeholder,
  .email::placeholder {
    color: #ccc;
  }

  .btn {
    margin: 2px 0;
    padding: 0 18px;
    background-color: #00a1a7; /* Google blue */
    color: #fff;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    justify-self: right;
    grid-area: btn;
  }

  .btn:hover {
    background-color: #006f74; /* Darker blue for hover */
  }
</style>
