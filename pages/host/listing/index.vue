<template>
  <div class="md:s-h-screen s-overflow-scroll">
    <DashboardNavbar
      title="Listings"
      subtitle="Manage your listings on Spleet"
      :class="'s-bg-[#f4f4f4] s-z-20'"
    />
    <Loading v-if="loading" />
    <div v-else class="s-max-w-[1440px] s-mx-auto">
      <div v-if="allListedSpace.userListings.length > 0">
        <ListedSpace @page="(value) => (page = value)" />
      </div>
      <EmptyState
        v-else
        class="sm:s-pl-9 s-ml-5 s-mr-5"
        :btn-text="'List your first space'"
        :title="'No listings added yet'"
        @btnAction="$router.push('/host/listing/start-listing')"
      >
        <div class="s-w-32 s-mx-auto s-pt-4 s-pb-6">
          <NoSearch />
        </div>

        <p
          class="s-text-[#77777D] s-leading-6 s-text-sm s-font-normal sm:s-max-w-sm s-max-w-xs s-mx-auto sm:s-px-0 s-px-7"
        >
          Listing your space is the first step to take as a Spleet host and
          we’ve made that super easy for you. Now, let’s show the world what
          they are missing.
        </p>
      </EmptyState>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import ListedSpace from '../../../components/listing/dashboard/listedSpace.vue'
export default {
  name: 'Listing',
  components: { ListedSpace },
  layout: 'host',
  data() {
    return {
      loading: true,
      tableLoader: true,
      page: 1,
    }
  },
  computed: {
    ...mapGetters('host/listing', ['allListedSpace']),
  },
  mounted() {
    const page = this.$route.query.page
    if (page) {
      this.page = +page
    }
    this.getAllListedSpace(page)
    this.tableLoader = false
  },
  methods: {
    ...mapActions('host/listing', ['getListedSpace']),
    async getAllListedSpace(page) {
      this.loading = true
      try {
        await this.getListedSpace(page)
        this.loading = false
      } catch (error) {
        this.loading = false
        this.$errorHandler(error)
      }
    },
    async moveToSelectedPage(page, tableList) {
      this.tableLoader = true
      try {
        await this.getListedSpace(page)
        this.tableLoader = false
        tableList.scrollTop = 0
      } catch (error) {
        this.tableLoader = false
        this.$errorHandler(error)
      }
    },
  },
}
</script>

<style></style>
