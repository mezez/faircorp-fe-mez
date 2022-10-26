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
      <div>
        <Toggle
          v-model="windowValue"
          :falseValue="false"
          :trueValue="true"
          @change="N"
        />
      </div>
    </div>

    <!-- <div class="window-child">
      <div>Rooms</div>
      <div>
        <p>{{ window.numberOfRooms }}</p>
      </div>
    </div> -->
  </div>
</template>

<script>
import Toggle from "@vueform/toggle";
export default {
  name: "Window",
  props: {
    window: Object,
  },
  components: {
    Toggle,
  },
  methods: {
    // onDelete(id) {
    //   this.$emit("delete-task", id);
    // },
  },
  setup() {},
  data() {
    return {
      windowValue: true,
    };
  },
  async created() {
    if (window.windowStatus === "OPEN") {
      this.windowValue = true;
    } else {
      this.windowValue = false;
    }
  },
  async updated() {
    if (window.windowStatus === "OPEN") {
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
