<template>
  <div class="s-mt-9 md:s-mt-0">
    <label
      for="power"
      class="sm:s-text-[#3B3A4A] s-text-white sm:s-text-sm s-text-xs s-uppercase s-mb-5 s-font-bold s-block"
      :class="{ '!s-text-[#3B3A4A]': dashboardFilter }"
      >POWER SUPPLY</label
    >
    <div class="s-flex s-flex-wrap s-items-center sm:s-space-x-5">

      <CustomBox
        v-for="(power, index) in powers"
        :key="index"
        v-model="powerSelected"
        :name="index"
        :val="power"
      >
      {{ power }} hours
      </CustomBox>
      
    </div>
  </div>
</template>

<script>
export default {
  props: {
    dashboardFilter: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      powers: [24, 18, 15, 12],
      powerSelected: [],
    }
  },
  watch: {
    powerSelected(value) {
      this.$emit('power', value)
    },
  },
  methods: {
    clear() {
      this.powerSelected = []
    },
  },
}
</script>

<style></style>
