<script lang="ts">
  import Auth from "$lib/Components/Auth.svelte";
  import { authHandlers, authStore } from "../../../stores/authStore";

  let email: string | null | undefined;

  authStore.subscribe((curr) => {
    email = curr?.currentUser?.email;
  });
</script>


{#if $authStore.currentUser}
  <div>Current User: {email}</div>
  <button on:click={authHandlers.logout}>Logout</button>

{:else if $authStore.isLoading}
  <div>Loading...</div>
{:else}
  <Auth />
{/if}
