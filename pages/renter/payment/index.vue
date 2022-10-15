<template>
  <div>
    <Loading v-if="loader" />
    <div
      v-else
      class="s-relative s-px-4 md:s-pl-5 lg:s-pl-[3.625rem] md:s-pr-5 lg:s-pr-[1.875rem] s-mb-10"
    >
      <MemberDashboardNavbar
        title="Payments"
        text="Manage payments on Spleet"
      />
      <div
        class="s-mt-[1.5rem] s-w-full s-bg-white md:s-rounded-xl s-max-w-[1440px] s-mx-auto s-pb-[22px] s-min-h-[590px]"
      >
        <div class="s-pt-[27px] s-pb-6 s-mx-4">
          <div class="hide-scroll s-flex s-gap-3 s-overflow-scroll">
            <button
              v-for="(option, index) in options"
              :key="index"
              class="s-min-w-[158px] s-pb-[1.125rem] s-text-[#ABAEBF]"
              :class="{
                's-border-b-4 s-border-solid s-border-primary-blue !s-text-primary-blue s-transition-colors s-duration-500':
                  selectedDropdown === option.value,
              }"
              @click="toggleTab(option.value)"
            >
              {{ option.text }}
            </button>
          </div>
        </div>
        <Transition mode="out-in">
          <div v-if="selectedDropdown === 'cards'" :key="1" class="s-mx-4">
            <div
              v-show="cards.length"
              class="s-grid s-grid-cols-[repeat(auto-fill,_minmax(308px,_1fr))] s-items-center s-space-x-3 s-gap-y-7"
            >
              <PaymentCard
                v-for="card in cards"
                :key="card.id"
                :card="card"
                @fetchcard="getUserCard"
              />
              <div
                class="s-max-w-[308px] s-h-[225px] s-bg-[#F8F9FF] s-rounded-xl s-pt-2 s-pl-[7px] s-pr-2.5 s-pb-[11px]"
              >
                <div
                  class="s-bg-white s-flex s-items-center s-justify-center s-w-full s-h-[206px]"
                >
                  <flutterwave-pay-button
                    ref="addcard"
                    :tx_ref="generateReference()"
                    :amount="50"
                    currency="NGN"
                    payment_options="card"
                    redirect_url=""
                    class="s-hidden"
                    style=""
                    :customer="user"
                    :customizations="customizeFlutter"
                    :callback="paymentCallBack"
                    :onclose="closedPaymentModal"
                  />
                  <div class="s-cursor-pointer" @click="addNewCard">
                    <img
                      src="../../../assets/images/addcard.svg"
                      alt=""
                      class="s-block s-mx-auto"
                    />
                    <p
                      class="s-text-[#242428] s-text-sm s-font-semibold s-mt-2.5"
                    >
                      Add A New Card
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div v-show="!cards.length">
              <EmptyState
                :display="false"
                new-class="s-bg-[#F9FAFF] s-max-h-[500px]"
                title=""
              >
                <div class="s-w-[194px] s-h-[202px] s-mx-auto">
                  <img
                    src="https://res.cloudinary.com/spleetng/image/upload/v1662845243/frontend-images/payment.svg"
                    class="s-object-cover"
                  />
                </div>
                <h2 class="s-text-[1.25rem] s-font-bold s-leading-6">
                  No cards added yet
                </h2>

                <p
                  class="s-text-[#77777D] s-my-3 s-leading-6 s-text-sm s-font-normal sm:s-max-w-sm s-max-w-xs s-mx-auto sm:s-px-0 s-px-7"
                >
                  Looks like you haven’t added any cards here yet
                </p>
                <Button
                  text="Add A New Card"
                  :class="'s-bg-primary-blue s-w-[16rem] s-px-[14px] s-mx-auto'"
                  @submit="addNewCard"
                />
              </EmptyState>
            </div>
          </div>
          <div
            v-if="selectedDropdown === 'bank-accounts'"
            :key="2"
            class="s-mx-4"
          >
            <Transition mode="out-in">
              <div
                v-if="addedBanks.length && !showForm"
                :key="1"
                class="s-items-center s-space-x-3 s-gap-y-7 s-grid s-grid-cols-[repeat(auto-fill,_minmax(308px,_1fr))]"
              >
                <PaymentCard
                  v-for="bank in addedBanks"
                  :key="bank.id"
                  :card="bank"
                  card-type="bank"
                  @fetchbank="getAccounts"
                />
                <div
                  class="s-max-w-[308px] s-h-[225px] s-bg-[#F8F9FF] s-rounded-xl s-pt-2 s-pl-[7px] s-pr-2.5 s-pb-[11px]"
                >
                  <div
                    class="s-bg-white s-flex s-items-center s-justify-center s-w-full s-h-[206px]"
                  >
                    <div class="s-cursor-pointer" @click="showForm = true">
                      <img
                        src="../../../assets/images/addcard.svg"
                        alt=""
                        class="s-block s-mx-auto"
                      />
                      <p
                        class="s-text-[#242428] s-text-sm s-font-semibold s-mt-2.5"
                      >
                        Add bank account
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              <div v-if="!addedBanks.length && !showForm" :key="2">
                <EmptyState
                  :display="false"
                  new-class="s-bg-[#F9FAFF] s-max-h-[500px]"
                  title=""
                >
                  <div class="s-w-[194px] s-h-[202px] s-mx-auto">
                    <img
                      src="https://res.cloudinary.com/spleetng/image/upload/v1662886446/frontend-images/no-bank.svg"
                      class="s-object-cover"
                    />
                  </div>
                  <h2 class="s-text-[1.25rem] s-font-bold s-leading-6">
                    No bank added yet.
                  </h2>

                  <p
                    class="s-text-[#77777D] s-my-3 s-leading-6 s-text-sm s-font-normal sm:s-max-w-sm s-max-w-xs s-mx-auto sm:s-px-0 s-px-7"
                  >
                  Looks like you haven’t added any bank account information yet.
                  </p>
                  <Button
                    text="Add A New Bank"
                    :class="'s-bg-primary-blue s-w-[16rem] s-px-[14px] s-mx-auto'"
                    @submit="showForm = true"
                  />
                </EmptyState>
              </div>
              <div v-if="showForm" :key="3" class="s-px-0 md:s-px-[2.75rem]">
                <div
                  class="s-flex s-text-sm s-text-[#ABAEBF] s-font-bold s-space-x-[2.5rem]"
                >
                  <p
                    class="s-cursor-pointer"
                    :class="{ 's-text-primary-blue': activePaymentTab === 1 }"
                    @click="switchTab(1)"
                  >
                    Add Bank account
                  </p>
                  <p
                    class="s-cursor-pointer"
                    :class="{ 's-text-primary-blue': activePaymentTab === 2 }"
                    @click="switchTab(2)"
                  >
                    Add mobile money
                  </p>
                </div>
                <div class="s-mt-[42px]">
                  <Transition appear mode="out-in">
                    <div
                      v-if="activePaymentTab === 1"
                      :key="1"
                      class="s-max-w-[39.75rem]"
                    >
                      <div>
                        <div
                          class="s-flex s-flex-col s-w-full sm:s-space-x-4 sm:s-flex-row"
                        >
                          <CountrySelectorPackage
                            label="Select country"
                            class="s-w-full sm:s-w-1/2"
                            :value="formData.countryCode"
                            :error="error && error.country"
                            :validation-msg="validationMsg($v.formData.country)"
                            @updateCountry="
                              (value) => (
                                (formData.country = value.name),
                                (formData.countryCode = value.isoCode)
                              )
                            "
                          />
                          <TextField
                            class="s-w-full sm:s-w-1/2"
                            label="Add Account Number"
                            placeholder="Account Number"
                            type="number"
                            icon=""
                            name="Account Number"
                            :model-value="formData.accountNumber"
                            :error="error && error.accountNumber"
                            :validation-msg="
                              validationMsg($v.formData.accountNumber)
                            "
                            @update:modelValue="
                              (value) => (formData.accountNumber = value)
                            "
                          />
                        </div>
                        <div
                          class="s-flex s-flex-col s-w-full sm:s-space-x-4 sm:s-flex-row"
                        >
                          <Select
                            :class="'s-w-full sm:s-w-1/2'"
                            label="Select Bank"
                            name="bankDetail"
                            :bank="true"
                            :options="bankOptions"
                            :value="
                              formData.bankDetail
                                ? formData.bankDetail.name
                                : ''
                            "
                            :error="error && error.bankDetail"
                            :validation-msg="
                              validationMsg($v.formData.bankDetail)
                            "
                            @select="(value) => (formData.bankDetail = value)"
                          />
                          <div class="s-w-full sm:s-w-1/2">
                            <TextField
                              :class="'s-w-full !s-mb-0'"
                              label="Add BVN"
                              placeholder="Bank verification number"
                              type="number"
                              icon=""
                              name="bvn"
                              :error="error && error.bvn"
                              :validation-msg="validationMsg($v.formData.bvn)"
                              :model-value="formData.bvn"
                              @update:modelValue="
                                (value) => (formData.bvn = value)
                              "
                            />
                            <div
                              v-show="showVerifyName"
                              class="s-mt-2 s-text-sm s-px-[14px] s-py-[9px] s-rounded-md s-min-w-[150px] s-max-w-fit s-bg-[#2e48da]/10"
                            >
                              {{ formData.accountName }}
                            </div>
                          </div>
                        </div>
                      </div>
                      <div
                        class="s-mt-[40px] s-w-full s-flex s-justify-end s-space-x-3"
                      >
                        <Button
                          text="Cancel"
                          class="s-border s-border-solid s-border-primary-blue !s-text-primary-blue s-min-w-[9.125rem]"
                          @submit="showForm = false"
                        />
                        <Button
                          text="Add Bank"
                          :loading="loading"
                          class="s-bg-primary-blue s-min-w-[9.125rem]"
                          @submit="addBank"
                        />
                      </div>
                    </div>
                    <div
                      v-if="activePaymentTab === 2"
                      :key="2"
                      class="s-max-w-[39.75rem]"
                    >
                      <div>
                        <div
                          class="s-flex s-flex-col s-w-full sm:s-space-x-4 sm:s-flex-row"
                        >
                          <CountrySelectorPackage
                            label="Select country"
                            class="s-w-full sm:s-w-1/2"
                            :value="formData.countryCode"
                            :error="error && error.countryCode"
                            :validation-msg="
                              validationMsg($v.formData.countryCode)
                            "
                            @updateCountry="
                              (value) => (
                                (formData.country = value.name),
                                (formData.countryCode = value.isoCode)
                              )
                            "
                          />
                          <TextField
                            class="s-w-full sm:s-w-1/2"
                            label="Add Mobile Money Number"
                            placeholder="Account Number"
                            type="number"
                            icon=""
                            name="mobileMoneyNumber"
                            :error="error && error.mobileMoneyNumber"
                            :validation-msg="
                              validationMsg($v.formData.mobileMoneyNumber)
                            "
                            :model-value="formData.mobileMoneyNumber"
                            @update:modelValue="
                              (value) => (formData.mobileMoneyNumber = value)
                            "
                          />
                        </div>
                      </div>
                      <div
                        class="s-mt-[40px] s-w-full s-flex s-justify-end s-space-x-3"
                      >
                        <Button
                          text="Cancel"
                          class="s-border s-border-solid s-border-primary-blue !s-text-primary-blue s-min-w-[9.125rem]"
                          @submit="showForm = false"
                        />
                        <Button
                          text="Add Mobile Money"
                          :loading="loading"
                          class="s-bg-primary-blue s-min-w-[13.125rem]"
                          @submit="addMobileMoni"
                        />
                      </div>
                    </div>
                  </Transition>
                </div>
              </div>
            </Transition>
          </div>
          <div v-if="selectedDropdown === 'payment-history'" :key="3">
            <Transition mode="out-in">
              <div v-if="paymentHistory.length" :key="1" class="s-w-full">
                <div class="s-hidden md:s-block">
                  <Tables :table-head="headers">
                    <tr
                      v-for="payment in paymentHistory"
                      :key="payment.id"
                      class="s-bg-[#fff] s-text-center s-border-b dark:s-border-gray-700 hover:s-bg-[#EFFFF8]"
                    >
                      <td>
                        <p
                          class="s-text-sm s-font-normal s-leading-6 s-text-[#0F0C3D] s-pt-8 s-pb-7"
                        >
                          {{ payment.spaceName }}
                        </p>
                      </td>
                      <td>
                        <p
                          class="s-text-sm s-leading-6 s-text-[#0F0C3D] s-font-normal s-capitalize"
                        >
                          {{ payment.sub_type }}
                        </p>
                      </td>
                      <td>
                        <p
                          class="s-text-sm s-leading-6 s-text-[#0F0C3D] s-font-normal"
                        >
                          {{ payment.spaceType }}
                        </p>
                      </td>
                      <td>
                        <p
                          class="s-text-xs s-leading-6 s-text-[#0F0C3D] s-whitespace-nowrap"
                        >
                          {{ payment.amount }}
                        </p>
                      </td>

                      <td>
                        <p
                          class="s-text-xs s-leading-6 s-text-[#0F0C3D] s-whitespace-nowrap"
                        >
                          {{ payment.spaceName }}
                        </p>
                      </td>
                      <td>
                        <div class="s-flex s-place-content-center">
                          <div class="s-inline-block">
                            <TableActionExtra
                              @clickAction="viewHistoryModal(payment)"
                            >
                              <img
                                src="~/assets/icons/renter/payments/eye.svg"
                                alt="icon"
                                class="s-object-center s-w-7 s-h-7 s-block s-mr-2.5"
                              />
                            </TableActionExtra>
                          </div>
                          <div class="s-inline-block">
                            <TableActionExtra
                              @clickAction="downloadHistory(payment)"
                            >
                              <img
                                src="~/assets/icons/renter/payments/download.svg"
                                alt="icon"
                                class="s-object-center s-w-7 s-h-7 s-block s-mr-2.5"
                              />
                            </TableActionExtra>
                          </div>
                        </div>
                      </td>
                    </tr>
                  </Tables>
                </div>
                <div class="md:s-hidden">
                  <template v-if="paymentHistory.length">
                    <div v-for="payment in paymentHistory" :key="payment.id">
                      <MobileCard :data="payment">
                        <TableAction
                          position="!s-left-[-50%] !s-translate-x-[-50%]"
                          @clickAction="downloadHistory(payment)"
                        >
                          <button
                            class="s-bg-white s-border-[0.5px] s-text-sm s-border-[#B1B7D6] s-py-[19px] s-px-[34px] s-rounded-xl"
                            @click="downloadHistory(payment)"
                          >
                            <span class="google__wrap-text s-mr-2">
                              Download
                            </span>
                          </button>
                        </TableAction>
                      </MobileCard>
                    </div>
                  </template>
                </div>
              </div>
              <div v-if="!paymentHistory.length" :key="2">
                <EmptyState
                  :display="false"
                  new-class="s-bg-[#F9FAFF] s-max-h-[500px]"
                  title=""
                >
                  <div class="s-w-[194px] s-h-[202px] s-mx-auto">
                    <img
                      src="https://res.cloudinary.com/spleetng/image/upload/v1662886446/frontend-images/no-bank.svg"
                      class="s-object-cover"
                    />
                  </div>
                  <h2 class="s-text-[1.25rem] s-font-bold s-leading-6">
                    No Payment History
                  </h2>

                  <p
                    class="s-text-[#77777D] s-my-3 s-leading-6 s-text-sm s-font-normal sm:s-max-w-sm s-max-w-xs s-mx-auto sm:s-px-0 s-px-7"
                  >
                    Looks like you haven’t any payment history yet
                  </p>
                </EmptyState>
              </div>
            </Transition>

            <Modal
              v-if="singleHistory != null"
              :modal-max-width="'s-max-w-[45rem]'"
              :modal-classes="'s-p-4'"
              :show="viewHistory"
              @close="viewHistory = false"
            >
              <div ref="invoicePDF">
                <div class="s-p-5">
                  <div class="s-flex s-justify-end s-w-full s-mt-5 s-mb-10">
                    <img src="~/assets/images/spleetLogoBlack.svg" />
                  </div>

                  <div
                    class="s-flex s-flex-col s-text-right s-justify-end s-w-full s-my-5"
                  >
                    <h4>Invoice Date</h4>
                    <p
                      class="s-text-black/60"
                      v-html="formatDate(singleHistory.created_at)"
                    ></p>
                  </div>

                  <div class="s-flex s-justify-between s-w-full s-my-5">
                    <div class="s-w-1/2">
                      <h2
                        class="s-tracking-wide s-font-display s-text-3xl s-font-semibold"
                      >
                        Invoice
                      </h2>
                      <p class="s-tracking-widest">Subscription</p>
                    </div>
                    <div class="s-w-1/2 s-text-right">
                      <h4>Invoice Number</h4>
                      <p class="s-text-black/60">
                        {{ singleHistory.invoiceNumber }}
                      </p>
                    </div>
                  </div>

                  <div class="s-w-full s-mb-5">
                    <h4>Billed to</h4>
                    <p class="s-text-black/60 s-text-sm">
                      {{ singleHistory.fullname | capitalize }}<br />
                      {{ singleHistory.fullAddress }}
                    </p>

                    <StatusBadge
                      :text="
                        singleHistory.paymentStatus == 'success'
                          ? 'paid'
                          : singleHistory.paymentStatus
                      "
                      class="s-mt-5"
                    ></StatusBadge>
                  </div>
                  <div class="s-w-full">
                    <Tables
                      :extra-class="'s-w-full'"
                      :table-head="headersInovice"
                    >
                      <tr>
                        <td class="s-p-5 no-border-line">
                          <p>Rental Subscription</p>
                        </td>
                        <td class="s-p-5 no-border-line">
                          <p
                            class="s-text-right"
                            v-html="formatCurrency(singleHistory.rent, 'NGN')"
                          ></p>
                        </td>
                      </tr>
                      <tr class="s-border-none">
                        <td class="s-p-5 no-border-line">
                          <p>Service Charge</p>
                        </td>
                        <td class="s-p-5 no-border-line">
                          <p
                            class="s-text-right"
                            v-html="
                              formatCurrency(singleHistory.service_charge)
                            "
                          ></p>
                        </td>
                      </tr>
                      <tr>
                        <td class="s-p-5 no-border-line"><p>Discount</p></td>
                        <td class="s-p-5 no-border-line">
                          <p
                            class="s-text-right"
                            v-html="
                              `<p>${formatCurrency(singleHistory.discount)} (${
                                singleHistory.percentageDiscount
                              }%)</p>`
                            "
                          ></p>
                        </td>
                      </tr>
                      <tr>
                        <td class="s-p-5 no-border-line s-pb-10">
                          <p>VAT (7.5%)</p>
                        </td>
                        <td class="s-p-5 no-border-line s-pb-10">
                          <p
                            class="s-text-right"
                            v-html="formatCurrency(singleHistory.vat)"
                          ></p>
                        </td>
                      </tr>
                      <tr>
                        <td
                          class="s-p-5 no-border-line s-border-t s-border-solid s-border-black s-text-right"
                          colspan="2"
                        >
                          <h2
                            class="s-text-black s-text-2xl s-font-bold"
                            v-html="
                              `Amount Due ${formatCurrency(
                                singleHistory.total
                              )}`
                            "
                          ></h2>
                        </td>
                      </tr>
                    </Tables>
                    <p
                      class="s-text-sm s-font-bold s-mt-10"
                      v-html="
                        `Next Due Date: ${formatDate(
                          singleHistory.next_renewal_date
                        )}`
                      "
                    ></p>
                  </div>
                </div>
              </div>
            </Modal>
          </div>
        </Transition>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions, mapState } from 'vuex'
import { required } from 'vuelidate/lib/validators'
import { validationMessage } from 'vuelidate-messages'
import html2pdf from 'html2pdf.js'
import moment from 'moment'
import TableActionExtra from '../../../components/reusables/TableActionExtra.vue'
import MobileCard from '../../../components/reusables/MobileCard.vue'
import Modal from '../../../components/Modal.vue'
import StatusBadge from '../../../components/reusables/StatusBadge.vue'
import Tables from '../../../components/reusables/Tables.vue'
import { formatReadbleDate, formatCurrencyAmount } from '../../../helpers/utils'

const formMessages = {
  countryRequired: () => 'Country is required',
  accountNumberRequired: () => 'Account number is required',
  bankDetailRequired: () => 'Bank is required',
  bvnRequired: () => 'BVN is required',
  countryCodeRequired: () => 'Country is required',
  mobileMoneyNumberRequired: () => 'Mobile mobile number is required',
}

export default {
  components: { TableActionExtra, MobileCard, Modal, StatusBadge, Tables },
  layout: 'renters',
  data() {
    return {
      cards: [],
      addedBanks: [],
      headers: [
        {
          text: 'SPACE NAME',
          value: 'name',
        },
        { text: 'SUB TYPE', value: 'type' },
        { text: 'SPACE TYPE', value: 'space' },
        { text: 'AMOUNT', value: 'cost' },
        { text: 'DATE', value: 'date' },
        { text: 'INVOICE', value: 'actions' },
      ],

      headersInovice: [
        {
          text: 'Description',
          align: 'start',
          value: 'name',
        },
        { text: 'AMOUNT NGN', align: 'end', value: 'name' },
      ],
      paymentHistory: [],
      singleHistory: null,
      bankAdded: false,
      loader: false,
      loading: false,
      selectedDropdown: 'cards',
      activePaymentTab: 1,
      showForm: false,
      viewHistory: false,
      bankOptions: null,
      formData: {
        country: '',
        accountNumber: '',
        bankDetail: null,
        bvn: '',
        countryCode: '',
        accountName: '',
        mobileMoneyNumber: '',
      },
      showVerifyName: false,
      error: null,
    }
  },
  validations() {
    if (this.activePaymentTab === 1) {
      return {
        formData: {
          country: {
            countryRequired: required,
          },
          accountNumber: {
            accountNumberRequired: required,
          },
          bankDetail: {
            bankDetailRequired: required,
          },
          bvn: {
            bvnRequired: required,
          },
        },
      }
    } else if (this.activePaymentTab === 2) {
      return {
        formData: {
          countryCode: {
            countryCodeRequired: required,
          },
          mobileMoneyNumber: {
            mobileMoneyNumberRequired: required,
          },
        },
      }
    }
  },
  computed: {
    ...mapState('user', ['userData', 'role']),
    userRole() {
      return this.role?.map((el) => el.userType)
    },
    options() {
      return [
        { text: 'Cards', value: 'cards' },
        { text: 'Payment History', value: 'payment-history' },
      ]
    },
    verifyName() {
      return [this.formData.bankDetail, this.formData.accountNumber]
    },
    user() {
      if (this.userData) {
        return {
          name: this.userData.kyc.firstname + ' ' + this.userData.kyc.lastname,
          email: this.userData.user.email,
          phone: this.userData.kyc.phone,
        }
      } else {
        return undefined
      }
    },
    customizeFlutter() {
      return {
        title: 'Add card',
        description: `Add card for auto renewal of subscription`,
        logo: 'https://res.cloudinary.com/spleetng/image/upload/v1611148920/logo-icon.svg',
      }
    },
  },
  watch: {
    'formData.countryCode'(newVal) {
      if (newVal) {
        this.getAllBanks(newVal)
      }
    },
    verifyName(newVal) {
      if (newVal) {
        this.verifyAccountName()
      }
    },
  },
  mounted() {
    this.getUserCard()
    this.getAccounts()
    this.getPaymentHistory()
  },
  methods: {
    ...mapActions('renters', [
      'getCards',
      'addCard',
      'getBanks',
      'addBankAccount',
      'getBankAccounts',
      'verifyAccount',
      'addMobileMoney',
      'getPaymentRecord',
      'getSingleHistory',
    ]),
    validationMsg: validationMessage(formMessages),
    switchTab(tab) {
      this.error = null
      this.activePaymentTab = tab
    },
    async viewHistoryModal(payment) {
      this.loader = true
      const response = await this.getSingleHistory(payment.invoiceId)
      this.singleHistory = response.data.data.subscriptionPayments
      this.viewHistory = true
      this.loader = false
    },
    downloadHistory(payment) {
      this.getSingleHistory(payment.invoiceId).then((response) => {
        const {
          data: { data },
        } = response
        this.singleHistory = data
      })

      html2pdf()
        .from(this.$refs.invoicePDF)
        .set({
          margin: 0.5,
          filename: `${this.singleHistory.invoice_id}-${
            payment.subPlan
          }-${moment(payment.paymentDate).format('DD-MMM-YYYY')}-Inv.pdf`,
          image: { type: 'jpeg', quality: 2.3 },
          html2canvas: { scale: 4, scrollX: 0, scrollY: 0 },
          jsPDF: { unit: 'in', format: 'letter', orientation: 'portrait' },
        })
        .save()
    },
    async getPaymentHistory() {
      try {
        const response = await this.getPaymentRecord()
        this.paymentHistory = response.data.data.paymentHistory

        this.paymentHistory = this.paymentHistory.map((history) => {
          return {
            id: history.id,
            invoiceId: history.invoiceId,
            amount: history.amount,
            created_at: history.paymentDate,
            subPlan: history.subPlan,
            sub_type: history.type,
            spaceType: history.spaceType,
            spaceName: history.spaceName,
          }
        })
      } catch (error) {
        this.$errorHandler(error)
      }
    },

    async getAllBanks() {
      try {
        const response = await this.getBanks(this.formData.countryCode)
        this.bankOptions = response.data.data.sort(function (a, b) {
          const nameA = a.name.toLowerCase()
          const nameB = b.name.toLowerCase()
          if (nameA < nameB)
            // sort string ascending
            return -1
          if (nameA > nameB) return 1
          return 0 // default return value (no sorting)
        })
      } catch (error) {
        this.$errorHandler(error)
      }
    },

    async addBank() {
      this.$v.$touch()
      if (this.$v.$invalid) {
        this.error = this.$v.formData
      } else {
        this.error = null
        this.loading = true
        const data = {
          accountNumber: this.formData.accountNumber,
          bankCode: this.formData.bankDetail.code,
          accountName: this.formData.accountName,
          bank: this.formData.bankDetail.name,
          bvn: this.formData.bvn.toString(),
          countryCode: this.formData.countryCode,
          accountType: 'bank',
        }
        try {
          const response = await this.addBankAccount(data)
          this.loading = false
          if (response.data.message === 'Bank details successfully saved') {
            this.bankAdded = true
            this.showForm = false
            this.getAccounts()
            this.$showToast(response.data.message, 'success')
          }
        } catch (error) {
          this.loading = false
          this.$errorHandler(error)
        }
      }
    },
    async addMobileMoni() {
      this.$v.$touch()
      if (this.$v.$invalid) {
        this.error = this.$v.formData
      } else {
        this.error = null
        this.loading = true
        const data = {
          accountNumber: this.formData.mobileMoneyNumber,
          countryCode: this.formData.countryCode,
          accountType: 'Mobile Money',
        }
        try {
          const response = await this.addMobileMoney(data)
          this.loading = false
          if (response.data.statusCode === 201) {
            this.showForm = false
            this.selectedDropdown = 'bank-accounts'
            this.formData.mobileMoneyNumber = ''
            this.formData.countryCode = ''
            this.bankAdded = true
            this.form = false
            this.getAccounts()
            this.$showToast('Bank details added', 'success')
          }
        } catch (error) {
          this.loading = false
          this.$errorHandler(error)
        }
      }
    },
    async getAccounts() {
      this.loader = true
      try {
        const response = await this.getBankAccounts()
        this.loader = false
        this.addedBanks = response.data.data
      } catch (error) {
        this.loader = false
        this.$errorHandler(error)
      }
    },
    async verifyAccountName() {
      if (this.formData.bankDetail !== null) {
        try {
          const response = await this.verifyAccount({
            accountNumber: this.formData.accountNumber,
            bankCode: this.formData.bankDetail.code,
          })
          if (response.data.statusCode === 201) {
            this.formData.accountName = response.data.data
            this.showVerifyName = true
          }
        } catch (err) {
          if (err.response.data.statusCode === 400) {
            this.$showToast(
              'Associated account not found. Kindly check the provided account details and try again',
              'error'
            )
          }
        }
      }
    },
    generateReference() {
      const date = new Date()
      return date.getTime().toString()
    },
    closedPaymentModal() {
      // console.log('payment modal is closed')
    },
    async getUserCard() {
      this.loader = true
      try {
        const response = await this.getCards()
        this.loader = false
        if (response.data.statusCode === 200) {
          this.cards = response.data.data
        }
      } catch (error) {
        this.loader = false
        this.$errorHandler(error)
      }
    },
    addNewCard() {
      this.$refs.addcard.$el.click()
    },
    async paymentCallBack(res) {
      if (res) {
        try {
          const response = await this.addCard({
            paymentGateway: 'flutterwave',
            paymentReference: res.transaction_id.toString(),
            internalPaymentReference: res.tx_ref,
          })
          if (response.data.statusCode === 201) {
            this.getUserCard()
            this.$showToast('Card added successfully', 'success')
          }
        } catch (error) {
          this.$errorHandler(error)
        }
      }
    },
    toggleTab(value) {
      this.selectedDropdown = value
    },
    formatDate(date) {
      return formatReadbleDate(date)
    },
    formatCurrency(amount, currency) {
      return formatCurrencyAmount(amount, currency)
    },
  },
}
</script>

<style lang="scss" scoped>
.v-enter-active,
.v-leave-active {
  transition: all 0.8s ease;
}

.v-enter,
.v-leave-to {
  opacity: 0;
  transform: translateX(-50px);
}
.hide-scroll::-webkit-scrollbar {
  display: none;
}
</style>
