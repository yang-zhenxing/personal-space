<template>
  <div class="blog-list-container" v-loading="isLoading" ref="container">
    <ul>
      <li v-for="item in data.rows" :key="item.id">
        <div class="themb">
          <RouterLink
            :to="{
              name: 'ActicleDetail',
              params: {
                acticleId: item.id,
              },
            }"
            v-if="item.thumb"
          >
            <img v-lazy="item.thumb" :alt="item.title" :title="item.title"
          /></RouterLink>
        </div>
        <div class="main">
          <RouterLink
            :to="{
              name: 'ActicleDetail',
              params: {
                acticleId: item.id,
              },
            }"
          >
            <h2>
              {{ item.title }}
            </h2>
          </RouterLink>
          <div class="aside">
            <span>日期：{{ item.createDate | blogTime }}</span>
            <span>浏览：{{ item.scanNumber }}</span>
            <span>评论：{{ item.commentNumber }}</span>
            <RouterLink
              :to="{
                name: 'BlogCategory',
                params: {
                  categoryId: item.category.id,
                },
              }"
              class=""
            >
              {{ item.category.name }}
            </RouterLink>
          </div>
          <div class="desc">
            {{ item.description }}
          </div>
        </div>
      </li>
      <Empty v-if="data.rows.length === 0 && !isLoading" />
    </ul>
    <Pager
      v-if="data.total"
      :total="data.total"
      :current="routeInfo.page"
      :limit="routeInfo.limit"
      :visibleNumber="10"
      @pageChange="handlePageChange"
    />
  </div>
</template>

<script>
import System from "@/api";
import fetchData from "@/mixins/fetchData.js";
import mainScroll from "@/mixins/mainScroll.js";

import Pager from "@/components/Pager";
import Empty from "@/components/Empty";
export default {
  mixins: [fetchData({ total: 0, rows: [] }), mainScroll("container")],
  components: {
    Pager,
    Empty,
  },
  methods: {
    async fetchData() {
      let { categoryId, page, limit } = this.routeInfo;
      return await System.getBlogs(page, limit, categoryId);
    },
    handlePageChange(index) {
      let query = {
        page: index,
        limit: this.routeInfo.limit,
      };
      if (this.routeInfo.categoryId === -1) {
        this.$router.push({
          name: "Blog",
          query,
        });
      } else {
        this.$router.push({
          name: "BlogCategory",
          params: {
            categoryId: this.routeInfo.categoryId,
          },
          query,
        });
      }
    },
  },
  watch: {
    async $route() {
      this.isLoading = true;
      this.$refs.container.scrollTop = 0;
      this.data = await this.fetchData();
      this.isLoading = false;
    },
  },
  computed: {
    routeInfo() {
      let categoryId = +this.$route.params.categoryId || -1;
      let page = +this.$route.query.page || 1;
      let limit = +this.$route.query.limit || 10;
      return { categoryId, page, limit };
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

<style lang="less" scoped>
@import "~@/styles/var.less";
.blog-list-container {
  width: 100%;
  height: 100%;
  box-sizing: border-box;
  overflow-y: scroll;
  line-height: 1.7;
  position: relative;
  scroll-behavior: smooth;
  ul {
    padding: 0 20px;
    margin: 0;
    list-style: none;
    overflow: hidden;
    li {
      padding: 15px 0;
      border-bottom: 1px solid @gray;
      display: flex;
      .themb {
        flex: 0 0 auto;
        margin-right: 15px;
        img {
          max-width: 200px;
          display: block;
          border-radius: 5px;
        }
      }
      .main {
        flex: 1 1 auto;
        h2 {
          margin: 0;
        }
        .aside {
          font-size: 12px;
          color: @gray;
          span {
            margin-right: 15px;
          }
        }
        .desc {
          margin: 15px 0;
          font-size: 14px;
        }
      }
    }
  }
}
</style>
