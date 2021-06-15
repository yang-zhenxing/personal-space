<template>
  <div class="empty-container">
    <Icon type="empty" />
    <p>{{ text }}</p>
  </div>
</template>

<script>
import Icon from "../Icon";
export default {
  props: {
    text: {
      type: String,
      default: "无数据",
    },
  },
  components: {
    Icon,
  },
};
</script>

<style lang="less" scoped>
@import "~@/styles/mixin.less";
.icon-container{
  font-size: 50px;
}
.empty-container{
  color: #999;
  font-size: 12px;
  .self-center();
  text-align: center;
  p{
    margin-top: 6px;
  }
}
</style>