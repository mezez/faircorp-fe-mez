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
          <Building
            :remoteCall="remoteCall"
            :deleteFromEntity="deleteFromEntity"
            :building="building"
            @toggleChild="toggleChild"
          />  
        </div>

        <div :key="room.id" v-show="showRooms" v-for="room in rooms">
          <Room
            :remoteCall="remoteCall"
            :deleteFromEntity="deleteFromEntity"
            :room="room"
            @toggleChild="toggleChild"
          />
        </div>

        <div class="windows-and-heaters" v-show="showWindows">
          <div style="width: 50%">
            <div
              style="padding: 10px"
              v-show="showWindows"
              class="container-title"
            >
              <div class="title">Windows in {{ activeRoom.name }}</div>
              <Toggle
                v-show="Array.isArray(windows) && windows.length > 0"
                v-model="globalWindowsValue"
                @change="remoteToggleWindows"
                :diabled="toggleWindowsdisabled"
              />
             <div>
              <button @click="isOpen = true"> Creat Window</button>
                <Modal :open="isOpen" @close="isOpen = !isOpen" >
                    <p>
                        here i do not know
                    </p>
                </Modal>
              </div>
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
                :remoteCall="remoteCall"
                :deleteFromEntity="deleteFromEntity"
              />
            </div>
          </div>
          <div style="width: 50%">
            <div
              style="padding: 10px"
              v-show="showWindows"
              class="container-title"
            >
              <div class="title">Heaters in {{ activeRoom.name }}</div>
              <Toggle
                v-show="Array.isArray(heaters) && heaters.length > 0"
                v-model="globalHeatersValue"
                @change="remoteToggleHeaters"
                :diabled="toggleHeatersdisabled"
              />
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
                :remoteCall="remoteCall"
                :deleteFromEntity="deleteFromEntity"
              />
            </div>
          </div>
        </div>
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
import Toggle from "@vueform/toggle";
import { ref } from "vue";
import Modal from "./Modal.vue";
export default {
  props: {
    isLoggedIn: Boolean,
    username: String,
    credentials: String,
  },
  components: {
    Building,
    Toggle,
    Room,
    Window,
    Heater,
    WelcomeBar,
    BackButton,
    FulfillingBouncingCircleSpinner,
    Modal,
  },
  setup () {
    const isOpen = ref(false)

    return { isOpen }
  },
  data() {
    return {
      activeBuilding: {},
      buildings: [],
      loadingBuildings: true,
      globalHeatersValue: false,
      toggleHeatersdisabled: false,
      globalWindowsValue: false,
      toggleWindowsdisabled: false,
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
      disableToogle: false,
    };
  },

  watch: {
    isLoggedIn(newVal) {
      if (newVal) {
        this.getInitialBuildings();
      }
    },
    windows: {
      handler(newWindows) {
        let total = 0;
        let open = 0;
        if (Array.isArray(newWindows) && newWindows.length > 0)
          newWindows.forEach((window) => {
            if (window.roomId === this.activeRoom.id) {
              total = total + 1;
              if (window.windowStatus === "OPEN") {
                open = open + 1;
              }
            }
          });
        if (total === open) {
          this.globalWindowsValue = true;
        } else {
          this.globalWindowsValue = false;
        }
      },
      deep: true,
    },
    heaters: {
      handler(newHeaters) {
        let total = 0;
        let open = 0;
        if (Array.isArray(newHeaters) && newHeaters.length > 0)
          newHeaters.forEach((heater) => {
            if (heater.roomId === this.activeRoom.id) {
              total = total + 1;
              if (heater.heaterStatus === "ON") {
                open = open + 1;
              }
            }
          });
        if (total === open) {
          this.globalHeatersValue = true;
        } else {
          this.globalHeatersValue = false;
        }
      },
      deep: true,
    },
  },
  methods: {
    async getInitialBuildings() {
      const url = `${this.$server_base_url}buildings`;
      const method = this.$GET;
      this.remoteCall(url, method).then((data) => {
        if (data.length > 0 && data.id !== null) {
          this.buildings = data;
          this.loadingBuildings = false;
        }
      });
    },
    async reloadEntity(entityName) {
      const url = `${this.$server_base_url}${entityName}`;
      const method = this.$GET;
      const response = await this.remoteCall(url, method);
      if (response) {
        this[entityName] = response;
        return true;
      }
    },

    async deleteFromEntity(entityName, id) {
      let newEntities = this[entityName].filter((entity) => entity.id !== id);
      this[entityName] = newEntities;
      return true;
    },

    async remoteToggleEntity(entityName, id) {
      const url = `${this.$server_base_url}${entityName}/${id}/switch`;
      const method = this.$PUT;
      const response = await this.remoteCall(url, method);
      return response;
    },
    async remoteToggleWindows() {
      const url = `${this.$server_base_url}rooms/${this.activeRoom.id}/switchWindows`;
      const method = this.$PUT;
      this.toggleWindowsdisabled = true;
      this.remoteCall(url, method)
        .then(() => {
          this.windows = this.windows.map((window) => {
            if (window.roomId === this.activeRoom.id) {
              window.windowStatus =
                window.windowStatus === "OPEN" ? "CLOSED" : "OPEN";
              return window;
            }
            return window;
          });
        })
        .catch(() => {
          this.$notify({
            title: "Error",
            text: "Error occured while switching windows statuses in the room",
            type: "error",
          });
        })
        .finally(() => {
          this.toggleWindowsdisabled = true;
        });
    },
    async remoteToggleHeaters() {
      this.toggleHeatersdisabled = true;
      const url = `${this.$server_base_url}rooms/${this.activeRoom.id}/switchHeaters`;
      const method = this.$PUT;
      this.remoteCall(url, method)
        .then(() => {
          this.heaters = this.heaters.map((heater) => {
            if (heater.roomId === this.activeRoom.id) {
              heater.heaterStatus = heater.heaterStatus === "ON" ? "OFF" : "ON";
              return heater;
            }
            return heater;
          });
        })
        .catch(() => {
          this.$notify({
            title: "Error",
            text: "Error occured while switching heaters statuses in the room",
            type: "error",
          });
        })
        .finally(() => {
          this.toggleHeatersdisabled = false;
        });
    },
    async onRedirectAction(activeScreen) {
      if (!activeScreen) {
        // return to home page
        this.activeBuilding = parent;
        this.showBuildings = false;
        this.rooms = buildingRooms;
        this.showRooms = true;
        router.push("home");
      }
      if (activeScreen === "rooms") {
        // go to buildings
        this.toggleChild("rooms", false, "buildings");
      }
      if (activeScreen === "windows") {
        // go to rooms
        this.toggleChild("windows", false, "rooms");
      }
    },
    async toggleChild(childName, status, parent = null) {
      if (this.disableToogle) {
        return;
      }
      if (childName === "rooms") {
        if (status) {
          //   fetchrooms
          if (parent) {
            const url = `${this.$server_base_url}rooms`;
            const method = this.$GET;
            const response = await this.remoteCall(url, method);
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
          //   back to buildings
          this.activeBuilding = {};
          this.showBuildings = true;
          this.rooms = [];
          this.showRooms = false;
        }
      } else if (childName === "windows") {
        if (status) {
          //   fetch window
          if (parent) {
            const url = `${this.$server_base_url}windows`;
            const heaterUrl = `${this.$server_base_url}heaters`;
            const method = this.$GET;
            const response = await this.remoteCall(url, method);
            const heaterResponse = await this.remoteCall(heaterUrl, method);
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
          //   back to rooms
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
      this.disableToogle = true;
      const res = await fetch(url, {
        method,
        headers: {
          Authorization: "Basic " + this.credentials,
        },
      });
      try {
        let data = await res.json();
        data.responseStatus = res.status;
        this.disableToogle = false;
        return data;
      } catch (err) {
        // likey no response
        let data = {};
        data.responseStatus = res.status;
        this.disableToogle = false;
        return data;
      }
    },
  },
  created() {},
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
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-size: large;
  padding: 0px 0px 5px 0px;
}
.title {
  width: calc(100% - 60px);
}
.button-div {
  display: block;
  margin-left: auto;
  margin-bottom: 0.5rem;
}
.Create-Window {
  background-color: var(--vt-c-text-dark-2);
  border-radius: 0.5rem;
  color: var(--color-background);
  line-height: 1.25rem;
  text-align: center;
  text-decoration: none #d1d5db solid;
  box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.05);
  cursor: pointer;
  
}
.Create-Window:hover {
  background-color: rgb(249, 250, 251);
}
.Create-Window:focus {
  outline: 2px solid transparent;
  outline-offset: 2px;
}

.Create-Window:focus-visible {
  box-shadow: none;
}
.spinner-div {
  margin: 1rem;
}
.windows-and-heaters {
  display: flex;
}
</style>
