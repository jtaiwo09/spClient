<template>
  <div>
    <Loading v-if="loader" />
    <div
      v-else
      class="s-relative s-px-4 md:s-pl-5 lg:s-pl-[3.625rem] md:s-pr-5 lg:s-pr-[1.875rem]"
    >
      <MemberDashboardNavbar
        title="Bookings"
        text="See full details of all your bookings"
      />
      <div
        class="s-flex s-flex-col s-mt-[1.5rem] s-w-full md:s-bg-white md:s-rounded-xl s-max-w-[1440px] s-mx-auto s-min-h-[600px] s-mb-10"
      >
        <div>
          <div v-if="bookingList.length">
            <TableTop
              :show-btn="false"
              placeholder="Search Booking"
              :loading="searchLoader"
              :scroll-tab="false"
              @customInput="(value) => (search = value)"
              @searchData="searchData"
            >
              <Select
                :class="'s-mr-6 md:s-mr-8 s-w-[15.188rem] !s-mb-2'"
                label=""
                name="status"
                icon=""
                :options="filter"
                :value="filterBy"
                @update="filteredBookings"
              />
            </TableTop>
            <div>
              <!-- <TableLoader v-if="showLoader" /> -->
              <div v-if="searchData.length">
                <div
                  class="s-hidden md:s-block s-overflow-x-auto s-min-h-[calc(600px-80px)]"
                >
                  <Tables :table-head="headers">
                    <tr
                      v-for="booking in searchData"
                      :key="booking.id"
                      class="s-text-center s-bg-[#fff] s-border-b dark:s-border-gray-700 hover:s-bg-[#EFFFF8]"
                    >
                      <td>
                        <p
                          class="s-text-sm s-font-normal s-leading-6 s-text-[#0F0C3D] s-pt-8 s-pb-7"
                        >
                          {{ booking.space_name || '-' }}
                        </p>
                      </td>
                      <td>
                        <p
                          class="s-text-sm s-leading-6 s-text-[#0F0C3D] s-font-normal s-capitalize"
                        >
                          {{ booking.space_type }}
                        </p>
                      </td>
                      <td>
                        <p
                          class="s-text-sm s-leading-6 s-text-[#0F0C3D] s-font-normal"
                        >
                          {{ booking.sub_plan | capitalize }}
                        </p>
                      </td>
                      <td>
                        <p
                          class="s-text-sm s-leading-6 s-text-[#0F0C3D] s-font-normal"
                          v-html="sumPrices(booking.price_template)"
                        ></p>
                      </td>
                      <td>
                        <p
                          class="s-text-sm s-leading-6 s-text-[#0F0C3D] s-font-normal"
                        >
                          {{ formatDate(booking.created_at) }}
                        </p>
                      </td>
                      <td>
                        <StatusBadge
                          :text="booking.status"
                          :class="'s-mx-auto'"
                        />
                      </td>
                      <td>
                        <TableAction @openDropdown="expandOption(booking)">
                          <button
                            class="s-bg-white s-border-[0.5px] s-text-sm s-border-[#B1B7D6] s-py-[19px] s-px-[34px] s-rounded-xl"
                            @click="expandOption(booking)"
                          >
                            <span class="google__wrap-text s-mr-2"> View </span>
                          </button>
                        </TableAction>
                      </td>
                    </tr>
                  </Tables>
                </div>
                <div class="md:s-hidden">
                  <!-- Mobile Screen -->
                  <template v-if="searchData.length">
                    <div v-for="booking in searchData" :key="booking.id">
                      <MobileCard :data="booking">
                        <TableAction
                          position="!s-left-[-50%] !s-translate-x-[-50%]"
                          @openDropdown="expandOption(booking)"
                        >
                          <button
                            class="s-bg-white s-border-[0.5px] s-text-sm s-border-[#B1B7D6] s-py-[19px] s-px-[34px] s-rounded-xl"
                            @click="expandOption(booking)"
                          >
                            <span class="google__wrap-text s-mr-2"> View </span>
                          </button>
                        </TableAction>
                      </MobileCard>
                    </div>
                  </template>
                </div>
              </div>
              <div v-else>
                <EmptyState
                  :title="`No results found for “${search}”`"
                  :display="false"
                >
                  <div class="s-w-32 s-mx-auto s-pt-4 s-pb-6">
                    <NoResult />
                  </div>

                  <p
                    class="s-leading-6 s-text-sm s-font-normal sm:s-max-w-sm s-max-w-xs s-mx-auto sm:s-px-0 s-px-7"
                  >
                    Sorry, we couldn’t find any result with that. Please try
                    searching for someone else
                  </p>
                </EmptyState>
              </div>
            </div>
          </div>
          <div v-else>
            <!-- No Booking -->
            <EmptyState :display="false">
              <div class="s-w-32 s-mx-auto s-pt-4 s-pb-6">
                <NoSearch />
              </div>

              <p
                class="s-text-[#77777D] s-leading-6 s-text-sm s-font-normal sm:s-max-w-sm s-max-w-xs s-mx-auto sm:s-px-0 s-px-7"
              >
                It looks like you don’t have any booking yet
              </p>
            </EmptyState>
          </div>
        </div>
        <div
          v-show="bookingList.length"
          class="s-mt-auto sm:s-pl-10 s-pl-0 s-py-5"
        >
          <t-pagination
            v-model="currentPage"
            :total-items="userBookings.totalRec"
            :per-page="limit"
            :limit="4"
            prev-label="Prev"
            next-label="Next"
            @change="changePage"
          />
        </div>
      </div>
    </div>
    <div
      v-if="showModal"
      class="dialog-bg s-fixed s-top-0 s-bottom-0 s-right-0 s-left-0 s-w-full s-z-50 s-flex s-items-center s-justify-end"
      @click.self="showModal = false"
    >
      <div class="s-h-[100vh] s-overflow-scroll">
        <div class="s-bg-[#fff]">
          <DetailPageModal
            title="Booking Details"
            description="Here’s a quick overview of this space"
            :status="selectedBooking.status"
            @close="showModal = false"
          >
            <div class="s-border-b s-border-solid s-border-[#EAEDFD] s-mb-10">
              <p class="s-text-base s-font-bold s-mb-6">Space Details</p>
              <div class="s-flex s-items-center s-max-w-[400px] s-mb-8">
                <div class="s-flex-1">
                  <p
                    class="s-text-xs s-text-[#0F0C3D] s-font-semibold s-mb-1.5"
                  >
                    SPACE NAME
                  </p>
                  <div class="s-flex s-items-center">
                    <UserIcon :width="17" :height="17" />
                    <p
                      class="s-text-sm s-font-normal s-text-[#5C5A74] s-ml-2.5"
                    >
                      {{ selectedBooking.space_name }}
                    </p>
                  </div>
                </div>
                <div class="s-flex-1">
                  <p
                    class="s-text-xs s-text-[#0F0C3D] s-font-semibold s-mb-1.5"
                  >
                    SUB PLAN
                  </p>
                  <div class="s-flex s-items-center">
                    <HomeIcon width="17" height="17" />
                    <p
                      class="s-text-sm s-font-normal s-text-[#5C5A74] s-ml-2.5"
                    >
                      {{
                        selectedBooking.sub_plan === 'yearly'
                          ? 'Annually'
                          : selectedBooking.sub_plan | capitalize
                      }}
                    </p>
                  </div>
                </div>
              </div>
              <div class="s-flex s-items-center s-max-w-[400px] s-mb-8">
                <div class="s-flex-1">
                  <p
                    class="s-text-xs s-text-[#0F0C3D] s-font-semibold s-mb-1.5"
                  >
                    SUB TYPE
                  </p>
                  <div class="s-flex s-items-center">
                    <LabelBlackIcon width="17" height="17" />
                    <p
                      class="s-text-sm s-font-normal s-text-[#5C5A74] s-ml-2.5"
                    >
                      {{ selectedBooking.booking_type | capitalize }}
                    </p>
                  </div>
                </div>
                <div class="s-flex-1">
                  <p
                    class="s-text-xs s-text-[#0F0C3D] s-font-semibold s-mb-1.5"
                  >
                    START DATE
                  </p>
                  <div class="s-flex s-items-center">
                    <CalendarIcon :width="17" :height="17" />
                    <p
                      class="s-text-sm s-font-normal s-text-[#5C5A74] s-ml-2.5"
                    >
                      {{ formatDate(selectedBooking.start_date) }}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div class="s-mb-10">
              <p class="s-text-base s-font-bold s-mb-6">Price Breakdown</p>
              <div class="s-flex s-items-center s-max-w-[400px] s-mb-8">
                <div class="s-flex-1">
                  <p
                    class="s-flex-1 s-text-xs s-text-[#0F0C3D] s-font-semibold s-mb-1.5"
                  >
                    RENT
                  </p>
                  <p
                    class="s-text-sm s-font-normal s-text-[#5C5A74]"
                    v-html="
                      formatCurrency(
                        Number(selectedBooking.price_template.rent) +
                          Number(selectedBooking.price_template.commission),
                        selectedBooking.price_template.formatCurrency
                      )
                    "
                  ></p>
                </div>
                <div class="s-flex-1">
                  <p
                    class="s-text-xs s-text-[#0F0C3D] s-font-semibold s-mb-1.5"
                  >
                    BOOKING FEE
                  </p>
                  <p
                    class="s-text-sm s-font-normal s-text-[#5C5A74]"
                    v-html="
                      formatCurrency(
                        selectedBooking.price_template.booking_fee,
                        selectedBooking.price_template.currency
                      )
                    "
                  ></p>
                </div>
              </div>
              <div class="s-flex s-items-center s-max-w-[400px] s-mb-8">
                <div class="s-flex-1">
                  <p
                    class="s-text-xs s-text-[#0F0C3D] s-font-semibold s-mb-1.5"
                  >
                    SERVICE CHARGE
                  </p>
                  <p
                    class="s-text-sm s-font-normal s-text-[#5C5A74]"
                    v-html="
                      formatCurrency(
                        selectedBooking.price_template.service_charge,
                        selectedBooking.price_template.currency
                      )
                    "
                  ></p>
                </div>
                <div class="s-flex-1">
                  <p
                    class="s-text-xs s-text-[#0F0C3D] s-font-semibold s-mb-1.5"
                  >
                    SECURITY DEPOSIT
                  </p>
                  <p
                    class="s-text-sm s-font-normal s-text-[#5C5A74]"
                    v-html="
                      formatCurrency(
                        Number(
                          selectedBooking.price_template.security_deposit
                        ) +
                          Number(
                            selectedBooking.price_template
                              .eviction_security_deposit
                          ),
                        selectedBooking.price_template.currency
                      )
                    "
                  ></p>
                </div>
              </div>
              <div class="s-flex s-items-center s-max-w-[400px] s-mb-8">
                <div class="s-flex-1">
                  <p
                    class="s-text-xs s-text-[#0F0C3D] s-font-semibold s-mb-1.5"
                  >
                    VAT
                  </p>
                  <p
                    class="s-text-sm s-font-normal s-text-[#5C5A74]"
                    v-html="formatCurrency(selectedBooking.price_template.vat)"
                  ></p>
                </div>
                <div class="s-flex-1">
                  <p
                    class="s-text-xs s-text-[#0F0C3D] s-font-semibold s-mb-1.5"
                  >
                    DISCOUNT
                  </p>
                  <p
                    class="s-text-sm s-font-normal s-text-[#5C5A74]"
                    v-html="
                      formatCurrency(selectedBooking.price_template.discount)
                    "
                  ></p>
                </div>
              </div>
            </div>
            <div class="s-text-base s-font-bold s-mb-16">
              <p class="s-uppercase s-mb-2">Total</p>
              <p v-html="sumPrices(selectedBooking.price_template)"></p>
            </div>

            <Button
              v-if="selectedBooking.status == 'accepted'"
              text="Proceed to pay"
              class="s-bg-primary-blue s-text-white s-w-[11.375rem] s-px-2"
              @submit="togglePaymentModal"
            />
          </DetailPageModal>
        </div>
      </div>
    </div>
    <template v-if="paymentModal">
      <Modal :show="paymentModal" @close="paymentModal = false">
        <PayWith
          :has-card="false"
          :total-amount-renew="amount(selectedBooking.price_template)"
          :currency="selectedBooking.price_template.currency"
          :user="user"
          :meta="{
            bookingId: selectedBooking.id,
            callbackUrl: 'welcomeUrl',
            addCard: addCard === null ? false : addCard,
            internalPaymentReference: generateReference(),
          }"
          :customize-flutter="customizeFlutter"
          :renew-with-flutterwave="payWithFlutterwave"
          :closed-payment-modal="closedPaymentModal"
          :renew-with-paystack="payWithPaystack"
          :renew-with-card="payWithCard"
          :selected-subscription="selectedBooking"
          :loading="paymentLoader"
        >
          <div
            class="s-mt-[3rem] s-pb-2 s-border-b-[0.3px] s-border-solid s-border-[#B1B7D6] s-px-2.5 s-mb-6"
          >
            <h2 class="s-font-bold s-text-[#0E0C0C] s-text-xl">
              Confirm Booking Details
            </h2>
            <p
              class="s-max-[348px] s-w-full s-text-sm s-font-normal s-text-[#63687E]"
            >
              Please confirm that the details of the Booking is correct
            </p>
          </div>
        </PayWith>
      </Modal>
    </template>
  </div>
</template>

<script>
import { mapActions, mapState } from 'vuex'
import {
  formatReadbleDate,
  sumBookingPrice,
  formatCurrencyAmount,
  sumBookingPriceWithoutCurrency,
} from '../../../helpers/utils'
import Paystack from '../../../helpers/utils/paystackSetup'

export default {
  layout: 'renters',
  data() {
    return {
      addCard: null,
      paymentModal: false,
      selectedPaymentOption: '',
      filterBy: '',
      searchLoader: true,
      search: '',
      selectedBooking: null,
      showModal: false,
      loading: false,
      currentPage: 1,
      limit: 10,
      paginationLoader: false,
      paymentLoader: false,
      headers: [
        {
          text: 'SPACE NAME',
          value: 'name',
        },
        { text: 'SPACE TYPE', value: 'type' },
        { text: 'SUB PLAN', value: 'plan' },
        { text: 'SUB COST', value: 'cost' },
        { text: 'BOOKING DATE', value: 'booking' },
        { text: 'STATUS', value: 'status' },
        { text: 'Actions', value: 'actions' },
      ],
      bookingList: [],
    }
  },
  computed: {
    ...mapState('renters', ['loader', 'userBookings', 'cards']),
    ...mapState('user', ['userData']),
    filter() {
      const setFilter = this.bookingList
        .map((el) => ({
          text: this.capitalize(el.status),
          value: el.status,
        }))
        .filter(
          (el, i, arr) => arr.findIndex((obj) => obj.value === el.value) === i
        )
      setFilter.unshift({ text: 'All', value: 'all' })

      return setFilter
    },
    searchData() {
      if (this.search) {
        return this.bookingList.filter((item) =>
          item.space_name.toLowerCase().includes(this.search.toLowerCase())
        )
      } else {
        return this.bookingList
      }
    },
    customizeFlutter() {
      if (this.selectedBooking) {
        return {
          title: this.selectedBooking.space_name,
          description: `Payment for ${this.selectedBooking.space_name} space`,
          logo: 'https://res.cloudinary.com/spleetng/image/upload/v1611148920/logo-icon.svg',
        }
      } else {
        return undefined
      }
    },
    user() {
      if (this.userData) {
        return {
          name: `${this.userData.kyc.firstname} ${this.userData.kyc.lastname}`,
          email: this.userData.user.email,
          phone: this.userData.kyc.phone,
        }
      }
      return undefined
    },
  },
  mounted() {
    Paystack.init()
    const page = this.$route.query.page
    if (page) {
      this.currentPage = +page
      this.getBookings(+page)
    } else {
      this.getBookings()
    }
  },
  methods: {
    ...mapActions('renters', ['getUserBookings']),
    amount(amount) {
      return sumBookingPriceWithoutCurrency(amount)
    },
    async getBookings(page) {
      try {
        await this.getUserBookings({ page, limit: this.limit })
        this.bookingList = this.userBookings.bookings
      } catch (error) {
        this.$errorHandler(error)
      }
    },
    capitalize(value) {
      return value.charAt(0).toUpperCase() + value.slice(1)
    },
    handleColor(status) {
      switch (status) {
        case 'pending':
        case 'awaiting approval':
          return 's-bg-[#F7CE51]'
        case 'paid':
        case 'active':
        case 'accepted':
        case 'published':
          return 's-bg-[#3DDC97]'
        case 'unavailable':
        case 'expired':
          return 's-bg-[#FF7F37]'
        case 'rejected':
          return 's-bg-[#FF4242]/0.4'
        case 'cancelled':
        case 'canceled':
        case 'declined':
          return 's-bg-[#EA4335]'
        default:
          return ''
      }
    },
    expandOption(item) {
      this.selectedBooking = item
      this.showModal = true
    },
    sumPrices(priceData) {
      return sumBookingPrice(priceData)
    },
    filteredBookings(value) {
      this.filterBy = value
      if (value === 'all') {
        this.bookingList = this.userBookings.bookings
      } else if (this.filter.some((el) => el.value === value)) {
        this.bookingList = this.bookingList.filter((el) => el.status === value)
      }
    },
    togglePaymentModal() {
      this.showModal = false
      this.paymentModal = true
    },
    formatDate(date) {
      return formatReadbleDate(date)
    },
    formatCurrency(amount) {
      return formatCurrencyAmount(amount, 'NGN')
    },
    async changePage() {
      this.paginationLoader = true
      try {
        await this.getUserBookings({
          page: this.currentPage,
          limit: this.limit,
        })
        this.$router.replace({ query: { page: this.currentPage } })
        this.paginationLoader = false
      } catch (error) {
        this.paginationLoader = false
        this.$errorHandler(error)
      }
    },
    generateReference() {
      const date = new Date()
      return date.getTime().toString()
    },
    closedPaymentModal() {},
    payForBooking() {
      if (this.selectedPaymentOption) {
        switch (this.selectedPaymentOption) {
          case 'flutterwave': {
            this.$refs.flutterwave.$el.click()
            break
          }
          case 'paystack': {
            this.makePayment()
            break
          }
          case 'card': {
            this.payWithCard(this.selectedBooking.id)
            break
          }
        }
      }
    },
    payWithFlutterwave(response) {
      this.paymentLoader = true
      if (response.status === 'successful') {
        this.paymentLoader = false
        this.paymentModal = false
        setTimeout(() => {
          this.$showToast(
            'You have successfully made payment for this booking',
            'success'
          )
          this.$router.push('/renter/subscriptions')
        }, 5000)
      }
    },
    payWithPaystack() {
      this.paymentLoader = true
      const amount = sumBookingPriceWithoutCurrency(
        this.selectedBooking.price_template
      )
      const metadata = {
        bookingId: this.selectedBooking.id,
        // callbackUrl: this.welcomeUrl,
        internalPaymentReference: this.generateReference(),
        addCard: this.addCard === null ? false : this.addCard,
      }
      Paystack.startPayment(
        (res, err) => {
          this.paymentLoader = false
          if (res) {
            this.paymentModal = false
            setTimeout(() => {
              this.$showToast(
                'You have successfully made payment for this booking',
                'success'
              )
              this.$router.push('/renter/subscriptions')
            }, 5000)
          } else {
            this.$errorHandler(err)
          }
        },
        Math.round(amount * 100),
        this.user.email,
        metadata
      )
    },
    async payWithCard(id) {
      this.paymentLoader = true
      if (this.cards && this.cards.length > 0) {
        try {
          await this.renewUserSubcription({
            id,
            data: { use_card: true, addCard: false },
          })
          this.paymentLoader = false
          this.showPaymentModal = false
          setTimeout(() => {
            this.$showToast(
              'You have successfully made payment for this booking',
              'success'
            )
            this.$router.push('/renter/subscriptions')
          }, 5000)
        } catch (error) {
          this.paymentLoader = false
          this.showPaymentModal = false
          this.$errorHandler(error)
        }
      }
    },
  },
}
</script>

<style lang="scss" scoped>
.dialog-bg {
  background: rgba(0, 0, 0, 0.63);
  width: 100%;
  height: 100%;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 2000;
  display: flex;
  align-items: center;
  justify-content: flex-end;
}
</style>
