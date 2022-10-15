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
    toggleChild: async (childName, status, parentId = null) => {
      console.log(childName);
      if (childName === "rooms") {
        this.showRooms = status;
        if (status) {
          //fetchrooms
          if (parentId) {
            const url = `${this.$server_base_url}rooms`;
            const method = this.$GET;
            const response = await this.getModuleData(url, method);
            if (response) {
              if (response.length > 0) {
                this.rooms = response;
                this.showRooms = true;
              }
            }
          }
        }
      }
      if (childName === "room" && this.activeRoom) {
        this.showRooms = status;
        if (status) {
          //fetchrooms
          if (parentId) {
            const url = `${this.$server_base_url}rooms/${this.activeRoom.id}`;
            const method = this.$GET;
            const response = await this.getModuleData(url, method);
            if (response) {
              if (response.length > 0) {
                this.room = response;
                this.showRoom = true;
              }
            }
          }
        }
      }
      // if (childName === "heaters") {
      //   this.showRooms = status;
      //   if (status) {
      //     //fetchrooms
      //     if (parentId) {
      //       const url = `${this.$server_base_url}rooms/${this.activeRoom.id}`;
      //       const method = this.$GET;
      //       const response = await this.getModuleData(url, method);
      //       if (response) {
      //         if (response.length > 0) {
      //           this.rooms = response;
      //         }
      //       }
      //     }
      //   }
      // }
    },

    getModuleData: async (url, method) => {
      const res = await fetch(url, {
        method,
        headers: {
          Authorization: "Basic " + credentials,
          // "Content-type": "application/json",
        },
        // body: JSON.stringify(task),
      });

      const data = await res.json();
      return data;
    },
  },
  created() {
    // console.log("mounted");
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
