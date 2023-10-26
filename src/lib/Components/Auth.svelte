<script lang="ts">
  import { authHandlers, authStore } from "../../stores/authStore";

  let email = "";
  let password = "";

  async function handleSubmit() {
    if (!email || !password) return;

    // handle login
    try {
      await authHandlers.login(email, password);
    } catch (err) {
      console.log(err);
    }

    // listen for reactive auth changes
    if ($authStore.currentUser) {
      // do something like redirecting on success
      //window.location.href = '/Firebase/privatedashboard'
    }
  }
</script>

<!-- <div class="container">
  <h1>Log In</h1>
  <form>
    <div class="form-group">
      <label for="email">Email</label>
      <input id="email" bind:value={email} type="email" placeholder="Email" />
    </div>
    <div class="form-group">
      <label for="password">Password</label>
      <input
        id="password"
        bind:value={password}
        type="password"
        placeholder="Password"
      />
    </div>
    <div class="form-group">
      <button on:click={handleSubmit}>Log In</button>
    </div>
  </form>
</div> -->
<div class="container">
  <img src="./images/pen.svg" alt="logo" />
  <form>
    <input id="email" bind:value={email} type="email" placeholder="Email" />
    <input
      id="password"
      bind:value={password}
      type="password"
      placeholder="Password"
    />
    <button class="login-btn" on:click={handleSubmit}>Next</button>
  </form>
</div>

<style>
  .container {
    position: absolute;
    top: 40px;
    left: 50%;
    transform: translateX(-50%);
    max-width: 300px;
    width: 90%;
    background-color: #fff;
    padding-top: 20px;
    padding-bottom: 20px;
    padding-right: 24px;
    border-radius: 8px;
    box-shadow: 0 1px 6px rgba(0, 0, 0, 0.1);
    font-size: 14px;
    display: flex;
  }

  img {
    max-height: 100px;
  }

  form {
    display: grid;
    grid-auto-flow: row;
    row-gap: 10px;
  }

  form input {
    width: 100%;
    padding: 10px;
    border: 1px solid #ccc; /* Lighter border */
    border-radius: 4px;
    outline: none;
  }
  form input:focus {
    border: 2px solid #00a1a7;
    padding: 9px;
  }

  form input::placeholder {
    color: #ccc;
  }

  button {
    padding: 10px 20px;
    background-color: #00a1a7; /* Google blue */
    color: #fff;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    justify-self: right;
  }

  button:hover {
    background-color: #006f74; /* Darker blue for hover */
  }
</style>
