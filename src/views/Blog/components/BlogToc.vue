<template>
  <div class="blog-toc-container">
    <h2>文章详情</h2>
    <RightNav :list="tocList" @select="handleSelect" />
  </div>
</template>

<script>
import RightNav from "./Right-nav";
import { debounce } from "@/utils";
export default {
  props: {
    toc: {
      type: [Array, Object],
      required: true,
    },
  },
  data() {
    return {
      anchor: "",
    };
  },
  components: {
    RightNav,
  },
  computed: {
    tocList() {
      const handleToc = (toc = []) => {
        return toc.map((it) => ({
          ...it,
          isSelect: it.anchor === this.anchor,
          children: handleToc(it.children),
        }));
      };
      return handleToc(this.toc);
    },
    doms() {
      let doms = [];
      const getDoms = (list) => {
        return list.map((it) => {
          doms.push(document.getElementById(it.anchor));
          if (it.children && it.children.length) {
            getDoms(it.children);
          }
        });
      };
      getDoms(this.toc);
      return doms;
    },
  },
  methods: {
    handleSelect(item) {
      // 直接对location.hash进行赋值，页面发生滚动后会触发事件总线中的scroll监听规则
      // 之后调用setSelect函数，改变this.anchor的值
      // 之后依赖this.anchor的计算属性重新计算，将计算过后的值传入Right-nav组件中去
      location.hash = item.anchor;
    },
    setSelect(scrollDom) {
      if (!scrollDom) {
        return;
      }
      this.anchor = "";
      const range = 200;
      for (let dom of this.doms) {
        if (!dom) {
          continue;
        }
        let top = dom.getBoundingClientRect().top;
        if (top <= range && top > 0) {
          this.anchor = dom.id;
        } else if (top > range) {
          return;
        } else {
          this.anchor = dom.id;
        }
      }
    },
  },
  created() {
    this.handleScroll = debounce(this.setSelect, 100);
    this.$bus.$on("scroll", this.handleScroll);
  },
  destroyed() {
    this.$bus.$off("scroll", this.handleScroll);
  },
};
</script>

<style scoped>
h2 {
  font-size: 1em;
  font-weight: bold;
  letter-spacing: 2px;
  margin: 0;
}
</style>