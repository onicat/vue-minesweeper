import { mapState } from 'vuex';
import { mapMutations } from 'vuex';

export default {
  computed: {
    ...mapState({
      'rowsNumber': state => state.settings.rowsNumber,
      'colsNumber': state => state.settings.colsNumber,
    })
  },
  methods: {
    ...mapMutations([
      'updateCells'
    ]),
    fieldGenerator_generateField() {
      let cells = [];
      
      for (let row = 0; row < this.rowsNumber; row++) {
        for (let col = 0; col < this.colsNumber; col++) {
          let cell = {
            row,
            col,
            status: 0, /* -2 - explosion, -1 - mine, else bombs around */
            isChecked: false,
            isFlagged: false
          };
    
          cells.push(cell);
        }
      }
    
      this.updateCells(cells);
    }
  }
}