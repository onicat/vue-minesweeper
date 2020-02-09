import Vue from 'vue'
import Vuex from 'vuex';
Vue.use(Vuex);

const store = new Vuex.Store({
  state: {
    settings: {
      rowsNumber: 16,
      colsNumber: 30,
      bombsNumber: 100
    },
    cells: [],
    bombsIndexes: new Set()
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
    generateField(state) {
      for (let row = 0; row < state.settings.rowsNumber; row++) {
        for (let col = 0; col < state.settings.colsNumber; col++) {
          let cell = {
            row,
            col,
            status: 0, /* -1 - bomb, else number of bombs around */
            isChecked: false,
            isFlagged: false
          };

          state.cells.push(cell);
        }
      }  
    },
    selectCell(state, cell) {
      if (state.bombsIndexes.size == 0) {
        this.commit('installBombs', cell);
      }
      
      this.commit('openCells', cell);
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
    restart(state) {
      state.bombsIndexes.clear();
      for (let cell of state.cells) {
        cell.isChecked = false;
        cell.isFlagged = false;
        cell.status = 0;
      }
    }
  }
});

export default store;