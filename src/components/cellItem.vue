<template>
  <div 
    class='CellItem'
    :class='{
      "CellItem_checked": cell.isChecked,
      "CellItem_flag": cell.isFlagged,
      "CellItem_explosion": cell.status == -2,
      "CellItem_bomb": cell.isChecked && cell.status == -1
    }'
  > {{ (cell.isChecked && cell.status > 0) ? cell.status : null }}
  </div>
</template>

<script>
  export default {
    name: 'CellItem',
    props: {
      cell: Object
    }
  }
</script>

<style>
  .CellItem {
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

  .CellItem_checked {
    background-color: #1976D2;
  }

  .CellItem_bomb {
    background: no-repeat center/80% url(~@/assets/img/64/bomb.png),
              #2196F3;
    box-shadow: none;
  }

  .CellItem_flag {
    background: no-repeat center/80% url(~@/assets/img/64/flag.png),
              #2196F3;
    box-shadow: none;
  }

  .CellItem_explosion {
    background: no-repeat center/80% url(~@/assets/img/64/explosion.png) 
              #2196F3;
    box-shadow: none;
  }
</style>