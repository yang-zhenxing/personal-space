<template>
  <div class="test">
    <Menu />
  </div>
</template>

<script>
import Menu from "./"
import "../../styles/global.less";
export default {
  components:{
    Menu
  }
}
</script>

<style scoped>
.test{
  width: 400px;
  height: 600px;
  margin: 0 auto;
  background-color: #000;
  overflow: hidden;
}
</style>