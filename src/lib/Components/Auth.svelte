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
        window.location.href = '/Firebase/privatedashboard'
    }

  }
</script>

<div class="container">
  <h1>login In</h1>
  <form action="">
    <label for="">
      <input bind:value={email} type="email" placeholder="Email" />
    </label>
    <label for="">
      <input bind:value={password} type="password" placeholder="Password" />
    </label>
    <button on:click={handleSubmit}>log in</button>
  </form>
</div>

<style>
  .container {
    background: goldenrod;
  }
</style>
