<template>
  <Popup
    :disableConfirm="disableConfirm"
    :open="open"
    :onClose="onClose"
    :onConfirm="handleConfirm"
    ><div class="title">Create new building</div>
    <div class="inputContainer">
      <input
        v-model="name"
        class="input textInput"
        placeholder="Building name"
        type="text"
        id="fname"
        name="fname"
      />
      <input
        v-model="numberOfFloors"
        class="input textInput"
        placeholder="Number of floors"
        type="number"
        id="fnumberOfFloors"
        name="fnumberOfFloors"
      />
      <input
        v-model="numberOfRooms"
        class="input textInput"
        placeholder="Number of rooms"
        type="number"
        id="fnumberOfRooms"
        name="fnumberOfRooms"
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
      numberOfFloors: null,
      numberOfRooms: null,
    };
  },
  methods: {
    handleConfirm() {
      if (
        this.name.length > 3 &&
        this.numberOfFloors > -1 &&
        this.numberOfRooms > -1
      ) {
        this.onConfirm({
          name: this.name,
          floor: this.floor,
          numberOfFloors: this.numberOfFloors,
          numberOfRooms: this.numberOfRooms,
        });
      } else {
        this.$notify({
          title: "Error",
          text: "Name is too short or number of Floors is not valid or number of rooms is not valid",
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
