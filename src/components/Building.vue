<template>
  <div class="building" @click="buildingClicked(ev)">
    <div class="building-child">
      <div>Name</div>
      <div>
        <p>{{ building.name }}</p>
      </div>
    </div>
    <div class="building-child">
      <div>Floors</div>
      <div>
        <p>{{ building.numberOfFloors }}</p>
      </div>
    </div>
    <div class="building-child">
      <div>Rooms</div>
      <div>
        <p>{{ building.numberOfRooms }}</p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    building: Object,
  },
  methods: {
    async buildingClicked(event) {
      this.$emit("toggleChild", "rooms", true, this.building);
    },
  },
  setup() {},
};
</script>

<style scoped>
.fas {
  color: red;
}
.building {
  background: #251a1a;
  color: var(--vt-c-text-dark-2);
  margin: 5px;
  padding: 10px 20px;
  cursor: pointer;
  display: flex;
}
.building-child {
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
