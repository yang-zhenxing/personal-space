<template>
  <ul class="data-list-container">
    <li v-for="item in list" :key="item.id">
      <Avator :url="item.avatar" :size="44" />
      <div class="comment">
        <div class="comment-title">
          {{ item.nickname }}
          <span class="comment-time">{{ item.createDate | time }}</span>
        </div>
        <div class="comment-content">
          {{ item.content }}
        </div>
      </div>
    </li>
  </ul>
</template>

<script>
import Avator from "@/components/Avator";
export default {
  props: {
    list: {
      type: Array,
      default: () => [],
    },
  },
  components: {
    Avator,
  },
  filters: {
    time(val) {
      let date = new Date(+val);
      let month = (date.getMonth() + 1).toString().padStart(2, "0");
      let day = date.getDate().toString().padStart(2, "0");
      let hour = date.getHours().toString().padStart(2, "0");
      let minute = date.getMinutes().toString().padStart(2, "0");
      let second = date.getSeconds().toString().padStart(2, "0");
      return `${date.getFullYear()}年${month}月${day}日 ${hour}:${minute}:${second}`;
    },
  },
};
</script>

<style scoped lang="less">
@import "~@/styles/var.less";
.data-list-container {
  margin: 0;
  list-style: 0;
  padding: 0;
  box-sizing: border-box;
  li {
    padding: 15px 0;
    display: flex;
    .avator-container {
      margin-right: 15px;
    }
    .comment {
      flex: 1 1 auto;
      .comment-title {
        color: darken(@success, 10%);
        position: relative;
        margin-bottom: 10px;
        .comment-time {
          color: @gray;
          position: absolute;
          right: 0;
          top: 0;
          font-size: 12px;
        }
      }
      .comment-content {
        font-size: 14px;
      }
    }
  }
}
</style>