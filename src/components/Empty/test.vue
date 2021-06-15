<template>
  <div class="test">
    <empty text="无数据"/>
  </div>
</template>

<script>
import Empty from "./"
export default {
  components:{
    Empty
  }
}
</script>

<style scoped>
.test{
  width: 300px;
  height: 500px;
  position: relative;
}
</style>