<template>
  <div v-on-clickaway="away" class="country sm:!s-mb-0 sm:s-w-[48%] s-relative">
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
      <p v-if="selectedState" class="!s-text-[24px] s-mr-3">
        {{ selectedState.flag }}
      </p>
      <span class="s-flex-1 s-py-3.5" @click="isShowing = !isShowing">
        {{ stateName }}
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
          v-for="(list, i) in stateList"
          :key="i"
          class="s-text-sm s-px-4 hover:s-bg-[#f1f1f1] s-py-2 s-cursor-pointer"
          @click="setState(list)"
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
import { State } from 'country-state-city'
export default {
  mixins: [clickaway],
  props: {
    label: {
      type: String,
      default: 'State',
    },
    error: {
      type: Object,
      default: null,
    },
    validationMsg: {
      type: String,
      default: '',
    },
    countryCode: {
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
      stateList: [],
      selectedState: null,
      isShowing: false,
    }
  },
  computed: {
    stateName() {
      if (!this.value) {
        return 'Please select a state'
      } else {
        return this.stateList.find((el) => el.name === this.value)?.name
      }
    },
  },
  watch: {
    countryCode: {
      handler(value) {
        this.stateList = State.getStatesOfCountry(value)
      },
      immediate: true,
    },
    value: {
      handler(newValue) {
        if (newValue) {
          const value = this.stateList.find((el) => el.name === this.value)
          this.selectedState = value
          // this.$emit('updateState', value)
        }
      },
      immediate: true,
    },
  },

  methods: {
    setState(value) {
      this.selectedState = value
      this.isShowing = false
      this.$emit('updateState', value)
    },
    away() {
      this.isShowing = false
    },
  },
}
</script>

<style lang="scss"></style>
