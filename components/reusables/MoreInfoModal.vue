<template>
  <div
    class="dialog-bg s-fixed s-top-0 s-bottom-0 s-right-0 s-left-0 s-w-full s-z-50 s-flex s-items-center s-justify-end"
    @click.self="$emit('cancel')"
  >
    <div class="s-h-[100vh] s-overflow-scroll">
      <div :class="newClass" class="s-bg-[#fff] s-overflow-scroll s-h-[100vh]">
        <slot />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    newClass: {
      type: String,
      default: '',
    },
  },
}
</script>

<style lang="scss" scoped>
.dialog-bg {
  background: rgba(0, 0, 0, 0.63);
  width: 100%;
  height: 100%;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 2000;
  display: flex;
  align-items: center;
  justify-content: flex-end;
}
</style>
