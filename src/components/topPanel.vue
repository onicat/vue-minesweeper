<template>
  <div class='top-panel'>
    <div 
      class='restart-button'
      :class='{
        "restart-button_game": $store.state.stage == "game",
        "restart-button_losing": $store.state.stage == "losing",
        "restart-button_win": $store.state.stage == "win"
      }'
      @click='restart'
    >
    </div>
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
    box-shadow: inset 0 -5px #1976D2;
  }

  .restart-button {
    width: 40px;
    height: 40px;
    transition: all 0.3s;
  }

  .restart-button:hover {
    width: 45px;
    height: 45px;
  }

  .restart-button_game {
    background: no-repeat center/100% url(~@/assets/img/128/thinking.png);
  }
  
  .restart-button_losing {
    background: no-repeat center/100% url(~@/assets/img/128/angry.png);
  }

  .restart-button_win {
    background: no-repeat center/100% url(~@/assets/img/128/cool.png);
  }
</style>