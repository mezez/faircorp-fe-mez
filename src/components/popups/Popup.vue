<template>
  <div v-if="open" class="popup">
    <div class="popupInner">
      <slot />
      <div class="buttonContainer">
        <button class="popupBtn popupCancelBtn" @click="onClose">Cancel</button>
        <button
          :disabled="disableConfirm"
          class="popupBtn popupConfirmBtn"
          @click="onConfirm"
        >
          Confirm
        </button>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: "PopUp",
  props: {
    open: Boolean,
    disableConfirm: Boolean,
    onClose: Function,
    onConfirm: Function,
  },
  setup() {},
};
</script>
<style scoped>
.popup {
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  z-index: 100;
  background-color: rgba(18, 18, 18, 0.6);
  display: flex;
  align-items: center;
  justify-content: center;
}
.popupInner {
  background-color: rgb(18, 18, 18);
  padding: 12px;
}
.buttonContainer {
  display: flex;
  justify-content: flex-end;
}
.popupCancelBtn {
  margin-right: 12px;
  background-color: rgb(18, 18, 18);
  border-color: #bc5252;
}
.popupConfirmBtn {
  background-color: hsla(160, 100%, 37%, 1);
}
.popupConfirmBtn:disabled {
  background-color: hsla(160, 10%, 67%, 1);
}
.popupBtn {
  padding: 8px;
  border-radius: 10px;
  color: white;
  font-weight: 500;
}
</style>
