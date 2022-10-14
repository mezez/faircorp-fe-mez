<!-- <template>
  <div>
    <div class="dashboard-title">
      Welcome <b>{{ username }}</b>
    </div>
    <br />
    <div class="container">
      <div class="container-title">Buildings</div>
      <hr />

      <div :key="building.id" v-for="building in buildings">
        <Building :building="building" />
      </div>
    </div>
  </div>
</template>

<script>
import Building from "./Building.vue";
export default {
  props: {
    username: String,
    buildings: Array,
  },
  components: {
    Building,
  },
  methods: {
    created() {
      console.log("mounted");
    },
  },
  setup() {},
};
</script>

<style scoped>
.dashboard-title {
  font-size: large;
  padding: 2rem;
  background-color: rg./Building.vue4);
  color: black;
  border-radius: 10px;
}

.container {
  border: 1px solid gray;
  border-radius: 4px;
  padding: 2rem;
}

.container-title {
  font-size: large;
  padding: 0px 0px 5px 0px;
}
</style> -->
