<template>
  <div class="s-bg-[#F4F4F4] s-min-h-screen s-relative">
    <ListingNavbar />
    <MobileProgressDropdown />
    <div class="md-s:s-px-[1.375rem] lg:s-px-0">
      <div
        class="s-max-w-[69.125rem] s-min-h-[calc(100vh-12.375rem)] s-ml-auto s-mr-auto md-s:s-mt-[3.25rem] sm:s-rounded-xl s-overflow-hidden"
      >
        <div class="s-flex s-w-full md-s:s-h-[calc(100vh-12.375rem)]">
          <ListingSidebar />
          <div
            class="s-flex-1 s-h-[calc(100vh-12.375rem)] md-s:!s-rounded-none s-overflow-auto sm:s-relative !s-bg-white listing__scrollbar"
          >
            <Nuxt />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions, mapMutations, mapState } from 'vuex'
export default {
  computed: {
    ...mapState('host/listing', ['propertyListingId']),
  },
  watch: {
    '$route.query'() {
      this.setLevelStep()
      this.getUser()
    },
  },
  async mounted() {
    try {
      this.getPropertySetUp()
    } catch (error) {
      this.$errorHandler(error)
    }
    this.setLevelStep()
    await this.getListedSpace()
    if (this.propertyListingId) {
      this.CURRENT_POSITION(this.propertyListingId)
    }
  },
  methods: {
    ...mapActions('host/listing', ['getPropertySetUp', 'getListedSpace']),
    ...mapActions('user', ['getUser']),
    ...mapMutations('host/listing', [
      'UPDATE_LEVEL',
      'UPDATE_STEP',
      'CURRENT_POSITION',
    ]),
    setLevelStep() {
      if (this.$route?.query && Object.keys(this.$route?.query).length > 0) {
        this.UPDATE_LEVEL(+this.$route?.query?.level)
        this.UPDATE_STEP(+this.$route?.query?.step)
      }
    },
  },
}
</script>

<style lang="scss">
.listing__scrollbar {
  &::-webkit-scrollbar {
    width: 7px;
  }
  &::-webkit-scrollbar-thumb {
    background: #2e48da;
    border-radius: 30px;
  }
}
</style>
