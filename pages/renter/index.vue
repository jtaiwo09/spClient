<template>
  <div>
    <Loading v-if="loader" />
    <div
      v-else
      class="s-px-4 md:s-pl-5 lg:s-pl-[3.625rem] md:s-pr-5 lg:s-pr-[1.875rem] s-max-w-[1440px] s-mx-auto"
    >
      <MemberDashboardNavbar
        :title="`Good morning, ${membersName}`"
        text="Welcome to your Spleet dashboard"
      ></MemberDashboardNavbar>
      <div class="s-flex md:s-space-x-4 lg:s-space-x-7 s-w-full">
        <div
          class="s-bg-white s-border s-border-solid s-border-[#EDEDED] s-rounded-[10px] s-px-6 s-py-9 s-w-full md-x:s-w-[60%]"
        >
          <h2 class="s-text-[1.125rem] s-leading-6 s-font-bold s-mb-1">
            Overview
          </h2>
          <p class="s-text-[#63687E] s-text-sm s-font-normal s-mb-4">
            Here’s a quick overview of what’s happening
          </p>
          <div
            v-if="dashboardInfo"
            class="s-flex s-flex-col sm:s-flex-row s-space-y-3 sm:s-space-y-0 sm:s-space-x-3"
          >
            <div
              class="s-w-full s-flex s-flex-col s-justify-center sm:s-w-[42%] s-rounded-lg s-border s-border-solid s-border-[#e0def7] s-bg-white s-pl-6 s-py-[1.875rem]"
            >
              <div class="icon_wrap s-bg-[#14AB69]">
                <HomeIcon fill="white" stroke="white" />
              </div>
              <p
                class="uppercase s-text-xs s-leading-4 s-text-[#63687E] s-mt-5"
              >
                SPACES BOOKED
              </p>
              <h2
                class="s-text-[#000929] s-font-bold s-text-[2rem] s-leading-[125%] s-tracking-[-0.01em]"
              >
                {{ dashboardInfo.spacesBooked }}
              </h2>
              <NuxtLink
                to="#"
                class="s-text-sm s-mt-auto s-font-normal s-leading-4 s-text-primary-blue"
              >
                See All
              </NuxtLink>
            </div>
            <div
              class="s-w-full sm:s-w-[58%] s-rounded-lg s-border s-border-solid s-border-[#e0def7] s-bg-white s-py-5"
            >
              <div
                class="s-px-4 s-pb-4 s-mb-[1.75rem] s-border-b s-border-solid s-border-[#E0DEF7]"
              >
                <p class="uppercase s-text-xs s-leading-4 s-text-[#63687E]">
                  MAINTENANCE REQUETS
                </p>
                <h2
                  class="s-text-[#000929] s-mt-1.5 s-mb-2 s-font-bold s-text-[2rem] s-leading-[125%] s-tracking-[-0.01em]"
                >
                  {{ dashboardInfo.maintenanceRequests }}
                </h2>
                <NuxtLink
                  to="#"
                  class="s-text-sm s-font-normal s-leading-4 s-text-primary-blue s-mt-5"
                >
                  See All
                </NuxtLink>
              </div>
              <div class="s-px-4">
                <p
                  class="uppercase s-text-xs s-leading-4 s-text-[#63687E] s-mt-5"
                >
                  ACTIVE SUBCRIPTIONS
                </p>
                <h2
                  class="s-text-[#000929] s-mt-1.5 s-font-bold s-text-[2rem] s-leading-[125%] s-tracking-[-0.01em]"
                >
                  {{ dashboardInfo.activeSubscriptions }}
                </h2>
                <NuxtLink
                  to="#"
                  class="s-text-sm s-font-normal s-leading-4 s-text-primary-blue s-mt-5"
                >
                  See All
                </NuxtLink>
              </div>
            </div>
          </div>
        </div>

        <div
          class="s-hidden md-x:s-block s-bg-white s-border s-border-solid s-border-[#EDEDED] s-rounded-[10px] s-px-6 s-py-9 s-w-[40%]"
        >
          <h2 class="s-text-[1.125rem] s-leading-6 s-font-bold s-mb-1">
            Help Centre
          </h2>
          <p class="s-text-[#63687E] s-text-sm s-font-normal">
            Need help? Our support team has you covered
          </p>
          <div
            class="s-rounded-lg s-border s-border-solid s-border-[#e0def7] s-mt-5 rounded-lg s-bg-white s-pl-[1.625rem] s-h-[76px] s-flex s-space-x-5 s-items-center"
          >
            <div class="icon_wrap s-bg-[#2E48DA] s-w-10 s-h-10">
              <ShieldIcon />
            </div>
            <p class="s-text-[#010101] s-text-sm s-leading-4 s-font-semibold">
              Read our FAQS
            </p>
          </div>
          <div
            class="s-rounded-lg s-border s-border-solid s-border-[#e0def7] s-mt-1.5 rounded-lg s-bg-white s-pl-[1.625rem] s-h-[76px] s-flex s-space-x-5 s-items-center"
          >
            <div class="icon_wrap s-bg-[#14AB69] s-w-10 s-h-10">
              <WhiteEnvelopeIcon fill="white" />
            </div>
            <p class="s-text-[#010101] s-text-sm s-leading-4 s-font-semibold">
              Contact Spleet Support
            </p>
          </div>
          <div
            class="s-rounded-lg s-border s-border-solid s-border-[#e0def7] s-mt-1.5 rounded-lg s-bg-white s-pl-[1.625rem] s-h-[76px] s-flex s-space-x-5 s-items-center"
          >
            <div class="icon_wrap s-bg-[#2E48DA] s-w-10 s-h-10">
              <BellIcon />
            </div>
            <p class="s-text-[#010101] s-text-sm s-leading-4 s-font-semibold">
              Updates From Spleet
            </p>
          </div>
        </div>
      </div>
      <div
        class="s-flex s-flex-col s-space-y-3 sm:s-space-y-0 sm:s-flex-row s-w-full sm:s-justify-between sm:s-items-center s-my-10"
      >
        <div>
          <h2 class="s-text-black s-text-xl s-mb-1.5 s-leading-6 s-font-bold">
            Explore Listings
          </h2>
          <p class="s-text-[#242428] s-text-sm s-font-normal s-leading-4">
            Search for properties and spaces you may like
          </p>
        </div>
        <Button
          text="Browse"
          class="s-w-full s-bg-transparent sm:s-w-[132px] s-h-12 s-border s-border-solid !s-text-primary-blue s-border-primary-blue"
          @submit="$router.push('/renter/browse-marketplace')"
        />
      </div>
      <div
        class="s-grid md-s:s-grid-cols-[repeat(auto-fill,_minmax(340px,_1fr))] sm:s-grid-cols-[repeat(auto-fill,_minmax(320px,_1fr))] s-grid-cols-[repeat(auto-fill,_minmax(100%,_1fr))] s-gap-x-5 sm:s-gap-y-[52px] s-gap-y-5 s-mb-10"
      >
        <div v-for="apartment in apartments.slice(0, 3)" :key="apartment.slug">
          <Apartment :apartment="apartment" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters, mapState } from 'vuex'

export default {
  layout: 'renters',
  data() {
    return {
      dashboardInfo: null,
      loader: false,
    }
  },
  computed: {
    ...mapGetters('user', ['userFullname']),
    ...mapState('renters/spaces', ['spaces']),
    membersName() {
      return this.userFullname?.split(' ')[0]
    },
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
  async mounted() {
    this.loader = true
    try {
      const response = await Promise.all([
        this.getSpaces(),
        this.getMemberDashboardInfo(),
      ])
      this.loader = false
      this.dashboardInfo = response[1].data.data
    } catch (error) {
      this.loader = false
      this.$errorHandler(error)
    }
  },

  methods: {
    ...mapActions('renters', ['getMemberDashboardInfo']),
    ...mapActions('renters/spaces', ['getSpaces']),
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
  },
}
</script>
