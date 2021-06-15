<template>
  <div class="pager-container" v-if="pageNumber > 1">
    <a @click="handleClick(1)" :class="{ disabled: current === 1 }"
      >|&lt;&lt;</a
    >
    <a @click="handleClick(current - 1)" :class="{ disabled: current === 1 }"
      >&lt;&lt;</a
    >
    <a
      @click="handleClick(n)"
      v-for="(n, i) in pageArr"
      :key="i"
      :class="{ active: current === n }"
      >{{ n }}</a
    >
    <a
      @click="handleClick(current + 1)"
      :class="{ disabled: current === pageNumber }"
      >&gt;&gt;</a
    >
    <a
      @click="handleClick(pageNumber)"
      :class="{ disabled: current === pageNumber }"
      >&gt;&gt;|</a
    >
  </div>
</template>

<script>
export default {
  props: {
    current: {
      type: Number, //当前页码
      default: 1,
    },
    total: {
      type: Number, //总数据量
      default: 0,
    },
    limit: {
      type: Number, //页容量
      default: 10,
    },
    visibleNumber: {
      type: Number, //可见页码数
      default: 10,
    },
  },
  computed: {
    pageNumber() {
      return Math.ceil(this.total / this.limit);
    },
    pageMin() {
      let min = Math.floor(this.current - this.visibleNumber / 2);
      if (min < 1) {
        min = 1;
      }
      return min;
    },
    pageMax() {
      // let num = Math.floor(this.visibleNumber / 2 + this.current - 1);
      // return num;
      let max = this.pageMin + this.visibleNumber - 1;
      if (max > this.pageNumber) {
        max = this.pageNumber;
      }
      return max;
    },
    pageArr() {
      let nums = [];
      for (let i = this.pageMin; i <= this.pageMax; i++) {
        nums.push(i);
      }
      return nums;
    },
  },
  methods: {
    handleClick(newPage) {
      if (newPage < 1) {
        newPage = 1;
      }
      if (newPage > this.pageNumber) {
        newPage = this.pageNumber;
      }
      if (newPage === this.current) {
        return;
      }
      this.$emit("pageChange", newPage);
    },
  },
};
</script>

<style scoped lang="less">
@import "~@/styles/var.less";
.pager-container {
  display: flex;
  justify-content: center;
  margin: 20px 0;
  a {
    color: @primary;
    margin: 0 2px;
    padding: 4px;
    cursor: pointer;
    user-select: none;
    &.disabled {
      color: @lightWords;
      cursor: not-allowed;
    }
    &.active {
      color: @words;
      font-weight: bold;
      cursor: text;
    }
  }
}
</style>