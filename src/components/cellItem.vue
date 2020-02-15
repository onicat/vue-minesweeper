<template>
  <div 
    class='cell-item'
    :class='{
      checked: cell.isChecked,
      flag: cell.isFlagged,
      explosion: cell.status == -2,
      bomb: cell.isChecked && cell.status == -1
    }'
    @click='selectCell(cell)'
    @contextmenu='toggleFlag(cell)'
  > {{ (cell.isChecked && cell.status > 0) ? cell.status : null }}
  </div>
</template>

<script>
  export default {
    name: 'CellItem',
    props: ['cell'],
    methods: {
      selectCell(cell) {
        this.$store.commit('selectCell', cell);
      },
      toggleFlag(cell) {
        this.$store.commit('toggleFlag', cell);
      }
    }
  }
</script>

<style scoped>
  .cell-item {
    background-color: #2196F3;
    box-shadow: inset 0 -3px #1976D2; 
    display: flex;
    justify-content: center;
    align-items: center;
    font-family: Arial;
    font-weight: bold;
    color: #303130;
    font-size: 1.2em;
  }

  .checked {
    background-color: #1976D2;
  }

  .bomb {
    background: no-repeat center/80% url(~@/assets/img/64/bomb.png),
              #2196F3;
    box-shadow: none;
  }

  .flag {
    background: no-repeat center/80% url(~@/assets/img/64/flag.png),
              #2196F3;
    box-shadow: none;
  }

  .explosion {
    background: no-repeat center/80% url(~@/assets/img/64/explosion.png) 
              #2196F3;
    box-shadow: none;
  }
</style>