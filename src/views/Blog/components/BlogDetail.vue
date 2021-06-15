<template>
  <div class="blog-detail-container">
    <h1>{{ blog.title }}</h1>
    <div class="aside">
      <span>日期: {{ blog.createDate | blogTime }}</span>
      <span>浏览: {{ blog.scanNumber }}</span>
      <a href="#comment-form">评论: {{ blog.commentNumber }}</a>
      <RouterLink
        :to="{
          name: 'BlogCategory',
          params: {
            categoryId: blog.category.id,
          },
        }"
        >{{ blog.category.name }}</RouterLink
      >
    </div>
    <div v-html="blog.htmlContent" class="markdown-body"></div>
  </div>
</template>

<script>
import "highlight.js/styles/github.css";
import "@/styles/markdown.css";
export default {
  props: {
    blog: {
      type: Object,
      required: true,
    },
  },
  filters: {
    blogTime(val) {
      let date = new Date(+val);
      let month = (date.getMonth() + 1).toString().padStart(2, "0");
      let day = date.getDate().toString().padStart(2, "0");
      return `${date.getFullYear()}年${month}月${day}日`;
    },
  },
};
</script>

<style scoped lang="less">
@import "~@/styles/var.less";
.aside {
  font-size: 12px;
  color: @gray;
  a,
  span {
    margin-right: 1em;
  }
}
.markdown-body {
  margin: 2em 0;
}
</style>