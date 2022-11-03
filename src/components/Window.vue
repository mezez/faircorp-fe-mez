<template>
  <div class="window">
    <div class="window-child">
      <div class="window-box-title">Name:</div>
      <div>
        {{ window.name }}
      </div>
    </div>
    <div class="window-child">
      <div class="window-box-title">Status:</div>
      <div>
        <p>{{ window.windowStatus }}</p>
      </div>
    </div>
    <div class="window-child window-child-actions">
      <div>
        <Toggle
          v-model="windowValue"
          @change="toggleAction"
          :disabled="toggledisabled"
        />
      </div>
      <div class="window-child-delete-button">
        <Delete
          :deleteAction="remoteCall"
          :deleteUrl="deleteUrl"
          :disabled="toggledisabled"
          :updateEntities="deleteFromEntity"
          :entities="'windows'"
          :itemId="window.id"
        />
      </div>
    </div>
  </div>
</template>

<script>
import Toggle from "@vueform/toggle";
import Delete from "./Delete.vue";
export default {
  name: "Window",
  props: {
    window: Object,
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
      this.remoteToggleEntity("windows", this.window.id)
        .then(() => {
          this.window.windowStatus =
            this.window.windowStatus === "OPEN" ? "CLOSED" : "OPEN";
          // re enable button after update
        })
        .catch(() => {
          this.$notify({
            title: "Error",
            text: "Error occured while switching window's status",
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
      windowValue: true,
      toggledisabled: false,
      deleteUrl: `${this.$server_base_url}windows/${this.window.id}`,
    };
  },
  watch: {
    "window.windowStatus"(newVal) {
      if (newVal === "OPEN") {
        this.windowValue = true;
      } else {
        this.windowValue = false;
      }
    },
  },
  async created() {
    if (this.window.windowStatus === "OPEN") {
      this.windowValue = true;
    } else {
      this.windowValue = false;
    }
  },
};
</script>

<style src="@vueform/toggle/themes/default.css"></style>
<style scoped>
.window {
  background: #251a1a;
  color: var(--vt-c-text-dark-2);
  margin: 5px;
  padding: 10px 20px;
  cursor: pointer;
  display: flex;
}
.window-child {
  width: 25%;
  padding: 1rem 2rem;
  border: 1px solid gray;
  margin: 1rem;
  border-radius: 5px;
}
.window-box-title {
  font-weight: bold;
}

.window-child-actions {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  color: #bc5252;
}

.window-child-delete-button {
  padding-top: 20px;
}
</style>
