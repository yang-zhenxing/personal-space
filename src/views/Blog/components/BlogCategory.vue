<template>
  <div class="blog-category-container" v-loading="isLoading">
    <h2>文章列表</h2>
    <RightNav :list="list" @select="handleSelect" />
  </div>
</template>

<script>
import RightNav from "./Right-nav";
import System from "@/api";
import fetchData from "@/mixins/fetchData.js";
export default {
  mixins: [fetchData([])],
  components: {
    RightNav,
  },
  methods: {
    async fetchData() {
      return await System.getDatas("/api/blogtype");
    },
    handleSelect(item) {
      let query = {
        page: 1,
        limit: this.limit,
      };
      if (item.id === -1) {
        this.$router.push({
          name: "Blog",
          query,
        });
      } else {
        this.$router.push({
          name: "BlogCategory",
          params: {
            categoryId: item.id,
          },
          query,
        });
      }
    },
  },
  computed: {
    categoryId() {
      return +this.$route.params.categoryId || -1;
    },
    limit() {
      return +this.$route.query.limit || 10;
    },
    list() {
      let result = [
        {
          articleCount: this.data
            .map((it) => it.articleCount)
            .reduce((a, b) => a + b, 0),
          id: -1,
          order: -1,
          name: "全部",
        },
        ...this.data,
      ];
      return result.map((it) => ({
        ...it,
        isSelect: it.id === this.categoryId,
        aside: `${it.articleCount}篇`,
      }));
    },
  },
};
</script>

<style scoped>
.blog-category-container {
  width: 240px;
  height: 100%;
  padding: 20px;
  overflow-y: auto;
  position: relative;
  box-sizing: border-box;
}
h2 {
  font-size: 1em;
  font-weight: bold;
  letter-spacing: 2px;
  margin: 0;
}
</style>