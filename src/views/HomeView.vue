<script setup>
// import LoginForm from "../components/LoginForm.vue";
</script>

<template>
  <main>
    <LoginForm v-show="showLoginForm" @loginn="loginn" />
    <Dashboard
      v-show="isLoggedIn"
      :isLoggedIn="isLoggedIn"
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
    loginn: Function,
    username: String,
    credentials: String,
  },
  components: {
    LoginForm,
  },
  methods: {},
  created() {},
  setup() {},
};
</script>
