<template>
  <div
    class="s-max-w-[1440px] s-mx-auto s-h-[8.125rem] s-w-full s-flex s-items-center s-justify-between sm:s-pl-[3.75rem] s-pl-5 sm:s-pr-14 s-pr-5 s-sticky s-top-0"
  >
    <div
      v-if="showBackBtn"
      class="s-flex s-items-center s-cursor-pointer"
      @click="$router.back()"
    >
      <div
        class="s-w-5 s-h-5 s-rounded-full s-border s-border-primary s-border-solid s-flex s-items-center s-justify-center s-mr-2.5"
      >
        <BackIcon />
      </div>
      <span class="s-font-normal s-text-sm s-leading-6 s-text-[#2F313D]"
        >Go Back</span
      >
    </div>
    <div v-else>
      <h2 class="title s-mb-2.5 s-text-xl s-leading-6 s-font-bold">
        {{ title }}
      </h2>
      <span
        class="sub-title s-text-[0.875rem] s-font-normal s-leading-[1.125rem] s-block"
        >{{ subtitle }}</span
      >
    </div>

    <!-- <div class="sm:s-block s-hidden">
      <div class="s-flex">
        <div
          class="s-w-12 s-h-12 s-rounded-full s-flex s-items-center s-justify-center s-shadow-[0px 4px 10px rgba(0, 0, 0, 0.15)] s-bg-[#18191c] s-mr-[1.375rem]"
        >
          <NotificationIcon />
        </div>
        <div
          class="s-w-12 s-h-12 s-rounded-full s-flex s-items-center s-justify-center s-shadow-md s-shadow-[0px 4px 10px rgba(0, 0, 0, 0.15)] s-bg-[#fff] s-border s-border-solid s-border-[#f0f0f0]"
        >
          <ChatIcon />
        </div>
      </div>
    </div> -->
  </div>
</template>

<script>
import BackIcon from '../icons/BackIcon.vue'
export default {
  components: {
    BackIcon,
  },
  props: {
    showBackBtn: {
      type: Boolean,
      default: false,
    },
    title: {
      type: String,
      default: '',
    },
    subtitle: {
      type: String,
      default: '',
    },
    newClass: {
      type: String,
      default: '',
    },
  },
}
</script>

<style></style>
