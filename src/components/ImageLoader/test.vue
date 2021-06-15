<template>
  <div class="test">
    <ImageLoader
    src="https://images.pexels.com/photos/33109/fall-autumn-red-season.jpg?fit=crop&crop=entropy&w=3456&h=2304"
    placeholder="https://images.pexels.com/photos/33109/fall-autumn-red-season.jpg?w=100"
    :duration="2000"
    @load="imgLoad"
  />
  </div>
</template>

<script>
import ImageLoader from "./";
export default {
  components: {
    ImageLoader,
  },
  methods: {
    imgLoad(){
      console.log(`img loaded`)
    }
  },
};
</script>

<style scoped>
.test{
  width: 500px;
  height: 400px;
  margin: 0 auto;
}
</style>