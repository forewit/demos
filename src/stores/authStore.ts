import { signInWithEmailAndPassword, signOut, type User} from "firebase/auth";
import { writable } from "svelte/store";
import { auth } from "../lib/firebase/firebase.client";

export const authStore = writable({
    isLoading: true,
    currentUser: <User | null>null
})

export const authHandlers = {
    login: async (email: string, password: string) => {
        // call firebase sign in function
        await signInWithEmailAndPassword(auth, email, password)
    },
    logout: async () => {
        // call firebase logout function
        await signOut(auth)
    }
}