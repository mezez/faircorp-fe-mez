<script setup>
// import { onMounted, } from "@vue/runtime-core";
import { RouterLink, RouterView } from "vue-router";
import CatchPhrase from "./components/CatchPhrase.vue";
</script>

<template>
  <header>
    <!-- <img alt="Vue logo" class="logo" src="@/assets/logo.svg" width="125" height="125" /> -->

    <div class="wrapper">
      <CatchPhrase msg="Faircorp Homes" />

      <nav>
        <RouterLink to="/">Home</RouterLink>
        <RouterLink to="/about">About</RouterLink>
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
  />
  <!-- <router-view :showLoginForm="showLoginForm"></router-view> -->
</template>

<script>
// import { onMounted } from "vue";

export default {
  name: "App",
  components: {},
  methods: {
    setLoginStatus(status) {
      this.showLoginForm = !status;
      this.isLoggedIn = status;
    },

    async loginn(credentials) {
      //test to see if valid buildings can be fetched
      // "https://faircorpmez.cleverapps.io/api/buildings",
      const credentialsEncoded = btoa(
        credentials.username + ":" + credentials.password
      );
      // const res = await fetch("http://127.0.0.1:8080/api/buildings", {
      const res = await fetch(`${this.$server_base_url}buildings`, {
        method: this.$GET,
        headers: {
          Authorization: "Basic " + credentialsEncoded,
          // "Content-type": "application/json",
        },
        // body: JSON.stringify(task),
      });

      const data = await res.json();
      // console.log(data);
      if (data.length > 0 && data.id !== null) {
        //loggedIn true
        //save credential in localstorage
        localStorage.setItem("user_credentials", credentialsEncoded);
        localStorage.setItem("username", credentials.username);
        this.username = credentials.username;
        this.credentials = credentialsEncoded;
        this.setLoginStatus(true);
      }

      this.buildings = data;
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
          // "Content-type": "application/json",
        },
        // body: JSON.stringify(task),
      });

      const data = await res.json();
      // console.log(data);
      if (data.length > 0 && data.id !== null) {
        this.setLoginStatus(true, false);
        this.buildings = data;
        this.username = username;
      } else {
        this.setLoginStatus(false);
      }
    } else {
      this.setLoginStatus(false);
    }
  },

  //equivalent to state in react
  data() {
    return {
      showLoginForm: false,
      isLoggedIn: false,
      username: "",
      credentials: "",
      buildings: [],
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
