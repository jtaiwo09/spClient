<template>
  <div>
    <div
      class="s-bg-black s-w-full md:s-px-8 s-px-4 md-s:s-pt-6 s-pt-3 s-pb-16 lg:s-px-[4.75rem]"
      :class="{ '!s-px-0 s-bg-transparent !s-pt-0': dashboardFilter }"
    >
      <div class="s-max-w-[1440px] s-w-full s-mx-auto">
        <div v-if="!dashboardFilter" class="s-mb-5">
          <h5
            class="s-uppercase md-s:s-text-sm s-text-xs s-mb-3.5 s-text-[#07A560] s-font-semibold s-text-left"
          >
            EXPLORE SPLEET
          </h5>
          <h2
            class="md-s:s-text-4xl s-text-2xl s-text-white s-font-bold s-w-full s-max-w-md s-text-left s-mb-5"
          >
            Available Spaces
          </h2>
        </div>
        <div class="sm:s-flex s-gap-x-4 s-gap-y-3 s-flex-wrap s-relative">
          <div
            class="s-h-[74px] s-bg-[#1F1F1F] s-border s-border-solid s-border-[#454545]/[0.3] s-rounded-xl md-s:s-pl-5 s-pl-4 lg:s-pr-12 sm:s-pr-8 s-pr-4 s-py-3.5 s-flex-1 s-max-w-[500px] space__location"
            :class="{ '!s-bg-white': dashboardFilter }"
          >
            <label
              for="search"
              class="s-text-[#7C7E8B] s-text-[0.625rem] s-block"
              >LOCATION</label
            >
            <div class="s-flex s-items-center">
              <input
                ref="autocomplete"
                v-model="search"
                type="text"
                class="s-bg-transparent s-border-none focus:!s-outline-none s-text-[#bbbbbb]/[0.8] !s-leading-none md-s:s-text-base s-text-sm s-w-11/12 s-mr-2.5 s-h-fit"
                :class="{ '!s-text-[#000]': dashboardFilter }"
                placeholder="Where would you love to stay?"
              />
              <div v-if="search" @click="clearSearch">
                <ClearIcon cancel-color="#BDBDBD" class="s-cursor-pointer" />
              </div>

              <Search
                v-else
                :width="24"
                :height="24"
                stroke="#BDBDBD"
                class="s-block"
              />
            </div>
          </div>
          <FilterBySpaceType
            :dashboard-filter="dashboardFilter"
            class="sm:s-block s-hidden"
            @filterBySpaceType="filterBySpaceType"
            @clearSpaceType="clearSpaceType"
          />
          <FilterByPrice
            :dashboard-filter="dashboardFilter"
            class="md-x:s-block s-hidden"
            @filterByPrice="filterByPrice"
            @clearPrice="clearPrice"
          />
          <FilterByDuration
            :dashboard-filter="dashboardFilter"
            class="md-s:s-block s-hidden"
            @filterByDuration="filterByDuration"
            @clearDuration="clearDuration"
          />
          <button
            class="s-text-white s-text-sm s-font-semibold s-underline s-block s-mt-4 s-ml-auto s-absolute s-bottom-[-35px] s-right-[3px]"
            :class="{
              '!s-text-[#111111] s-left-[3px] s-text-left': dashboardFilter,
            }"
            @click="toggleShowAllFilters"
          >
            {{
              showAllFilters
                ? 'Collapse Filters'
                : dashboardFilter
                ? 'More Filters'
                : 'Show all filters'
            }}
          </button>
        </div>
      </div>
    </div>
    <div
      class="md:s-px-8 s-px-4 lg:s-px-[4.75rem] s-w-full sm:s-bg-white s-bg-black"
      :class="{ '!s-bg-transparent !s-px-4': dashboardFilter }"
    >
      <div
        v-show="showAllFilters"
        class="s-max-w-[1440px] s-w-full s-mx-auto s-pt-9 s-pb-7"
        :class="{ 's-pt-0': dashboardFilter }"
      >
        <label
          class="s-text-white s-text-xs s-uppercase s-mb-3 s-font-bold md-s:s-hidden s-block"
          :class="{ '!s-text-black': dashboardFilter }"
          >Filters</label
        >
        <FilterBySpaceType
          :dashboard-filter="dashboardFilter"
          class="s-block sm:s-hidden s-mb-2.5"
          @filterBySpaceType="filterBySpaceType"
          @clearSpaceType="clearSpaceType"
        />
        <FilterByPrice
          :dashboard-filter="dashboardFilter"
          class="s-block md-x:s-hidden s-mb-2.5"
          @filterByPrice="filterByPrice"
          @clearPrice="clearPrice"
        />
        <FilterByDuration
          :dashboard-filter="dashboardFilter"
          class="s-block md-s:s-hidden s-mb-9"
          @filterByDuration="filterByDuration"
          @clearDuration="clearDuration"
        />
        <div class="s-flex s-flex-wrap s-justify-between s-mb-8">
          <FilterByFurnishing
            ref="filterByFurnishing"
            :dashboard-filter="dashboardFilter"
            @furnish="furnishing"
          />
          <FilterByPower
            ref="filterByPower"
            :dashboard-filter="dashboardFilter"
            @power="power"
          />
          <FilterByBedrooms
            ref="filterByBedrooms"
            :dashboard-filter="dashboardFilter"
            @filterBed="filterBed"
          />
        </div>
        <div class="s-flex s-flex-wrap-reverse s-justify-end s-items-center">
          <button
            class="s-text-sm sm:s-text-red s-text-white sm:s-mr-6 s-font-semibold s-whitespace-nowrap sm:s-w-fit s-w-full"
            type="button"
            @click="clearFilters"
          >
            Clear Filter
          </button>
          <Button
            text="Apply"
            type="button"
            text-class="sm:s-w-[164px] s-w-full s-bg-primary-blue s-text-white s-h-10 sm:s-mb-0 s-mb-4"
            @submit="getApartments"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'
export default {
  props: {
    dashboardFilter: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      search: '',
      filterObject: {
        location: '',
        limit: 10,
        page: '',
        city: '',
      },
      showAllFilters: false,
    }
  },
  computed: {
    ...mapState('renters/spaces', ['spaces']),
  },
  mounted() {
    if (Object.keys(this.$route.query).length !== 0) {
      this.filterObject = { ...this.$route.query }
      this.search = this.$route.query.location
      this.getApartments()
    } else {
      this.getApartments()
    }
    const autocomplete = new window.google.maps.places.Autocomplete(
      this.$refs.autocomplete,
      {
        types: [],
        componentRestrictions: { country: ['ng', 'gh'] },
        fields: ['address_components', 'formatted_address', 'name'],
      }
    )
    autocomplete.addListener('place_changed', () => {
      const place = autocomplete.getPlace()
      place.address_components.map((component) => {
        const types = component.types
        if (types.includes('locality')) {
          this.city = component.long_name
        }
        return []
      })
      this.search = place.formatted_address
      this.filterObject = {
        ...this.filterObject,
        location: place.formatted_address,
        city: this.city,
      }
      this.getApartments()
    })
  },
  methods: {
    ...mapActions({
      getSpaces: 'renters/spaces/getSpaces',
    }),
    paginationChange(page) {
      this.filterObject.page = page
      this.filterObject.limit = this.limit
      this.getApartments()
    },
    async getApartments() {
      this.$emit('loading', true)
      this.$router.replace({ query: this.filterObject }).catch(() => {})
      try {
        const response = await this.getSpaces(this.filterObject)
        this.$emit('loading', false)
        window.scrollTo(0, 0)
        return response
      } catch (error) {
        this.$emit('loading', false)
        return error
      }
    },
    clearSearch() {
      this.search = ''
      this.filterObject.location = ''
      this.filterObject.city = ''
      this.getApartments()
    },
    filterBySpaceType(selectedSpaceType) {
      if (selectedSpaceType.length > 0) {
        this.filterObject = {
          ...this.filterObject,
          listing_type: selectedSpaceType,
        }
        this.getApartments()
      }
    },
    clearSpaceType() {
      this.filterObject = {
        ...this.filterObject,
        listing_type: null,
      }
      this.getApartments()
    },
    filterByDuration(selectedDuration) {
      if (selectedDuration.length > 0) {
        this.filterObject = {
          ...this.filterObject,
          sub_plan: selectedDuration,
        }
        this.getApartments()
      }
    },
    clearDuration() {
      this.filterObject = {
        ...this.filterObject,
        sub_plan: null,
      }
      this.getApartments()
    },
    filterByPrice(prices) {
      if (prices.length > 0) {
        this.filterObject = {
          ...this.filterObject,
          price: prices,
          price_start: prices[0],
          price_end: prices[1],
        }
      }
      this.getApartments()
    },
    clearPrice() {
      delete this.filterObject.price
      delete this.filterObject.price_start
      delete this.filterObject.price_end

      this.getApartments()
    },
    toggleShowAllFilters() {
      this.showAllFilters = !this.showAllFilters
    },
    furnishing(value) {
      this.filterObject.furnished = value
    },
    power(value) {
      this.filterObject.power = value
    },
    filterBed(value) {
      this.filterObject.bed = value
    },
    clearFilters() {
      this.filterObject = {
        location: '',
        limit: 10,
        page: '',
        city: '',
      }
      this.$refs.filterByFurnishing.clear()
      this.$refs.filterByBedrooms.clear()
      this.$refs.filterByPower.clear()
      this.showAllFilters = false
      this.getApartments()
    },
  },
}
</script>

<style lang="scss"></style>
