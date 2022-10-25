<template>
  <div class="window">
    <div class="window-child">
      <div>Name:</div>
      <div>
        <p>{{ window.name }}</p>
      </div>
    </div>
    <div class="window-child">
      <div>Status:</div>
      <div>
        <p>{{ window.windowStatus }}</p>
      </div>
    </div>
    <!-- <div class="window-child">
      <div>Rooms</div>
      <div>
        <p>{{ window.numberOfRooms }}</p>
      </div>
    </div> -->
  </div>
</template>

<script>
// console.log(window);
export default {
  name: "Window",
  props: {
    window: Object,
  },
  methods: {
    // onDelete(id) {
    //   this.$emit("delete-task", id);
    // },
  },
  setup() {},
};
</script>

<style scoped>
.fas {
  color: red;
}
.window {
  background: #251a1a;
  color: var(--vt-c-text-dark-2);
  margin: 5px;
  padding: 10px 20px;
  cursor: pointer;
  display: flex;
}
.window-child {
  width: 30%;
  padding: 2rem;
  border: 1px solid gray;
  margin: 1rem;
  border-radius: 5px;
  box-shadow: 3em;
}
.task.reminder {
  border-left: 5px solid green;
}
.task h3 {
  display: flex;
  align-items: center;
  justify-content: space-between;
}
</style>
