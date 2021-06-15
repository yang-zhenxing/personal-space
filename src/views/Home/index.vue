<template>
  <div
    class="home-container"
    ref="container"
    @wheel="handleWheel"
    v-loading="loading"
  >
    <ul
      class="carouseli-ul"
      :style="{ marginTop }"
      @transitionend="handleTransitionEnd"
    >
      <li v-for="item in data" :key="item.id">
        <Carouseliitem :carouse="item" />
      </li>
    </ul>
    <div class="icon icon-up" v-show="index >= 1" @click="switchTo(index - 1)">
      <Icon type="arrowUp" />
    </div>
    <div
      class="icon icon-down"
      v-show="index < data.length - 1"
      @click="switchTo(index + 1)"
    >
      <Icon type="arrowDown" />
    </div>
    <ul class="control-ul">
      <li
        v-for="(item, i) in data"
        :key="item.id"
        :class="{ active: i === index }"
        @click="switchTo(i)"
      ></li>
    </ul>
  </div>
</template>

<script>
import Carouseliitem from "./Carouselitem";
import Icon from "@/components/Icon";
import { mapState } from "vuex";
export default {
  components: {
    Carouseliitem,
    Icon,
  },
  data() {
    return {
      index: 0,
      containerHeight: 0,
      switching: false, //是否在切换中
    };
  },
  methods: {
    switchTo(i) {
      this.index = i;
    },
    handleWheel(e) {
      if (this.switching) {
        return;
      }
      if (this.index > 0 && e.deltaY < 200) {
        this.index--;
        this.switching = true;
      }
      if (this.index < this.data.length - 1 && e.deltaY > 200) {
        this.index++;
        this.switching = true;
      }
    },
    handleTransitionEnd() {
      this.switching = false;
    },
    handleResize() {
      this.containerHeight = this.$refs.container.clientHeight;
    },
  },
  created() {
    this.$store.dispatch("banner/fetchBanner");
  },
  mounted() {
    this.containerHeight = this.$refs.container.clientHeight;
    window.addEventListener("resize", this.handleResize);
  },
  destroyed() {
    window.removeEventListener("resize", this.handleResize);
  },
  computed: {
    marginTop() {
      return -this.index * this.containerHeight + "px";
    },
    ...mapState("banner", ["loading", "data"]),
  },
};
</script>

<style lang="less" scoped>
@import "~@/styles/mixin.less";
@import "~@/styles/var.less";
.home-container {
  width: 100%;
  height: 100%;
  position: relative;
  overflow: hidden;
  ul {
    margin: 0;
    padding: 0;
    list-style: none;
  }
  .carouseli-ul {
    width: 100%;
    height: 100%;
    transition: 0.5s;
    li {
      width: 100%;
      height: 100%;
    }
  }
  .icon {
    .self-center();
    font-size: 26px;
    color: @gray;
    cursor: pointer;
    z-index: 2;
    transform: translateX(-50%);
    @animateTime: 0.7s;
    @gap: 25px;
    &-up {
      top: @gap;
      animation: jump @animateTime linear alternate infinite;
    }
    &-down {
      top: auto;
      bottom: @gap;
      animation: jump @animateTime linear alternate-reverse infinite;
    }
  }
  .control-ul {
    .self-center();
    z-index: 2;
    right: 40px;
    left: auto;
    transform: translateY(-50%);
    @controlItemSize: 9px;
    li {
      width: @controlItemSize;
      height: @controlItemSize;
      border-radius: 50%;
      background-color: @words;
      margin-bottom: 12px;
      border: 1px solid #fff;
      box-sizing: border-box;
      cursor: pointer;
      &.active {
        background-color: #fff;
      }
    }
  }
}
@jumpDistance: 10px;
@keyframes jump {
  0% {
    transform: translateY(-@jumpDistance);
  }
  50% {
    transform: translateY(0);
  }
  100% {
    transform: translateY(@jumpDistance);
  }
}
</style>