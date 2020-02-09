<template>
  <div class='top-panel'>
    <img 
      class='restart-button'
      src='@/assets/img/thinking.svg' alt='restart'
      @click='restart'
    >
  </div>
</template>

<script>
export default {
  name: 'topPanel',
  methods: {
    restart() {
      this.$store.commit("restart")
    }
  },
  mounted() {
    window.addEventListener('keyup', event => {
      if (event.code == 'F2') {
        this.restart()
      }
    })
  }
}
</script>

<style scoped>
  .top-panel {
    height: 70px;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: #2196F3;
    border-radius: 0 0 10px 10px;
    box-shadow: inset 0 -5px #1976D2;
  }

  .restart-button {
    width: 40px;
    height: 40px;
    transition: all 0.3s
  }

  .restart-button:hover {
    width: 45px;
    height: 45px;
  }
</style>