<template>
  <div class="s-relative">
    <div
      class="s-h-[74px] s-bg-[#1F1F1F] s-border s-border-solid s-border-[#454545]/[0.3] s-rounded-xl md-s:s-px-5 s-px-3 s-py-3.5 s-min-w-[220px]"
      :class="{ '!s-bg-white': dashboardFilter }"
    >
      <label
        for="search"
        class="s-text-[#7C7E8B] s-text-[0.625rem] s-block s-mb-2 s-uppercase"
        >{{ title }}</label
      >
      <div
        class="s-flex s-justify-between s-items-center s-cursor-pointer"
        @click="toggleDropdown"
      >
        <span class="s-text-[#bbbbbb]/[0.8] s-text-sm">{{ placeholder }}</span>
        <svg
          class="s-w-5"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 20 20"
          :fill="`${dashboardFilter ? '#000' : '#fff'}`"
          aria-hidden="true"
        >
          <path
            fill-rule="evenodd"
            d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
            clip-rule="evenodd"
          />
        </svg>
      </div>
      <div
        v-if="showDropdown"
        v-on-clickaway="away"
        class="s-bg-[#282828] s-rounded-b-[10px] s-px-3.5 s-pt-6 s-pb-4 s-w-full s-mx-auto s-mt-4 s-relative s-z-20"
        :class="{ '!s-bg-white': dashboardFilter }"
      >
        <slot />
      </div>
    </div>
  </div>
</template>

<script>
import { mixin as clickaway } from 'vue-clickaway'
export default {
  mixins: [clickaway],
  props: {
    title: {
      type: String,
      default: '',
    },
    placeholder: {
      type: String,
      default: '',
    },
    showDropdown: {
      type: Boolean,
      default: false,
    },
    dashboardFilter: {
      type: Boolean,
      default: false,
    },
  },
  methods: {
    toggleDropdown() {
      if (this.showDropdown) {
        this.$emit('closeDropDown', false)
      } else {
        this.$emit('closeDropDown', true)
      }
    },
    away() {
      this.$emit('closeDropDown', false)
    },
  },
}
</script>

<style></style>
