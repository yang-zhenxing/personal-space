<template>
  <div class="test">
    <div v-for="item in classMap" :key="item">
      <Icon :type="item" />
      <span>{{ item }}</span>
    </div>
  </div>
</template>

<script>
import Icon, { iconMap } from "./";
export default {
  components: {
    Icon,
  },
  data() {
    return {
      classMap: iconMap,
    };
  },
};
</script>

<style lang="less" scoped>
.test {
  display: flex;
  justify-content: center;
  width: 580px;
  margin: 30px auto;
  flex-wrap: wrap;
  align-items: center;
  & > div {
    margin: 1em;
    text-align: center;
  }
}
.icon-container {
  display: block;
  font-size: 24px;
}
</style>