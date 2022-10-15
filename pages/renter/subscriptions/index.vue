<template>
  <div>
    <Loading v-if="loader" />
    <div
      v-else
      class="s-relative s-px-4 md:s-pl-5 lg:s-pl-[3.625rem] md:s-pr-5 lg:s-pr-[1.875rem] s-mb-10"
    >
      <MemberDashboardNavbar
        title="Subscriptions"
        text="See all your subscriptions here"
      />
      <div
        class="s-flex s-flex-col s-mt-[1.5rem] s-w-full md:s-bg-white md:s-rounded-xl s-max-w-[1440px] s-mx-auto s-min-h-[600px] s-mb-10"
      >
        <div>
          <div v-if="subList.length">
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
                @update="filterSubscription"
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
                      v-for="sub in searchData"
                      :key="sub.id"
                      class="s-bg-[#fff] s-text-center s-border-b dark:s-border-gray-700 hover:s-bg-[#EFFFF8]"
                    >
                      <td class="s-text-left">
                        <p
                          class="s-text-sm s-font-normal s-leading-6 s-text-[#0F0C3D] s-pl-[1.75rem] s-pt-8 s-pb-7"
                        >
                          {{ sub.space_name || '-' }}
                        </p>
                      </td>
                      <td>
                        <p
                          class="s-text-sm s-leading-6 s-text-[#0F0C3D] s-font-normal s-capitalize"
                        >
                          {{
                            sub.sub_plan === 'yearly'
                              ? 'Annually'
                              : sub.sub_plan | capitalize
                          }}
                        </p>
                      </td>
                      <td>
                        <p
                          class="s-text-sm s-leading-6 s-text-[#0F0C3D] s-font-normal"
                          v-html="getCurrentAmount(sub.price)"
                        ></p>
                      </td>
                      <td>
                        <StatusBadge :text="sub.status" />
                      </td>
                      <td>
                        <TableAction
                          :loading="loading"
                          @openDropdown="expandOption(sub)"
                        >
                          <button
                            class="s-bg-white s-border-[0.5px] s-text-sm s-border-[#B1B7D6] s-py-[19px] s-absolute s-left-[26%] s-min-w-[100px] s-flex s-justify-center s-items-center s-rounded-xl"
                          >
                            <Loader
                              v-if="loading"
                              width="18"
                              height="18"
                              :class="'!s-mr-0'"
                            />
                            <span v-else class="google__wrap-text s-mr-2">
                              View
                            </span>
                          </button>
                        </TableAction>
                      </td>
                    </tr>
                  </Tables>
                </div>
                <div class="md:s-hidden">
                  <!-- Mobile Screen -->
                  <template v-if="searchData.length">
                    <div v-for="sub in searchData" :key="sub.id">
                      <MobileCard :data="sub">
                        <TableAction
                          :loading="loading"
                          position="!s-left-[-50%] !s-translate-x-[-50%]"
                          @openDropdown="expandOption(sub)"
                        >
                          <button
                            class="s-bg-white s-border-[0.5px] s-text-sm s-border-[#B1B7D6] s-py-[19px] s-px-[34px] s-rounded-xl"
                          >
                            <Loader
                              v-if="loading"
                              width="18"
                              height="18"
                              :class="'!s-mr-0'"
                            />
                            <span v-else class="google__wrap-text s-mr-2">
                              View
                            </span>
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
                  new-class="md:s-max-h-[480px] s-bg-white"
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
            <EmptyState :display="false">
              <div class="s-w-32 s-mx-auto s-pt-4 s-pb-6">
                <NoSearch />
              </div>

              <p
                class="s-text-[#77777D] s-leading-6 s-text-sm s-font-normal sm:s-max-w-sm s-max-w-xs s-mx-auto sm:s-px-0 s-px-7"
              >
                It looks like you don’t have any subscription yet
              </p>
            </EmptyState>
          </div>
        </div>
        <div v-show="subList.length" class="s-mt-auto sm:s-pl-10 s-pl-0 s-py-5">
          <t-pagination
            v-model="currentPage"
            :total-items="totalItem"
            :per-page="limit"
            :limit="4"
            prev-label="Prev"
            next-label="Next"
            @change="changePage"
          />
        </div>
      </div>
    </div>
    <!-- Detail Page Modal -->
    <div
      v-if="showModal && !loading"
      class="dialog-bg s-fixed s-top-0 s-bottom-0 s-right-0 s-left-0 s-w-full s-z-50 s-flex s-items-center s-justify-end"
      @click.self="showModal = false"
    >
      <div class="s-h-[100vh] s-overflow-scroll">
        <div class="s-bg-[#fff]">
          <DetailPageModal
            title="Subscription Details"
            description="Here’s a quick overview of your subscription"
            :status="selectedSubscription.status"
            @close="showModal = false"
          >
            <div
              class="s-border-t s-border-b s-border-solid s-border-[#EAEDFD] s-mb-10 s-pt-[1.875rem]"
            >
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
                      {{ selectedSubscription.space_name }}
                    </p>
                  </div>
                </div>
                <div class="s-flex-1">
                  <p
                    class="s-text-xs s-text-[#0F0C3D] s-font-semibold s-mb-1.5"
                  >
                    SPACE TYPE
                  </p>
                  <div class="s-flex s-items-center">
                    <HomeIcon width="17" height="17" />
                    <p
                      class="s-text-sm s-font-normal s-text-[#5C5A74] s-ml-2.5"
                    >
                      {{ selectedSubscription.sub_type | capitalize }}
                    </p>
                  </div>
                </div>
              </div>
              <div class="s-flex s-items-center s-max-w-[400px] s-mb-8">
                <div class="s-flex-1">
                  <p
                    class="s-text-xs s-text-[#0F0C3D] s-font-semibold s-mb-1.5"
                  >
                    SUB PLAN
                  </p>
                  <div class="s-flex s-items-center">
                    <LabelBlackIcon width="17" height="17" />
                    <p
                      class="s-text-sm s-font-normal s-text-[#5C5A74] s-ml-2.5"
                    >
                      {{ selectedSubscription.sub_plan | capitalize }}
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
                      {{ formatDate(selectedSubscription.start_date) }}
                    </p>
                  </div>
                </div>
              </div>
              <div class="s-flex s-items-center s-max-w-[400px] s-mb-8">
                <div class="s-flex-1">
                  <p
                    class="s-text-xs s-text-[#0F0C3D] s-font-semibold s-mb-1.5"
                  >
                    END DATE
                  </p>
                  <div class="s-flex s-items-center">
                    <CalendarIcon :width="17" :height="17" />
                    <p
                      class="s-text-sm s-font-normal s-text-[#5C5A74] s-ml-2.5"
                    >
                      {{ formatDate(selectedSubscription.end_date) }}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div v-if="priceTemplate" class="s-mb-10">
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
                        Number(priceTemplate.amount) +
                          Number(priceTemplate.computed_commission) +
                          Number(priceTemplate.withholdingTax),
                        priceTemplate.currency
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
                        priceTemplate.booking_fee,
                        priceTemplate.currency
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
                        priceTemplate.service_charge,
                        priceTemplate.currency
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
                        priceTemplate.security_deposit,
                        priceTemplate.currency
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
                    v-html="
                      formatCurrency(priceTemplate.vat, priceTemplate.currency)
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
                      formatCurrency(
                        priceTemplate.discount,
                        priceTemplate.currency
                      )
                    "
                  ></p>
                </div>
              </div>
            </div>

            <div class="s-text-base s-font-bold s-mb-16">
              <p class="s-uppercase s-mb-2">Total</p>
              <p v-html="totalRent"></p>
            </div>

            <div
              v-if="selectedSubscription.extra_charges.length"
              class="s-mb-10 s-pt-10 s-border-t s-border-solid s-border-[#EAEDFD]"
            >
              <p class="s-text-base s-font-bold s-mb-6">Extra Charges</p>
              <div class="s-overflow-x-scroll">
                <table class="s-w-full s-min-w-[450px] s-mb-5 s-text-left">
                  <thead
                    class="s-uppercase s-text-xs s-text-primary s-font-semibold"
                  >
                    <tr>
                      <td class="s-pb-2.5">Date</td>
                      <td>Type</td>
                      <td>Amount</td>
                      <td>Status</td>
                      <td>Payment Status</td>
                    </tr>
                  </thead>
                  <tbody class="s-text-[#5C5A74] s-font-normal s-text-sm">
                    <tr
                      v-for="(extracharge, index) in extraCharges"
                      :key="index"
                      class="s-mb-2"
                    >
                      <td
                        class="s-py-2.5"
                        v-html="formatDate(extracharge.created_at)"
                      ></td>
                      <td>{{ extracharge.extracharge_type }}</td>
                      <td
                        v-html="
                          formatCurrency(
                            extracharge.amount,
                            priceTemplate.currency
                          )
                        "
                      ></td>
                      <td :class="extraChargeStatus(extracharge.status)">
                        {{ extracharge.status }}
                      </td>
                      <td
                        :class="[
                          {
                            's-text-[#F7CE51]':
                              extracharge.payment_status === 'pending',
                          },
                          {
                            's-text-[#3DDC97]':
                              extracharge.payment_status === 'success',
                          },
                          {
                            's-text-[#EA4335]':
                              extracharge.payment_status === 'declined',
                          },
                        ]"
                      >
                        {{
                          extracharge.payment_status == 'success'
                            ? 'paid'
                            : extracharge.payment_status | capitalize
                        }}
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <div class="s-flex s-gap-x-4 s-mt-[9.125rem]">
              <Button
                v-show="cards && cards.length"
                :text="`${
                  (new Date(selectedSubscription.end_date).getTime() -
                    Date.now()) /
                    86400000 >
                  7
                    ? 'Pay Ahead'
                    : 'Renew Subscription'
                }`"
                class="s-bg-primary-blue !s-ml-0 s-text-white s-w-[11.375rem] s-px-2 s-text-sm"
                @submit="togglePaymentModal"
              />
              <Button
                v-if="selectedSubscription.status === 'active'"
                :loading="cancelStatus"
                text="Cancel Subscription"
                class="s-bg-[#CC1D1D] s-px-2 s-max-w-[200px] s-w-full s-text-sm"
                @submit="
                  selectedSubscription.status == 'canceled' || cancelStatus
                    ? ''
                    : toggleCancelSubscriptionModal()
                "
              />
            </div>
          </DetailPageModal>
        </div>
      </div>
    </div>
    <!-- Cancel Subscription Modal -->
    <ActionModal
      :show="showCancelSubscriptionModal"
      :loading="cancelStatus"
      back-btn="No"
      next-btn="Yes"
      @close=";(showCancelSubscriptionModal = false), (showModal = true)"
      @submit="cancelSub(selectedSubscription.id)"
    >
      <div>
        <p class="s-font-bold s-text-[#0E0C0C] s-text-base s-mb-4">
          Delete this subscription?
        </p>
        <p class="s-text-sm s-text-[#3F3D56] s-font-normal">
          Are you sure you want to delete this subscription?
        </p>
      </div>
    </ActionModal>
    <!-- Payment Modal -->
    <template v-if="showPaymentModal">
      <Modal :show="showPaymentModal" @close="showPaymentModal = false">
        <PayWith
          :has-card="cards ? cards.length > 0 : false"
          :total-amount-renew="totalAmountRenew"
          :currency="priceTemplate.currency"
          :user="user"
          :meta="meta"
          :customize-flutter="customizeFlutter"
          :renew-with-flutterwave="renewWithFlutterwave"
          :closed-payment-modal="closedPaymentModal"
          :renew-with-paystack="renewWithPaystack"
          :renew-with-card="renewSubcription"
          :selected-subscription="selectedSubscription"
          :loading="paymentLoader"
        >
          <div
            class="s-mt-[3rem] s-pb-2 s-border-b-[0.3px] s-border-solid s-border-[#B1B7D6] s-px-2.5 s-mb-6"
          >
            <h2 class="s-font-bold s-text-[#0E0C0C] s-text-xl">
              Confirm Subscription Details
            </h2>
            <p
              class="s-max-[348px] s-w-full s-text-sm s-font-normal s-text-[#63687E]"
            >
              Please confirm that the details of the Subscription is correct
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
} from '../../../helpers/utils'
import Paystack from '../../../helpers/utils/paystackSetup'

export default {
  layout: 'renters',
  data() {
    return {
      unpaid: true,
      filterBy: '',
      searchLoader: true,
      search: '',
      selectedSubscription: null,
      showModal: false,
      loading: false,
      paginationLoader: false,
      withoutCardLoader: false,
      paymentLoader: false,
      currentPage: 1,
      limit: 10,
      cancelStatus: false,
      showCancelSubscriptionModal: false,
      showPaymentModal: false,
      subscriptionId: null,
      welcomeUrl: process.env.WELCOME_PAGE,
      addCard: null,
      totalExtraCharges: null,
      extraCharges: null,
      headers: [
        {
          text: 'SPACE NAME',
          align: 'start',
          value: 'name',
        },
        { text: 'SPACE PLAN', value: 'type' },
        { text: 'AMOUNT', value: 'cost' },
        { text: 'STATUS', value: 'status' },
        { text: 'Actions', value: 'actions' },
      ],
      subList: [],
    }
  },
  computed: {
    ...mapState('renters', ['loader', 'userSubscriptions', 'cards']),
    priceTemplate() {
      if (this.selectedSubscription) {
        return this.selectedSubscription.price
      }
      return null
    },
    meta() {
      return {
        subscriptionId: this.selectedSubscription.id,
        callbackUrl: this.welcomeUrl,
        addCard: this.addCard === null ? false : this.addCard,
        internalPaymentReference: this.generateReference(),
      }
    },
    user() {
      if (this.selectedSubscription) {
        return {
          name: this.selectedSubscription.user_kyc.fullname,
          email: this.selectedSubscription.user_kyc.email,
          phone: this.selectedSubscription.user_kyc.phone,
        }
      }
      return undefined
    },
    customizeFlutter() {
      if (this.selectedSubscription) {
        return {
          title: this.selectedSubscription.space_name,
          description: `Payment for ${this.selectedSubscription.space_name} space`,
          logo: 'https://res.cloudinary.com/spleetng/image/upload/v1611148920/logo-icon.svg',
        }
      }
      return undefined
    },
    filter() {
      const setFilter = this.userSubscriptions.subscriptions
        .map((el) => ({
          text: this.capitalize(
            el.status === 'canceled' ? 'cancelled' : el.status
          ),
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
        return this.subList.filter((item) =>
          item.space_name.toLowerCase().includes(this.search.toLowerCase())
        )
      } else {
        return this.subList
      }
    },
    totalRent() {
      if (this.selectedSubscription) {
        const currentPriceTemplate = this.selectedSubscription.price
        const rent = formatCurrencyAmount(
          this.totalAmountRenew,
          currentPriceTemplate.currency
        )
        return rent
      }
      return null
    },
    totalAmountRenew() {
      const total =
        +this.priceTemplate.service_charge +
        +this.priceTemplate.amount +
        +this.priceTemplate.withholdingTax +
        +this.priceTemplate.vat +
        +this.totalExtraCharges +
        +this.priceTemplate.computed_commission -
        +this.priceTemplate.discount
      return total
    },
    totalItem() {
      if (this.userSubscriptions) {
        return this.userSubscriptions.totalSubscription
      }
      return null
    },
  },
  watch: {
    selectedSubscription() {
      const all = []
      if (this.selectedSubscription) {
        this.selectedSubscription.extra_charges.forEach((charge) => {
          if (
            charge.status === 'Approved' &&
            charge.payment_status === 'pending'
          ) {
            all.push(charge.amount)
          }
        })
        this.totalExtraCharges = all.reduce((a, b) => a + b, 0)
      }
    },
  },
  mounted() {
    Paystack.init()
    const page = this.$route.query.page
    if (page) {
      this.currentPage = +page
      this.getSubscriptions(+page)
    } else {
      this.getSubscriptions()
    }
  },
  methods: {
    ...mapActions('renters', [
      'getUserSubscriptions',
      'cancelSubcription',
      'renewUserSubcription',
      'getSubscriptionDetail',
    ]),
    extraChargeStatus(status) {
      switch (status) {
        case 'Approved':
          return 's-text-[#3DDC97]'
        case 'Pending':
          return 's-text-[#F7CE51]'
        case 'Declined':
        case 'Retracted':
          return 's-text-[#EA4335]'
        default:
          return null
      }
    },
    async getSingleSub(id) {
      try {
        const response = await this.getSubscriptionDetail(id)
        this.loading = false
        this.selectedSubscription = response.data.data
        this.extraCharges = response.data.data.extra_charges
          .filter((el) => el.status === 'Approved')
          .sort(
            (d1, d2) =>
              new Date(d2.updated_at).getTime() -
              new Date(d1.updated_at).getTime()
          )
      } catch (error) {
        this.loading = false
        this.$errorHandler(error)
      }
    },
    renewWithFlutterwave(res, err) {
      this.paymentLoader = true
      if (res) {
        this.paymentLoader = false
        this.showPaymentModal = false
        this.getSubscriptions()
        setTimeout(() => {
          this.$showToast(
            'You have successfully renew your subscription',
            'success'
          )
        }, 5000)
      } else {
        this.paymentLoader = false
        this.$showToast(`Payment failed. ${err.response.data.message}`)
      }
    },
    renewWithPaystack(id) {
      this.paymentLoader = true
      const amount = Math.round(this.totalAmountRenew * 100)
      const metadata = {
        callbackUrl: this.welcomeUrl,
        subscriptionId: id,
        internalPaymentReference: this.generateReference(),
        addCard: this.addCard === null ? false : this.addCard,
      }
      Paystack.startPayment(
        (res, err) => {
          if (res) {
            this.paymentLoader = false
            this.showPaymentModal = false
            this.getSubscriptions()
            setTimeout(() => {
              this.$showToast(
                'You have successfully renew your subscription',
                'success'
              )
            }, 5000)
          } else {
            this.paymentLoader = false
            this.$showToast(
              `Payment failed. ${err.response.data.message}`,
              'error'
            )
          }
        },
        amount,
        this.user.email,
        metadata
      )
    },
    closedPaymentModal() {
      this.withoutCardLoader = false
      this.paymentLoader = false
      this.showPaymentModal = false
    },
    generateReference() {
      const date = new Date()
      return date.getTime().toString()
    },
    toggleCancelSubscriptionModal() {
      this.showModal = false
      this.showCancelSubscriptionModal = true
    },
    async renewSubcription(id) {
      this.paymentLoader = true
      if (this.cards && this.cards.length > 0) {
        try {
          await this.renewUserSubcription({
            id,
            data: { use_card: true, addCard: false },
          })
          this.paymentLoader = false
          this.showPaymentModal = false
          this.$showToast(
            'You have successfully renew your subscription',
            'success'
          )
          this.getSubscriptions()
        } catch (error) {
          this.paymentLoader = false
          this.showPaymentModal = false
          if (error.response.data.statusCode === 500) {
            this.$showToast(
              `Payment failed, Internal server error, please try again later`,
              'error'
            )
          } else {
            this.$showToast(
              `Payment failed ${error.response.data.message}`,
              'error'
            )
          }
        }
      }
    },
    togglePaymentModal() {
      this.showModal = false
      this.showPaymentModal = true
    },
    async getSubscriptions(page) {
      try {
        await this.getUserSubscriptions({ page, limit: this.limit })
        this.subList = this.userSubscriptions.subscriptions
      } catch (error) {
        this.$errorHandler(error)
      }
    },
    async changePage(page) {
      this.paginationLoader = true
      try {
        const response = await this.getUserSubscriptions({
          page,
          limit: this.limit,
        })
        this.subList = response.data.data.subscriptions
        this.paginationLoader = false
      } catch (error) {
        this.paginationLoader = false
        this.$errorHandler(error)
      }
    },
    capitalize(value) {
      return value.charAt(0).toUpperCase() + value.slice(1)
    },
    formatDate(date) {
      return formatReadbleDate(date)
    },
    formatCurrency(amount, currency) {
      return formatCurrencyAmount(amount, currency)
    },
    handleColor(status) {
      const chipColors = {
        pending: 's-bg-[#F7CE51]',
        paid: 's-bg-[#62E2AA]/0.4',
        cancelled: 's-bg-[#DC2212]',
        expired: 's-bg-[#FF7F37]',
      }
      return chipColors[status.toLowerCase()]
    },
    expandOption(item) {
      this.loading = true
      this.showModal = true
      this.getSingleSub(item.id)
    },
    sumPrices(priceData) {
      return sumBookingPrice(priceData)
    },
    getCurrentAmount(price) {
      return formatCurrencyAmount(
        +price.service_charge +
          +price.amount +
          +price.withholdingTax +
          +price.computed_commission +
          +price.vat -
          +price.discount,
        price.currency
      )
    },
    filterSubscription(value) {
      this.filterBy = value
      if (value === 'all') {
        this.subList = this.userSubscriptions.subscriptions
      } else if (this.filter.some((el) => el.value === value)) {
        this.subList = this.userSubscriptions.subscriptions.filter(
          (el) => el.status === value
        )
      }
    },
    async cancelSub(id) {
      this.cancelStatus = true
      try {
        const response = await this.cancelSubcription(id)
        this.cancelStatus = false
        this.showCancelSubscriptionModal = false
        this.showModal = true
        if (response.data.statusCode === 200) {
          this.getSubscriptionDetail(id)
          this.$showToast(
            'You have successfully cancelled your subscription',
            'success'
          )
        }
      } catch (error) {
        this.cancelStatus = false
        this.$errorHandler(error)
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
