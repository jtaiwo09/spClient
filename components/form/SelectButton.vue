<template>
  <button
    class="s-rounded-full s-font-normal s-leading-5 s-text-[#0F0C3D] s-text-sm s-py-3 s-px-[1.375rem] s-border-none focus:s-outline-none s-ring-1 s-ring-solid s-ring-[#99A4E1] s-mr-2 last:s-mr-0"
    :class="[
      {
        's-ring-2 s-ring-[#2E48DA] s-bg-[#F0F2FF]': name === value && !disabled,
      },
      {
        's-ring-[#EA4335] focus:s-ring-[#EA4335]':
          error !== null && error.$error,
      },
    ]"
    :disabled="disabled"
    :type="type"
    @click.prevent="$emit('submit')"
  >
    <span
      :class="[
        {
          disabled: disabled,
        },
        {
          's-font-semibold s-text-[#2E48DA]': name === value,
        },
      ]"
      >{{ text | capitalize }}</span
    >
  </button>
</template>

<script>
export default {
  props: {
    disabled: {
      type: Boolean,
      default: false,
    },
    type: {
      type: String,
      default: 'submit',
    },
    text: {
      type: String,
      default: 'submit',
    },
    name: {
      type: String,
      default: '',
    },
    value: {
      type: String,
      default: null,
    },
    error: {
      type: Object,
      default: null,
    },
  },
  emits: ['submit'],
}
</script>

<style lang="scss">
.disabled {
  color: rgba(15, 12, 61, 0.4) !important;
  cursor: not-allowed;
}
</style>
