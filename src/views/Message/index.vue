<template>
  <div class="message-container" ref="messageContainer">
    <MessageArea
      :isListLoading="isLoading"
      @submit="handleSubmit"
      :data="data.rows"
      :title="'留言板'"
      :submitTitle="data.total"
    />
  </div>
</template>

<script>
import MessageArea from "@/components/MessageArea";

import fetchData from "@/mixins/fetchData.js";
import System from "@/api";
import mainScroll from "@/mixins/mainScroll.js";
export default {
  mixins: [fetchData({ total: 0, rows: [] }), mainScroll("messageContainer")],
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
      const resp = await System.getMessageList(this.page, this.limit);
      return resp;
    },
    async handleSubmit(form, callback) {
      let resp = await System.postMessage(form);
      this.data.total++;
      this.data.rows.unshift(resp);
      callback("感谢您的留言");
    },
    handleMainScroll(dom) {
      if (!dom || this.isLoading) {
        return;
      }
      let toBottom = Math.abs(
        dom.scrollHeight - dom.clientHeight - dom.scrollTop
      );
      let difference = 100;
      if (toBottom < difference) {
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
      this.data.rows.push(...resp.rows);
      this.isLoading = false;
    },
  },
  created() {
    this.$bus.$on("scroll", this.handleMainScroll);
  },
  destroyed() {
    this.$bus.$off("scroll", this.handleMainScroll);
  },
};
</script>

<style scoped>
.message-container {
  box-sizing: border-box;
  padding: 20px;
  width: 100%;
  height: 100%;
  overflow-y: auto;
  scroll-behavior: smooth;
}
.message-area-container {
  width: 700px;
  margin: 0 auto;
}
</style>