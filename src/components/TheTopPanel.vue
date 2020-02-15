<template>
  <div class='top-panel'>
    <img 
      src='@/assets/img/128/clock-icon.png'
      class='top-panel__icon top-panel__icon_clock'
    >
    <img 
      src='@/assets/img/128/bomb-icon.png'
      class='top-panel__icon top-panel__icon_bomb'
    >
    <div 
      class='top-panel__button top-panel__button_settings'
      @click='showPopUp("settings")'
    >
    </div>
    <h2 class='top-panel__counter top-panel__counter_bombs'>
      {{ bombsNumber }}
    </h2>
    <div 
      class='top-panel__button'
      :class='[restartButtonClass]'
      @click='restart'
    >
    </div>
    <h2 class='top-panel__counter top-panel__counter_time'>
      {{ time }}
    </h2>
    <div 
      class='top-panel__button top-panel__button_ref'>
    </div>
  </div>
</template>

<script>
export default {
  name: 'TheTopPanel',
  data() {
    return {
      time: 0,
      timerId: null
    }
  },
  methods: {
    restart() {
      this.$store.commit("restart")
    },
    showPopUp(popUpName) {
      this.$store.commit('showPopUp', popUpName)
    }
  },
  computed: {
    stage() {
      return this.$store.state.stage
    },
    bombsNumber() {
      return this.$store.state.settings.bombsNumber
    },
    restartButtonClass() {
      switch (this.$store.state.stage) {
        case 'win':
          return "top-panel__button_cool";
        case 'losing':
          return "top-panel__button_angry";
        default:
          return "top-panel__button_thinking";
      }
    }
  },
  watch: {
    stage: function(value) {
      switch (value) {
        case 'win':
        case 'losing':
          clearInterval(this.timerId);
          break;
        case 'start':
          clearInterval(this.timerId);
          this.time = 0;
          break;
        case 'game':
          this.timerId = setInterval(() => this.time++, 1000);
          break;
      }
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
    background-color: #2196F3;
    box-shadow: inset 0 -5px #1976D2;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .top-panel__icon {
    width: 50px;
    height: 50px;
    position: absolute;
  }

  .top-panel__icon_clock {
    transform: translate(20px)
  }

  .top-panel__icon_bomb { 
    transform: translate(-20px)
  }

  .top-panel__button {
    width: 40px;
    height: 40px;
    position: relative;
    transition: background-image .3s;
  }

  .top-panel__button_thinking {
    background: no-repeat center/100% url(~@/assets/img/128/thinking.png);
  }
  
  .top-panel__button_angry {
    background: no-repeat center/100% url(~@/assets/img/128/angry.png);
  }

  .top-panel__button_cool {
    background: no-repeat center/100% url(~@/assets/img/128/cool.png);
  }

  .top-panel__button_settings {
    background: no-repeat center/100% url(~@/assets/img/128/settings.png);
  }

  .top-panel__button_ref {
    background: no-repeat center/100% url(~@/assets/img/128/ref.png);
  }

  .top-panel__counter {
    max-width: 60px;
    margin: 20px;
    position: relative;
    font-family: Arial;
    color: #303130;
    flex-grow: 1;
  }

  .top-panel__counter_bombs {
    text-align: right;
  }
</style>