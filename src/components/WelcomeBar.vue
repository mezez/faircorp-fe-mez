<template>
  <div>
    <div class="dashboard-title">
      Welcome <b>{{ username }}</b>
    </div>
    <br />
  </div>
</template>

<script>
export default {
  name: "Welcome Bar",
  props: {
    username: String,
  },
  setup() {},
};
</script>

<style scoped>
.dashboard-title {
  font-size: large;
  padding: 2rem;
  background-color: rgb(110, 124, 124);
  color: black;
  border-radius: 10px;
}
</style>
