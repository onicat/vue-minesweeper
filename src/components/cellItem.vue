<template>
  <div 
    class='cell-item'
    :class='{
      checked: cell.isChecked,
      flag: cell.isFlagged
    }'
  >
  </div>
</template>

<script>
  export default {
    name: 'cellItem',
    props: ['cell']
  }
</script>

<style scoped>
  .cell-item {
    background-color: #2196F3;
    border-radius: 3px;
    box-shadow: inset 0 -5px #1976D2;
  }

  .checked {
    background-color: #1976D2;
  }

  .bomb {
    background: no-repeat center/80% url(~@/assets/img/bomb.svg), #1976D2;
    box-shadow: none;
  }

  .flag {
    background: no-repeat center/80% url(~@/assets/img/flag.svg) #2196F3;
    box-shadow: none;
  }
</style>