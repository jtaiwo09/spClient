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
    <div v-else>
      <dashboard-mobile-sidebar header-text="For Host" :sidebar="sidebar" />
      <div class="s-flex s-relative">
        <DashboardSidebar
          :is-open="isOpen"
          :toggle-sidebar="toggleSidebar"
          header-text="Host"
          :sidebar="sidebar"
        />

        <div class="s-bg-[#f4f4f4] s-flex-1 s-overflow-auto s-min-h-screen">
          <Nuxt />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions } from 'vuex'
import sidebar from '~/static/data/hostSidebar.json'
export default {
  middleware: 'hostAuth',
  data() {
    return {
      isOpen: true,
      sidebar,
    }
  },
  mounted() {
    const user = this.$cookies.get('user')
    if (user) {
      try {
        this.getUser()
      } catch (error) {
        this.$errorHandler(error)
      }
    }
  },
  methods: {
    ...mapActions('user', ['getUser']),
    ...mapActions('host/listing', ['getListedSpace']),
    toggleSidebar() {
      this.isOpen = !this.isOpen
    },
    refreshBrowser() {
      window.location.reload()
    },
  },
}
</script>
