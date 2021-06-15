<template>
  <div class="image-loader-container">
    <img v-if="!everythindDone" :src="placeholder" class="placeholder" />
    <img
      :src="src"
      @load="imgLoaded"
      :style="{ opacity: imgOpacity, transition: `${duration}ms` }"
    />
  </div>
</template>

<script>
export default {
  props: {
    placeholder: {
      type: String, //原始图片吗加载前的占位图片
      required: true,
    },
    src: {
      type: String, // 元素图片的路径
      required: true,
    },
    duration: {
      type: Number,
      default: 500,
    },
  },
  data() {
    return {
      originLoaded: false,
      everythindDone: false,
    };
  },
  computed: {
    imgOpacity() {
      return this.originLoaded ? 1 : 0;
    },
  },
  methods: {
    imgLoaded() {
      this.originLoaded = true;
      setTimeout(() => {
        this.everythindDone = true;
        this.$emit("load");
      }, this.duration);
    },
  },
};
</script>

<style lang="less" scoped>
@import "~@/styles/var.less";
@import "~@/styles/mixin.less";

.image-loader-container {
  position: relative;
  height: 100%;
  width: 100%;
  overflow: hidden;
  .placeholder {
    filter: blur(2vw);
  }
  img {
    .self-fill();
    object-fit: cover;
  }
}
</style>