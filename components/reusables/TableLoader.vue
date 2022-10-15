<template>
  <div class="s-flex s-flex-col s-space-y-2">
    <div class="s-relative s-w-full sm:s-w-full s-rounded-full">
      <div
        class="s-absolute s-top-0 s-h-1.5 s-rounded shim-blue s-w-full"
      ></div>
    </div>
  </div>
</template>

<script>
export default {}
</script>

<style lang="scss" scoped>
.shim-blue {
  position: relative;
  overflow: hidden;
  background-color: rgba(125, 177, 211, 0.7);
}
.shim-blue::after {
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  transform: translateX(-100%);
  background-image: linear-gradient(
    90deg,
    rgba(233, 233, 233, 1) 0,
    rgba(233, 233, 233, 0.9) 50%,
    rgba(233, 233, 233, 0.8) 100%
  );
  animation: shimmer 1s ease-out infinite;
  content: '';
}
@keyframes shimmer {
  100% {
    transform: translateX(0%);
    opacity: 0;
  }
}
</style>
