<template>
  <button @click="onClick" class="button-39" role="button">
    {{ buttonText }}
  </button>
</template>

<script>
export default {
  name: "BackButton",
  props: {
    buttonText: String,
    activePage: String,
  },
  methods: {
    onClick() {
      this.$emit("redirectAction", this.activePage);
    },
  },
  setup() {},
};
</script>

<style scoped>
.button-39 {
  background-color: var(--vt-c-text-dark-2);
  border: 1px solid rgb(209, 213, 219);
  border-radius: 0.5rem;
  box-sizing: border-box;
  color: var(--color-background);
  font-family: "Inter var", ui-sans-serif, system-ui, -apple-system, system-ui,
    "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif,
    "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji";
  font-size: 0.875rem;
  font-weight: 600;
  line-height: 1.25rem;
  padding: 0.6rem 1rem;
  text-align: center;
  text-decoration: none #d1d5db solid;
  text-decoration-thickness: auto;
  box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.05);
  cursor: pointer;
  user-select: none;
  -webkit-user-select: none;
  touch-action: manipulation;
}

.button-39:hover {
  background-color: rgb(249, 250, 251);
}

.button-39:focus {
  outline: 2px solid transparent;
  outline-offset: 2px;
}

.button-39:focus-visible {
  box-shadow: none;
}
</style>
