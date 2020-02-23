<template lang="pug">
  mixin button(text, size)
    button.BasePopUp__button(
      class=`BasePopUp__button_${size}`
    )&attributes(attributes)
      =text

  mixin input(model, title)
    =title
    input.PopUpSettings__input(
      type='number'
      v-model.lazy.number=`${model}`
    )&attributes(attributes)

  BasePopUp.PopUpSettings
    h2.PopUpSettings__title Settings
    div.PopUpSettings__section
      +button('Easy', 'small')(
        @click='selectDifficulty("Easy")'
      )
      +button('Medium', 'small')(
        @click='selectDifficulty("Medium")'
      )
      +button('Expert', 'small')(
        @click='selectDifficulty("Expert")'
      )
    
    div.PopUpSettings__section.PopUpSettings__section_inputs
      +input('cache.colsNumber', 'Width')(
        @change='validateCache("colsNumber","minesNumber")'
      )
      +input('cache.rowsNumber', 'Height')(
        @change='validateCache("rowsNumber", "minesNumber")'
      )
      +input('cache.minesNumber', 'Mines')(
        @change='validateCache("minesNumber")'
      )

    div.PopUpSettings__section
      +button('Ok', 'big')(
        @click='confirmChanges()'
      )
      +button('Cancel', 'big')(
        @click='setPopUp(null)'
      )
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
    validateCache(...cacheProps) {
      let cache = this.cache;
      function equalize(prop, min, max) {
        cache[prop] = Math.max(min, cache[prop]);
        cache[prop] = Math.min(max, cache[prop]);
      }

      for (let prop of cacheProps) {
        if (prop == 'minesNumber') {
          equalize('minesNumber', 10, this.minesLimit)
        } else {
          equalize(prop, 9, 100)
        }
      }
    },
    restart() {
      this.reset(true);
      this.fieldGenerator_generateField()
    },
    confirmChanges() {
      this.updateSettings(this.cache);
      this.restart(true);
      this.setPopUp(null);
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