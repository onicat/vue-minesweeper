<template>
  <div id='app'>
    <topPanel/>
    <div class='field-stage'>
      <gameField/>
    </div>
    <transition name='fade'>
      <popUp v-if='$store.state.popUp'/>
    </transition>
  </div>
</template>

<script>
  import topPanel from '@/components/topPanel.vue';
  import gameField from '@/components/gameField.vue';
  import popUp from '@/components/popUp.vue';

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
      gameField,
      popUp
    }
  }
</script>

<style scoped>
 #app {
   width: 100%;
   height: 100%;
   background-color: #303130;
   position: relative;
 }

 .field-stage {
   width: 100%;
   height: calc(100% - 70px); /* 70px - height of topPanel */
   overflow: auto;
   display: flex; /* With auto margin for children to avoid pruning elements with overflow*/
 }

  .fade-enter-active, .fade-leave-active {
    transition: opacity .1s;
  }

  .fade-enter, .fade-leave-to {
    opacity: 0;
  }
</style>