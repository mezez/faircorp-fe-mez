<template>
  <div v-show="isLoggedIn">
    <WelcomeBar :username="username" />
    <div>
      <div class="container">
        <div class="container-title">Buildings</div>
        <hr />

        <div :key="building.id" v-for="building in buildings">
          <Building :building="building" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Building from "./Building.vue";
import WelcomeBar from "./WelcomeBar.vue";
export default {
  props: {
    isLoggedIn: Boolean,
    username: String,
    buildings: Array,
  },
  components: {
    Building,
    WelcomeBar,
  },
  data() {
    return {
      activeBuilding: {},
      rooms: [],
      activeRoom: {},
      heaters: [],
      activeHeater: {},
      windows: [],
      activeWindow: {},
      showRooms: false,
      showRoom: false,
      showHeaters: false,
      showHeater: false,
      showWindows: false,
      showWindow: false,
    };
  },
  methods: {
    created() {
      console.log("mounted");
    },
  },
  setup() {},
};
</script>

<style scoped>
.container {
  border: 1px solid gray;
  border-radius: 4px;
  padding: 2rem;
}

.container-title {
  font-size: large;
  padding: 0px 0px 5px 0px;
}
</style>
