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
        class="s-flex s-flex-col s-mt-[1.5rem] s-w-full md:s-bg-white md:s-rounded-xl s-max-w-[1440px] s-mx-auto s-min-h-[600px] s-mb-10 s-overflow-auto"
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
                <div class="s-hidden md:s-block">
                  <Tables :table-head="headers">
                    <tr
                      v-for="sub in searchData"
                      :key="sub.id"
                      class="s-bg-[#fff] s-text-center s-border-b dark:s-border-gray-700 hover:s-bg-[#EFFFF8]"
                    >
                      <td>
                        <p
                          class="s-text-sm s-font-normal s-leading-6 s-text-[#0F0C3D] s-pt-8 s-pb-7"
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
                          v-html="getCurrentAmount(sub.price_template)"
                        ></p>
                      </td>
                      <td>
                        <StatusBadge
                          :text="sub.status"
                          class="s-block s-mx-auto"
                        />
                      </td>
                      <td>
                        <TableAction
                          :loading="loading"
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
                          position="!s-left-[-50%] !s-translate-x-[-50%]"
                          :loading="loading"
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
            :total-items="hostSubscriptions.totalSubscriptions"
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

            <div v-if="currentPriceTemplate" class="s-mb-10">
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
                        currentPriceTemplate.rent,
                        currentPriceTemplate.currency
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
                        currentPriceTemplate.service_charge,
                        currentPriceTemplate.currency
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
                        selectedSubscription.security_deposit_bal,
                        currentPriceTemplate.currency
                      )
                    "
                  ></p>
                </div>
                <div class="s-flex-1">
                  <p
                    class="s-text-xs s-text-[#0F0C3D] s-font-semibold s-mb-1.5"
                  >
                    VAT
                  </p>
                  <p
                    class="s-text-sm s-font-normal s-text-[#5C5A74]"
                    v-html="
                      formatCurrency(
                        currentPriceTemplate.vat,
                        currentPriceTemplate.currency
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
                    DISCOUNT
                  </p>
                  <p
                    class="s-text-sm s-font-normal s-text-[#5C5A74]"
                    v-html="
                      formatCurrency(
                        currentPriceTemplate.discount,
                        currentPriceTemplate.currency
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
              v-if="selectedSubscription.extra_charges"
              class="s-mb-10 s-pt-10 s-border-t s-border-solid s-border-[#EAEDFD]"
            >
              <p class="s-text-base s-font-bold s-mb-6">Extra Charges</p>
              <div class="s-overflow-x-scroll">
                <table
                  class="s-w-full s-min-w-[450px] s-min-h-[200px] s-mb-5 s-text-left"
                >
                  <thead
                    class="s-uppercase s-text-xs s-text-primary s-font-semibold"
                  >
                    <tr>
                      <td class="s-pb-2.5">Date</td>
                      <td>Type</td>
                      <td>Amount</td>
                      <td>Status</td>
                      <td>Payment Status</td>
                      <td>Action</td>
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
                            currentPriceTemplate.currency
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
                      <td>
                        <TableAction
                          v-if="
                            extracharge.status === 'Pending' ||
                            extracharge.status === 'Declined'
                          "
                        >
                          <div
                            class="s-text-left s-w-fit s-border-[0.5px] s-mx-auto s-border-solid s-text-sm s-border-[#B1B7D6] s-rounded-xl s-bg-white s-absolute -s-left-[50%] s-translate-x-[3px]"
                          >
                            <ul>
                              <li
                                v-if="extracharge.action_by === 'host'"
                                class="s-border-b-[0.5px] s-border-solid s-border-b-[#E7E9F1] s-rounded-t-xl hover:s-cursor-pointer"
                                @click="toggleExtraChargeModal(extracharge.id)"
                              >
                                <p class="s-px-4 s-py-3 s-text-[#242428]">
                                  Edit
                                </p>
                              </li>
                              <li
                                v-if="extracharge.action_by === 'host'"
                                class="s-border-b-[0.5px] s-border-solid s-border-b-[#E7E9F1] s-rounded-t-xl hover:s-cursor-pointer"
                                @click="
                                  toggleDeleteExtraChargeModal(extracharge.id)
                                "
                              >
                                <p class="s-px-4 s-py-3 s-text-[#242428]">
                                  Withdraw
                                </p>
                              </li>
                            </ul>
                          </div>
                        </TableAction>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <div class="s-flex s-space-x-4 s-mt-3">
              <Button
                text="Add Extra Charge"
                class="s-bg-primary-blue s-w-[160px]"
                @submit="toggleExtraChargeModal(null)"
              />
            </div>
          </DetailPageModal>
        </div>
      </div>
    </div>
    <!-- Extra charge modal -->
    <template v-if="showExtraChargeModal">
      <Modal
        :show="showExtraChargeModal"
        modal-max-width="s-max-w-[700px]"
        @close=";(showExtraChargeModal = false), (showModal = true)"
      >
        <h1 class="s-font-medium s-text-2xl s-text-primary s-mb-[3rem]">
          {{ editExtraCharge ? 'Edit' : 'Add' }} Extra Charge
        </h1>
        <div class="s-flex s-flex-wrap s-justify-between">
          <div class="s-w-full sm:s-w-[48%] s-mb-6">
            <label
              for="chargeType"
              class="s-block s-mb-2.5 s-text-sm s-font-semibold s-text-[#000]/60"
              >Select type of charge</label
            >
            <select
              v-model="extraChargeData.extracharge_type"
              class="s-text-sm s-w-full s-rounded-full s-px-3 s-py-[14px] s-pl-5 s-ring-1 s-ring-[#99A4E1] s-border-none focus:s-outline-none"
              required
            >
              <option value="" disabled selected>Select an option</option>
              <option
                v-for="(
                  excessChargeOption, index
                ) in subscriptionSetup.extra_charge_types"
                :key="index"
                :value="excessChargeOption.title"
              >
                {{ excessChargeOption.title }}
              </option>
            </select>
            <FormFieldError
              :validation-msg="
                validationMsg($v.extraChargeData.extracharge_type)
              "
            />
          </div>
          <div class="s-w-full sm:s-w-[48%]">
            <label
              for="amount"
              class="s-block s-mb-2.5 s-text-sm s-font-semibold s-text-[#000]/60"
              >Amount</label
            >
            <CurrencyInput
              placeholder="₦ 0.00"
              :class="'s-w-full'"
              :error="error && error.amount"
              :validation-msg="validationMsg($v.extraChargeData.amount)"
              :model-value="extraChargeData.amount"
              @update:modelValue="(value) => (extraChargeData.amount = value)"
            />
          </div>
          <div class="s-w-full sm:s-w-[48%]">
            <label
              for="chargeType"
              class="s-block s-mb-2.5 s-text-sm s-font-semibold s-text-[#000]/60"
              >Add proof of charge</label
            >
            <File
              type="file"
              :value="extraChargeData.doc_file_path"
              :folder="extraChargeFolder"
              :error="error && error.doc_file_path"
              :validation-msg="validationMsg($v.extraChargeData.doc_file_path)"
              @update="(value) => (extraChargeData.doc_file_path = value)"
              @remove="extraChargeData.doc_file_path = null"
              @uploaded="getUploadedData"
            />
          </div>
          <div class="s-w-full sm:s-w-[48%]">
            <label
              for="chargeType"
              class="s-block s-mb-2.5 s-text-sm s-font-semibold s-text-[#000]/60"
              >Notes</label
            >
            <textarea
              v-model="extraChargeData.narration"
              class="s-w-full s-p-2.5 s-border s-border-[#99A4E1] s-border-solid s-rounded s-h-[100px] s-text-sm"
            ></textarea>
            <FormFieldError
              :validation-msg="validationMsg($v.extraChargeData.narration)"
            />
          </div>
          <div
            v-if="extraChargeData.doc_file_path"
            class="sm:s-w-[48%] s-h-[12.5rem]"
          >
            <a :href="extraChargeData.doc_file_path" target="_blank">
              <img
                :src="extraChargeData.doc_file_path"
                alt=""
                class="s-h-full s-object-cover"
              />
            </a>
          </div>
          <div class="s-flex s-justify-end s-w-full s-mt-5">
            <Button
              :text="editExtraCharge ? 'Edit charge' : 'Add Charge'"
              class="s-bg-primary-blue s-min-w-[140px]"
              @submit="toggleExtraChargeWarningModal"
            />
          </div>
        </div>
      </Modal>
    </template>
    <!-- extracharge warning modal -->
    <ActionModal
      :show="showExtraChargeWarningModal"
      :loading="extraChargeLoader"
      back-btn="No"
      next-btn="Yes"
      @close="
        ;(showExtraChargeWarningModal = false), (showExtraChargeModal = true)
      "
      @submit="addExtracharge"
    >
      <div>
        <p class="s-text-2xl s-font-medium s-mb-2.5 s-text-primary">
          {{ editExtraCharge ? 'Edit' : 'Add' }} Extra Charge
        </p>
        <p
          v-if="editExtraCharge"
          class="s-text-sm s-text-primary s-font-normal s-mb-5"
        >
          Your extra charge will be edited. Do you want to proceed with this?
        </p>
        <p v-else class="s-text-sm s-text-primary s-font-normal s-mb-5">
          Your extra charge will be added to the listing. Do you want to proceed
          with this?
        </p>
      </div>
    </ActionModal>

    <!-- extracharge withdrawal modal -->
    <Modal
      :show="showDeleteExtraChargeModal"
      @close="toggleDeleteExtraChargeModal"
    >
      <div>
        <h1 class="s-font-medium s-text-2xl s-text-primary s-mb-[2rem]">
          Withdraw Extra Charge
        </h1>
        <div>
          <label
            for=""
            class="s-block s-mb-2.5 s-text-sm s-font-medium s-text-black/60"
            >Reason for withdrawing</label
          >
          <textarea
            v-model="deleteExtraChargeReason"
            class="s-p-4 s-border s-border-[#b1b7d6] s-border-solid s-rounded s-bg-white s-h-[100px] s-w-full s-text-black/80"
          ></textarea>
          <FormFieldError
            v-if="$v.deleteExtraChargeReason"
            :validation-msg="validationMsg($v.deleteExtraChargeReason)"
          />
        </div>
        <Button
          text="Withdraw"
          :loading="deleteExtraChargeLoader"
          class="s-block s-ml-auto s-mt-5 s-min-w-[140px] s-bg-primary-blue"
          @submit="deleteExtraCharge"
        />
      </div>
    </Modal>
  </div>
</template>

<script>
import { mapActions, mapState } from 'vuex'
import { required } from 'vuelidate/lib/validators'
import { validationMessage } from 'vuelidate-messages'
import DetailPageModal from '../../../components/dashboard/DetailPageModal.vue'
import {
  formatReadbleDate,
  sumBookingPrice,
  formatCurrencyAmount,
} from '../../../helpers/utils'
import { folderNames } from '../../../helpers/fileUpload'

const formMessages = {
  extracharge_typeRequired: () => 'kindly choose from the options',
  amountRequired: () => 'Amount is required',
  narrationRequired: () => 'Note is required',
  doc_file_pathRequired: () => 'Kindly upload a proof of charge',
  deleteExtraChargeReasonRequired: () => 'Kindly provide a reason',
}

export default {
  components: { DetailPageModal },
  layout: 'host',
  data() {
    return {
      extraChargeData: {
        amount: '',
        extracharge_type: '',
        narration: '',
        member_id: '',
        subscription_id: '',
        doc_file_path: '',
      },
      editExtraCharge: false,
      extraChargeLoader: false,
      showExtraChargeModal: false,
      showExtraChargeWarningModal: false,
      showDeleteExtraChargeModal: false,
      deleteExtraChargeReason: '',
      deleteExtraChargeLoader: false,
      totalExtraCharges: null,
      currentPage: 1,
      unpaid: true,
      filterBy: '',
      searchLoader: true,
      search: '',
      selectedSubscription: null,
      showModal: false,
      loading: false,
      cancelStatus: false,
      loader: false,
      limit: 10,
      extraChargeId: null,
      deleteExtraChargeId: null,
      subscriptionSetup: {},
      headers: [
        {
          text: 'SPACE NAME',
          align: 'middle',
          value: 'name',
        },
        { text: 'SPACE PLAN', value: 'type' },
        { text: 'AMOUNT', value: 'cost' },
        { text: 'STATUS', value: 'status' },
        { text: 'Actions', value: 'actions' },
      ],
      subList: [],
      error: null,
    }
  },
  validations() {
    if (this.showDeleteExtraChargeModal) {
      return {
        deleteExtraChargeReason: {
          deleteExtraChargeReasonRequired: required,
        },
      }
    }
    return {
      extraChargeData: {
        amount: {
          amountRequired: required,
        },
        extracharge_type: {
          extracharge_typeRequired: required,
        },
        narration: {
          narrationRequired: required,
        },
        doc_file_path: {
          doc_file_pathRequired: required,
        },
      },
    }
  },
  computed: {
    ...mapState('host', ['hostSubscriptions']),
    extraChargeFolder() {
      return folderNames.docs.extracharge
    },
    currentPriceTemplate() {
      let template = {}
      if (this.selectedSubscription) {
        this.selectedSubscription.price_template.map((data) => {
          if (data.is_in_use) {
            template = data
          }
          return template
        })
      }
      return template
    },
    filter() {
      const setFilter = this.hostSubscriptions.hostSubscriptions
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
      const rent = formatCurrencyAmount(
        +this.currentPriceTemplate.service_charge +
          +this.currentPriceTemplate.rent +
          +this.currentPriceTemplate.vat +
          +this.totalExtraCharges -
          +this.currentPriceTemplate.discount,
        this.currentPriceTemplate.currency
      )
      return rent
    },
    extraCharges() {
      if (
        this.selectedSubscription &&
        this.selectedSubscription.extra_charges
      ) {
        return this.selectedSubscription.extra_charges
          .filter((el) => el.status !== 'Deleted')
          .sort(
            (d1, d2) =>
              new Date(d2.updated_at).getTime() -
              new Date(d1.updated_at).getTime()
          )
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
  async mounted() {
    this.getSubscriptions()
    await this.getSubscriptionSetup()
  },
  methods: {
    ...mapActions('host', [
      'getHostSubscriptions',
      'getSetup',
      'hostAddExtraCharge',
      'hostEditExtraCharge',
      'deleteHostExtraCharge',
      'getSubscriptionDetail',
    ]),
    validationMsg: validationMessage(formMessages),
    resetExtrachargeForm() {
      this.editExtraCharge = false
      this.extraChargeId = null
      this.extraChargeData = {
        amount: '',
        extracharge_type: '',
        narration: '',
        member_id: '',
        subscription_id: '',
        doc_file_path: '',
      }
    },
    async deleteExtraCharge() {
      this.$v.$touch()
      if (this.$v.$invalid) {
        this.error = this.$v
      } else {
        this.error = null
        this.deleteExtraChargeLoader = true
        const extraChargeData = {
          otherReason: this.deleteExtraChargeReason,
        }
        try {
          const response = await this.deleteHostExtraCharge({
            extraChargeData,
            id: this.deleteExtraChargeId,
          })
          if (response.data.statusCode === 200) {
            this.showDeleteExtraChargeModal = false
            this.showModal = true
            this.getSingleSub(this.selectedSubscription.id)

            setTimeout(() => {
              this.$showToast(response.data.message, 'success')
            }, 3000)
          }
          this.deleteExtraChargeLoader = false
        } catch (error) {
          this.deleteExtraChargeLoader = false
          this.$errorHandler(error)
        }
      }
    },
    toggleDeleteExtraChargeModal(id) {
      this.showModal = false
      this.showDeleteExtraChargeModal = !this.showDeleteExtraChargeModal
      this.deleteExtraChargeId = id
    },
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
    async getSubscriptionSetup() {
      const response = await this.getSetup()
      this.subscriptionSetup = { ...response.data.data }
    },
    getUploadedData(data) {
      this.extraChargeData.doc_file_path = data.secure_url
    },
    toggleExtraChargeWarningModal() {
      this.$v.$touch()
      if (this.$v.$invalid) {
        this.error = this.$v.extraChargeData
      } else {
        this.error = null
        this.showExtraChargeWarningModal = !this.showExtraChargeWarningModal
        if (this.showExtraChargeModal) {
          this.showExtraChargeModal = false
        }
      }
    },
    async addExtracharge() {
      this.extraChargeLoader = true
      if (!this.editExtraCharge) {
        try {
          this.extraChargeData.member_id = this.selectedSubscription.user_id
          this.extraChargeData.subscription_id = this.selectedSubscription.id
          this.extraChargeData.amount = +this.extraChargeData.amount
          const response = await this.hostAddExtraCharge(this.extraChargeData)
          this.showExtraChargeWarningModal = false
          this.showModal = true
          this.getSingleSub(this.selectedSubscription.id)

          setTimeout(() => {
            this.$showToast(response.data.message, 'success')
          }, 3000)
          this.extraChargeLoader = false
        } catch (error) {
          this.extraChargeLoader = false
          this.$errorHandler(error)
        }
      } else {
        try {
          const extraChargeData = {
            amount: +this.extraChargeData.amount,
            subscription_id: this.extraChargeData.subscription_id,
            extracharge_type: this.extraChargeData.extracharge_type,
            doc_file_path: this.extraChargeData.doc_file_path,
            narration: this.extraChargeData.narration,
          }
          await this.hostEditExtraCharge({
            extraChargeData,
            id: this.extraChargeId,
          })
          this.showExtraChargeWarningModal = false
          this.showModal = true
          this.getSingleSub(this.selectedSubscription.id)
          setTimeout(() => {
            this.$showToast(
              'Your have successfully edited you extra charge!',
              'success'
            )
          }, 3000)
          this.extraChargeLoader = false
        } catch (error) {
          this.extraChargeLoader = false
          this.$errorHandler(error)
        }
      }
    },
    toggleExtraChargeModal(id) {
      this.showModal = false
      if (id) {
        this.editExtraCharge = true
        this.extraChargeId = id

        this.selectedSubscription.extra_charges.forEach((charge) => {
          if (charge.id === id) {
            this.extraChargeData = {
              amount: charge.amount,
              extracharge_type: charge.extracharge_type,
              narration: charge.narration,
              subscription_id: charge.subscription_id,
              doc_file_path: charge.doc_file_path,
            }
          }
        })
      } else {
        this.resetExtrachargeForm()
      }
      this.showExtraChargeModal = !this.showExtraChargeModal
    },
    async getSubscriptions() {
      this.loader = true
      const page = this.$route.query.page
      try {
        await this.getHostSubscriptions({ page, limit: this.limit })
        this.subList = this.hostSubscriptions.hostSubscriptions
        this.loader = false
      } catch (error) {
        this.loader = false
        this.$errorHandler(error)
      }
    },
    async getSingleSub(id) {
      try {
        const response = await this.getSubscriptionDetail(id)
        this.loading = false
        this.selectedSubscription = response.data.data
      } catch (error) {
        this.loading = false
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
    getCurrentAmount(priceTemplate) {
      let template = {}
      priceTemplate.map((data) => {
        if (data.is_in_use) {
          template = data
        }
        return template
      })
      return formatCurrencyAmount(template.rent, template.currency)
    },
    filterSubscription(value) {
      this.filterBy = value
      if (value === 'all') {
        this.subList = this.hostSubscriptions.hostSubscriptions
      } else if (this.filter.some((el) => el.value === value)) {
        this.subList = this.hostSubscriptions.hostSubscriptions.filter(
          (el) => el.status === value
        )
      }
    },
    async changePage(page) {
      this.paginationLoader = true
      try {
        const response = await this.getHostSubscriptions({
          page,
          limit: this.limit,
        })
        this.subList = response.data.data.hostSubscriptions
        this.$router.replace({ query: { page: this.currentPage } })
        this.paginationLoader = false
      } catch (error) {
        this.paginationLoader = false
      }
    },
    async cancelSub(id) {
      this.cancelStatus = true
      try {
        const response = await this.cancelSubcription(id)
        this.cancelStatus = false
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
