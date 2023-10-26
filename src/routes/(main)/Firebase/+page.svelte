<script lang="ts">
  import Auth from "$lib/Components/Auth.svelte";
  import { db } from "$lib/firebase/firebase.client";
  import { doc, setDoc } from "firebase/firestore";
  import { authHandlers, authStore } from "../../../stores/firebaseStore";

  let email: string | null | undefined;
  let data = {}


  async function saveData() {
    // verify authentication
    if (!$authStore.currentUser) return;

    try {
      const userRef = doc(db, "users", $authStore.currentUser.uid);
      await setDoc(userRef, data, {merge: true});
    } catch (err) {
      console.log("there was an error saving data!");
    }
  }

  authStore.subscribe((curr) => {
    email = curr?.currentUser?.email;
    data = curr?.data
  });
</script>


{#if $authStore.currentUser}
  <div>Current User: {email}</div>
  <button on:click={authHandlers.logout}>Logout</button>

  <button on:click={()=>{data = {text: "hi"}; saveData();}}>Save!</button>

{:else if $authStore.isLoading}
  <div>Loading...</div>
{:else}
  <Auth />
{/if}
