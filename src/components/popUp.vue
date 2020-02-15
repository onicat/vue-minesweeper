<template>
  <div class='pop-up'>
    <div class='pop-up__window'>
      <h2 class='pop-up__title'>Settings</h2>
      <div class='pop-up__section'>
        <button 
          class='pop-up__button pop-up__button_difficulty'
          @click='selectDifficulty("Easy")'
        >
          Easy
        </button>
        <button 
          class='pop-up__button pop-up__button_difficulty'
          @click='selectDifficulty("Medium")'
        >
          Medium
        </button>
        <button 
          class='pop-up__button pop-up__button_difficulty'
          @click='selectDifficulty("Expert")'
        >
          Expert
        </button>
      </div>
      <div class='pop-up__section pop-up__section_input'>
        Width:
        <input 
          class='pop-up__input'
          type='number'
          v-model.lazy.number='cache.colsNumber'
          @change='
            validateCache("colsNumber", 9, 100);
            validateCache("bombsNumber", 10, cacheBombsLimit)
          '
        >
        Height:
        <input 
          class='pop-up__input'
          type='number'
          v-model.lazy.number='cache.rowsNumber'
          @change='
            validateCache("rowsNumber", 9, 100);
            validateCache("bombsNumber", 10, cacheBombsLimit)
          '
        >
        Bombs:
        <input 
          class='pop-up__input'
          type='number'
          v-model.lazy.number='cache.bombsNumber'
          @change='validateCache("bombsNumber", 10, cacheBombsLimit)'
        >
      </div>
      <div class='pop-up__section pop-up__section_confirm-buttons'>
        <button 
          class='pop-up__button pop-up__button_confirm'
          @click='
            updateSettings(cache);
            closePopUp();
          '
        >
          Ok
        </button>
        <button 
          class='pop-up__button pop-up__button_confirm'
          @click='closePopUp()'
        >
          Cancel
        </button>
      </div>
    </div>
  </div>
</template>

<script>
  import { mapState } from 'vuex';
  import { mapMutations } from 'vuex';

  export default {
    name: 'popUp',
    data() {
      return {
        cache: {
          rowsNumber: null,
          colsNumber: null,
          bombsNumber: null
        }
      }
    },
    computed: {
      ...mapState([
        'settings'
      ]),
      cacheBombsLimit() {
        return this.cache.colsNumber * this.cache.rowsNumber - 9
      }
    },
    created() {
      Object.assign(this.cache, this.settings)
    },
    methods: {
      ...mapMutations([
        'closePopUp',
        'updateSettings'
      ]),
      selectDifficulty(difficulty) {
        switch (difficulty) {
          case 'Easy':
            this.cache = {
              rowsNumber: 9,
              colsNumber: 9,
              bombsNumber: 10
            };
            break;
          case 'Medium':
            this.cache = {
              rowsNumber: 16,
              colsNumber: 16,
              bombsNumber: 40
            };
            break;
          case 'Expert':
            this.cache = {
              rowsNumber: 16,
              colsNumber: 30,
              bombsNumber: 99
            };
            break;
        }
      },
      validateCache(property, min, max) {
        let cache = this.cache;
        if (cache[property] < min) cache[property] = min;
        if (cache[property] > max) cache[property] = max;
      }
    }
  }
</script>

<style scoped>
  .pop-up {
    width: 100%;
    height: 100%;
    text-align: center;
    position: absolute;
    left: 0;
    top: 0;
    background: rgba(0, 0, 0, 0.5);
    overflow: auto;
  }

  .pop-up__window {
    width: 90%;
    max-width: 400px;
    height: 90%;
    max-height: 400px;
    padding: 10px 0;
    position: absolute;
    left: 50%;
    top: 50%;
    border-radius: 5px;
    transform: translate(-50%, -50%);
    background: #2196F3;
    box-shadow: 0 5px #1976D2;
    font-family: Arial;
    color: #303130;
    overflow: auto;
  }

  .pop-up__title {
    margin: 15px 0;
    font-size: 2em;
  }

  .pop-up__section {
    display: flex;
    justify-content: center;
  }

  .pop-up__section_confirm-buttons {
    margin-top: 20px;
  }

  .pop-up__section_input {
    margin-top: 10px;
    flex-direction: column;
    align-items: center;
  }

  .pop-up__button {
    border: 1px solid #303130;
    padding: 0;
    border-radius: 5px;
    box-shadow: inset 0 -3px #1976D2;
    background-color: #2196F3;
    outline: none;
    color: #303130;
    font-size: 1.2em;
    flex-flow: 1;
    margin: 0 10px;
  }

  .pop-up__button:active {
    background-color: #1976D2;
    padding-top: 3px;
  }

  .pop-up__button_difficulty {
    width: 100px;
    height: 40px;
  }

  .pop-up__button_confirm {
    width: 150px;
    height: 50px;
  }

  .pop-up__input {
    width: 40%;
    margin-bottom: 10px;
    padding: 5px 10px; 
    font-size: 1.2em;
    color: #303130;
    background-color: #1976D2;
    border: none;
    outline: none;
  }
</style>