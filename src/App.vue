<template>
  <div id='app'>
    <topPanel/>
  </div>
</template>

<script>
  import topPanel from '@/components/topPanel.vue';

  export default {
    name: 'App',
    components: {
      topPanel
    }
  }
</script>

<style scoped>
 #app {
   width: 100%;
   height: 100%;
   background-color: #303130;
 }
</style>