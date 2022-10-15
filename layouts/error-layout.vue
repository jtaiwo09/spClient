<template>
  <div class="layout">
    <div v-if="$nuxt.isOffline">
      <NotificationModal error :show="true" @submit="refreshBrowser">
        <template #header> Opp... </template>
        <template #content>
          You are offline, please kindly check your network connect
        </template>
      </NotificationModal>
    </div>
    <div v-else>
      <WebsiteNavbar :is-white="true" />
      <WebsiteMobileNavbar :is-white="true" />
      <div class="body">
        <Nuxt />
      </div>
      <WebsiteFooter />
    </div>
  </div>
</template>

<script>
export default {}
</script>

<style></style>
