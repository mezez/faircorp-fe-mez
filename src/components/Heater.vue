<template>
  <div class="heater">
    <div class="heater-child">
      <div>Name:</div>
      <div>
        <p>{{ heater.name }}</p>
      </div>
    </div>
    <div class="heater-child">
      <div>Status:</div>
      <div>
        <p>{{ heater.heaterStatus }}</p>
      </div>
    </div>
    <!-- <div class="heater-child">
      <div>Rooms</div>
      <div>
        <p>{{ heater.numberOfRooms }}</p>
      </div>
    </div> -->
  </div>
</template>

<script>
// console.log(heater);
export default {
  name: "Heater",
  props: {
    heater: Object,
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
.heater {
  background: #251a1a;
  color: var(--vt-c-text-dark-2);
  margin: 5px;
  padding: 10px 20px;
  cursor: pointer;
  display: flex;
}
.heater-child {
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
