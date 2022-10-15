<template>
  <div>
    <SnackBar
      v-if="showSnackBar"
      :title="`You have successfully made a verification request. We’ll notify you once their details have been verified`"
      class=""
      @close="showSnackBar = false"
    />
    <DashboardNavbar
      title="Verify Tenants"
      subtitle="Send verification requests and review tenants profile before lease approval."
    />
    <Loading v-if="loading === true" />
    <div v-else>
      <div>
        <VerifiedTenant
          :page="page"
          :total="allTenantData.totalVerificationRequest"
          :total-pages="allTenantData.totalPages"
          :tenants-data="allTenantData.allVerificationRequest"
          :refresh-data="refresh"
          :show-loader="tableLoader === true"
          @refresh="refreshData"
          @goToSelectedPage="moveToSelectedPage"
        />
        <Modal :show="displayModal" @close="displayModal = false">
          <div>
            <RoudedCheckIcon />
            <p class="s-pt-4 s-pb-2 s-text-lg s-font-bold s-leading-6">
              Tenant Verification
            </p>
            <p
              class="s-pb-4 s-text-sm s-font-normal s-leading-6 s-text-[#3f3d56]"
            >
            Send tenant verification requests and review their profiles before a lease agreement.
            </p>
            <button
              class="s-bg-primary-blue s-rounded-full s-py-3 s-px-10 s-text-white s-text-sm s-leading-4 s-font-bold"
              @click="displayModal = false"
            >
              Got It
            </button>
          </div>
        </Modal>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions, mapState, mapMutations } from 'vuex'
import SnackBar from '../../../components/reusables/SnackBar.vue'
import VerifiedTenant from '../../../components/verify/VerifiedTenant.vue'
export default {
  name: 'Verify',
  components: {
    VerifiedTenant,
    SnackBar,
  },
  layout: 'host',

  data() {
    return {
      displayModal: false,
      loading: true,
      tableLoader: true,
      tenant: [],
      refresh: false,
      page: 1,
    }
  },
  computed: {
    ...mapGetters('host/verify', ['allTenantData']),
    ...mapState('host/verify', ['showSnackBar']),
    success() {
      return this.$route.query.success
    },
  },
  watch: {
    showSnackBar: {
      handler(newValue) {
        if (newValue === true) {
          setTimeout(() => {
            this.TOGGLE_SNACKBAR(false)
          }, 10000)
        }
      },
      immediate: true,
    },
  },
  async mounted() {
    this.tableLoader = false
    try {
      await this.fetchTenantsData({ status: 'all', page: this.page })
      await this.getLandordRemainingVerfication()
      if (this.allTenantData.allVerificationRequest.length > 0) {
        this.displayModal = false
      } else {
        this.displayModal = true
      }
      this.loading = false
    } catch (error) {
      this.$errorHandler(error)
    }
  },
  methods: {
    ...mapActions('host/verify', [
      'fetchTenantsData',
      'getLandordRemainingVerfication',
    ]),
    ...mapMutations('host/verify', ['TOGGLE_SNACKBAR']),
    toggleModal() {
      this.displayModal = !this.displayModal
    },
    async refreshData({ status, page }) {
      this.refresh = true
      try {
        await this.fetchTenantsData({ status, page })
      } catch (error) {
        this.$errorHandler(error)
      } finally {
        this.refresh = false
      }
    },
    async moveToSelectedPage({ status, page }) {
      this.tableLoader = true
      try {
        await this.fetchTenantsData({ status, page })
        window.scrollTo(0, 0)
        this.tableLoader = false
      } catch (error) {
        this.tableLoader = false
        this.$errorHandler(error)
      }
    },
  },
}
</script>

<style lang="scss" scoped></style>
