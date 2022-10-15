<template>
  <div class="s-sticky s-top-[59px] s-left-0 md-s:s-hidden s-z-30 s-bg-[#fff]">
    <div class="s-w-full s-h-2.5 s-bg-[#ECEFFC] s-sticky s-z-[2]">
      <div
        class="s-h-2.5 s-bg-[#2E48DA] s-transition-all s-duration-500"
        :style="{
          width: `${progressBar}%`,
        }"
      ></div>
    </div>
    <div class="s-relative">
      <div
        class="border s-sticky s-z-[2] s-bg-white s-border-b s-h-12 s-flex s-items-center s-justify-between s-px-4 s-border-solid"
        @click="toggleProgressMenu = !toggleProgressMenu"
      >
        <div class="s-flex s-items-center">
          <div class="s-flex">
            <div
              class="s-w-6 s-h-6 s-rounded-full s-border s-border-solid s-border-[#B1B7D6]"
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
          </div>
          <div>
            <p class="s-text-sm s-font-semibold s-leading-[1.375rem] s-ml-3">
              <span
                :class="[
                  {
                    's-text-[#3DDC97]': step >= 1,
                  },
                ]"
                >{{ stepTitle }}
              </span>
              <span v-if="step >= 1"
                >- {{ progressBar === '5' ? 0 : progressBar }}% Done</span
              >
            </p>
          </div>
        </div>
        <div class="">
          <ChevronDownIcon />
        </div>
      </div>
      <transition name="slide">
        <div
          v-if="toggleProgressMenu"
          class="s-absolute s-w-full s-bg-[#020202] s-px-8 s-pt-[2.875rem] s-pb-20 s-z-[1]"
        >
          <ProgressBar />
        </div>
      </transition>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
export default {
  data() {
    return {
      toggleProgressMenu: false,
    }
  },
  computed: {
    ...mapState('host/listing', ['currentLevel', 'step']),
    progressBar() {
      if (this.step === 1) {
        if (this.currentLevel === 1) return '5'
        else if (this.currentLevel === 2) return '20'
        else if (this.currentLevel === 3) return '40'
        else if (this.currentLevel === 4) return '60'
        else return '100'
      } else if (this.step === 2) {
        if (this.currentLevel === 1) return '5'
        else if (this.currentLevel === 2) return '16'
        else if (this.currentLevel === 3) return '32'
        else if (this.currentLevel === 4) return '48'
        else if (this.currentLevel === 5) return '64'
        else if (this.currentLevel === 6) return '80'
        else return '100'
      } else if (this.step === 3) {
        if (this.currentLevel === 1) return '5'
        else if (this.currentLevel === 2) return '25'
        else if (this.currentLevel === 3) return '50'
        else if (this.currentLevel === 4) return '75'
        else return '100'
      } else return '100'
    },
    stepTitle() {
      if (this.step === 1) {
        return 'Space Details'
      } else if (this.step === 2) {
        return 'Subscription & Bookings'
      } else return 'Identification'
    },
  },
}
</script>

<style lang="scss" scoped>
.slide-enter-active,
.slide-leave-active {
  transition: all 0.5s ease-in-out;
}
.slide-enter {
  transform: translateY(-100%);
}
.slide-enter-to {
  transform: translateY(0);
}
.slide-leave-to {
  transform: translateY(-100%);
}
</style>
