<template>
  <div>
    <div v-if="showSnackBar" class="sm:s-mt-0 s-mt-24">
      <SnackBar
        :title="status.title"
        :background="
          status.status === 'success' ? 's-bg-[#28A46E]' : 's-bg-[#f06f37]'
        "
        @close="showSnackBar = false"
      />
    </div>
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
        class="s-flex s-flex-col s-mt-[1.5rem] s-w-full md:s-bg-white md:s-rounded-xl s-max-w-[1440px] s-mx-auto s-min-h-[600px] s-mb-10 s-overflow-auto"
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
                <div class="s-hidden md:s-block">
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
          v-show="searchData.length"
          class="s-mt-auto sm:s-pl-10 s-pl-0 s-py-5"
        >
          <t-pagination
            v-model="currentPage"
            :total-items="hostBookings.totalBookings"
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
      class="dialog-bg s-fixed s-top-0 s-bottom-0 s-right-0 s-left-0 s-w-full s-z-10 s-flex s-items-center s-justify-end"
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
                        Number(selectedBooking.price_template.rent),
                        selectedBooking.price_template.formatCurrency
                      )
                    "
                  ></p>
                </div>
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
              </div>
              <div class="s-flex s-items-center s-max-w-[400px] s-mb-8">
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

            <div v-if="selectedBooking.status == 'pending'" class="s-flex">
              <Button
                text="Decline"
                class="s-bg-red s-text-white s-w-[11.375rem] s-px-2 s-mr-5"
                @submit="toggleDeclineOptionModal"
              />
              <Button
                text="Approve"
                class="s-bg-primary-blue s-text-white s-w-[11.375rem] s-px-2"
                @submit="toggleApproveWarningModal"
              />
            </div>
            <span
              v-if="selectedBooking.status == 'accepted'"
              class="s-text-primary-green"
              >Booking Approved</span
            >
            <span v-if="selectedBooking.status == 'rejected'" class="s-text-red"
              >Booking Declined</span
            >
          </DetailPageModal>
        </div>
      </div>
    </div>

    <Modal
      :show="showDeclineOptionModal"
      :modal-classes="'!s-p-7'"
      @close="showDeclineOptionModal = false"
    >
      <div>
        <h2 class="s-tracking-wide s-font-display s-text-2xl">
          Decline this booking?
        </h2>
        <p class="s-py-3">You’re declining this booking because:</p>

        <div class="s-flex s-space-x-3 s-my-4">
          <div
            class="s-px-2 s-border s-border-solid s-rounded-md s-border-[#b1b7d6] s-flex s-justify-center s-items-center"
          >
            <CustomBox
              v-model="reasons"
              name="incomplete-profile"
              val="Incomplete profile"
            >
              <span class="s-text-black">Incomplete profile</span>
            </CustomBox>
          </div>

          <div
            class="s-px-2 s-py-2 s-border s-border-solid s-rounded-md s-border-[#b1b7d6] s-flex s-justify-center s-items-center"
          >
            <CustomBox
              v-model="reasons"
              name="space-has-been-booked"
              val="Space has been booked"
            >
              <span class="s-text-black">Space has been booked</span>
            </CustomBox>
          </div>
        </div>

        <div class="s-flex s-space-x-3 s-my-4">
          <div
            class="s-px-2 s-py-2 s-border s-border-solid s-rounded-md s-border-[#b1b7d6] s-flex s-justify-center s-items-center"
          >
            <CustomBox
              v-model="reasons"
              name="space-under-renovation"
              val="Space under renovation"
            >
              <span class="s-text-black">Space under renovation</span>
            </CustomBox>
          </div>

          <div
            class="s-px-2 s-py-2 s-border s-border-solid s-rounded-md s-border-[#b1b7d6] s-flex s-justify-center s-items-center"
          >
            <CustomBox v-model="reasons" name="curfew" val="Curfew">
              <span class="s-text-black">Curfew</span>
            </CustomBox>
          </div>
        </div>

        <div class="s-flex s-space-x-3 s-my-4">
          <div
            class="s-px-2 s-py-2 s-border s-border-solid s-rounded-md s-border-[#b1b7d6] s-flex s-justify-center s-items-center"
          >
            <CustomBox
              v-model="reasons"
              name="guarantor-details-incomplete"
              val="Guarantor details incomplete"
            >
              <span class="s-text-black">Guarantor details incomplete</span>
            </CustomBox>
          </div>
        </div>

        <div>
          <p class="s-text-sm s-pb-2">Other reasons</p>
          <textarea
            v-model="otherReasons"
            class="s-w-full s-border s-border-solid"
            rows="5"
          ></textarea>
        </div>

        <div class="s-flex s-my-5">
          <Button
            text="Cancel"
            class="s-bg-red s-text-white s-w-[11.375rem] s-px-2 s-mr-5"
            @submit="toggleDeclineOptionModal"
          />
          <Button
            text="Decline"
            :disabled="reasons.length == 0 && otherReasons == null"
            :class="
              reasons.length == 0 && otherReasons == null
                ? ' s-cursor-not-allowed'
                : null
            "
            class="s-bg-primary-blue s-text-white s-w-[11.375rem] s-px-2"
            @submit="toggleDeclineModal"
          />
        </div>
      </div>
    </Modal>

    <Modal
      :show="showDeclineModal"
      :modal-classes="'!s-p-7'"
      @close="showDeclineModal = false"
    >
      <div>
        <p class="s-py-3">
          By declining this booking, the member will not be able to book your
          space, do you want to proceed?
        </p>

        <div class="s-flex s-my-5">
          <Button
            text="Cancel"
            class="s-bg-red s-text-white s-w-[11.375rem] s-px-2 s-mr-5"
            @submit="toggleDeclineModal"
          />
          <Button
            text="Submit"
            :disabled="reasons.length == 0 && otherReasons == ''"
            :loading="loader"
            class="s-bg-primary-blue s-text-white s-w-[11.375rem] s-px-2"
            @submit="
              processDecline({
                id: selectedBooking.id,
                allReason: [...reasons, otherReasons],
              })
            "
          />
        </div>
      </div>
    </Modal>

    <Modal
      :show="showApproveWarningModal"
      :modal-classes="'!s-p-7'"
      @close="showApproveWarningModal = false"
    >
      <div>
        <h2 class="s-tracking-wide s-font-display s-text-2xl">
          Approve this booking?
        </h2>
        <p class="s-py-3">
          By approving this booking, the member will be able to pay for your
          space. Do you want to proceed?
        </p>

        <div class="s-flex s-my-5">
          <Button
            text="Cancel"
            class="s-bg-red s-text-white s-w-[11.375rem] s-px-2 s-mr-5"
            @submit="toggleApproveWarningModal"
          />
          <Button
            text="Yes, approve!"
            class="s-bg-primary-blue s-text-white s-w-[11.375rem] s-px-2"
            :loading="loading"
            @submit="processAcceptance(selectedBooking.id)"
          />
        </div>
      </div>
    </Modal>
  </div>
</template>

<script>
import { mapActions, mapMutations, mapState } from 'vuex'
import {
  formatReadbleDate,
  sumBookingPriceHost,
  formatCurrencyAmount,
} from '../../../helpers/utils'

export default {
  layout: 'host',
  data() {
    return {
      filterBy: '',
      searchLoader: true,
      search: '',
      selectedBooking: null,
      showModal: false,
      loading: false,
      paginationLoader: false,
      limit: 10,
      currentPage: 1,
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
      showApproveWarningModal: false,
      showDeclineOptionModal: false,
      showDeclineModal: false,
      reasons: [],
      otherReasons: null,
      showSnackBar: false,
      status: {},
    }
  },
  computed: {
    ...mapState('host', ['hostBookings', 'loader']),
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
  },

  mounted() {
    const page = this.$route.query.page
    if (page) {
      this.currentPage = +page
      this.getBookings(+page)
    } else {
      this.getBookings()
    }
  },
  methods: {
    ...mapActions('host', [
      'getHostBookings',
      'acceptBooking',
      'declineBooking',
    ]),
    ...mapMutations('host', ['SET_HOST_BOOKINGS', 'SET_LOADER']),
    async getBookings(page) {
      this.SET_LOADER(true)
      try {
        await this.getHostBookings({ page, limit: this.limit })
        this.SET_LOADER(false)
        this.bookingList = this.hostBookings.bookings
      } catch (error) {
        this.SET_LOADER(false)
        if (error.response.data.statusCode === 404) {
          this.SET_HOST_BOOKINGS({ bookings: [] })
          return
        }
        this.$errorHandler(error)
      }
    },
    capitalize(value) {
      return value.charAt(0).toUpperCase() + value.slice(1)
    },

    async processDecline(payload) {
      this.loader = true
      payload.allReason = payload.allReason.filter((key) => key !== null)
      await this.declineBooking(payload)
      this.showSnackBar = true
      this.status.title = 'Bookings successfully decline!'
      this.status.status = 'success'
      this.showDeclineModal = !this.showDeclineModal
      this.loader = false

      await this.getBookings(this.currentPage)
    },

    async processAcceptance(id) {
      this.loading = true
      try {
        await this.acceptBooking(id)
        this.showSnackBar = true
        this.status.title = 'Bookings successfully Approved!'
        this.status.status = 'success'
        this.showApproveWarningModal = !this.showApproveWarningModal
        this.loading = false
        await this.getBookings(this.currentPage)
      } catch (error) {
        this.loading = false
        this.$errorHandler(error)
      }
    },

    async loadBookings() {
      this.SET_LOADER(true)
      try {
        await this.getHostBookings()
        this.SET_LOADER(false)
        this.bookingList = this.hostBookings.bookings
      } catch (error) {
        this.SET_LOADER(false)
        if (error.response.data.statusCode === 404) {
          this.SET_HOST_BOOKINGS({ bookings: [] })
          return
        }
        this.$errorHandler(error)
      }
    },

    toggleApproveWarningModal() {
      this.showModal = !this.showModal
      this.showApproveWarningModal = !this.showApproveWarningModal
    },
    toggleDeclineOptionModal() {
      this.showModal = !this.showModal
      this.showDeclineOptionModal = !this.showDeclineOptionModal
    },
    toggleDeclineModal() {
      if (this.showDeclineOptionModal) {
        this.showDeclineOptionModal = false
      }
      this.showDeclineModal = !this.showDeclineModal
    },

    async changePage() {
      this.paginationLoader = true
      try {
        const response = await this.getHostBookings({
          page: this.currentPage,
          limit: this.limit,
        })
        this.bookingList = response.data.data.bookings
        this.$router.replace({ query: { page: this.currentPage } })
        this.paginationLoader = false
      } catch (error) {
        this.paginationLoader = false
        this.$errorHandler(error)
      }
    },
    handleColor(status) {
      const chipColors = {
        pending: 's-bg-[#F2994A]/0.4',
        accepted: 's-bg-[#62E2AA]/0.4',
        paid: 's-bg-[#62E2AA]/0.4',
        rejected: 's-bg-[#FF4242]/0.4',
        expired: 's-bg-[#CC1D1D]',
        unavailable: 's-bg-purple-500',
      }
      return chipColors[status]
    },
    expandOption(item) {
      this.selectedBooking = item
      this.showModal = true
    },
    sumPrices(priceData) {
      return sumBookingPriceHost(priceData)
    },
    filteredBookings(value) {
      this.filterBy = value
      if (value === 'all') {
        this.bookingList = this.hostBookings.bookings
      } else if (this.filter.some((el) => el.value === value)) {
        this.bookingList = this.bookingList.filter((el) => el.status === value)
      }
    },
    makePayment() {},
    formatDate(date) {
      return formatReadbleDate(date)
    },
    formatCurrency(amount) {
      return formatCurrencyAmount(amount, 'NGN')
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
