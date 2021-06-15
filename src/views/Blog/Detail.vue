<template>
  <Layout>
    <div class="main-container" ref="main" v-loading="isLoading">
      <BlogDetail :blog="data" v-if="data" />
      <BlogComment v-if="!isLoading" />
    </div>
    <template #right>
      <div class="right-container" v-loading="isLoading">
        <BlogToc :toc="data.toc" v-if="data" />
      </div>
    </template>
  </Layout>
</template>

<script>
import System from "@/api";
import fetchData from "@/mixins/fetchData.js";
import mainScroll from "@/mixins/mainScroll.js";
import { setTitle } from "@/utils";

import Layout from "@/components/Layout";
import BlogDetail from "./components/BlogDetail";
import BlogToc from "./components/BlogToc";
import BlogComment from "./components/BlogComment";
export default {
  mixins: [fetchData(), mainScroll("main")],
  components: {
    Layout,
    BlogDetail,
    BlogToc,
    BlogComment,
  },
  methods: {
    async fetchData() {
      let resp = await System.getBlog("asd");
      // resp = null;
      if (!resp) {
        // 文章不存在
        this.$router.push("/404");
        return;
      }
      setTitle.setRouterTitle(resp.title);
      return resp;
    },
  },
  updated() {
    let hash = location.hash;
    location.hash = "";
    setTimeout(() => {
      location.hash = hash;
    }, 50);
  },
};
</script>

<style scoped lang="less">
.main-container {
  height: 100%;
  position: relative;
  padding: 20px;
  overflow-y: scroll;
  box-sizing: border-box;
  scroll-behavior: smooth;
}
.right-container {
  position: relative;
  height: 100%;
  width: 240px;
  padding: 20px;
  overflow-y: auto;
  box-sizing: border-box;
}
</style>