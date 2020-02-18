<template>
  <div class='TheGameField'
    :style='{
      gridTemplateRows: `repeat(${settings.rowsNumber}, 30px)`,
      gridTemplateColumns: `repeat(${settings.colsNumber}, 30px)`
    }'
  >
    <CellItem
      v-for='(cell, index) in $store.state.cells'
      :cell='cell'
      :key='index'
      @click.native='selectCell(cell)'
      @contextmenu.native='alternativeSelectCell(cell)'
    />
  </div>
</template>

<script>
  import { mapState } from 'vuex';
  import { mapMutations } from 'vuex';
  import { mapGetters } from 'vuex';
  import CellItem from '@/components/CellItem.vue';
  import fieldGenerator from '@/mixins/fieldGenerator.js';

  export default {
    name: 'TheGameField',
    mixins: [fieldGenerator],
    components: {
      CellItem
    },
    computed: {
      ...mapState([
        'settings',
        'stage',
        'cells',
        'checkedCellsCounter',
        'bombsIndexes'
      ]),
      ...mapGetters([
        'getAreaSerialIndexes'
      ]),
      isWin() {
        let uncheckedLeft = this.cells.length - this.checkedCellsCounter;
        return (uncheckedLeft == this.bombsIndexes.length) ? true : false; 
      }
    },
    created() {
      this.fieldGenerator_generateField()
    },
    methods: {
      ...mapMutations([
        'toggleFlag',
        'toLose',
        'toCheckCell',
        'toWin',
        'setStage',
        'updateBombsSystem'
      ]),
      alternativeSelectCell(cell) {
        if (this.stage == 'losing' || this.stage == 'win') {
          return
        }
      
        if (!cell.isChecked) {
          this.toggleFlag(cell);
        }
      },
      selectCell(cell) {
        let stage = this.stage;
        
        if (cell.isFlagged || stage == 'losing' || stage == 'win') {
          return
        }

        if (this.stage == 'start') {
          this.setStage('game');
          this.installBombs(cell);
        }

        if (cell.status == -1) {
          this.toLose(cell);
        }

        this.openCells(cell);

        if (this.isWin) {
          this.toWin()
        }
      },
      installBombs(cell) {
        let clickArea = this.getAreaSerialIndexes(cell);
        let indexes = [];
        let cells = this.cells;
        
        clickArea.push(cell.row * this.settings.colsNumber + cell.col);
      
        while (indexes.length < this.settings.bombsNumber) {
          let index = Math.floor(Math.random() * cells.length);

          if (clickArea.includes(index) || indexes.includes(index)) {
            continue
          }

          indexes.push(index);
        }

        this.updateBombsSystem(indexes);
      },
      openCells(cell) {
        let line = [cell.row * this.settings.colsNumber + cell.col];
        let cells = this.cells;

        while (line.length > 0) {
          let cell = cells[line[line.length - 1]];

          line.pop();
          if (cell.isChecked) continue;
          if (cell.status == 0) {
            line.push(...this.getAreaSerialIndexes(cell));
          }
          
          this.toCheckCell(cell);
          
          if (cell.isFlagged) {
            this.toggleFlag(cell)
          }
        }
      }
    }
  }
</script>

<style>
  .TheGameField {
    display: grid;
    margin: 2px auto 0;
    grid-gap: 2px; /* for old browser */
    gap: 2px;
  }
</style>