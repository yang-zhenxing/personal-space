<template>
  <div class="test">
    <SiteAside />
  </div>
</template>

<script>
import SiteAside from "./";
import "../../styles/global.less";
export default {
  components: {
    SiteAside,
  },
};
</script>

<style scoped lang="less">
.test {
  width: 300px;
  height: 100vh;
}
</style>