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
    bombsIndexes: new Set(),
    stage: 'start', // start, game, losing, win
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
      return (uncheckedLeft == state.bombsIndexes.size) ? true : false; 
    }
  },
  mutations: {
    generateField(state) {
      for (let row = 0; row < state.settings.rowsNumber; row++) {
        for (let col = 0; col < state.settings.colsNumber; col++) {
          let cell = {
            row,
            col,
            status: 0, /* -2 - explosion, -1 - bomb, else bombs around */
            isChecked: false,
            isFlagged: false
          };

          state.cells.push(cell);
        }
      }  
    },
    setStage(state, stage) {
      state.stage = stage
    },
    openCells(state, cell) {
      let line = [cell.row * state.settings.colsNumber + cell.col];
      let cells = state.cells;

      while (line.length > 0) {
        let cell = cells[line[line.length - 1]];

        line.pop();
        if (cell.isChecked) continue;
        if (cell.status == 0) {
          line.push(...this.getters.getAreaSerialIndexes(cell));
        }

        cell.isChecked = true;
        state.checkedCellsCounter++;
        if (cell.isFlagged) {
          cell.isFlagged = false;
          state.flagsCounter--;
        }
      }
    },
    installBombs(state, cell) {
      let bombsIndexes = state.bombsIndexes;
      let cells = state.cells;
      let clickArea = this.getters.getAreaSerialIndexes(cell);
      clickArea.push(cell.row * state.settings.colsNumber + cell.col);

      while (bombsIndexes.size < state.settings.bombsNumber) {
        let index = Math.floor(Math.random() * cells.length);

        if (clickArea.includes(index) || bombsIndexes.has(index)) continue;
        bombsIndexes.add(index);
        cells[index].status = -1;
        
        let bombArea = this.getters.getAreaSerialIndexes(cells[index]);
        for (let index of bombArea) {
          let cell = cells[index];
          if (cell.status != -1) cell.status++
        }
      }
    },
    restart(state, force) {
      state.bombsIndexes.clear();
      state.stage = 'start';
      state.checkedCellsCounter = 0;
      state.flagsCounter = 0;

      if (force) {
        state.cells = [];
        this.commit('generateField')
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
      this.commit('setStage', 'losing');
      cell.status = -2;

      for (let index of state.bombsIndexes) {
        state.cells[index].isChecked = true;
      }
    },
    toWin() {
      this.commit('setStage', 'win');
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