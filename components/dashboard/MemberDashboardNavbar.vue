<template>
  <div>
    <div
      class="s-flex s-w-full s-justify-between s-items-start s-pt-6 s-pb-[1.125rem] md:s-pt-[3rem] md:s-pb-[0.875rem] s-sticky md:s-top-0 s-bg-[#f4f4f4] s-max-w-[1440px] s-mx-auto"
    >
      <div class="s-mb-3 md:s-mb-0">
        <div
          v-if="showBackBtn"
          class="s-flex s-items-center s-cursor-pointer s-mb-3 md:s-mb-[2rem]"
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
        <h2 class="s-text-black s-text-xl s-leading-6 s-font-bold s-mb-2.5">
          {{ title }}
        </h2>
        <p class="s-text-[#242428] s-text-sm s-font-normal s-leading-4">
          {{ text }}
        </p>
      </div>
      <div class="s-hidden md:s-flex s-space-x-3">
        <div class="icon_wrap s-bg-black s-w-12 s-h-12 s-shadow-md">
          <NotificationIcon />
        </div>
        <div class="icon_wrap s-bg-white s-w-12 s-h-12 s-shadow-md">
          <ChatIcon />
        </div>
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
    text: {
      type: String,
      default: '',
    },
    showBackBtn: {
      type: Boolean,
      default: false,
    },
  },
}
</script>

<style></style>
