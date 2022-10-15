<template>
  <div
    class="s-max-w-[1440px] s-mx-auto s-mb-12 s-px-4 md:s-pl-5 lg:s-pl-[3.625rem] md:s-pr-5 lg:s-pr-[1.875rem] s-relative"
  >
    <MemberDashboardNavbar
      :show-back-btn="true"
      title="Explore Listings"
      text="Search for properties and spaces you may like"
    >
    </MemberDashboardNavbar>
    <SpaceFilters ref="filters" :dashboard-filter="true" @loading="loading" />
    <div class="s-w-full s-bg-[#F4F4F4] s-relative s-min-h-[500px]">
      <Loading v-if="loader" />
      <div v-if="apartments.length" class="s-w-full">
        <div
          class="s-grid md-s:s-grid-cols-[repeat(auto-fill,_minmax(340px,_1fr))] sm:s-grid-cols-[repeat(auto-fill,_minmax(320px,_1fr))] s-grid-cols-[repeat(auto-fill,_minmax(100%,_1fr))] s-gap-x-5 sm:s-gap-y-[52px] s-gap-y-5 s-mb-10"
        >
          <div v-for="apartment in apartments.slice(2)" :key="apartment.slug">
            <Apartment :apartment="apartment" />
          </div>
        </div>
        <div v-show="apartments.length" class="sm:s-pl-10 s-pl-0 s-py-5">
          <Paginate
            :per-page="10"
            :total="total"
            @handlePagination="changePage"
          />
        </div>
      </div>

      <div v-if="apartments.length === 0 && !loader">
        <EmptyState :btn-text="'Tell us'" @btnAction="gotoWaitlist">
          <div class="s-w-32 s-mx-auto s-pt-4 s-pb-6">
            <NoSearch />
          </div>

          <p
            class="s-text-[#77777D] s-leading-6 s-text-sm s-font-normal sm:s-max-w-sm s-max-w-xs s-mx-auto sm:s-px-0 s-px-7"
          >
            Not found what you are looking for?
          </p>
        </EmptyState>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
export default {
  layout: 'renters',
  data() {
    return {
      loader: false,
      currentPage: 1,
    }
  },
  computed: {
    ...mapState('renters/spaces', ['spaces', 'totalPages', 'total']),
    apartments() {
      return this.spaces.map((item) => ({
        name: item.title,
        beds: item.no_rooms,
        bath: item.no_baths,
        spaceType: item.listing_type,
        managed_by_spleet: item.managed_by_spleet,
        service: true,
        city: item.city,
        slug: item.apartment_slug,
        subType: this.setPrice(item.prices, item.is_furnished),
        images: item.images
          .map((el) => {
            return el.image_path
          })
          .slice(0, 3),
        id: item.apartment_id,
      }))
    },
  },
  methods: {
    setPrice(value, furnished) {
      if (value.length === 1) {
        return value[0]
      }
      return value.find((e) => {
        if (!furnished) {
          if (e.sub_plan === 'quarterly') {
            return e
          } else if (e.sub_plan === 'biannual') {
            return e
          } else if (e.sub_plan === 'yearly') {
            return e
          }
        } else if (e.sub_plan === 'monthly' || e.sub_plan === 'daily') {
          return e
        }
        return ''
      })
    },
    loading(value) {
      this.loader = value
    },
    gotoWaitlist() {
      // this.$router.push('/waitlist')
    },
    changePage(page) {
      this.currentPage = page
      this.$refs.filters.paginationChange(page)
    },
  },
}
</script>

<style lang="scss" scoped></style>
