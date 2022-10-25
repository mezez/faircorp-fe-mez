<script setup>
// import LoginForm from "../components/LoginForm.vue";
</script>

<template>
  <main>
    <LoginForm v-show="showLoginForm" @loginn="loginn" />
    <Dashboard
      v-show="isLoggedIn"
      :buildings="buildings"
      :loadingBuildings="loadingBuildings"
      :username="username"
      :credentials="credentials"
    />
  </main>
</template>

<script>
import LoginForm from "../components/LoginForm.vue";
import Dashboard from "../components/Dashboard.vue";
export default {
  name: "Home",
  props: {
    showLoginForm: Boolean,
    isLoggedIn: Boolean,
    buildings: Object,
    loadingBuildings: Boolean,
    loginn: Function,
    username: String,
    credentials: String,
  },
  components: {
    LoginForm,
  },
  methods: {
    // async login(credentials) {
    //   //test to see if valid buildings can be fetched
    //   const res = await fetch("https://faircorpmez.cleverapps.io/api/builds", {
    //     method: "GET",
    //     headers: {
    //       Authorisation:
    //         "Basic " +
    //         base64.encode(credentials.username + ":" + credentials.password),
    //       // "Content-type": "application/json",
    //     },
    //     body: JSON.stringify(task),
    //   });
    //   const data = await res.json();
    //   console.log(data);
    //   // this.tasks = [...this.tasks, data];
    // },
  },
  created() {
    // console.log(this.credentials);
  },
  setup() {},
};
</script>
