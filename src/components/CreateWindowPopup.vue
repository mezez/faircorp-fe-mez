<template>
  <Popup :open="open" :onClose="onClose" :onConfirm="onConfirm"
    ><h2>Create new window</h2></Popup
  >
</template>
<script>
import Popup from "./Popup.vue";

export default {
  name: "CreateWindowPopup",
  components: { Popup },
  props: {
    open: Boolean,
    onClose: Function,
    onConfirm: Function,
  },
  setup() {},
};
</script>
<style scoped></style>
