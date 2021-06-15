<template>
  <ul class="right-nav-container">
    <li v-for="(item, i) in list" :key="i">
      <span :class="{ active: item.isSelect }" @click="handleClick(item)">{{
        item.name
      }}</span>
      <span
        class="aside"
        :class="{ active: item.isSelect }"
        @click="handleClick(item)"
      >
        {{ item.aside }}
      </span>
      <RightNav @select="handleClick" :list="item.children" />
    </li>
  </ul>
</template>

<script>
export default {
  name: "RightNav",
  props: {
    list: {
      type: Array,
      default: () => [],
    },
  },
  methods: {
    handleClick(item) {
      if (!item.isSelect) {
        this.$emit("select", item);
      }
    },
  },
};
</script>

<style lang="less" scoped>
@import "~@/styles/var.less";
.right-nav-container {
  list-style: none;
  padding: 0;
  color: @words;
  user-select: none;
  .right-nav-container {
    margin-left: 1em;
  }
  @liheight: 35px;
  li {
    font-size: 14px;
    line-height: @liheight;
    min-height: @liheight;
  }
  span {
    cursor: pointer;
    &.aside {
      font-size: 12px;
      margin-left: 1em;
      color: #888;
    }
    &.active {
      color: @warn;
      font-weight: bold;
    }
  }
}
</style>