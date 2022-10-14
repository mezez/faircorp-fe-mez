<script setup>
import WelcomeItem from "./WelcomeItem.vue";
// import DocumentationIcon from './icons/IconDocumentation.vue'
// import ToolingIcon from './icons/IconTooling.vue'
// import EcosystemIcon from './icons/IconEcosystem.vue'
// import CommunityIcon from './icons/IconCommunity.vue'
// import SupportIcon from './icons/IconSupport.vue'
</script>

<template>
  <WelcomeItem>
    <form @submit="onSubmit" class="add-form">
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
          placeholder="******"
          required
        />
      </div>
      <!-- <div class="form-control form-control-check">
      <label>Set Reminder</label>
      <input type="checkbox" v-model="reminder" name="reminder" />
    </div> -->

      <input type="submit" value="Login" class="btn btn-block" />
    </form>
  </WelcomeItem>
</template>

<script>
export default {
  methods: {
    onSubmit(e) {
      e.preventDefault();
      if (!this.username) {
        alert("Username is required");
      }
      if (!this.password) {
        alert("Password is required");
      }

      const credentials = {
        // id: Math.floor(Math.random() * 10000),
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
    };
  },
  setup() {},
};
</script>

<style scoped>
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
  height: 40px;
  margin: 5px;
  padding: 3px 7px;
  font-size: 17px;
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
