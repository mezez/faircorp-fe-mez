<template>
  <div class="room" @click="roomClicked(ev)">
    <div class="room-child">
      <div class="room-box-title">Name</div>
      <div>
        <p>{{ room.name }}</p>
      </div>
    </div>
    <div class="room-child inline">
      <div>
        <div class="room-box-title">Floor</div>
        <div>
          <p class="centered">{{ room.floor }}</p>
        </div>
      </div>
      <div>
        <div class="room-box-title">Current temp.</div>
        <div>
          <p class="centered">{{ room.currentTemperature }}°C</p>
        </div>
      </div>
      <div>
        <div class="room-box-title">Target temp.</div>
        <div>
          <p class="centered">{{ room.targetTemperature }}°C</p>
        </div>
      </div>
    </div>
    <div class="room-child-actions">
      <Delete
        :deleteAction="remoteCall"
        :deleteUrl="deleteUrl"
        :disabled="toggledisabled"
        :updateEntities="deleteFromEntity"
        :entities="'rooms'"
        :itemId="room.id"
      />
    </div>
  </div>
</template>

<script>
import Delete from "../Delete.vue";
export default {
  name: "Room",
  props: {
    room: Object,
    remoteCall: Function,
    deleteFromEntity: Function,
  },
  components: {
    Delete,
  },
  methods: {
    async roomClicked(event) {
      this.$emit("toggleChild", "windows", true, this.room);
    },
  },
  setup() {},
  data() {
    return {
      toggledisabled: false,
      deleteUrl: `${this.$server_base_url}rooms/${this.room.id}`,
    };
  },
};
</script>

<style scoped>
.room {
  background: #251a1a;
  color: var(--vt-c-text-dark-2);
  margin: 5px;
  padding: 10px 20px;
  cursor: pointer;
  display: flex;
}
.room-child {
  width: 40%;
  padding: 1rem 2rem;
  border: 1px solid gray;
  margin: 1rem;
  border-radius: 5px;
}
.centered {
  display: flex;
  justify-content: center;
}
.inline {
  display: flex;
  justify-content: space-between;
}
.room-child-actions {
  display: flex;
  align-items: center;
  justify-content: center;
  color: #bc5252;
  width: 10%;
  padding-left: 1rem;
}
.room-box-title {
  font-weight: bold;
}

@media screen and (min-width: 20em) and (max-width: 585px) {
  /* .heater-child:first-child { */
  .room-child {
    display: block;
    width: 100%;
  }
  .room {
    display: block;
    /* width: 40em; */
  }
}
</style>
