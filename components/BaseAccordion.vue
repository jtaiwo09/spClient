<template>
  <div
    class="s-w-full s-border-b s-border-solid s-border-[#E5E6EC] s-pb-5 s-mb-9 s-duration-150 s-ease-in-out s-transition-[height]"
  >
    <button
      class="s-flex s-items-center s-justify-between s-w-full"
      :aria-expanded="isOpen"
      :aria-controls="`collapse${_uid}`"
      @click="toggleAccordion()"
    >
      <slot
        name="title"
        :_class="[isOpen ? 's-text-primary-blue' : 's-text-black']"
      />

      <div
        class="s-rounded-full s-w-11 s-h-11 s-bg-[#E6E9FB] s-relative s-flex-shrink-0"
      >
        <ChevronDownIcon
          width="12px"
          height="8px"
          stroke="#111827"
          class="s-absolute s-inset-0 s-m-auto s-duration-150"
          :class="[isOpen ? 's-rotate-180' : 's-rotate-0']"
        />
      </div>
    </button>
    <transition name="accordion">
      <div
        v-show="isOpen"
        :id="`collapse${_uid}`"
        class="s-duration-150 s-ease-in-out s-mt-9 s-transition-[height]"
      >
        <slot name="content" />
      </div>
    </transition>
  </div>
</template>

<script>
export default {
  data() {
    return {
      isOpen: false,
    }
  },
  methods: {
    toggleAccordion() {
      this.isOpen = !this.isOpen
    },
  },
}
</script>

<style lang="scss" scoped></style>
