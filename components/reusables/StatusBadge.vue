<template>
  <div
    class="s-px-4 s-py-2 s-h-fit s-rounded-[22px] s-border s-border-solid s-border-[#B1B7D6] s-flex s-items-center s-min-w-[7.5rem] s-w-fit"
  >
    <div
      class="s-rounded-full s-w-2.5 s-h-2.5 s-mr-1.5"
      :class="handleColor"
    ></div>
    <p class="s-text-xs s-text-primary s-font-semibold">
      {{ text | capitalize }}
    </p>
  </div>
</template>

<script>
export default {
  props: {
    text: {
      type: String,
      default: 'Paid',
    },
  },
  computed: {
    handleColor() {
      switch (this.text) {
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
        case 'rejected':
          return 's-bg-[#FF7F37]'
        case 'cancelled':
        case 'cancelling':
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

<style></style>
