<template>
  <Popup
    :disableConfirm="disableConfirm"
    :open="open"
    :onClose="onClose"
    :onConfirm="handleConfirm"
    ><div class="title">Create new heater</div>
    <div class="inputContainer">
      <input
        v-model="name"
        class="input textInput"
        placeholder="Heater name"
        type="text"
        id="fname"
        name="fname"
      />
      <input
        v-model="power"
        class="input textInput"
        placeholder="Heater power"
        type="number"
        id="fpower"
        name="fpower"
      />
      <div class="input">Heater status</div>
      <input
        type="radio"
        id="status1"
        name="heaterStatus"
        v-model="heaterStatus"
        value="OFF"
      />
      <label class="input inputLabel" for="status1">Off</label><br />
      <input
        v-model="heaterStatus"
        type="radio"
        id="status2"
        name="heaterStatus"
        value="ON"
      />
      <label class="input inputLabel" for="status12">On</label><br />
    </div>
  </Popup>
</template>
<script>
import Popup from "./Popup.vue";

export default {
  name: "CreateHeaterPopup",
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
      power: null,
      heaterStatus: "OFF",
    };
  },
  methods: {
    handleConfirm() {
      if (this.name.length > 3 && this.heaterStatus && this.power > 9) {
        this.onConfirm({
          name: this.name,
          heaterStatus: this.heaterStatus,
          heaterPower: this.power,
        });
        this.name = "";
        this.power = null;
        this.heaterStatus = "OFF";
      } else {
        this.$notify({
          title: "Error",
          text: "Name is too short (requires minimum of 4 Characters) or power is too little (should be at least 10)",
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
