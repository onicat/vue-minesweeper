<template>
  <BasePopUp class='PopUpSettings'>
    <h2 class='PopUpSettings__title'>Settings</h2>
    <div class='PopUpSettings__section'>
      <button
        class='BasePopUp__button BasePopUp__button_small'
        @click='selectDifficulty("Easy")'
      >
        Easy  
      </button>
      <button
        class='BasePopUp__button BasePopUp__button_small'
        @click='selectDifficulty("Medium")'
      >
        Medium  
      </button>
      <button
        class='BasePopUp__button BasePopUp__button_small'
        @click='selectDifficulty("Expert")'
      >
        Expert  
      </button>
    </div>
    <div class='PopUpSettings__section PopUpSettings__section_inputs'>
      Width:
      <input 
        class='PopUpSettings__input'
        type="number"
        v-model.lazy.number='cache.colsNumber'
        @change='
          validateCache("colsNumber", 9, 100);
          validateCache("minesNumber", 10, minesLimit);
        '
      >
      Height:
      <input 
        class='PopUpSettings__input'
        type="number"
        v-model.lazy.number='cache.rowsNumber'
        @change='
          validateCache("rowsNumber", 9, 100);
          validateCache("minesNumber", 10, minesLimit);
        '
      >
      Mines:
      <input 
        class='PopUpSettings__input'
        type="number"
        v-model.lazy.number='cache.minesNumber'
        @change='validateCache("minesNumber", 10, minesLimit)'
      >
    </div>
    <div class='PopUpSettings__section'>
      <button
        class='BasePopUp__button BasePopUp__button_big'
        @click='
          updateSettings(cache);
          restart(true);
          setPopUp(null)
        '
      >
        Ok
      </button>
      <button
        class='BasePopUp__button BasePopUp__button_big'
        @click='setPopUp(null)'
      >
        Cancel
      </button>
    </div>
  </BasePopUp>
</template>

<script>
  import { mapState } from 'vuex';
  import { mapMutations } from 'vuex';
  import fieldGenerator from '@/mixins/fieldGenerator.js';
  import BasePopUp from '@/components/BasePopUp';

  export default {
    name: 'PopUpSettings',
    mixins: [
      fieldGenerator
    ],
    components: {
      BasePopUp
    },
    data() {
      return {
        cache: {
          rowsNumber: null,
          colsNumber: null,
          minesNumber: null
        }
      }
    },
    computed: {
      ...mapState([
        'settings'
      ]),
      minesLimit() {
        return this.cache.colsNumber * this.cache.rowsNumber - 9
      }
    },
    created() {
      Object.assign(this.cache, this.settings)
    },
    methods: {
      ...mapMutations([
        'setPopUp',
        'updateSettings',
        'reset'
      ]),
      selectDifficulty(difficulty) {
        switch (difficulty) {
          case 'Easy':
            this.cache = {
              rowsNumber: 9,
              colsNumber: 9,
              minesNumber: 10
            };
            break;
          case 'Medium':
            this.cache = {
              rowsNumber: 16,
              colsNumber: 16,
              minesNumber: 40
            };
            break;
          case 'Expert':
            this.cache = {
              rowsNumber: 16,
              colsNumber: 30,
              minesNumber: 99
            };
            break;
        }
      },
      validateCache(property, min, max) {
        let cache = this.cache;
        if (cache[property] < min) cache[property] = min;
        if (cache[property] > max) cache[property] = max;
      },
      restart() {
        this.reset(true);
        this.fieldGenerator_generateField()
      }
    }
  }
</script>

<style>
  .PopUpSettings__title {
    margin: 15px 0;
    font-size: 2em;
  }

  .PopUpSettings__section {
    margin: 15px 0;
    display: flex;
    justify-content: center;
  }

  .PopUpSettings__section_inputs {
    margin-top: 10px;
    flex-direction: column;
    align-items: center;
  }

  .PopUpSettings__input {
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