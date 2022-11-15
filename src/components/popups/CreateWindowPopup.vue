<template>
  <Popup
    :disableConfirm="disableConfirm"
    :open="open"
    :onClose="onClose"
    :onConfirm="handleConfirm"
    ><div class="title">{{ editing ? "Update " : "Create new " }}window</div>
    <div class="inputContainer">
      <input
        v-model="name"
        class="input textInput"
        placeholder="Window name"
        type="text"
        id="fname"
        name="fname"
      />
      <div v-show="editing === false" class="input">Window status</div>
      <input
        v-show="editing === false"
        type="radio"
        id="status1"
        name="windowStatus"
        v-model="windowStatus"
        value="CLOSED"
      />
      <label v-show="editing === false" class="input inputLabel" for="status1"
        >Closed</label
      ><br />
      <input
        v-show="editing === false"
        v-model="windowStatus"
        type="radio"
        id="status2"
        name="windowStatus"
        value="OPEN"
      />
      <label v-show="editing === false" class="input inputLabel" for="status12"
        >Open</label
      ><br />
    </div>
  </Popup>
</template>
<script>
import Popup from "./Popup.vue";

export default {
  name: "CreateWindowPopup",
  components: { Popup },
  props: {
    open: Boolean,
    disableConfirm: Boolean,
    onClose: Function,
    onConfirm: Function,
    editing: Boolean,
    currentWindow: Object,
  },
  data() {
    return {
      id: null,
      name: "",
      windowStatus: "CLOSED",
    };
  },
  methods: {
    handleConfirm() {
      if (editing) {
        this.currentWindow.name = this.name;
        if (this.name.length > 3) {
          this.onConfirm({ ...this.currentWindow });
          this.name = "";
          this.windowStatus = "CLOSED";
        } else {
          this.$notify({
            title: "Error",
            text: "Name is too short. Requires minimum of 4 Characters",
            type: "error",
          });
        }
      } else {
        if (this.name.length > 3 && this.windowStatus) {
          this.onConfirm({
            name: this.name,
            windowStatus: this.windowStatus,
          });
          this.name = "";
          this.windowStatus = "CLOSED";
        } else {
          this.$notify({
            title: "Error",
            text: "Name is too short. Requires minimum of 4 Characters",
            type: "error",
          });
        }
      }
    },
  },
  setup() {},
  created() {
    console.log(this.currentWindow);
    if (this.currentWindow) {
      this.id = this.currentWindow.id;
      this.name = this.currentWindow.name;
    }
  },
  onMounted() {
    console.log(this.currentWindow);
    if (this.currentWindow) {
      this.id = this.currentWindow.id;
      this.name = this.currentWindow.name;
    }
  },
};
</script>
<style scoped>
.title {
  width: 100%;
  font-size: 20px;
  font-weight: bold;
  text-transform: capitalize;
}
.inputContainer {
  padding: 20px 0;
  width: 30vw;
}
.input {
  color: white;
  font-size: 16px;
  margin-bottom: 8px;
}
.textInput {
  display: block;
  width: 100%;
  height: 40px;
  padding-left: 8px;
  border-radius: 10px;
  background: rgb(18, 18, 18);
  border-color: hsla(160, 100%, 37%, 1);
}
.inputLabel {
  padding-left: 8px;
}
</style>
