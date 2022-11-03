<template>
  <span title="Delete">
    <delete-icon v-show="!deleting" @click="deleteClicked" />
    <div class="spinner-div" v-show="deleting">
      <fulfilling-bouncing-circle-spinner
        :animation-duration="4000"
        :size="10"
        color="hsla(160, 100%, 37%, 1)"
      />
    </div>
  </span>
</template>

<script>
import DeleteIcon from "vue-material-design-icons/Delete.vue";
import { FulfillingBouncingCircleSpinner } from "epic-spinners";

export default {
  props: {
    deleteAction: Function,
    deleteUrl: String,
    updateEntities: Function,
    itemId: Number,
    entities: String,
  },
  components: {
    DeleteIcon,
    FulfillingBouncingCircleSpinner,
  },
  methods: {
    async deleteClicked() {
      this.deleting = true;
      this.deleteAction(this.deleteUrl, this.$DELETE)
        .then(() => {
          this.updateEntities(this.entities, this.itemId);
        })
        .catch(() => {
          this.$notify({
            title: "Error",
            text: `Error occured while deleting ${this.entities.substring(
              0,
              this.entities.length - 1
            )}`,
            type: "error",
          });
        })
        .finally(() => {
          this.deleting = false;
        });
    },
  },
  data() {
    return {
      deleting: false,
    };
  },
  setup() {},
};
</script>

<style scoped>
.spinner-div {
  margin: 1rem;
}
</style>
