<template>
  <img
    :src="url"
    class="avator-container"
    :style="{
      width: size + 'px',
      height: size + 'px',
    }"
  />
</template>

<script>
export default {
  props: {
    url: {
      type: String,
      required: true,
    },
    size: {
      type: Number,
      default: 50,
    },
  },
};
</script>

<style scoped>
.avator-container {
  object-fit: cover;
  border-radius: 50%;
  display: block;
}
</style>