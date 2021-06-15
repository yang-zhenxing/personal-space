<template>
  <div class="message-area-container">
    <DataForm v-on="$listeners" />

    <h3>
      {{ title }}(
      <span>{{ submitTitle }}</span>
      )
    </h3>
    <DataList :list="data" />
    <div class="loading" v-show="isListLoading" v-loading="isListLoading"></div>
  </div>
</template>

<script>
import DataForm from "./DataForm";
import DataList from "./DataList";
export default {
  props: {
    data: {
      type: [Object, Array],
      default: () => [],
    },
    title: {
      type: String,
      default: "",
    },
    submitTitle: {
      type: Number,
      default: 0,
    },
    isListLoading: {
      type: Boolean,
      default: false,
    },
  },
  components: {
    DataForm,
    DataList,
  },
  methods: {
    // handleSubmit(form, callback) {
    //   console.log(form);
    //   this.$emit("submit", form, callback);
    // },
  },
};
</script>

<style scoped lang="less">
.loading {
  position: relative;
  height: 100px;
}
</style>