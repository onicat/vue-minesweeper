<template lang='pug'>
  div.BasePopUp
    div.BasePopUp__window
      slot
</template>

<script>

export default {
  name: 'BasePopUp'
}
</script>

<style>
  .BasePopUp {
    width: 100%;
    height: 100%;
    text-align: center;
    position: absolute;
    left: 0;
    top: 0;
    background: rgba(0, 0, 0, 0.5);
  }

  .BasePopUp__window {
    width: 90%;
    max-width: 400px;
    height: 90%;
    max-height: 400px;
    position: absolute;
    left: 50%;
    top: 50%;
    border-radius: 5px;
    transform: translate(-50%, -50%);
    background: #2196F3;
    box-shadow: 0 5px #1976D2;
    font-family: Arial;
    color: #303130;
    overflow: auto;
  }

  .BasePopUp__button {
    border: 1px solid #303130;
    padding: 0;
    border-radius: 5px;
    box-shadow: inset 0 -3px #1976D2;
    background-color: #2196F3;
    outline: none;
    color: #303130;
    font-size: 1.2em;
    flex-flow: 1;
    margin: 0 10px;
  }

  .BasePopUp__button:active {
    background-color: #1976D2;
    padding-top: 3px;
  }

  .BasePopUp__button_small {
    width: 100px;
    height: 40px;
  }

  .BasePopUp__button_big {
    width: 150px;
    height: 50px;
  }
</style>