<template>
  <div
    v-on-clickaway="away"
    class="country s-mb-[24px] sm:s-w-[48%] s-relative"
  >
    <label
      for=""
      class="s-leading-[0.938rem] s-font-bold s-text-[#242428] s-text-xs s-ml-2 s-mb-2 s-block s-uppercase"
      >{{ label }}
    </label>
    <div
      class="s-flex s-items-center s-w-full s-text-sm s-font-normal s-left-12 s-top-[14px] s-cursor-pointer s-px-6 s-rounded-full s-border s-border-[#99a4e1] s-border-solid"
      :class="{
        's-border-[#EA4335] focus:s-border-[#EA4335]':
          error !== null && error.$error,
      }"
    >
      <p v-if="selectedCountry" class="!s-text-[24px] s-mr-3">
        {{ countryFlag }}
      </p>
      <span
        class="hide_scrollbar s-flex-1 s-py-3.5 s-whitespace-nowrap s-overflow-x-auto"
        @click="isShowing = !isShowing"
      >
        {{ countryName }}
      </span>
      <div @click="isShowing = !isShowing">
        <ChevronDownIcon />
      </div>
    </div>
    <div
      v-if="isShowing"
      class="s-absolute s-mb-3 s-mt-1 s-w-full s-h-[180px] s-overflow-auto s-bg-[#fff] s-z-10 s-rounded-xl s-ring-1 s-ring-[#99a4e1] s-shadow-lg"
    >
      <ul class="s-overflow-scroll s-w-full">
        <li
          v-for="(list, i) in countryList"
          :key="i"
          class="s-text-sm s-px-4 hover:s-bg-[#f1f1f1] s-py-2 s-cursor-pointer"
          @click="setCountry(list)"
        >
          {{ list.name }}
        </li>
      </ul>
    </div>
    <span
      class="s-text-xs s-text-[#EA4335] s-block s-mt-1 s-ml-2 s-font-normal s-leading-4"
      >{{ validationMsg }}</span
    >
  </div>
</template>

<script>
import { mixin as clickaway } from 'vue-clickaway'
import { Country } from 'country-state-city'
export default {
  mixins: [clickaway],
  props: {
    label: {
      type: String,
      default: 'Country',
    },
    error: {
      type: Object,
      default: null,
    },
    validationMsg: {
      type: String,
      default: '',
    },
    value: {
      type: String,
      default: '',
    },
  },
  data() {
    return {
      countryList: [],
      countryCode: '',
      selectedCountry: {},
      isShowing: false,
    }
  },
  computed: {
    countryName() {
      if (!this.value) {
        return 'Please select a country'
      } else {
        return this.countryList.find((el) => el.isoCode === this.value)?.name
      }
    },
    countryFlag() {
      if (!this.value) {
        return this.countryCode
      } else {
        return this.countryList.find((el) => el.isoCode === this.value)?.flag
      }
    },
  },
  watch: {
    countryList(newValue) {
      if (newValue) {
        const value = this.countryList.find((el) => el.isoCode === this.value)
        this.$emit('updateCountry', value)
      }
    },
  },
  mounted() {
    this.countryList = Country.getAllCountries()
  },
  methods: {
    setCountry(value) {
      this.selectedCountry = value
      this.isShowing = false
      this.$emit('updateCountry', value)
    },
    away() {
      this.isShowing = false
    },
  },
}
</script>

<style lang="scss">
.hide_scrollbar::-webkit-scrollbar {
  display: none;
}
.hide_scrollbar {
  -ms-overflow-style: none; /* IE and Edge */
  scrollbar-width: none; /* Firefox */
}
</style>
