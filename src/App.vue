<template>
  <div class='App' id='App'>
    <TheTopPanel/>
    <div class='App__field-stage'>
      <TheGameField/>
    </div>
    <transition name='fade'>
      <PopUpSettings v-if='popUp == "settings"'/>
    </transition>
  </div>
</template>

<script>
  import { mapState } from 'vuex';
  import TheTopPanel from '@/components/TheTopPanel.vue';
  import TheGameField from '@/components/TheGameField.vue';
  import PopUpSettings from '@/components/PopUpSettings.vue';

  export default {
    name: 'App',
    components: {
      TheTopPanel,
      TheGameField,
      PopUpSettings
    },
    computed: {
      ...mapState([
        'popUp'
      ])
    },
    created() {
      window.addEventListener('contextmenu', (event) => {
        event.preventDefault()
      });
      window.addEventListener('selectstart', (event) => {
        event.preventDefault()
      });
    }
  }
</script>

<style>
  .App {
    width: 100%;
    height: 100%;
    background-color: #303130;
    position: relative;
  }

  .App__field-stage {
    width: 100%;
    height: calc(100% - 70px); /* 70px - height of topPanel */
    overflow: auto;
    display: flex; /* With auto margin for children to avoid pruning elements with overflow*/
  }
</style>

<style scoped>
  .fade-enter-active, .fade-leave-active {
    transition: opacity .1s;
  }

  .fade-enter, .fade-leave-to {
    opacity: 0;
  }
</style>