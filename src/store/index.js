import Vue from 'vue'
import Vuex from 'vuex';
Vue.use(Vuex);

const store = new Vuex.Store({
  state: {
    settings: {
      rowsNumber: 9,
      colsNumber: 9,
      minesNumber: 10
    },
    popUp: null,
    cells: [],
    minesIndexes: [],
    stage: 'start', // start (without mines), game, losing, win
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
    }
  },
  mutations: {
    updateCells(state, cells) {
    },
    setStage(state, stage) {
      state.stage = stage
    },
    toCheckCell(state, cell) {
      cell.isChecked = true;
      state.checkedCellsCounter++;
    },
    updateMinesSystem(state, indexes) {
      let getAreaSerialIndexes = this.getters.getAreaSerialIndexes;
      let cells = state.cells;
      for (let index of indexes) {
        cells[index].status = -1;
        state.minesIndexes.push(index);

        let mineArea = getAreaSerialIndexes(cells[index]).slice();
        for (let index of mineArea) {
          let cell = cells[index];
          if (cell.status != -1) cell.status++
        }
      }
    },
    reset(state, force) {
      state.minesIndexes.splice(0, state.minesIndexes.length);
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

      for (let index of state.minesIndexes) {
        state.cells[index].isChecked = true;
      }
    },  
    toWin(state) {
      state.stage = 'win'
    },
    setPopUp(state, popUpName) {
      state.popUp = popUpName
    },
    updateSettings(state, settings) {
      Object.assign(state.settings, settings);
    }
  }
});

export default store;