<template>
  <div class="to-top-container" @click="handleClick" v-show="show">Top</div>
</template>

<script>
export default {
  data() {
    return {
      show: false,
    };
  },
  methods: {
    handleScroll(dom) {
      if (!dom) {
        this.show = false;
        return;
      }
      this.show = dom.scrollTop > 750;
    },
    handleClick() {
      this.$bus.$emit("toTop", 0);
    },
  },
  created() {
    this.$bus.$on("scroll", this.handleScroll);
  },
};
</script>

<style scoped lang="less">
@import "~@/styles/var.less";
.to-top-container {
  position: fixed;
  right: 40px;
  bottom: 40px;
  width: 50px;
  height: 50px;
  line-height: 50px;
  text-align: center;
  color: #fff;
  background-color: @primary;
  border-radius: 50%;
  cursor: pointer;
  user-select: none;
  z-index: 99;
}
</style>