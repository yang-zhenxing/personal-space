<template>
  <div class="blog-comment-container">
    <MessageArea
      :data="data.rows"
      title="评论列表"
      :submitTitle="data.total"
      :isListLoading="isLoading"
      @submit="handleSubmit"
    />
  </div>
</template>

<script>
import MessageArea from "@/components/MessageArea";

import fetchData from "@/mixins/fetchData.js";
import System from "@/api";
export default {
  mixins: [fetchData({})],
  components: {
    MessageArea,
  },
  data() {
    return {
      page: 1,
      limit: 10,
    };
  },
  computed: {
    hasMore() {
      return this.data.rows.length < this.data.total;
    },
  },
  methods: {
    async fetchData() {
      return System.getComments(
        this.$route.params.acticleId,
        this.page,
        this.limit
      );
    },
    handleScroll(dom) {
      if (this.isLoading || !dom) {
        return;
      }
      const dec = Math.abs(
        dom.scrollHeight - (dom.clientHeight + dom.scrollTop)
      );
      const sum = 100;
      if (dec < sum) {
        this.loadMore();
      }
    },
    async loadMore() {
      if (!this.hasMore) {
        return;
      }
      this.isLoading = true;
      this.page++;
      let resp = await this.fetchData();
      this.data.total = resp.total;
      this.data.rows = this.data.rows.concat(resp.rows);
      this.isLoading = false;
    },
    async handleSubmit(form, callback) {
      let resp = await System.postComment(form);
      this.data.rows.unshift(resp);
      this.data.total++;
      callback();
    },
  },
  created() {
    this.$bus.$on("scroll", this.handleScroll);
  },
  destroyed() {
    this.$bus.$off("scroll", this.handleScroll);
  },
};
</script>

<style scoped lang="less">
.blog-comment-container {
  position: relative;
  margin: 30px 0;
}
</style>