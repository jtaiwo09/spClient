<template>
  <div class="s-bg-[#F4F4F4] s-w-full s-relative">
    <div v-if="$nuxt.isOffline">
      <NotificationModal error :show="true" @submit="refreshBrowser">
        <template #header> Opp... </template>
        <template #content>
          You are offline, please kindly check your network connect
        </template>
      </NotificationModal>
    </div>
    <div v-else>
      <div class="s-bg-[#F4F4F4] s-flex s-z-10 s-h-24 s-items-center">
        <img
          src="../assets/images/spleetLogoBlack.svg"
          alt=""
          class="s-block s-m-auto"
        />
      </div>
      <div
        class="s-min-h-[calc(100vh-94px)] s-max-w-[1106px] !s-rounded-xl s-px-4 s-mx-auto s-pb-5 md:s-pb-24"
      >
        <Nuxt />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  methods: {
    refreshBrowser() {
      window.location.reload()
    },
  },
}
</script>
