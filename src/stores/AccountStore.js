import { defineStore } from "pinia";
import { computed, ref } from "vue";
import axios from "axios";

export const useAccountStore = defineStore("account", () => {
    const token = ref(null);
    const user = ref(null);

    const isLoggedIn = computed(() => token.value !== null && user.value !== null);
    const isAdmin = computed(() => isLoggedIn.value && user.value.role === "ADMIN");

    async function login(email, password) {
        try {
            let response = await axios.post(import.meta.env.VITE_API_URL + '/login', {
                email,
                password
            });
            const data = response.data;

            if(data.error)
                throw Error(data.error);

            token.value = data.token;
            user.value = data.user;

            localStorage.setItem("token", token.value);
        } catch (error) {
            throw Error(error.response?.data.error || error.message);
        }
    }

    async function logout() {
        token.value = null;
        user.value = null;
        localStorage.removeItem("token");
    }

    async function load() {
        let storedToken = localStorage.getItem("token");
        if(storedToken) {
            try {
                let response = await axios.get(import.meta.env.VITE_API_URL + '/users/me', {
                    headers: {
                        Authorization: `Bearer ${storedToken}`
                    }
                });
                const data = response.data;

                if(data.error)
                    throw Error(data.error);

                if(!data.user) {
                    throw Error("Could not load user data");
                }

                token.value = storedToken;
                user.value = data.user;
            } catch (error) {
                if (error.response && [401, 404].includes(error.response.status)) {
                    localStorage.removeItem("token");
                    console.warn("Your session has expired: " + error.response.status);
                    return;
                }
                throw Error(error.response?.data.error || error.message);
            }
        }
    }

    return {
        token,
        user,
        isLoggedIn,
        isAdmin,
        login,
        logout,
        load
    }
});