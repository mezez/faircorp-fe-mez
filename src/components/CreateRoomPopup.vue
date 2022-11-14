<template>
  <Popup
    :disableConfirm="disableConfirm"
    :open="open"
    :onClose="onClose"
    :onConfirm="handleConfirm"
    ><div class="title">Create new room</div>
    <div class="inputContainer">
      <input
        v-model="name"
        class="input textInput"
        placeholder="Room name"
        type="text"
        id="fname"
        name="fname"
      />
      <input
        v-model="floor"
        class="input textInput"
        placeholder="At which floor is room"
        type="number"
        id="ffloor"
        name="ffloor"
      />
      <input
        v-model="currentTemperature"
        class="input textInput"
        placeholder="Current temperature"
        type="number"
        id="fcurrentTemperature"
        name="fcurrentTemperature"
      />
      <input
        v-model="targetTemperature"
        class="input textInput"
        placeholder="Target temperature"
        type="number"
        id="ftargetTemperature"
        name="ftargetTemperature"
      />
    </div>
  </Popup>
</template>
<script>
import Popup from "./Popup.vue";

export default {
  name: "CreateRoomPopup",
  components: { Popup },
  props: {
    open: Boolean,
    disableConfirm: Boolean,
    onClose: Function,
    onConfirm: Function,
  },
  data() {
    return {
      name: "",
      floor: null,
      currentTemperature: null,
      targetTemperature: null,
    };
  },
  methods: {
    handleConfirm() {
      if (this.name.length > 3 && this.floor > -1) {
        this.onConfirm({
          name: this.name,
          floor: this.floor,
          currentTemperature: this.currentTemperature,
          targetTemperature: this.targetTemperature,
        });
      } else {
        this.$notify({
          title: "Error",
          text: "Name is too short or floor doesn't exist",
          type: "error",
        });
      }
    },
  },
  setup() {},
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
