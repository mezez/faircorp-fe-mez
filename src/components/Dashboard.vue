<template>
  <div v-show="isLoggedIn">
    <WelcomeBar :username="username" />
    <div>
      <div class="container">
        <div v-show="showBuildings" class="container-title">Buildings</div>
        <div v-show="showRooms" class="container-title">
          Rooms in {{ activeBuilding.name }} building
        </div>
        <hr />

        <div
          :key="building.id"
          v-show="showBuildings"
          v-for="building in buildings"
        >
          <Building :building="building" @toggleChild="toggleChild" />
        </div>

        <div :key="room.id" v-show="showRooms" v-for="room in rooms">
          <Room :room="room" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Building from "./Building.vue";
import Room from "./Room.vue";
import WelcomeBar from "./WelcomeBar.vue";
export default {
  props: {
    isLoggedIn: Boolean,
    username: String,
    buildings: Array,
    credentials: String,
  },
  components: {
    Building,
    Room,
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
      showBuildings: true,
      showRooms: false,
      showRoom: false,
      showHeaters: false,
      showHeater: false,
      showWindows: false,
      showWindow: false,
    };
  },
  methods: {
    async toggleChild(childName, status, parent = null) {
      console.log(parent);
      console.log(this.credentials);
      if (childName === "rooms") {
        if (status) {
          //fetchrooms
          if (parent) {
            const url = `${this.$server_base_url}rooms`;
            const method = this.$GET;
            const response = await this.getModuleData(url, method);
            console.log("rooms", response);
            if (response) {
              if (response.length > 0) {
                let buildingRooms = response.filter(
                  (room) => room.buildingId == parent.id
                );
                this.activeBuilding = parent;
                this.showBuildings = false;
                this.rooms = buildingRooms;
                this.showRooms = true;
              }
            }
          }
        }
      }
      // if (childName === "room" && this.activeRoom) {
      //   this.showRooms = status;
      //   if (status) {
      //     //fetchrooms
      //     if (parentId) {
      //       const url = `${this.$server_base_url}rooms/${this.activeRoom.id}`;
      //       const method = this.$GET;
      //       const response = await this.getModuleData(url, method);
      //       if (response) {
      //         if (response.length > 0) {
      //           this.room = response;
      //           this.showRoom = true;
      //           this.activeRoom = respons
      //         }
      //       }
      //     }
      //   }
      // }
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

    async getModuleData(url, method) {
      const res = await fetch(url, {
        method,
        headers: {
          Authorization: "Basic " + this.credentials,
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
