<script lang="ts">
  import { auth, db } from "$lib/firebase/firebase.client";
  import { onMount } from "svelte";
  import { authStore, type UserData } from "../../../stores/authStore";
  import { doc, getDoc, setDoc } from "firebase/firestore";

  onMount(() => {
    //TODO: update authStore on DB updates

    // update authStore on authentication state changes
    const unsubscribe = auth.onAuthStateChanged(async (user) => {
      // logged out
      if (!user) {
        // update authStore
        authStore.update((curr) => {
          return {
            ...curr,
            isLoading: false,
            currentUser: user,
          };
        });
        return;
      }

      // get firestore document data
      const docRef = doc(db, "users", user.uid);
      const docSnap = await getDoc(docRef);
      let dataToSetStoreTo: UserData = {text:""};

      // create a new user doc if it doesn't exist
      if (!docSnap.exists()) {
        console.log("Creating firestore user doc...");
        const userRef = doc(db, "users", user.uid);
        await setDoc(userRef, dataToSetStoreTo, { merge: true });
      } else {
        console.log("Fetching firestore user doc...");
        const userData = docSnap.data();
        dataToSetStoreTo = userData as UserData;
      }

      // update authStore
      authStore.update((curr) => {
        return {
          ...curr,
          isLoading: false,
          currentUser: user,
          data: dataToSetStoreTo,
        };
      });
    });
  });
</script>

<slot />
