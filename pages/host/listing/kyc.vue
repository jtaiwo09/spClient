<template>
  <div class="sm:s-relative">
    <div
      class="s-w-full s-h-2.5 s-sticky s-top-0 s-left-0 s-bg-[#ECEFFC] s-hidden md-s:s-block s-z-20"
    >
      <div
        class="s-w-[20%] s-h-2.5 s-bg-[#2E48DA] s-transition-all s-duration-500"
        :style="{
          width: `${progressBar}%`,
        }"
      ></div>
    </div>
    <PersonalInformation v-if="currentLevel === 1" />
    <AlternativeContact v-if="currentLevel === 2" />
    <Identification v-if="currentLevel === 3" />
    <SelfieVerification v-if="currentLevel === 4" />
  </div>
</template>

<script>
import { mapState } from 'vuex'
export default {
  layout: 'listing-frame',
  data() {
    return {
      toggleProgressMenu: false,
    }
  },
  computed: {
    ...mapState('host/listing', ['currentLevel', 'step']),
    progressBar() {
      if (this.step === 3) {
        if (this.currentLevel === 1) return '5'
        else if (this.currentLevel === 2) return '25'
        else if (this.currentLevel === 3) return '50'
        else if (this.currentLevel === 4) return '75'
        else return '100'
      } else return '100'
    },
  },
}
</script>

<style lang="scss">
.info {
  background: rgba(46, 72, 218, 0.04);
}
.border {
  border-color: rgba(177, 183, 214, 0.26);
}
.r-wrap {
  @media screen and (max-width: 639px) {
    min-height: calc(100vh - 117px);
  }
}
@media screen and (min-width: 700px) {
  .r-wrap {
    padding-left: 25px;
    padding-right: 25px;
  }
  .textfield-wrap {
    margin-right: 45px;
  }
}
</style>
