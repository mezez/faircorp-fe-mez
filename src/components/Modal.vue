<template>
  <div Class="Create-Window" v-show="open">
    <div class="Modal-inner">
     <div class="Modal-content">
        <slot />

        <button type="button" @click="$emit('close')"> Create-Window</button>

     </div>
    </div>
  </div> 
</template>
<script>


export default {
 props:{
    open: {
        type: Boolean,
        required: true,
    },
},
};
</script>

<style scoped>
*,
::before,
::after {
margin: 0;
padding: 0;
box-sizing: border-box;
}
.Create-Window {
position: fixed;
overflow: hidden;

}


</style>