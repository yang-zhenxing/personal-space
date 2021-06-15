<template>
  <div class="about-container" v-loading="loading || !iframeLoaded">
    <iframe
      class="about-content"
      v-if="src"
      :src="src"
      frameborder="0"
      @load="iframeLoaded = true"
    ></iframe>
  </div>
</template>

<script>
import { mapState } from "vuex";
export default {
  data() {
    return {
      iframeLoaded: false,
    };
  },
  computed: {
    ...mapState("about", {
      loading: "loading",
      src: "data",
    }),
  },
  created() {
    this.$store.dispatch("about/fetchAbout");
  },
};
</script>

<style scoped>
.about-container {
  width: 100%;
  height: 100%;
  overflow: hidden;
  position: relative;
}
.about-content {
  width: 100%;
  height: 100%;
}
</style>