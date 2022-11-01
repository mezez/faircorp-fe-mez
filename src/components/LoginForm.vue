<script setup>
import WelcomeItem from "./WelcomeItem.vue";
</script>

<template>
  <WelcomeItem>
    <div class="login">
      <form @submit="onSubmit" class="add-form">
        <div align="center"><h1>Login</h1></div>
        <div class="form-control">
          <label>Username</label>
          <input
            type="text"
            v-model="username"
            name="username"
            placeholder="johndoe"
            required
          />
        </div>
        <div class="form-control">
          <label>Password</label>
          <input
            type="password"
            v-model="password"
            name="password"
            placeholder="******************"
            required
          />
        </div>
        <div>
          <input
            type="submit"
            :value="loginText"
            :disabled="submitDisabled"
            class="btn btn-block"
          />
        </div>
      </form>
    </div>
  </WelcomeItem>
</template>

<script>
export default {
  methods: {
    onSubmit(e) {
      e.preventDefault();
      this.loginText = "Logging In...";

      if (!this.username) {
        alert("Username is required");
      }
      if (!this.password) {
        alert("Password is required");
      }

      const credentials = {
        username: this.username,
        password: this.password,
      };
      this.$emit("loginn", credentials);

      (this.username = ""), (this.password = "");
    },
  },
  data() {
    return {
      username: "",
      password: "",
      loginText: "Login",
      submitDisabled: false,
    };
  },
  setup() {},
};
</script>

<style scoped>
.login {
  width: 50%;
  border: 1px solid rgb(110, 124, 124);
  border-radius: 8px;
  padding: 2rem;
}
.btn-block {
  margin: 20px 0;
  width: 100%;
  height: 50px;
  padding: 3%;
  border-radius: 8px;
  color: var(--color-background);
  background-color: rgb(110, 124, 124);
  font-size: large;
}
.btn-block:hover {
  color: rgb(110, 124, 124) !important;
  background-color: hsla(160, 100%, 37%, 1) !important;
}
.add-form {
  margin-bottom: 40px;
}
.form-control {
  margin: 20px 0;
}
.form-control label {
  display: block;
}
.form-control input {
  width: 100%;
  height: 50px;
  margin: 5px;
  padding: 3px 7px;
  font-size: 17px;
  border: 1px solid rgb(110, 124, 124);
  background: var(--color-background);
  color: rgb(110, 124, 124);
  border-radius: 8px;
}
.form-control-check {
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.form-control-check label {
  flex: 1;
}
.form-control-check input {
  flex: 2;
  height: 20px;
}
</style>
