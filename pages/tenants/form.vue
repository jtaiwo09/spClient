<template>
  <div>
    <div
      v-if="!loading"
      class="s-min-h-[calc(100vh-192px)] s-max-w-[1106px] s-w-full s-bg-white s-rounded-xl s-overflow-hidden s-flex s-sticky s-top-24"
    >
      <div
        class="s-w-[284px] s-border-r s-border-solid s-border-[#E2E5F1] s-hidden md:s-block"
      >
        <ul
          class="s-list-none s-p-0 s-m-0 s-w-4/5 lg:s-w-9/12 s-mx-auto s-mt-28"
        >
          <li
            v-for="(item, index) in checkList"
            :key="index"
            class="s-flex s-mb-7 s-cursor-pointer"
          >
            <GreenTickIcon v-if="currentStep > item.step" />
            <TickIcon v-else-if="item.step === currentStep" />
            <div
              v-else
              class="s-w-6 s-h-6 s-rounded-full s-border s-border-solid s-border-[#B1B7D6]"
            ></div>

            <span
              class="s-font-normal s-text-sm s-leading-[1.438rem] s-text-[#000] s-ml-3"
              :class="[
                {
                  '!s-text-primary-blue s-font-semibold':
                    item.step === currentStep,
                },
                {
                  's-text-[#8A90AB]': currentStep < item.step,
                },
              ]"
              >{{ item.text }}</span
            >
          </li>
        </ul>
      </div>
      <div class="s-flex-1">
        <div class="s-w-100">
          <div
            class="s-h-1 s-bg-primary-blue s-w-0 s-transition-all s-duration-500"
            :class="[
              { '!s-w-[20%]': currentStep === 2 },
              { '!s-w-[40%]': currentStep === 3 },
              { '!s-w-[60%]': currentStep === 4 },
              { '!s-w-[80%]': currentStep === 5 },
              { '!s-w-[100%] s-bg-[#3ddc97]': currentStep === 6 },
            ]"
          ></div>
        </div>
        <div
          class="s-px-5 s-pt-[1.625rem] md:s-pt-16 s-pb-14 sm:s-px-8 lg:s-px-16 s-w-full s-h-[100%]"
        >
          <div
            v-if="currentStep < 6"
            class="md:s-hidden s-ml-auto s-mb-7 s-w-24 s-py-1.5 s-border s-border-solid s-border-[#0F0C3D] s-rounded-full s-flex s-items-center s-justify-center s-text-xs s-font-semibold s-leading-[1.438rem] s-text-primary"
          >
            {{ `step ${currentStep} of 5` }}
          </div>

          <div v-if="currentStep < 6">
            <h1 class="title s-mb-1.5">
              {{ formTitle.title }}
            </h1>
            <p
              class="sub-title s-text-base-x s-font-normal s-text-[#63687E] s-leading-6 s-mb-6"
            >
              {{ formTitle.subtitle }}
            </p>
          </div>
          <form class="md:s-h-[calc(100%-5rem)] s-h-[calc(100%-11rem)]">
            <PersonalDetails v-if="currentStep === 1" />
            <EmploymentDetails
              v-if="currentStep === 2"
              :select-employment="selectEmployment"
            />
            <NextOfKin v-if="currentStep === 3" />
            <Guarantor
              v-if="currentStep === 4"
              :select-employment="selectEmployment"
            />
            <DocumentUpload
              v-if="currentStep === 5 && !selfieupload"
              @submitted="formSubmitted = true"
            />
            <SelfieUpload v-if="currentStep === 5 && selfieupload" />
            <VerifySuccess v-if="currentStep === 6" />
          </form>
        </div>
      </div>
    </div>
    <Loading v-else />
  </div>
</template>

<script>
import { mapState, mapActions, mapMutations } from 'vuex'
export default {
  name: 'VerifyForm',
  layout: 'tenants',
  data() {
    return {
      formSubmitted: false,
      userCode: null,
      loading: true,
    }
  },
  computed: {
    ...mapState('renters/verify', ['currentStep', 'userData', 'selfieupload']),
    checkList() {
      return [
        { text: 'Personal Information', step: 1 },
        { text: 'Employment Information', step: 2 },
        { text: 'Next Of Kin', step: 3 },
        { text: 'Guarantor', step: 4 },
        { text: 'Submit Identification', step: 5 },
      ]
    },
    formTitle() {
      if (this.currentStep === 2)
        return {
          title: 'What do you do for work?',
          subtitle: 'Tell us where you work and what your role is',
        }
      else if (this.currentStep === 3)
        return {
          title: 'Who is your next of kin?',
          subtitle:
            'Tell us who your next of kin is and how they’re related to you',
        }
      else if (this.currentStep === 4)
        return {
          title: 'Who is your guarantor?',
          subtitle:
            'Tell us who your guarantor is and how to reach out to them',
        }
      else if (this.currentStep === 5 && !this.selfieupload)
        return {
          title: 'Upload identification document',
          subtitle:
            'Please upload a means of identification so we can verify who you are.',
        }
      else if (this.currentStep === 5 && this.selfieupload)
        return {
          title: 'Identification',
          subtitle: 'Physical Verification',
        }
      else
        return {
          title: 'Let’s start with a few personal details',
          subtitle: 'We will like to know a few things about you',
        }
    },
    selectEmployment() {
      return [
        { text: 'Student', value: 'student' },
        { text: 'Employed', value: 'employed' },
        { text: 'Unemployed', value: 'unemployed' },
        { text: 'Self Employed', value: 'self-employed' },
      ]
    },
  },
  mounted() {
    this.userCode = localStorage.getItem('userCode')
    this.getUserToken(this.userCode)
      .then(() => {
        this.loading = false
        if (this.currentStep < 1) {
          this.INCREMENT_STEP()
        }
      })
      .catch((error) => {
        this.loading = false
        return error
      })
  },
  methods: {
    ...mapActions('renters/verify', ['getUserToken']),
    ...mapMutations('renters/verify', ['INCREMENT_STEP']),
    scrolltoTop() {
      window.scrollTo(0, 0)
    },
  },
}
</script>
<style lang="scss" scoped>
@media screen and (min-width: 640px) {
  .btn {
    margin-top: auto;
  }
}
</style>
