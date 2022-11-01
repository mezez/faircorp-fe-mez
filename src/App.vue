<script setup>
import { RouterLink, RouterView } from "vue-router";
import CatchPhrase from "./components/CatchPhrase.vue";
</script>

<template>
  <header>
    <div class="wrapper">
      <CatchPhrase msg="Faircorp Homes" />
      <nav>
        <RouterLink to="/">Home</RouterLink>
        <span v-show="isLoggedIn" class="logout" @click="logout($event)"
          >Logout</span
        >
      </nav>
    </div>
  </header>

  <RouterView
    :showLoginForm="showLoginForm"
    :isLoggedIn="isLoggedIn"
    :username="username"
    :credentials="credentials"
    :loginn="loginn"
    :buildings="buildings"
    :loadingBuildings="loadingBuildings"
  />
</template>

<script>
export default {
  name: "App",
  components: {},
  methods: {
    setLoginStatus(status) {
      this.showLoginForm = !status;
      this.isLoggedIn = status;
    },

    async loginn(credentials) {
      const credentialsEncoded = btoa(
        credentials.username + ":" + credentials.password
      );

      const res = await fetch(`${this.$server_base_url}buildings`, {
        method: this.$GET,
        headers: {
          Authorization: "Basic " + credentialsEncoded,
        },
      });

      const data = await res.json();
      if (data.length > 0 && data.id !== null) {
        // loggedIn true
        // save credential in localstorage
        localStorage.setItem("user_credentials", credentialsEncoded);
        localStorage.setItem("username", credentials.username);
        this.username = credentials.username;
        this.credentials = credentialsEncoded;
        this.setLoginStatus(true);
      }

      this.buildings = data;
      this.loadingBuildings = false;
    },
    async logout(event) {
      this.setLoginStatus(false);
      localStorage.removeItem("user_credentials");
      localStorage.removeItem("username");
    },
  },

  async created() {
    const username = localStorage.getItem("username");
    const credentials = await localStorage.getItem("user_credentials");

    if (credentials) {
      this.credentials = credentials;
      const res = await fetch(`${this.$server_base_url}buildings`, {
        method: this.$GET,
        headers: {
          Authorization: "Basic " + credentials,
        },
      });

      const data = await res.json();
      if (data.length > 0 && data.id !== null) {
        this.setLoginStatus(true, false);
        this.buildings = data;
        this.loadingBuildings = false;
        this.username = username;
      } else {
        this.setLoginStatus(false);
      }
    } else {
      this.setLoginStatus(false);
    }
  },

  data() {
    return {
      showLoginForm: false,
      isLoggedIn: false,
      username: "",
      credentials: "",
      buildings: [],
      loadingBuildings: true,
    };
  },
};
</script>

<style scoped>
header {
  line-height: 1.5;
  max-height: 100vh;
}

.logo {
  display: block;
  margin: 0 auto 2rem;
}

nav {
  width: 100%;
  font-size: 12px;
  text-align: center;
  margin-top: 2rem;
}

nav a.router-link-exact-active {
  color: var(--color-text);
}

nav a.router-link-exact-active:hover {
  background-color: transparent;
}

nav a {
  display: inline-block;
  padding: 0 1rem;
  border-left: 1px solid var(--color-border);
}

nav a:first-of-type {
  border: 0;
}

@media (min-width: 1024px) {
  header {
    display: flex;
    place-items: center;
    padding-right: calc(var(--section-gap) / 2);
  }

  .logo {
    margin: 0 2rem 0 0;
  }

  header .wrapper {
    display: flex;
    place-items: flex-start;
    flex-wrap: wrap;
  }

  nav {
    text-align: left;
    margin-left: -1rem;
    font-size: 1rem;

    padding: 1rem 0;
    margin-top: 1rem;
  }
}
.logout {
  cursor: pointer;
  color: hsla(160, 100%, 37%, 1);
  padding-left: 1rem;
  border-left: 1px solid var(--color-border);
}
</style>
