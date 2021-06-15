<template>
  <div class="project-container" ref="projectContainer" v-loading="loading">
    <div class="project-content">
      <div class="project-item" v-for="item in data" :key="item.id">
        <a
          :href="
            item.url ? item.url : `javascript:alert('该项目不可通过外网访问');`
          "
          :target="item.url ? '_target' : '_self'"
        >
          <img v-lazy="item.thumb" />
        </a>
        <div class="description">
          <a
            :href="
              item.url
                ? item.url
                : `javascript:alert('该项目不可通过外网访问');`
            "
            :target="item.url ? '_blank' : '_self'"
            ><h2 class="title">{{ item.name }}</h2></a
          >
          <a
            v-if="item.github"
            :href="item.github"
            class="github"
            target="_blank"
            >gitAddress</a
          >
          <p class="desc" v-for="(desc, i) in item.description" :key="i">
            {{ desc }}
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
import mainScroll from "@/mixins/mainScroll.js";
export default {
  mixins: [mainScroll("projectContainer")],
  computed: {
    ...mapState("project", ["loading", "data"]),
  },
  created() {
    this.$store.dispatch("project/fetchProject");
  },
};
</script>

<style scoped lang="less">
@import "~@/styles/var.less";
.project-container {
  box-sizing: border-box;
  width: 100%;
  height: 100%;
  padding: 20px;
  position: relative;
  overflow-y: auto;
  scroll-behavior: smooth;
  // .project-content {
  // }
}
.project-item {
  display: flex;
  box-sizing: border-box;
  align-items: center;
  padding: 10px 12px;
  box-shadow: 0 0 3px rgba(0, 0, 0, 0.8);
  transition: 0.2s;
  &:hover {
    box-shadow: 0 0 8px rgba(0, 0, 0, 0.6);
  }
  & + .project-item {
    margin: 1.5em 0;
  }
  img {
    max-width: 250px;
  }
  .description {
    margin-left: 1em;
    a {
      display: inline-block;
      & > h2 {
        margin: 0;
      }
    }
    .github {
      margin-left: 1.5em;
      font-size: 14px;
      color: @primary;
    }
    p {
      margin: 0.75em 0;
    }
  }
}
</style>