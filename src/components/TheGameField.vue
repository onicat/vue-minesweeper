<template lang='pug'>

  div.TheGameField(
    :style='TheGameFieldStyles'
  )
    CellItem(
      v-for='(cell, index) in $store.state.cells'
      :cell='cell'
      :key='index'
      :isLighted='lightedCellIndexes.includes(index)'
      @click.native='selectCell(cell)'
      @contextmenu.native='alternativeSelectCell(cell)'
    )

</template>

<script>
  import { mapState } from 'vuex';
  import { mapMutations } from 'vuex';
  import { mapGetters } from 'vuex';
  import CellItem from '@/components/CellItem.vue';
  import fieldGenerator from '@/mixins/fieldGenerator.js';

  export default {
    name: 'TheGameField',
    components: {
      CellItem
    },
    mixins: [fieldGenerator],
    data() {
      return {
        lightedCellIndexes: [],
        lightingTimer: null
      }
    },
    computed: {
      ...mapState([
        'settings',
        'stage',
        'cells',
        'checkedCellsCounter',
        'minesIndexes'
      ]),
      ...mapGetters([
        'getAreaSerialIndexes'
      ]),
      isWin() {
        let uncheckedLeft = this.cells.length - this.checkedCellsCounter;
        return (uncheckedLeft == this.minesIndexes.length) ? true : false; 
      },
      TheGameFieldStyles() {
        return {
          gridTemplateRows: `repeat(${this.settings.rowsNumber}, 30px)`,
          gridTemplateColumns: `repeat(${this.settings.colsNumber}, 30px)`
        }
      }
    },
    watch: {
      stage() {
        this.lightedCellIndexes = [];
        clearTimeout(this.lightingTimer);
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
        'updateMinesSystem'
      ]),
      alternativeSelectCell(cell) {
        if (this.stage == 'losing' || this.stage == 'win') {
          return
        }
      
        if (cell.isChecked) {
          
          if (this.lightedCellIndexes.length != 0) return;
          this.lightedCellIndexes.push(...this.getAreaSerialIndexes(cell));
          this.lightingTimer = setTimeout(() => this.lightedCellIndexes = [], 10000);
        
        } else {
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
          this.installMines(cell);
        }

        if (cell.status == -1) {
          this.toLose(cell);
        }

        this.openCells(cell);

        if (this.isWin) {
          this.toWin()
        }
      },
      installMines(cell) {
        let clickArea = this.getAreaSerialIndexes(cell);
        let indexes = [];
        let cells = this.cells;
        
        clickArea.push(cell.row * this.settings.colsNumber + cell.col);
      
        while (indexes.length < this.settings.minesNumber) {
          let index = Math.floor(Math.random() * cells.length);

          if (clickArea.includes(index) || indexes.includes(index)) {
            continue
          }

          indexes.push(index);
        }

        this.updateMinesSystem(indexes);
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