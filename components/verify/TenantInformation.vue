<template>
  <div
    class="sm:s-w-[627px] s-min-w-[375px] sm:s-w-full s-pl-8 s-px-10 sm:s-pl-16 s-pt-7 sm:s-pt-12 s-pb-16 s-overflow-scroll s-h-[100vh]"
  >
    <div class="s-flex s-justify-end">
      <button @click="$emit('close')">
        <CloseIcon :fill="'black'" :width="15" :height="15" />
      </button>
    </div>
    <div>
      <div
        class="s-border s-border-[#B1B7D6] s-rounded-full s-border-solid s-py-1 s-flex s-w-fit s-px-5"
      >
        <div
          class="s-w-[11px] s-h-[11px] s-rounded-full s-mr-[6px] s-bg-[#3DDC97] s-self-center"
          :class="handleColor(verificationData.status)"
        ></div>
        <p class="s-text-xs s-leading-6 s-text-[#0F0C3D] s-whitespace-nowrap">
          {{ verificationData.status | capitalize }}
        </p>
      </div>
      <p class="s-text-[20px] s-leading-6 s-font-bold s-mb-[6px] s-mt-4">
        Tenant Information
      </p>
      <p class="s-text-sm s-leading-5 s-font-normal s-text-[#242428]">
        Here’s a quick overview of this tenant
      </p>
    </div>
    <div
      v-if="verificationData.status === 'incomplete verification'"
      class="incomplete-info s-rounded-xl s-mt-[19px]"
    >
      <p class="s-pl-5 s-text-[#F62817] s-text-sm s-pt-[15px] s-pb-[13px]">
        We couldn’t verify some data from this Tenant
      </p>
    </div>
    <div class="s-mt-8 s-flex s-items-center">
      <div>
        <div v-if="verificationData.selfie">
          <img
            :src="verificationData.selfie"
            alt=""
            class="s-rounded-full"
            width="55px"
          />
        </div>
        <div v-else>
          <avatar />
        </div>
      </div>
      <div class="s-mt-8 s-ml-[18px]">
        <h1 class="s-font-bold s-text-[16px] s-leading-6 s-mb-1">
          {{ verificationData.firstName }} {{ verificationData.lastName }}
        </h1>
        <div class="s-flex s-items-center s-mb-[7px] s-mt-1">
          <MessageIcon :width="14" :height="13" :stroke="'#5C5A77'" />
          <span class="s-text-sm s-leading-6 s-ml-2 s-text-[#5C5A77]">
            {{ verificationData.email }}
          </span>
        </div>
        <div class="s-flex s-items-center">
          <CallIcon :width="14" :height="14" :stroke="'#5C5A77'" />
          <span class="s-text-sm s-leading-6 s-ml-2 s-text-[#5C5A77]">
            {{ verificationData.phone }}
          </span>
        </div>
      </div>
    </div>
    <hr class="s-my-[27px]" />
    <div class="s-grid s-grid-cols-2 s-max-w-[570px]">
      <div>
        <p class="s-text-xs s-font-semibold s-leading-6">DATE REQUESTED</p>
        <div class="s-flex s-items-center s-mt-[6px]">
          <CalendarIcon :width="13" :height="14" />
          <p
            class="s-text-sm s-leading-6 s-font-normal s-ml-[10px] s-text-[#5C5A77]"
          >
            {{ verificationData.createdAt | formatDate('do MMMM, yyyy') }}
          </p>
        </div>
      </div>
      <div>
        <p class="s-text-xs s-font-semibold s-leading-6">DATE VERFIED</p>
        <div class="s-flex s-items-center s-mt-[6px]">
          <CalendarIcon :width="13" :height="14" />
          <p
            class="s-text-sm s-leading-6 s-font-normal s-ml-[10px] s-text-[#5C5A77]"
          >
            {{ verificationData.status | formatDate('do MMMM, yyyy') }}
          </p>
        </div>
      </div>
    </div>
    <div
      v-if="
        ((verificationData.status === 'pending' ||
          verificationData.status === 'verifed') &&
          Object.keys(employmentDetails).length !== 0) ||
        Object.keys(personalDetails).length !== 0 ||
        Object.keys(guarantor).length !== 0 ||
        Object.keys(nextOfKin).length !== 0
      "
    >
      <hr class="s-my-10" />
      <div>
        <p class="s-text-[20px] s-leading-6 s-font-bold s-mb-[6px] s-mt-4">
          Personal Information
        </p>
        <p class="s-text-sm s-leading-5 s-font-light s-text-[#242428]">
          Some additional personal information about this tenant
        </p>
        <div class="s-my-8">
          <div>
            <p class="s-text-xs s-font-semibold s-leading-6">MARITAL STATUS</p>
            <div class="s-flex s-items-center s-mt-[6px]">
              <UserIcon :width="17" :height="17" />
              <p
                class="s-text-sm s-leading-6 s-font-normal s-ml-[10px] s-text-[#5C5A77]"
              >
                {{ personalDetails.maritalStatus || 'N/A' }}
              </p>
            </div>
          </div>
        </div>
        <div>
          <p class="s-text-xs s-font-semibold s-leading-6">
            IDENTIFICATION TYPE
          </p>
          <div class="s-flex s-items-center s-mt-[6px]">
            <DocumentIcon :width="13" :height="13" />
            <p
              class="s-text-sm s-leading-6 s-font-normal s-ml-[10px] s-text-[#5C5A77]"
            >
              {{ personalDetails.identificationType || 'N/A' }}
            </p>
          </div>
        </div>
      </div>
      <hr class="s-my-10" />
      <div>
        <p class="s-text-[20px] s-leading-6 s-font-bold s-mb-[6px] s-mt-4">
          Next Of Kin
        </p>
        <p class="s-text-sm s-leading-5 s-font-light s-text-[#242428]">
          Some personal information about this tenant’s next of kin
        </p>
        <div class="s-grid s-grid-cols-2 s-max-w-[570px] s-mt-8">
          <div>
            <p class="s-text-xs s-font-semibold s-leading-6">RELATIONSHIP</p>
            <div class="s-flex s-items-center s-mt-[6px]">
              <UserIcon :width="17" :height="17" />
              <p
                class="s-text-sm s-leading-6 s-font-normal s-ml-[10px] s-text-[#5C5A77] s-capitalize"
              >
                {{ nextOfKin.relationship || 'N/A' }}
              </p>
            </div>
          </div>
          <div>
            <p class="s-text-xs s-font-semibold s-leading-6">NAME</p>
            <div class="s-flex s-items-center s-mt-[6px]">
              <MemberIcon :width="17" :height="17" />
              <p
                v-if="Object.keys(nextOfKin).length !== 0"
                class="s-text-sm s-leading-6 s-font-normal s-ml-[10px] s-text-[#5C5A77]"
              >
                {{ nextOfKin.firstName | capitalize }}
                {{ nextOfKin.lastName | capitalize }}
              </p>
              <p
                v-else
                class="s-text-sm s-leading-6 s-font-normal s-ml-[10px] s-text-[#5C5A77]"
              >
                N/A
              </p>
            </div>
          </div>
        </div>
        <div class="s-mt-8">
          <div>
            <p class="s-text-xs s-font-semibold s-leading-6">PHONE NUMBER</p>
            <div class="s-flex s-items-center s-mt-[6px]">
              <CallIcon n :width="14" :height="14" />
              <p
                class="s-text-sm s-leading-6 s-font-normal s-ml-[10px] s-text-[#5C5A77]"
              >
                {{ nextOfKin.phone || 'N/A' }}
              </p>
            </div>
          </div>
        </div>
      </div>
      <hr class="s-my-10" />
      <div>
        <p class="s-text-[20px] s-leading-6 s-font-bold s-mb-[6px] s-mt-4">
          Guarantor Information
        </p>
        <p class="s-text-sm s-leading-5 s-font-light s-text-[#242428]">
          Important information about this tenant’s guarantor
        </p>
        <div class="s-grid s-grid-cols-2 s-gap-2 s-max-w-[600px] s-mt-8">
          <div>
            <p class="s-text-xs s-font-semibold s-leading-6">
              NAME OF GUARANTOR
            </p>
            <div class="s-flex s-items-center s-mt-[6px]">
              <UserIcon :width="17" :height="17" />
              <p
                v-if="Object.keys(guarantor).length !== 0"
                class="s-text-sm s-leading-6 s-font-normal s-ml-[10px] s-text-[#5C5A77]"
              >
                {{ guarantor.firstName | capitalize }}
                {{ guarantor.lastName | capitalize }}
              </p>
              <p
                v-else
                class="s-text-sm s-leading-6 s-font-normal s-ml-[10px] s-text-[#5C5A77]"
              >
                N/A
              </p>
            </div>
          </div>
          <div>
            <p class="s-text-xs s-font-semibold s-leading-6">JOB / ROLE</p>
            <div class="s-flex s-items-center s-mt-[6px]">
              <WorkIcon :width="13" :height="13" />
              <p
                class="s-text-sm s-leading-6 s-font-normal s-ml-[10px] s-text-[#5C5A77]"
              >
                {{ guarantor.employmentStatus || 'N/A' }}
              </p>
            </div>
          </div>
          <div class="s-mt-8">
            <p class="s-text-xs s-font-semibold s-leading-6">COMPANY</p>
            <div class="s-flex s-items-center s-mt-[6px]">
              <WorkIcon :width="13" :height="13" />
              <p
                class="s-text-sm s-leading-6 s-font-normal s-ml-[10px] s-text-[#5C5A77] s-capitalize"
              >
                {{ guarantor.company || 'N/A' }}
              </p>
            </div>
          </div>
          <div class="s-mt-8">
            <p class="s-text-xs s-font-semibold s-leading-6">PHONE NUMBER</p>
            <div class="s-flex s-items-center s-mt-[6px]">
              <CallIcon :width="14" :height="14" />
              <p
                class="s-text-sm s-leading-6 s-font-normal s-ml-[10px] s-text-[#5C5A77]"
              >
                {{ guarantor.phone || 'N/A' }}
              </p>
            </div>
          </div>
        </div>
      </div>
      <hr class="s-my-10" />
      <div>
        <p class="s-text-[20px] s-leading-6 s-font-bold s-mb-[6px] s-mt-4">
          Employment Information
        </p>
        <p class="s-text-sm s-leading-5 s-font-light s-text-[#242428]">
          Details about where they work and their roles
        </p>
        <div class="s-grid s-grid-cols-2 s-max-w-[570px] s-mt-8">
          <div>
            <p class="s-text-xs s-font-semibold s-leading-6">COMPANY</p>
            <div class="s-flex s-items-center s-mt-[6px]">
              <WorkIcon :width="13" :height="14" />
              <p
                class="s-text-sm s-leading-6 s-font-normal s-ml-[10px] s-text-[#5C5A77] s-capitalize"
              >
                {{ employmentDetails.companyName || 'N/A' }}
              </p>
            </div>
          </div>
          <div>
            <p class="s-text-xs s-font-semibold s-leading-6">COMPANY ADDRESS</p>
            <div class="s-flex s-mt-[6px] s-items-start">
              <div class="s-max-w-[40px] s-w-[17px]">
                <LocationIcon />
              </div>
              <p
                class="s-text-sm s-leading-6 s-font-normal s-ml-[10px] s-text-[#5C5A77] s-max-w-[225px] s-capitalize"
              >
                {{ employmentDetails.companyAddress || 'N/A' }}
              </p>
            </div>
          </div>
          <div class="s-mt-8">
            <p class="s-text-xs s-font-semibold s-leading-6">DATE JOINED</p>
            <div class="s-flex s-items-center s-mt-[6px]">
              <CalendarIcon :width="13" :height="14" />
              <p
                class="s-text-sm s-leading-6 s-font-normal s-ml-[10px] s-text-[#5C5A77]"
              >
                {{ employmentDetails.dateJoined | formatDate('do MMMM, yyyy') }}
              </p>
            </div>
          </div>
          <div class="s-mt-8">
            <p class="s-text-xs s-font-semibold s-leading-6">ROLE IN COMPANY</p>
            <div class="s-flex s-items-center s-mt-[6px]">
              <WorkIcon :width="13" :height="14" />
              <p
                class="s-text-sm s-leading-6 s-font-normal s-ml-[10px] s-text-[#5C5A77] s-capitalize"
              >
                {{ employmentDetails.role || 'N/A' }}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div
      v-if="
        verificationData.status === 'pending' &&
        Object.keys(employmentDetails).length === 0 &&
        Object.keys(personalDetails).length === 0
      "
      class="sm:s-mt-[25px] s-mt-[37px]"
    >
      <EmptyState
        :new-class="'s-bg-[#EAEDFF]  s-pt-[51px] sm:s-pt-[43px]  s-pb-[51px] sm:s-pb-[61px]'"
        :btn-text="'Send Reminder'"
        :title="'No response yet'"
        :loading="loading"
        @btnAction="sendReminder"
      >
        <div>
          <EmptySearchIcon class="s-max-w-fit s-mx-auto s-mt-[42px]" />
          <p class="s-text-sm s-leading-6 text-center s-px-4 sm:s-px-0">
            <span class="s-font-bold">
              {{ verificationData.firstName }}
              {{ verificationData.lastName }} </span
            >has not responded to this request yet
          </p>
        </div>
      </EmptyState>
    </div>
  </div>
</template>

<script>
import CloseIcon from '../icons/CloseIcon.vue'
import MemberIcon from '../icons/dashboard-icons/MemberIcon.vue'
import EmptySearchIcon from '../icons/EmptySearchIcon.vue'
import EmptyState from '../reusables/EmptyState.vue'
export default {
  components: { CloseIcon, MemberIcon, EmptyState, EmptySearchIcon },
  props: {
    singleTenantData: {
      type: Object,
      default: () => {},
    },
  },
  data() {
    return {
      loading: false,
    }
  },
  computed: {
    verificationData() {
      return this.singleTenantData?.verificationRequest || {}
    },
    personalDetails() {
      return this.singleTenantData?.personalDetails || {}
    },
    employmentDetails() {
      return this.singleTenantData?.employmentDetails || {}
    },
    nextOfKin() {
      return this.singleTenantData?.nextOfKin || {}
    },
    guarantor() {
      return this.singleTenantData?.guarantor || {}
    },
  },
  methods: {
    handleColor(status) {
      const chipColors = {
        verified: 's-bg-[#3DDC97]',
        pending: 's-bg-[#F7CE51]',
        'incomplete verification': 's-bg-[#FF7F37]',
      }
      return chipColors[status]
    },
    async sendReminder() {
      this.loading = true
      try {
        const id = this.verificationData.id
        const res = await this.$axios.$post(
          'tenants/verification-requests/reminders',
          {
            verificationId: id,
          }
        )
        this.$showToast(res.message, 'success')
        this.loading = false
      } catch (error) {
        this.$errorHandler(error)
        this.loading = false
      }
    },
  },
}
</script>

<style lang="scss" scoped>
.incomplete-info {
  background: rgba(253, 171, 171, 0.17);
}
</style>
