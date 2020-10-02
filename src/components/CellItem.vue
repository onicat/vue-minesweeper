<script>
export default {
  name: 'CellItem',
  functional: true,
  props: {
    cell: Object,
    isLighted: Boolean,
    stage: String
  },
  
  render(h, ctx) {
    let isLighted = ctx.props.isLighted;
    let cell = ctx.props.cell;
    let stage = ctx.props.stage;
    let isGameOver = stage == STAGE_WIN || stage == STAGE_LOSS;
    let classes = ['CellItem'];
    
    if (isLighted) {
      if (cell.status == STATUS_LOSS) {
        classes.push('CellItem_lighted_red')
      } else {
        classes.push('CellItem_lighted_green')
      }
    }

    if (cell.isChecked) {
      classes.push('CellItem_checked');

      if (cell.status == STATUS_LOSS) {
        classes.push('CellItem_mine')
      }
    }

    if (cell.status == STATUS_EXPOSION) {
      classes.push('CellItem_explosion')
    }

    if (cell.isFlagged) {
      classes.push('CellItem_flag');

      if (isGameOver && cell.status > -1) {
        classes.push('CellItem_mistake')
      }
    }

    return h('div', {
      class: classes,
      on: ctx.listeners
    }, (cell.isChecked && cell.status > 0) ? cell.status : null
    )
  }
}
</script>

<style>
  .CellItem {
    background-color: #2196F3;
    box-shadow: inset 0 -0.2em #1976D2;
    display: flex;
    justify-content: center;
    align-items: center;
    font-family: Arial;
    font-weight: bold;
    color: #303130;
  }

  .CellItem_checked {
    background-color: #1976D2;
  }

  .CellItem_mine {
    background: no-repeat center/70% url(~@/assets/img/64/bomb.png),
              #2196F3;
  }

  .CellItem_flag {
    background: no-repeat center/70% url(~@/assets/img/64/flag.png),
              #2196F3;
  }

  .CellItem_explosion {
    background: no-repeat center/70% url(~@/assets/img/64/explosion.png) 
              #2196F3;
  }

  .CellItem_mistake {
    background: no-repeat center/70% url(~@/assets/img/64/mistake.png) 
              #2196F3;
  }

  .CellItem_lighted_green {
    box-shadow: inset 0px 0px 5px 2px #8BC34A;
    transition: box-shadow .3s;
  }

  .CellItem_lighted_red {
    box-shadow: inset 0px 0px 5px 2px #E91E63;
    transition: box-shadow .3s;
  }
</style>