<template>
  <div>
    <AppHeader />
    <AppLeft />
    <AppRight />
  </div>
</template>
<script setup lang="ts">
import AppHeader from '@/components/AppHeader/index.vue'
import AppLeft from '@/components/AppLeft/index.vue'
import AppRight from '@/components/AppRight/index.vue'
</script>
<style scoped>
.header {
  position: absolute;
  line-height: 50px;
  padding: 0;
  top: 0;
  left: 0;
  right: 0;
  background-color: darkseagreen;
}
.navbar {
  position: absolute;
  padding: 0;
  top: 50px;
  left: 0;
  right: 0;
  bottom: 0;
  width: 230px;
  /* background-color:rgba(97, 96, 96, 0.8); */
  overflow-y: auto;
}
.main {
  position: absolute;
  padding: 10px;
  top: 50px;
  left: 230px;
  right: 0;
  bottom: 0;
  /* background-color: lightblue; */
  overflow-y: auto;
}
</style>
