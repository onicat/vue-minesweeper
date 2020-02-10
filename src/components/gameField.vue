<template>
  <div class='game-field'
    :style='{
      gridTemplateRows: `repeat(${$store.state.settings.rowsNumber}, 30px)`,
      gridTemplateColumns: `repeat(${$store.state.settings.colsNumber}, 30px)`
    }'
  >
    <cellItem
      v-for='(cell, index) in $store.state.cells'
      :cell='cell'
      :key='index'
    />
  </div>
</template>

<script>
  import cellItem from '@/components/cellItem.vue';

  export default {
    name: 'gameField',
    components: {
      cellItem
    }
  }
</script>

<style scoped>
  .game-field {
    display: grid;
    margin: 2px auto 0;
    grid-gap: 2px; /* for old browser */
    gap: 2px;
  }
</style>