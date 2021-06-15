<template>
  <div
    class="carouseli-item-container"
    ref="container"
    @mousemove="handleMouseMove"
    @mouseleave="handleMouseLeave"
  >
    <div class="img-area" ref="image">
      <ImageLoader
        @load="handleContent"
        :placeholder="carouse.midImg"
        :src="carouse.bigImg"
        :style="PositionStyle"
      />
      <div class="title" ref="title">{{ carouse.title }}</div>
      <div class="desc" ref="desc">{{ carouse.description }}</div>
    </div>
  </div>
</template>

<script>
import ImageLoader from "@/components/ImageLoader";
export default {
  props: ["carouse"],
  components: {
    ImageLoader,
  },
  data() {
    return {
      titleWidth: 0,
      descWidth: 0,
      containerSize: null,
      innerSize: null,
      mouseX: 0,
      mouseY: 0,
    };
  },
  computed: {
    PositionStyle() {
      if (!this.containerSize || !this.innerSize) {
        return;
      }
      let exactWidth = -(this.containerSize.width - this.innerSize.width);
      let exactHeight = -(this.containerSize.height - this.innerSize.height);
      let left = (-exactWidth / this.containerSize.width) * this.mouseX;
      let top = (-exactHeight / this.containerSize.height) * this.mouseY;
      return {
        transform: `translate(${left}px,${top}px)`,
      };
    },
    center() {
      return {
        x: this.innerSize.width / 2,
        y: this.innerSize.height / 2,
      };
    },
  },
  mounted() {
    this.titleWidth = this.$refs.title.clientWidth;
    this.descWidth = this.$refs.desc.clientWidth;
    this.setSize();
    this.reduction();
    window.addEventListener("resize", this.setSize);
  },
  destroyed() {
    window.removeEventListener("resize", this.setSize);
  },
  methods: {
    handleContent() {
      this.handleRef("title", this.titleWidth);
      this.handleRef("desc", this.descWidth);
    },
    handleRef(ref, width) {
      this.$refs[ref].style.width = 0;
      this.$refs[ref].style.opacity = 1;
      this.$refs.title.clientWidth;
      this.$refs[ref].style.width = width + "px";
    },
    reduction() {
      this.mouseX = this.center.x;
      this.mouseY = this.center.y;
    },
    setSize() {
      this.containerSize = {
        width: this.$refs.container.clientWidth,
        height: this.$refs.container.clientHeight,
      };
      this.innerSize = {
        width: this.$refs.image.clientWidth,
        height: this.$refs.image.clientHeight,
      };
    },
    handleMouseMove(e) {
      let rect = this.$refs.container.getBoundingClientRect();
      this.mouseX = e.clientX - rect.left;
      this.mouseY = e.clientY - rect.top;
    },
    handleMouseLeave() {
      this.reduction()
    },
  },
};
</script>

<style lang="less" scoped>
@import "~@/styles/var.less";
.carouseli-item-container {
  width: 100%;
  height: 100%;
  color: #fff;
  position: relative;
  user-select: none;
  overflow: hidden;
  .img-area {
    width: 110%;
    height: 110%;
    position: absolute;
    z-index: -1;
    left: 0;
    top:0;
    transition: .2s;
  }
  &::before {
    content: "";
    display: block;
    width: 100%;
    height: 100%;
    position: absolute;
    z-index: 1;
  }
  .title,
  .desc {
    position: absolute;
    top: calc(50% - 40px);
    z-index: 2;
    left: 30px;
    color: #fff;
    letter-spacing: 3px;
    white-space: nowrap;
    overflow: hidden;
    user-select: text;
    text-shadow: 1px 0 0 rgba(0, 0, 0, 0.5), -1px 0 0 rgba(0, 0, 0, 0.5),
      0 1px 0 rgba(0, 0, 0, 0.5), 0 -1px 0 rgba(0, 0, 0, 0.5);
    opacity: 0;
    transition: 1s;
  }
  .title {
    font-size: 2em;
  }
  .desc {
    transition: 1s 1s;
    top: calc(50% + 20px);
    font-size: 1.2em;
    color: lighten(@gray, 20%);
  }
}
</style>