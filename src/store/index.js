import Vue from 'vue'
import Vuex from 'vuex';
Vue.use(Vuex);

const store = new Vuex.Store({
  state: {
    settings: {
      rowsNumber: 9,
      colsNumber: 9,
      bombsNumber: 10
    },
    popUp: null,
    cells: [],
    bombsIndexes: [],
    stage: 'start', // start (without bombs), game, losing, win
    checkedCellsCounter: 0,
    flagsCounter: 0
  },
  getters: {
    getAreaSerialIndexes: state => target => {
      let area = [];

      for (let i = -1; i <= 1; i++) {
        let row = target.row + i;
        if (row < 0 || row > state.settings.rowsNumber - 1) continue;
        
        for (let j = -1; j <= 1; j++) {
          if (i == 0 && j == 0) continue;

          let col = target.col + j;
          if (col < 0 || col > state.settings.colsNumber - 1) continue;

          area.push(row * state.settings.colsNumber + col);
        }
      }

      return area;
    },
    isWin: state => {
      let uncheckedLeft = state.cells.length - state.checkedCellsCounter;
      return (uncheckedLeft == state.bombsIndexes.length) ? true : false; 
    }
  },
  mutations: {
    updateCells(state, cells) {
      state.cells = cells;
    },
    setStage(state, stage) {
      state.stage = stage
    },
    toCheckCell(state, cell) {
      cell.isChecked = true;
      state.checkedCellsCounter++;
    },
    updateBombsSystem(state, indexes) {
      let cells = state.cells;
      for (let index of indexes) {
        cells[index].status = -1;
        state.bombsIndexes.push(index);

        let bombArea = this.getters.getAreaSerialIndexes(cells[index]);
        for (let index of bombArea) {
          let cell = cells[index];
          if (cell.status != -1) cell.status++
        }
      }
    },
    reset(state, force) {
      state.bombsIndexes = [];
      this.commit('setStage', 'start');
      state.checkedCellsCounter = 0;
      state.flagsCounter = 0;

      if (force) {
        state.cells = [];
      } else {
        for (let cell of state.cells) {
          cell.isChecked = false;
          cell.isFlagged = false;
          cell.status = 0;
        }
      }
    },
    toggleFlag(state, cell) {
      (cell.isFlagged) ? state.flagsCounter-- : state.flagsCounter++;
      cell.isFlagged = !cell.isFlagged
    },
    toLose(state, cell) {
      state.stage = 'losing';
      cell.status = -2;

      for (let index of state.bombsIndexes) {
        state.cells[index].isChecked = true;
      }
    },
    toWin(state) {
      state.stage = 'win'
    },
    setPopUp(state, popUp) {
      state.popUp = popUp
    },
    updateSettings(state, settings) {
      Object.assign(state.settings, settings);
    }
  }
});

export default store;