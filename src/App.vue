<template>
  <div id='app'>
    <topPanel/>
    <div class='field-stage'>
      <gameField/>
    </div>
  </div>
</template>

<script>
  import topPanel from '@/components/topPanel.vue';
  import gameField from '@/components/gameField.vue';

  export default {
    name: 'App',
    created: function() {
      window.addEventListener('contextmenu', (event) => {
        event.preventDefault()
      });
      this.$store.commit('generateField');
    },
    components: {
      topPanel,
      gameField
    }
  }
</script>

<style scoped>
 #app {
   width: 100%;
   height: 100%;
   background-color: #303130;
 }

 .field-stage {
   width: 100%;
   height: calc(100% - 70px); /* 70px - height of topPanel */
   overflow: auto;
   display: flex; /* With auto margin for children to avoid pruning elements with overflow*/
 }
</style>