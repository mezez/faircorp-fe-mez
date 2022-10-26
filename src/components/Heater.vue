<template>
  <div class="heater">
    <div class="heater-child">
      <div>Name:</div>
      <div>
        <p>{{ heater.name }}</p>
      </div>
    </div>
    <div class="heater-child">
      <div>Status:</div>
      <div>
        <p>{{ heater.heaterStatus }}</p>
      </div>
    </div>
    <div class="heater-child">
      <div>
        <Toggle
          v-model="heaterValue"
          @change="toggleAction"
          :diabled="toggledisabled"
        />
      </div>
    </div>
  </div>
</template>

<script>
import Toggle from "@vueform/toggle";
export default {
  name: "Heater",
  props: {
    heater: Object,
    remoteToggleEntity: Function,
  },
  components: {
    Toggle,
  },
  methods: {
    async toggleAction() {
      //TODO
      //disable button while updating
      this.toggledisabled = true;
      //update remotely
      const updated = await this.remoteToggleEntity("heaters", this.heater.id);
      if (updated) {
        this.heater.heaterStatus =
          this.heater.heaterStatus === "ON" ? "OFF" : "ON";
        //re enable button after update
        this.toggledisabled = false;
      }
    },
    // onDelete(id) {
    //   this.$emit("delete-task", id);
    // },
  },
  setup() {},
  data() {
    return {
      heaterValue: true,
      toggledisabled: false,
    };
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
.fas {
  color: red;
}
.heater {
  background: #251a1a;
  color: var(--vt-c-text-dark-2);
  margin: 5px;
  padding: 10px 20px;
  cursor: pointer;
  display: flex;
}
.heater-child {
  width: 30%;
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
