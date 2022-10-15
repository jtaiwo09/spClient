<template>
  <div>
    <div v-if="$nuxt.isOffline">
      <NotificationModal error :show="true" @submit="refreshBrowser">
        <template #header> Opp... </template>
        <template #content>
          You are offline, please kindly check your network connect
        </template>
      </NotificationModal>
    </div>
    <div class="sm:s-bg-[#F4F4F4] s-min-h-screen s-relative">
      <ListingNavbar />
      <div class="s-px-[1.375rem] lg:s-px-0">
        <div
          class="s-max-w-[69.125rem] s-min-h-[calc(100vh-12.375rem)] s-ml-auto s-mr-auto sm:s-mt-[3.25rem] sm:s-rounded-xl sm:s-bg-[#fff] s-overflow-auto"
        >
          <Nuxt />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions } from 'vuex'

export default {
  async mounted() {
    try {
      await this.getListedSpace(1)
    } catch (error) {
      this.$errorHandler(error)
    }
  },
  methods: {
    ...mapActions('host/listing', ['getListedSpace']),
    refreshBrowser() {
      window.location.reload()
    },
  },
}
</script>
