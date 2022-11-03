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
      const res = await this.deleteAction(this.deleteUrl, this.$DELETE);
      if (res) {
        if (
          res.responseStatus &&
          (res.responseStatus === 200 || res.responseStatus === "200")
        ) {
          const updated = await this.updateEntities(this.entities, this.itemId);
          if (updated) {
            this.deleting = false;
          }
        }
      }
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
