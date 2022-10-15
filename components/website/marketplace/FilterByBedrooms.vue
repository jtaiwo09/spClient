<template>
  <div class="s-mt-9 md:s-mt-0">
    <label
      for="bed"
      class="sm:s-text-[#3B3A4A] s-text-white sm:s-text-sm s-text-xs s-uppercase s-mb-5 s-font-bold s-block"
      :class="{ '!s-text-[#3B3A4A]': dashboardFilter }"
      >BEDROOMS AVAILABLE</label
    >
    <div class="s-flex s-flex-wrap s-items-center sm:s-space-x-5">
      <CustomBox
        v-for="(bed, index) in beds"
        :key="index"
        v-model="bedSelected"
        :name="index"
        :val="bed"
      >
        {{ bed }}{{ bed == 4 ? '+' : '' }} bedroom
      </CustomBox>
    </div>
  </div>
</template>

<script>
import CustomBox from '../../form/CustomBox.vue'
export default {
  props: {
    dashboardFilter: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      beds: [1, 2, 3, 4],
      bedSelected: [],
    }
  },
  watch: {
    bedSelected(value) {
      this.$emit('filterBed', value)
    },
  },
  methods: {
    clear() {
      this.bedSelected = []
    },
  },
  components: { CustomBox },
}
</script>

<style></style>
