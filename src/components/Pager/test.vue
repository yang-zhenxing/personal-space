<template>
  <Pager :total="100" :current="current" @pageChange="handlePageChange" />
</template>

<script>
import Pager from "./index";
export default {
  components: {
    Pager,
  },
  data() {
    return {
      current: 1,
    };
  },
  methods: {
    handlePageChange(n) {
      this.current = n;
    },
  },
};
</script>

<style>
</style>