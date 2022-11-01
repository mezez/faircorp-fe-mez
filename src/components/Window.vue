<template>
  <div class="window">
    <div class="window-child">
      <div>Name:</div>
      <div>
        <p>{{ window.name }}</p>
      </div>
    </div>
    <div class="window-child">
      <div>Status:</div>
      <div>
        <p>{{ window.windowStatus }}</p>
      </div>
    </div>
    <div class="window-child">
      <div style="padding-bottom: 0.5rem">
        <Toggle
          v-model="windowValue"
          @change="toggleAction"
          :disabled="toggledisabled"
        />
      </div>
      <div>
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
      const updated = await this.remoteToggleEntity("windows", this.window.id);
      if (updated) {
        this.window.windowStatus =
          this.window.windowStatus === "OPEN" ? "CLOSED" : "OPEN";
        // re enable button after update
        this.toggledisabled = false;
      }
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
.fas {
  color: red;
}
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
