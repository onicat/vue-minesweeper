<template>
  <div class='TheTopPanel'>
    <div 
      class='TheTopPanel__button TheTopPanel__button_settings'
      @click='showPopUp("settings")'
    >
    </div>
    <h2 class='TheTopPanel__counter TheTopPanel__counter_flags'>
      {{ flagsLeft }}
    </h2>
    <div 
      class='TheTopPanel__button'
      :class='[restartButtonClass]'
      @click='restart'
    >
    </div>
    <h2 class='TheTopPanel__counter TheTopPanel__counter_time'>
      {{ time }}
    </h2>
    <div 
      class='TheTopPanel__button TheTopPanel__button_ref'>
    </div>
  </div>
</template>

<script>
  import { mapState } from 'vuex';
  import { mapMutations } from 'vuex';

  export default {
    name: 'TheTopPanel',
    data() {
      return {
        time: 0,
        timerId: null,
        restartButtonClass: 'TheTopPanel__button_thinking'
      }
    },
    computed: {
      ...mapState({
        'stage': 'stage',
        'bombsNumber': state => state.settings.bombsNumber,
        'flagsCounter': 'flagsCounter'
      }),
      flagsLeft() {
        return this.bombsNumber - this.flagsCounter
      }
    },
    watch: {
      stage(value) {
        switch (value) {
          case 'win':
            this.restartButtonClass = 'TheTopPanel__button_cool';
            clearInterval(this.timerId);
            break;
          case 'losing':
            this.restartButtonClass = 'TheTopPanel__button_angry'
            clearInterval(this.timerId);
            break;
          case 'start':
            this.restartButtonClass = 'TheTopPanel__button_thinking';
            clearInterval(this.timerId);
            this.time = 0;
            break;
          case 'game':
            this.restartButtonClass = 'TheTopPanel__button_thinking';
            this.timerId = setInterval(() => this.time++, 1000);
            break;
        }
      }
    },
    created() {
      window.addEventListener('keyup', event => {
        if (event.code == 'F2') {
          this.restart()
        }
      })
    },
    methods: {
      ...mapMutations([
        'restart',
        'showPopUp'
      ])
    }
  }
</script>

<style>
  .TheTopPanel {
    height: 70px;
    background-color: #2196F3;
    box-shadow: inset 0 -5px #1976D2;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .TheTopPanel__button {
    width: 40px;
    height: 40px;
    margin: 0 10px;
    position: relative;
    transition: background-image .3s;
  }

  .TheTopPanel__button_thinking {
    background: no-repeat center/100% url(~@/assets/img/128/thinking.png);
  }
  
  .TheTopPanel__button_angry {
    background: no-repeat center/100% url(~@/assets/img/128/angry.png);
  }

  .TheTopPanel__button_cool {
    background: no-repeat center/100% url(~@/assets/img/128/cool.png);
  }

  .TheTopPanel__button_settings {
    background: no-repeat center/100% url(~@/assets/img/128/settings.png);
  }

  .TheTopPanel__button_ref {
    background: no-repeat center/100% url(~@/assets/img/128/ref.png);
  }

  .TheTopPanel__counter {
    max-width: 50px;
    margin: 0 10px;
    position: relative;
    text-align: center;
    font-family: Arial;
    color: #303130;
    flex-grow: 1;
  }

  .TheTopPanel__counter::before {
    position: absolute;
    color: #135ba3;
    font-size: 0.8em;
    top: -20px;
    left: 50%;
    transform: translateX(-50%);
  }

  .TheTopPanel__counter_flags::before {
    content: 'Flags';
  }

  .TheTopPanel__counter_time::before {
    content: 'Time';
  }
</style>