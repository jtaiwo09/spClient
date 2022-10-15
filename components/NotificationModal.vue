<template>
  <Modal :show="show" @close="close">
    <FailedErrorIcon v-if="error" />
    <div
      v-else
      class="s-w-[3.125rem] s-h-[3.125rem] s-rounded-full s-flex s-items-center s-justify-center s-bg-[#18CE7F]"
    >
      <TickWhiteIcon width="30" />
    </div>
    <h2 class="s-text-4 s-font-bold s-text-[#0E0C0C] s-mt-4">
      <slot name="header" />
    </h2>
    <p class="s-text-[0.875rem] s-text-[#3F3D56] s-font-normal s-mt-4">
      <slot name="content" />
    </p>
    <Button
      text="Try Again"
      :class="'s-min-w-[143px] s-ml-auto s-mr-auto s-mt-4 s-bg-primary-blue s-text-white'"
      @submit="submit"
    />
  </Modal>
</template>

<script>
export default {
  props: {
    show: {
      type: Boolean,
      default: false,
    },
    error: {
      type: Boolean,
      default: false,
    },
  },
  methods: {
    submit() {
      this.$emit('submit')
    },
    close() {
      this.$emit('close')
    },
  },
}
</script>

<style></style>
