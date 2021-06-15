<template>
  <div class="site-aside-container">
    <template v-if="data">
      <Avaror :size="150" :url="data.avatar" />
      <h1 class="title">{{ data.siteTitle }}</h1>
    </template>
    <Menu />
    <Contact v-if="data"/>
    <p v-if="data" class="footer">{{ data.icp }}</p>
  </div>
</template>

<script>
import Avaror from "../Avator";
import Menu from "./Menu";
import Contact from "./Contact";
import { mapState } from "vuex";
export default {
  components: {
    Avaror,
    Menu,
    Contact,
  },
  computed: {
    ...mapState("setting", ["data"]),
  },
};
</script>

<style scoped lang="less">
@import "~@/styles/var.less";
.site-aside-container {
  width: 100%;
  height: 100%;
  background: @dark;
  padding: 20px 0;
  box-sizing: border-box;
  color: @words;
  overflow-x: hidden;
  overflow-y: auto;
}
.avator-container {
  margin: 0 auto;
}
.footer {
  text-align: center;
  font-size: 12px;
}
.title {
  font-size: 1.2em;
  color: #fff;
  text-align: center;
}
</style>