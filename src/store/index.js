import Vue from 'vue'
import Vuex from 'vuex';
Vue.use(Vuex);

const store = new Vuex.Store({
  state: {
    settings: {
      rowsNumber: 10,
      colsNumber: 10,
      bombsNumber: 10
    },
    cells: []
  },
  mutations: {
    generateField(state) {
      for (let row = 0; row < state.settings.rowsNumber; row++) {
        for (let col = 0; col < state.settings.colsNumber; col++) {
          let cell = {
            row,
            col,
            checked: false,
            isBomb: false,
            isFlagged: false
          };

          state.cells.push(cell);
        }
      }  
    }
  }
});

export default store;