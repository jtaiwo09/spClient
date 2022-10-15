<template>
  <div>
    <Loading v-if="loader" />
    <div
      v-else
      class="s-relative s-px-4 md:s-pl-5 lg:s-pl-[3.625rem] md:s-pr-5 lg:s-pr-[1.875rem] s-mb-10"
    >
      <MemberDashboardNavbar title="Account Settings" />
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
          <div v-if="selectedDropdown === 'profile'" :key="1" class="s-mx-4">
            <div class="s-mx-5 s-mt-5">
              <Profile />
            </div>
          </div>
          <div
            v-if="selectedDropdown === 'employment_details'"
            :key="1"
            class="s-mx-4"
          >
            <div class="s-mx-5 s-mt-5">
              <EmploymentDetail />
            </div>
          </div>

          <div v-if="selectedDropdown === 'company'" :key="1" class="s-mx-4">
            <div class="s-mx-5 s-mt-5">
              <CompanyInfo />
            </div>
          </div>

          <div v-if="selectedDropdown === 'documents'" :key="1" class="s-mx-4">
            <div class="s-mx-5 s-mt-5">
              <Documents />
            </div>
          </div>

          <div v-if="selectedDropdown === 'next_of_kin'" :key="1" class="s-mx-4">
            <div class="s-mx-5 s-mt-5">
              <NextOfKinSetting />
            </div>
          </div>

          <div v-if="selectedDropdown === 'notification'" :key="1" class="s-mx-4">
            <div class="s-mx-5 s-mt-5">
              <Notification />
            </div>
          </div>

          <div v-if="selectedDropdown === 'security'" :key="1" class="s-mx-4">
            <div class="s-mx-5 s-mt-5">
              <ChangePasswordSettings />
            </div>
          </div>
        </Transition>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'AccountSettings',
  layout: 'host',
  data() {
    return {
      loader: false,
      selectedDropdown: 'profile',
    }
  },
  computed: {
    options() {
      return [
        { text: 'Profile', value: 'profile' },
        { text: 'Employment Details', value: 'employment_details' },
        { text: 'Company', value: 'company' },
        { text: 'Documents', value: 'documents' },
        { text: 'Next Of Kin', value: 'next_of_kin' },
        { text: 'Notification', value: 'notification' },
        { text: 'Security', value: 'security' },
      ]
    },
  },
  methods: {
    toggleTab(value) {
      this.selectedDropdown = value
    },
  },
}
</script>

<style>
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
