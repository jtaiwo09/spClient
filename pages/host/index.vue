<template>
  <div>
    <Loading v-if="loader" />
    <div
      v-else
      class="s-px-4 md:s-pl-5 lg:s-pl-[3.625rem] md:s-pr-5 lg:s-pr-[1.875rem] s-max-w-[1440px] s-mx-auto s-mb-10"
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
            Here is a quick overview of your listings.
          </p>
          <div
            v-if="hostDashboard"
            class="s-flex s-flex-col sm:s-flex-row s-space-y-3 sm:s-space-y-0 sm:s-space-x-3"
          >
            <div
              class="s-w-full s-flex s-flex-col s-justify-center sm:s-w-[42%] s-rounded-lg s-border s-border-solid s-border-[#e0def7] s-bg-white s-px-6 s-py-[1.125rem]"
            >
              <div class="icon_wrap s-bg-primary-blue">
                <HomeIcon fill="white" stroke="white" />
              </div>
              <p
                class="uppercase s-text-xs s-leading-4 s-text-[#63687E] s-mt-5"
              >
                SPACES LISTED
              </p>
              <h2
                class="s-text-[#000929] s-font-bold s-text-[2rem] s-leading-[125%] s-tracking-[-0.01em]"
              >
                {{ hostDashboard.spacesListed }}
              </h2>
              <div
                class="s-text-sm s-mt-auto s-border-t s-border-solid s-border-[#E0DEF7] s-pt-3"
              >
                <div class="s-flex s-items-center">
                  <HomeIcon fill="white" stroke="black" />
                  <p class="s-ml-3 s-font-normal s-text-sm">
                    {{ hostDashboard.totalNumberOfAvailableApartments }}
                    Available
                  </p>
                </div>
              </div>
            </div>
            <div
              class="s-w-full sm:s-w-[58%] s-rounded-lg s-border s-border-solid s-px-6 s-border-[#e0def7] s-bg-white s-py-5"
            >
              <div class="s-pb-4 s-border-b s-border-solid s-border-[#E0DEF7]">
                <p class="uppercase s-text-xs s-leading-4 s-text-[#63687E]">
                  EARNINGS
                </p>
                <h2
                  class="s-text-[#000929] s-mt-1.5 s-mb-2 s-font-bold s-text-[2rem] s-leading-[125%] s-tracking-[-0.01em]"
                  v-html="formattedAmount(hostDashboard.earningsForTheMonth)"
                ></h2>
                <p class="s-text-sm s-text-[#63687E] s-font-normal s-leading-4">
                  This month
                </p>
              </div>
              <div>
                <p
                  class="uppercase s-text-xs s-leading-4 s-text-[#63687E] s-mt-5"
                >
                  ACTIVE SUBCRIPTIONS
                </p>
                <h2
                  class="s-text-[#000929] s-mt-1.5 s-font-bold s-text-[2rem] s-leading-[125%] s-tracking-[-0.01em]"
                >
                  {{ hostDashboard.hostActiveSubscriptions }}
                </h2>
                <p class="s-text-sm s-text-[#63687E] s-font-normal s-leading-4">
                  This month
                </p>
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
            <nuxt-link to="/faq">
              <p class="s-text-[#010101] s-text-sm s-leading-4 s-font-semibold">
                Read our FAQS
              </p>
            </nuxt-link>
          </div>
          <div
            class="s-rounded-lg s-border s-border-solid s-border-[#e0def7] s-mt-1.5 rounded-lg s-bg-white s-pl-[1.625rem] s-h-[76px] s-flex s-space-x-5 s-items-center"
          >
            <div class="icon_wrap s-bg-[#14AB69] s-w-10 s-h-10">
              <WhiteEnvelopeIcon fill="white" />
            </div>
            <a
              href="mailto:info@spleet.africa"
              class="s-text-[#010101] s-text-sm s-leading-4 s-font-semibold">
              Contact Spleet Support
          </a>
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
        class="s-mt-6 s-bg-white s-border s-border-solid s-border-[#EDEDED] s-rounded-[10px] s-px-6 s-py-9 s-w-full"
      >
        <div class="s-flex s-justify-between s-flex-wrap">
          <div>
            <p class="s-text-[1.125rem] s-leading-6 s-font-bold s-mb-1">
              Recent Bookings
            </p>
            <p
              class="s-text-[#63687E] s-text-sm s-font-normal s-mb-2 sm:s-mb-4"
            >
              Here’a a breakdown of your recent bookings
            </p>
          </div>
          <nuxt-link
            to="/host/bookings"
            class="s-text-primary-blue s-text-sm s-font-bold hover:s-text-primary-blue s-flex s-items-center s-gap-1"
          >
            see all bookings
            <ChevronDownIcon stroke="#2E48DA" class="-s-rotate-90" />
          </nuxt-link>
        </div>
        <div
          class="s-p-[1.125rem] s-border s-border-solid s-border-[#E0DEF7] s-rounded-[8px] s-overflow-auto s-hidden sm:s-block"
        >
          <div class="s-min-w-[700px]">
            <table class="s-w-full">
              <thead
                class="s-bg-[#F7F8FF] s-text-[#0E1956] s-uppercase s-font-semibold s-text-xs s-text-left"
              >
                <tr>
                  <th class="s-pt-6 s-pb-5 s-pl-8">Tenant</th>
                  <th>Email Address</th>
                  <th>Phone Number</th>
                  <th>Booking Date</th>
                </tr>
              </thead>
              <tbody class="s-text-[#0F0C3D] s-text-sm s-font-normal">
                <tr
                  v-for="booking in recentBookings"
                  :key="booking.id"
                  class="s-border-b s-border-solid s-border-[#EDEDED] last:s-border-none"
                >
                  <td class="s-py-5 s-pl-8">
                    <div class="s-flex s-items-center">
                      <img
                        :src="booking.user_kyc.photo"
                        alt=""
                        class="s-w-[3.5rem] s-h-[3.5rem] s-object-cover s-rounded-full s-flex-shrink-0"
                      />
                      <p class="s-ml-[0.875rem]">
                        {{ booking.user_kyc.firstname }}
                      </p>
                    </div>
                  </td>
                  <td class="s-align-middle s-h-full">
                    {{ booking.user_kyc.email }}
                  </td>
                  <td class="s-align-middle s-h-full">
                    {{ booking.user_kyc.phone }}
                  </td>
                  <td class="s-align-middle s-h-full">
                    {{ formatDate(booking.created_at) }}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
        <div class="s-max-[18px] s-flex s-gap-3 s-flex-col sm:s-hidden">
          <div
            v-for="booking in recentBookings"
            :key="booking.id"
            class="s-rounded-xl s-bg-white s-border s-border-[#EDEDED] s-border-solid s-p-6"
          >
            <img
              :src="booking.user_kyc.photo"
              alt=""
              class="s-w-[70px] s-h-[70px] s-block s-rounded-full s-object-cover"
            />
            <div class="s-mt-2.5 s-mb-4">
              <p class="s-text-[#0F0C3D] s-font-bold s-mb-1.5">
                {{
                  `${booking.user_kyc.firstname} ${booking.user_kyc.lastname}`
                }}
              </p>
              <div
                class="s-flex s-items-center s-text-sm s-text-[#5C5A77] s-mb-2.5"
              >
                <MessageIcon stroke="#5C5A77" />
                <p class="s-ml-2">{{ booking.user_kyc.email }}</p>
              </div>
              <div class="s-flex s-items-center s-text-sm s-text-[#5C5A77]">
                <CallIcon stroke="#5C5A77" />
                <p class="s-ml-2">{{ booking.user_kyc.phone }}</p>
              </div>
            </div>
            <div class="s-mt-2.5">
              <p
                class="s-text-[#0F0C3D] s-font-semibold s-text-xs s-mb-1.5 s-uppercase"
              >
                Booking Date
              </p>
              <div class="s-flex s-items-center s-text-sm s-text-[#5C5A77]">
                <CalendarIcon stroke="#5C5A77" />
                <p class="s-ml-2">{{ formatDate(booking.created_at) }}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters, mapState } from 'vuex'
import { formatReadbleDate, formatCurrencyAmount } from '../../helpers/utils'

export default {
  layout: 'host',
  data() {
    return {
      loader: false,
      hostBookings: [],
    }
  },
  computed: {
    ...mapGetters('user', ['userFullname']),
    ...mapState('host', ['hostDashboard']),
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
    recentBookings() {
      const data = [...this.hostBookings]
      if (data.length > 1) {
        return data
          .sort(
            (d1, d2) =>
              new Date(d2.updated_at).getTime() -
              new Date(d1.updated_at).getTime()
          )
          .slice(0, 5)
      }
      return data
    },
  },
  async mounted() {
    this.loader = true
    try {
      const response = await Promise.all([
        this.getHostDashboard(),
        this.getHostBookings({ page: 1, limit: 10 }),
      ])
      this.dashboardInfo = response[0].data.data
      this.hostBookings = response[1].data.data.bookings
      this.loader = false
    } catch (error) {
      this.loader = false
      this.$errorHandler(error)
    }
  },

  methods: {
    ...mapActions('host', ['getHostBookings', 'getHostDashboard']),
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
    formatDate(date) {
      return formatReadbleDate(date)
    },
    formattedAmount(amount) {
      return formatCurrencyAmount(amount, 'NGN')
    },
    async getBookings() {
      try {
        const response = await this.getHostBookings()
        this.hostBookings = response.data.data.bookings
      } catch (error) {
        this.$errorHandler(error)
      }
    },
  },
}
</script>
