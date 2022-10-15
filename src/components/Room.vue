<template>
  <div class="room">
    <div class="room-child">
      <div>Name</div>
      <div>
        <p>{{ room.name }}</p>
      </div>
    </div>
    <div class="room-child">
      <div>Floor</div>
      <div>
        <p>{{ room.floor }}</p>
      </div>
    </div>
    <!-- <div class="room-child">
      <div>Rooms</div>
      <div>
        <p>{{ room.numberOfRooms }}</p>
      </div>
    </div> -->
  </div>
</template>

<script>
// console.log(room);
export default {
  name: "Room",
  props: {
    room: Object,
  },
  methods: {
    // onDelete(id) {
    //   this.$emit("delete-task", id);
    // },
  },
  setup() {},
};
</script>

<style scoped>
.fas {
  color: red;
}
.room {
  background: #251a1a;
  color: var(--vt-c-text-dark-2);
  margin: 5px;
  padding: 10px 20px;
  cursor: pointer;
  display: flex;
}
.room-child {
  width: 30%;
  padding: 2rem;
  border: 1px solid gray;
  margin: 1rem;
  border-radius: 5px;
  box-shadow: 3em;
}
.task.reminder {
  border-left: 5px solid green;
}
.task h3 {
  display: flex;
  align-items: center;
  justify-content: space-between;
}
</style>
