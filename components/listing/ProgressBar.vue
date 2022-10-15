<template>
  <div>
    <h2 class="s-text-[#fff] s-text-[1.125rem] s-font-normal s-mb-5">
      List your Space
    </h2>
    <div class="">
      <div class="s-flex s-mb-4">
        <div class="s-flex s-flex-col s-items-center s-mr-2.5">
          <div
            class="s-w-6 s-h-6 s-rounded-full s-border s-border-solid s-border-[#B1B7D6] s-mb-[0.875rem]"
            :class="[
              {
                '!s-bg-[#3DDC97] s-border-none s-flex s-items-center s-justify-center':
                  step > 1,
              },
              {
                's-border-[#3DDC97] s-border-2': step === 1,
              },
            ]"
          >
            <TickWhiteIcon v-show="step > 1" width="15" height="15" />
          </div>
          <div class="s-w-[1px] s-h-[72px] hr"></div>
        </div>
        <div class="">
          <p
            class="s-text-[#fff] s-text-sm s-font-semibold s-leading-[1.375rem] s-mb-2.5"
          >
            <span
              :class="[
                {
                  's-text-[#3DDC97]': step >= 1,
                },
              ]"
              >Space Details
            </span>
            <span v-if="step >= 1" :class="[{ 's-text-[#fff]': step >= 1 }]"
              >- {{ stepOneProgress }}% Done</span
            >
          </p>
          <p
            class="s-text-[#AEB6DD] s-text-sm s-font-normal s-py-2.5"
            :class="[
              {
                '!s-text-[#fff]': step === 1,
              },
            ]"
          >
            Please make sure you have the following in your space to be eligible
            for approval
          </p>
        </div>
      </div>
      <div class="s-flex s-mb-4">
        <div class="s-flex s-flex-col s-items-center s-mr-2.5">
          <div
            class="s-w-6 s-h-6 s-rounded-full s-border s-border-solid s-border-[#B1B7D6] s-mb-[0.875rem]"
            :class="[
              {
                '!s-bg-[#3DDC97] s-border-none s-flex s-items-center s-justify-center':
                  step > 2,
              },
              {
                's-border-[#3DDC97] s-border-2': step === 2,
              },
            ]"
          >
            <TickWhiteIcon v-show="step > 2" width="15" height="15" />
          </div>
          <div class="s-w-[1px] s-h-[72px] hr"></div>
        </div>
        <div class="">
          <p
            class="s-text-[#AEB6DD] s-text-sm s-font-semibold s-leading-[1.375rem] s-mb-2.5"
            :class="[
              {
                '!s-text-[#fff]': step === 2,
              },
            ]"
          >
            <span
              class="s-text-[#AEB6DD]"
              :class="[
                {
                  '!s-text-[#3DDC97]': step >= 2,
                },
              ]"
              >Subscription & Bookings
            </span>
            <span v-if="step >= 2" :class="[{ 's-text-[#fff]': step >= 2 }]"
              >- {{ stepTwoProgress }}% Done</span
            >
          </p>
          <p
            class="s-text-[#AEB6DD] s-text-sm s-font-normal s-py-2.5"
            :class="[
              {
                '!s-text-[#fff]': step === 2,
              },
            ]"
          >
            House rules, calendar, subscriptions...
          </p>
        </div>
      </div>
      <div v-if="kycStatus" class="s-flex s-mb-4">
        <div class="s-flex s-flex-col s-items-center s-mr-2.5">
          <div
            class="s-w-6 s-h-6 s-rounded-full s-border s-border-solid s-border-[#B1B7D6] s-mb-[0.875rem]"
            :class="[
              {
                '!s-bg-[#3DDC97] s-border-none s-flex s-items-center s-justify-center':
                  step > 3,
              },
              {
                's-border-[#3DDC97] s-border-2': step === 3,
              },
            ]"
          >
            <TickWhiteIcon v-show="step > 3" width="15" height="15" />
          </div>
          <div v-show="step >= 3" class="s-w-[1px] s-h-[72px] hr"></div>
        </div>
        <div class="">
          <p
            class="s-text-[#fff] s-text-sm s-font-semibold s-leading-[1.375rem] s-mb-2.5"
          >
            <span
              class="s-text-[#AEB6DD]"
              :class="[
                {
                  '!s-text-[#3DDC97]': step >= 3,
                },
              ]"
              >Identification
            </span>
            <span v-if="step >= 3">- {{ stepThreeProgress }}% Done</span>
          </p>
          <p
            class="s-text-[#AEB6DD] s-text-sm s-font-normal s-py-2.5"
            :class="[
              {
                '!s-text-[#fff]': step === 3,
              },
            ]"
          >
            Location, KYC details, publishing...
          </p>
        </div>
      </div>
      <Button
        v-show="step < 3 && currentLevel !== 6"
        text="Save & Exit"
        :loading="loading"
        :class="'s-mt-[3.125rem] s-text-white s-bg-[#020202] s-border-2 s-border-white s-border-solid s-rounded-full s-min-w-[9.75rem]'"
        @submit="saveExit"
      />
    </div>
  </div>
</template>

<script>
import { mapActions, mapState } from 'vuex'
export default {
  data() {
    return {
      loading: false,
    }
  },
  computed: {
    ...mapState('host/listing', ['currentLevel', 'step']),
    ...mapState('user', ['userData']),
    stepOneProgress() {
      if (this.step === 1) {
        if (this.currentLevel === 1) return '0'
        else if (this.currentLevel === 2) return '20'
        else if (this.currentLevel === 3) return '40'
        else if (this.currentLevel === 4) return '60'
        else return '100'
      } else return '100'
    },
    stepTwoProgress() {
      if (this.step === 2) {
        if (this.currentLevel === 1) return '0'
        else if (this.currentLevel === 2) return '16'
        else if (this.currentLevel === 3) return '32'
        else if (this.currentLevel === 4) return '48'
        else if (this.currentLevel === 5) return '64'
        else if (this.currentLevel === 6) return '80'
        else return '100'
      } else return '100'
    },
    stepThreeProgress() {
      if (this.step === 3) {
        if (this.currentLevel === 1) return '0'
        else if (this.currentLevel === 2) return '25'
        else if (this.currentLevel === 3) return '50'
        else if (this.currentLevel === 4) return '75'
        else return '100'
      } else return '100'
    },
    kycStatus() {
      if (this.userData) {
        return (
          this.userData.user.kycStatus === 'none' ||
          this.userData.user.kycStatus === 'declined'
        )
      }
      return null
    },
  },
  methods: {
    ...mapActions('host/listing', ['updateMove']),
    async saveExit() {
      this.loading = true
      try {
        await this.updateMove()
        this.loading = false
        this.$router.push('/host/listing')
      } catch (error) {
        this.loading = false
        this.$errorHandler(error)
      }
    },
  },
}
</script>

<style lang="scss" scoped>
.hr {
  background-color: rgba(177, 183, 214, 0.5);
}
</style>
