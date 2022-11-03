<template>
  <div class="building" @click="buildingClicked(ev)">
    <div class="building-child">
      <div class="building-box-title">Name</div>
      <div>
        <p>{{ building.name }}</p>
      </div>
    </div>
    <div class="building-child">
      <div class="building-box-title">Floors</div>
      <div>
        <p>{{ building.numberOfFloors }}</p>
      </div>
    </div>
    <div class="building-child">
      <div class="building-box-title">Rooms</div>
      <div>
        <p>{{ building.numberOfRooms }}</p>
      </div>
    </div>
    <div class="building-child-actions">
      <Delete
        :deleteAction="remoteCall"
        :deleteUrl="deleteUrl"
        :disabled="toggledisabled"
        :updateEntities="deleteFromEntity"
        :entities="'buildings'"
        :itemId="building.id"
      />
    </div>
  </div>
</template>

<script>
import Delete from "./Delete.vue";
export default {
  name: "Building",
  props: {
    building: Object,
    remoteCall: Function,
    deleteFromEntity: Function,
  },
  components: {
    Delete,
  },
  methods: {
    async buildingClicked(event) {
      this.$emit("toggleChild", "rooms", true, this.building);
    },
  },
  setup() {},
  data() {
    return {
      toggledisabled: false,
      deleteUrl: `${this.$server_base_url}buildings/${this.building.id}`,
    };
  },
};
</script>

<style scoped>
.building {
  background: #251a1a;
  color: var(--vt-c-text-dark-2);
  margin: 5px;
  padding: 10px 20px;
  cursor: pointer;
  display: flex;
}
.building-child {
  width: 28%;
  padding: 1rem 2rem;
  border: 1px solid gray;
  margin: 1rem;
  border-radius: 5px;
  box-shadow: 3em;
}
.building-box-title {
  font-weight: bold;
}
.building-child-actions {
  display: flex;
  align-items: center;
  justify-content: center;
  color: #bc5252;
  width: 10%;
  padding-left: 1rem;
}
</style>
