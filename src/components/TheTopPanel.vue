<template lang='pug'>
  div.TheTopPanel
    div.TheTopPanel__button.TheTopPanel__button_settings(
      @click='setPopUp("settings")'
    )
    h2.TheTopPanel__counter.TheTopPanel__counter_flags
      | {{ flagsLeft }}
    div.TheTopPanel__button(
      :class='[restartButtonClass]'
      @click='reset()'
    )
    h2.TheTopPanel__counter.TheTopPanel__counter_time
      | {{ time }}
    div.TheTopPanel__element-container
      div.TheTopPanel__size-slider-container(
        v-if='isSizeSliderVisible'
      )
        input.TheTopPanel__size-slider(
          type='range'
          v-model.number='sizeSliderValue'
          @input='updateCellSize(sizeSliderValue)'
          min='30'
          max='60'
          step='10'
        )
      div.TheTopPanel__button.TheTopPanel__button_resize(
        @click='isSizeSliderVisible = !isSizeSliderVisible'
      )
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
      restartButtonClass: 'TheTopPanel__button_thinking',
      isSizeSliderVisible: false,
      sizeSliderValue: 30
    }
  },
  computed: {
    ...mapState({
      'stage': 'stage',
      'minesNumber': state => state.settings.minesNumber,
      'flagsCounter': 'flagsCounter'
    }),
    flagsLeft() {
      return this.minesNumber - this.flagsCounter
    }
  },
  watch: {
    stage(value) {
      switch (value) {
        case STAGE_WIN:
          this.restartButtonClass = 'TheTopPanel__button_cool';
          clearInterval(this.timerId);
          break;
        case STAGE_LOSS:
          this.restartButtonClass = 'TheTopPanel__button_angry'
          clearInterval(this.timerId);
          break;
        case STAGE_START:
          this.restartButtonClass = 'TheTopPanel__button_thinking';
          clearInterval(this.timerId);
          this.time = 0;
          break;
        case STAGE_GAME:
          this.restartButtonClass = 'TheTopPanel__button_thinking';
          this.timerId = setInterval(() => this.time++, 1000);
          break;
      }
    }
  },
  created() {
    window.addEventListener('keyup', event => {
      if (event.code == REFRESH_BUTTON) {
        this.reset()
      }
    })
  },
  methods: {
    ...mapMutations([
      'setPopUp',
      'reset',
      'updateCellSize'
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
    transition: all .2s;
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

  .TheTopPanel__button_settings:active {
    transform: rotate(360deg)
  }

  .TheTopPanel__button_resize {
    background: no-repeat center/100% url(~@/assets/img/128/resize.png);
  }

  .TheTopPanel__element-container {
    position: relative;
  }

  .TheTopPanel__size-slider-container {
    width: 50px;
    height: 200px;
    top: -5px;
    left: 5px;
    position: absolute;
    background-color: #1976D2;
    border-radius: 5px;
    border: 1px solid #303130;
  }

  .TheTopPanel__size-slider {
    height: 5px;
    width: 130px;
    margin: 0;
    position: absolute;
    bottom: 35%;
    left: 50%;
    transform: translate(-50%, -50%) rotate(-90deg);
    appearance: none;
    border-radius: 20px;
    outline: none;
    background-color: #303130;
  }
  
  .TheTopPanel__size-slider::-webkit-slider-thumb {
    appearance: none;
    background-color: #2196F3;
    width: 10px;
    height: 20px;
    border-radius: 5px;
  }

  .TheTopPanel__size-slider::-moz-range-thumb {
    background-color: #2196F3;
    width: 10px;
    height: 20px;
    border: none;
    border-radius: 5px;
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