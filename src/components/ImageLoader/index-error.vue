<template>
  <div class="imageloader-container" :class="{ blur: imgShow }">
    <img :src="imgSrc" />
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
      imgShow: true,
      imgSrc: this.placeholder,
    };
  },
  methods: {
    imgLoader() {
      this.imgSrc = this.src;
      this.imgShow = false;
      this.$emit("load");
    },
  },
  created() {
    setTimeout(() => {
      this.imgLoader();
    }, this.duration);
  },
};
</script>

<style lang="less" scoped>
.imageloader-container {
  width: 500px;
  height: 400px;
  transition: all ease-in-out .8s;
  &.blur {
    filter: blur(20px) opacity(90%);
    // -webkit-filter: grayscale(100%); /* Chrome, Safari, Opera */
    // filter: grayscale(100%);
  }
  img {
    width: 100%;
    height: 100%;
  }
}
</style>