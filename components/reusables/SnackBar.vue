<template>
  <div
    class="sm:s-py-6 s-py-3 sm:s-pl-16 s-pl-5 s-pr-7 s-w-full s-flex s-justify-between"
    :class="background"
  >
    <p
      class="s-text-[#fff] s-font-normal s-text-sm md:s-text-base s-leading-6 s-self-start"
    >
      {{ title }}
    </p>
    <button
      class="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded s-h-3 s-pt-2 s-ml-5"
      @click="$emit('close')"
    >
      <CloseIcon :width="11" :height="11" />
    </button>
  </div>
</template>

<script>
import CloseIcon from '../icons/CloseIcon.vue'
export default {
  components: { CloseIcon },
  props: {
    title: {
      type: String,
      default:
        'A reminder has been sent to Michael Johnson to respond to the verification request',
    },
    background: {
      type: String,
      default: 's-bg-[#28A46E]',
    },
  },
}
</script>

<style lang="scss" scoped></style>
