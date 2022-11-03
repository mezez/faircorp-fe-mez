<template>
  <div class="heater">
    <div class="heater-child">
      <div class="heater-box-title">Name:</div>
      <div>
        {{ heater.name }}
      </div>
    </div>
    <div class="heater-child">
      <div class="heater-box-title">Status:</div>
      <div>
        <p>{{ heater.heaterStatus }}</p>
      </div>
    </div>
    <div class="heater-child heater-child-actions">
      <div>
        <Toggle
          v-model="heaterValue"
          @change="toggleAction"
          :diabled="toggledisabled"
        />
      </div>
      <div class="heater-child-delete-button">
        <Delete
          :deleteAction="remoteCall"
          :deleteUrl="deleteUrl"
          :disabled="toggledisabled"
          :updateEntities="deleteFromEntity"
          :entities="'heaters'"
          :itemId="heater.id"
        />
      </div>
    </div>
  </div>
</template>

<script>
import Toggle from "@vueform/toggle";
import Delete from "./Delete.vue";
export default {
  name: "Heater",
  props: {
    heater: Object,
    remoteToggleEntity: Function,
    remoteCall: Function,
    deleteFromEntity: Function,
  },
  components: {
    Toggle,
    Delete,
  },
  methods: {
    async toggleAction() {
      this.toggledisabled = true;
      //   update remotely
      this.remoteToggleEntity("heaters", this.heater.id)
        .then(() => {
          this.heater.heaterStatus =
            this.heater.heaterStatus === "ON" ? "OFF" : "ON";
          // re enable button after update
        })
        .catch(() => {
          this.$notify({
            title: "Error",
            text: "Error occured while switching heater's status",
            type: "error",
          });
        })
        .finally(() => {
          this.toggledisabled = false;
        });
    },
  },
  setup() {},
  data() {
    return {
      heaterValue: true,
      toggledisabled: false,
      deleteUrl: `${this.$server_base_url}heaters/${this.heater.id}`,
    };
  },
  watch: {
    "heater.heaterStatus"(newVal) {
      if (newVal === "ON") {
        this.heaterValue = true;
      } else {
        this.heaterValue = false;
      }
    },
  },
  async created() {
    if (this.heater.heaterStatus === "ON") {
      this.heaterValue = true;
    } else {
      this.heaterValue = false;
    }
  },
};
</script>

<style scoped>
.heater {
  background: #251a1a;
  color: var(--vt-c-text-dark-2);
  margin: 5px;
  padding: 10px 20px;
  cursor: pointer;
  display: flex;
}
.heater-child {
  width: 25%;
  padding: 1rem 2rem;
  border: 1px solid gray;
  margin: 1rem;
  border-radius: 5px;
}
.heater-box-title {
  font-weight: bold;
}

.heater-child-actions {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  color: #bc5252;
}
.heater-child-delete-button {
  padding-top: 20px;
}
</style>
