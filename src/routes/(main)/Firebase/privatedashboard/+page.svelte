<script lang="ts">
  import { authStore } from "../../../../stores/authStore";

  let email: string | null | undefined;

  authStore.subscribe((curr) => {
    email = curr?.currentUser?.email;
  });
</script>

{#if $authStore.currentUser}
  <div>Current User: {email}</div>
{:else}
  <div>Loading...</div>
{/if}
