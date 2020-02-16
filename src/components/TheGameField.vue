<template>
  <div class='TheGameField'
    :style='{
      gridTemplateRows: `repeat(${$store.state.settings.rowsNumber}, 30px)`,
      gridTemplateColumns: `repeat(${$store.state.settings.colsNumber}, 30px)`
    }'
  >
    <CellItem
      v-for='(cell, index) in $store.state.cells'
      :cell='cell'
      :key='index'
    />
  </div>
</template>

<script>
  import CellItem from '@/components/CellItem.vue';

  export default {
    name: 'TheGameField',
    components: {
      CellItem
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