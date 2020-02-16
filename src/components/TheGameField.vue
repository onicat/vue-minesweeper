<template>
  <div class='TheGameField'
    :style='{
      gridTemplateRows: `repeat(${rowsNumber}, 30px)`,
      gridTemplateColumns: `repeat(${colsNumber}, 30px)`
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

  export default {
    name: 'TheGameField',
    components: {
      CellItem
    },
    computed: {
      ...mapState({
        'rowsNumber': state => state.settings.rowsNumber,
        'colsNumber': state => state.settings.colsNumber,
        'stage': 'stage'
      }),
      ...mapGetters([
        'isWin'
      ])
    },
    methods: {
      ...mapMutations([
        'toggleFlag',
        'toLose',
        'installBombs',
        'openCells',
        'toWin',
        'setStage'
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