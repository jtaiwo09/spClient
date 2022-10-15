<template>
  <div ref="verifyTableActions" class="s-w-full s-relative">
    <button
      class="s-max-w-[60px] s-p-3 s-mx-auto"
      @click.prevent="$emit('clickAction')"
    >
    <slot />
    </button>
  </div>
</template>

<script>
import Vue from 'vue'

export default Vue.extend({
  props: {
    position: {
      type: String,
      default: '',
    },
  },
  data() {
    return {
      
    }
  },
  beforeMount() {
    document.addEventListener('click', this.documentClick)
  },
  destroyed() {
    document.addEventListener('click', this.documentClick)
  },
  methods: {
  },
})
</script>

<style lang="scss" scoped>
.view-box {
  @media (min-width: 640px) {
    top: 30px;
    left: 0px;
  }
  @media (max-width: 640px) {
    right: 2px;
  }
}
</style>
