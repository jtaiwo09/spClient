<template>
  <div v-show="show" @click="$emit('close')">
    <div
      class="s-fade s-fixed s-top-0 s-left-0 s-bg-black/60 s-z-50 s-w-full s-h-full s-outline-none s-overflow-x-hidden s-overflow-y-auto"
    >
      <div
        class="s-relative s-flex s-items-center s-align-middle s-min-h-screen s-justify-center s-w-full"
      >
        <div
          class="s-bg-[#fff] sm:s-p-[2.875rem] s-h-max s-min-h-[6.25rem] s-w-11/12 s-relative s-rounded-xl s-mt-9 s-mb-4"
          :class="[modalMaxWidth, modalClasses]"
          @click.stop
        >
          <div
            class="s-cursor-pointer s-w-6 s-h-6 s-bg-[#fff] s-rounded-full s-flex s-justify-center s-items-center s-absolute -s-top-5 -s-right-5"
            @click="$emit('close')"
          >
            <CloseIcon :width="10" :height="10" :fill="'#130F26'" />
          </div>
          <div class="s-hidden sm:s-block">
            <img
              src="../assets/illustrations/modal-ribbon.svg"
              class="s-absolute s-right-0 s-top-0"
              alt=""
            />
          </div>
          <slot />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    show: {
      type: Boolean,
      default: false,
    },
    imageUrl: {
      type: String,
      default: '',
    },
    modalMaxWidth: {
      type: String,
      default: 's-max-w-[30rem]',
    },
    modalClasses: {
      type: String,
      default: 's-p-8',
    },
  },
  data() {
    return {
      isShowing: false,
    }
  },
}
</script>

<style lang="scss">
.modal-bg {
  background: rgba(0, 0, 0, 0.63);
  width: 100%;
  height: 100%;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 2000;
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>
