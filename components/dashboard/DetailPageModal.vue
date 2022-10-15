<template>
  <div
    class="sm:s-w-[627px] s-min-w-[375px] s-pl-8 s-px-10 sm:s-pl-16 s-pb-16 s-overflow-scroll s-h-[100vh]"
  >
    <div class="s-bg-white s-sticky s-top-0 s-pt-12">
      <div class="s-flex s-justify-end s-mp-[3rem]">
        <button @click="$emit('close')">
          <CloseIcon :fill="'black'" :width="15" :height="15" />
        </button>
      </div>
      <div class="s-pb-[2.875rem]">
        <StatusBadge :text="status" />
        <p class="s-text-[20px] s-leading-6 s-font-bold s-mb-[6px] s-mt-4">
          {{ title }}
        </p>
        <p class="s-text-sm s-leading-5 s-font-normal s-text-[#242428]">
          {{ description }}
        </p>
      </div>
    </div>

    <slot />
  </div>
</template>

<script>
export default {
  props: {
    title: {
      type: String,
      default: '',
    },
    description: {
      type: String,
      default: '',
    },
    status: {
      type: String,
      default: '',
    },
  },
  data() {
    return {
      loading: false,
    }
  },
  computed: {
    handleColor() {
      switch (this.status) {
        case 'pending':
        case 'awaiting approval':
          return 's-bg-[#F7CE51]'
        case 'paid':
        case 'active':
        case 'accepted':
        case 'published':
          return 's-bg-[#3DDC97]'
        case 'unavailable':
        case 'expired':
          return 's-bg-[#FF7F37]'
        case 'rejected':
          return 's-bg-[#FF4242]/0.4'
        case 'cancelled':
        case 'canceled':
        case 'declined':
          return 's-bg-[#EA4335]'
        case 'updated':
          return 's-bg-purple-500'
        default:
          return ''
      }
    },
  },
}
</script>

<style lang="scss" scoped>
.incomplete-info {
  background: rgba(253, 171, 171, 0.17);
}
</style>
