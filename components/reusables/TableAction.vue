<template>
  <div ref="verifyTableActions" class="s-w-full s-relative">
    <button
      class="s-max-w-[60px] s-p-3"
      @click="isOptionsExpanded = !isOptionsExpanded"
    >
      <ViewIcon />
    </button>
    <div
      v-if="isOptionsExpanded"
      class="s-absolute s-left-0 s-right-0 s-mx-auto s-mt-[-10px] s-border-solid s-rounded-[10px] s-border-[#B1B7D6] s-z-[20]"
      :class="position"
      @click="$emit('openDropdown')"
    >
      <slot />
    </div>
  </div>
</template>

<script>
import Vue from 'vue'
import ViewIcon from '../icons/ViewIcon.vue'

export default Vue.extend({
  components: { ViewIcon },
  props: {
    position: {
      type: String,
      default: '',
    },
    loading: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      isOptionsExpanded: false,
    }
  },
  beforeMount() {
    document.addEventListener('click', this.documentClick)
  },
  destroyed() {
    document.addEventListener('click', this.documentClick)
  },
  methods: {
    documentClick(e) {
      if (this.isOptionsExpanded) {
        const el = this.$refs.verifyTableActions
        const target = e.target
        if (el !== target && !el?.contains(target)) {
          if (!this.loading) {
            this.isOptionsExpanded = false
          }
        }
      }
    },
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
