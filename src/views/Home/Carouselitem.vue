<template>
  <div
    class="carouseli-item-container"
    ref="container"
    @mousemove="handleMouseMove"
    @mouseleave="handleMouseLeave"
  >
    <div class="img-area" ref="image" :style="positionObj">
      <ImageLoader
        @load="handleContent"
        :placeholder="carouse.midImg"
        :src="carouse.bigImg"
      />
    </div>
    <div class="title" ref="title">{{ carouse.title }}</div>
    <div class="desc" ref="desc">{{ carouse.description }}</div>
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
    positionObj() {
      if (!this.containerSize || !this.innerSize) {
        return;
      }
      const extraWidth = this.innerSize.width - this.containerSize.width; // 多出的宽度
      const extraHeight = this.innerSize.height - this.containerSize.height; //多出的高度
      const left = (-extraWidth / this.containerSize.width) * this.mouseX;
      const top = (-extraHeight / this.containerSize.height) * this.mouseY;
      return {
        transform: `translate(${left}px, ${top}px)`,
      };
    },
    center() {
      return {
        x: this.containerSize.width / 2,
        y: this.containerSize.height / 2,
      };
    },
  },
  mounted() {
    this.titleWidth = this.$refs.title.clientWidth;
    this.descWidth = this.$refs.desc.clientWidth;
    this.setSize();
    window.addEventListener("resize", this.setSize);
    this.mouseX = this.center.x;
    this.mouseY = this.center.y;
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
    handleMouseLeave() {
      this.mouseX = this.center.x;
      this.mouseY = this.center.y;
    },
    handleMouseMove(e) {
      const rect = this.$refs.container.getBoundingClientRect();
      this.mouseX = e.clientX - rect.left;
      this.mouseY = e.clientY - rect.top;
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
  overflow: hidden;
  user-select: none;
  .img-area {
    width: 110%;
    height: 110%;
    position: absolute;
    left: 0;
    top: 0;
    transition: 0.2s;
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
    transition: 2s 1s;
    top: calc(50% + 20px);
    font-size: 1.2em;
    color: lighten(@gray, 20%);
  }
}
</style>