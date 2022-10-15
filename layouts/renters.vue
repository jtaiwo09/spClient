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
      <dashboard-mobile-sidebar header-text="For Members" :sidebar="sidebar" />
      <div class="s-flex s-w-full">
        <DashboardSidebar
          :is-open="isOpen"
          :toggle-sidebar="toggleSidebar"
          header-text="Members"
          :sidebar="sidebar"
        />

        <div
          class="s-grows s-w-full s-bg-[#f4f4f4] s-min-h-[calc(100vh-96px)] md:s-min-h-screen s-overflow-x-auto"
        >
          <Nuxt />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions } from 'vuex'
import sidebar from '~/static/data/rentersSidebar.json'
export default {
  middleware: 'renterAuth',
  data() {
    return {
      isOpen: true,
      sidebar,
    }
  },
  mounted() {
    const user = this.$cookies.get('user')
    if (user) {
      this.getUser()
      this.getCards()
    }
  },
  methods: {
    ...mapActions('user', ['getUser']),
    ...mapActions('renters', ['getCards']),
    toggleSidebar() {
      this.isOpen = !this.isOpen
    },
    refreshBrowser() {
      window.location.reload()
    },
  },
}
</script>
