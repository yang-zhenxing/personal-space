<template>
  <div id="app">
    <layout class="layout">
      <template v-slot:left>
        <div class="aside">
          <SiteAside />
        </div>
      </template>
      <template>
        <RouterView />
      </template>
      <!-- <template #right>
        <div class="right"></div>
      </template> -->
    </layout>
    <ToTop />
  </div>
</template>

<script>
import Layout from "@/components/Layout";
import SiteAside from "@/components/SiteAside";
import ToTop from "@/components/ToTop";
export default {
  components: {
    Layout,
    SiteAside,
    ToTop,
  },
};
</script>

<style lang="less" scoped>
@import "~@/styles/mixin.less";
.layout {
  .self-fill(fixed);
  .aside {
    width: 250px;
    height: 100%;
  }
  .right {
    width: 150px;
    height: 100%;
    background: #008c8c;
  }
}
</style>
