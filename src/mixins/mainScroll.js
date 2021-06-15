// 混入主区域滚动以及返回顶部的事件总线以及事件监听

export default function (refValue) {
  return {
    mounted() {
      this.$bus.$on("toTop", this.handleToTop);
      this.$refs[refValue].addEventListener("scroll", this.handleScroll);
    },
    beforeDestroy() {
      this.$bus.$emit("scroll");
      this.$refs[refValue].removeEventListener("scroll", this.handleScroll);
      this.$bus.$off("toTop", this.handleToTop);
    },
    methods: {
      handleScroll() {
        this.$bus.$emit("scroll", this.$refs[refValue])
      },
      handleToTop(topValue) {
        this.$refs[refValue].scrollTop = topValue
      }
    },
  }
}