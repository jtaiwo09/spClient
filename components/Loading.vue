<template>
  <div
    class="
      loading
      s-fixed
      s-top-0
      s-bottom-0
      s-left-0
      s-right-0
      s-z-50
      s-flex
      s-items-center
      s-justify-center
    "
  >
    <lottie
      :width="width"
      :height="height"
      :options="lottieOptions"
      @animCreated="handleAnimation"
    />
  </div>
</template>

<script>
import lottie from 'vue-lottie/src/lottie.vue'
import * as animationData from '~/static/data/loader.json'
export default {
  components: {
    lottie,
  },
  props: {
    width: {
      default: 60,
      type: Number,
    },
    height: {
      default: 60,
      type: Number,
    },
  },
  data() {
    return {
      anim: null, // for saving the reference to the animation
      lottieOptions: { animationData: animationData.default },
    }
  },
  methods: {
    handleAnimation(anim) {
      this.anim = anim
    },
  },
}
</script>

<style scoped>
.loading {
  background: rgba(0, 0, 0, 0.5);
}
</style>
