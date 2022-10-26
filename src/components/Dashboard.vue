<template>
  <div v-show="isLoggedIn">
    <WelcomeBar :username="username" />
    <div>
      <div class="container">
        <div style="display: flex">
          <div v-show="showBuildings" class="container-title">Buildings</div>
          <div v-show="showRooms" class="container-title">
            Rooms in {{ activeBuilding.name }} building
          </div>

          <div class="button-div">
            <BackButton
              v-show="showRooms"
              :buttonText="'←Back'"
              :activePage="'rooms'"
              @redirectAction="onRedirectAction"
            />
            <BackButton
              v-show="showWindows"
              :buttonText="'←Back'"
              :activePage="'windows'"
              @redirectAction="onRedirectAction"
            />
          </div>
        </div>
        <hr />
        <div class="spinner-div" v-show="loadingBuildings">
          <fulfilling-bouncing-circle-spinner
            :animation-duration="4000"
            :size="40"
            color="hsla(160, 100%, 37%, 1)"
          />
        </div>
        <div
          :key="building.id"
          v-show="showBuildings"
          v-for="building in buildings"
        >
          <Building :building="building" @toggleChild="toggleChild" />
        </div>

        <div :key="room.id" v-show="showRooms" v-for="room in rooms">
          <Room :room="room" @toggleChild="toggleChild" />
        </div>

        <div class="windows-and-heaters" v-show="showWindows">
          <div style="width: 100%">
            <div
              style="padding: 10px"
              v-show="showWindows"
              class="container-title"
            >
              Windows in {{ activeRoom.name }}
            </div>
            <div
              :key="window.id"
              v-show="showWindows"
              v-for="window in windows"
            >
              <Window
                :window="window"
                @toggleChild="toggleChild"
                :remoteToggleEntity="remoteToggleEntity"
              />
            </div>
          </div>
          <div style="width: 100%">
            <div
              style="padding: 10px"
              v-show="showWindows"
              class="container-title"
            >
              Heaters in {{ activeRoom.name }}
            </div>
            <div
              :key="heater.id"
              v-show="showHeaters"
              v-for="heater in heaters"
            >
              <Heater
                :heater="heater"
                @toggleChild="toggleChild"
                :remoteToggleEntity="remoteToggleEntity"
              />
            </div>
          </div>
        </div>

        <!-- <div v-show="showHeaters" class="container-title">
          Heaters in {{ activeRoom.name }}
        </div> -->
      </div>
    </div>
  </div>
</template>

<script>
import BackButton from "./BackButton.vue";
import Building from "./Building.vue";
import Room from "./Room.vue";
import Window from "./Window.vue";
import Heater from "./Heater.vue";
import WelcomeBar from "./WelcomeBar.vue";
import { FulfillingBouncingCircleSpinner } from "epic-spinners";
export default {
  props: {
    isLoggedIn: Boolean,
    username: String,
    buildings: Array,
    loadingBuildings: Boolean,
    credentials: String,
  },
  components: {
    Building,
    Room,
    Window,
    Heater,
    WelcomeBar,
    BackButton,
    FulfillingBouncingCircleSpinner,
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
    async remoteToggleEntity(entityName, id) {
      const url = `${this.$server_base_url}${entityName}/${id}/switch`;
      const method = this.$PUT;
      const response = await this.remoteCall(url, method);
      console.log("update", response);
      return true;
    },
    async onRedirectAction(activeScreen) {
      if (!activeScreen) {
        //return to home page
        this.activeBuilding = parent;
        this.showBuildings = false;
        this.rooms = buildingRooms;
        this.showRooms = true;
        router.push("home");
      }
      if (activeScreen === "rooms") {
        //go to buildings
        this.toggleChild("rooms", false, "buildings");
      }
      if (activeScreen === "windows") {
        //go to rooms
        this.toggleChild("windows", false, "rooms");
      }
    },
    async toggleChild(childName, status, parent = null) {
      // console.log(parent);
      // console.log(this.credentials);
      if (childName === "rooms") {
        if (status) {
          //fetchrooms
          if (parent) {
            const url = `${this.$server_base_url}rooms`;
            const method = this.$GET;
            const response = await this.remoteCall(url, method);
            // console.log("rooms", response);
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
        } else {
          //back to buildings
          this.activeBuilding = {};
          this.showBuildings = true;
          this.rooms = [];
          this.showRooms = false;
        }
      } else if (childName === "windows") {
        if (status) {
          //fetch window
          if (parent) {
            const url = `${this.$server_base_url}windows`;
            const heaterUrl = `${this.$server_base_url}heaters`;
            const method = this.$GET;
            const response = await this.remoteCall(url, method);
            const heaterResponse = await this.remoteCall(heaterUrl, method);
            // console.log("parent", parent);
            // console.log("windows", response);
            if (response) {
              if (response.length > 0) {
                let roomWindows = response.filter(
                  (window) => window.roomId == parent.id
                );
                this.activeRoom = parent;
                this.showRooms = false;
                this.windows = roomWindows;
                this.showWindows = true;
              }
            }

            if (heaterResponse) {
              if (heaterResponse.length > 0) {
                let roomHeaters = heaterResponse.filter(
                  (heater) => heater.roomId == parent.id
                );
                this.activeRoom = parent;
                this.showRooms = false;
                this.heaters = roomHeaters;
                this.showHeaters = true;
              }
            }
          }
        } else {
          //back to rooms
          this.activeRoom = {};
          this.showRooms = true;
          this.windows = [];
          this.showWindows = false;
          this.heaters = [];
          this.showHeaters = false;
        }
      }
    },

    async remoteCall(url, method) {
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
.button-div {
  display: block;
  margin-left: auto;
  margin-bottom: 0.5rem;
}
.spinner-div {
  margin: 1rem;
}
.windows-and-heaters {
  display: flex;
}
</style>
