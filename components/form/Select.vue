<template>
  <div
    v-on-clickaway="away"
    class="s-relative s-mb-5 sm:s-mb-6 s-w-full"
    :class="[
      {
        '!s-mb-0': noMarginBottom,
      },
    ]"
  >
    <label
      class="s-leading-[0.938rem] s-font-bold s-text-[#242428] s-text-xs s-ml-2 s-mb-2 s-block s-uppercase"
      for=""
      >{{ label }}</label
    >
    <div
      class="s-overflow-auto s-w-full s-py-3.5 s-px-4 s-rounded-full s-bg-[#FAFAFE] s-border s-border-solid s-border-[#99A4E1] s-flex s-justify-between s-items-center s-cursor-pointer"
      :class="[
        {
          's-bg-[#FAFAFE]': value !== '',
        },
        {
          '!s-border-[#EA4335] focus:!s-border-[#EA4335]':
            error !== null && error.$error,
        },
        {
          's-bg-[#F4F6FF] s-border-0 s-cursor-not-allowed': disabled,
        },
        {
          '!s-pl-14': icon !== '',
        },
      ]"
      @click="dropdown = !dropdown"
    >
      <component :is="icon" class="s-absolute s-left-6" />
      <span
        class="s-text-sm s-block s-whitespace-nowrap s-mr-1"
        :class="[{ disabled: disabled }]"
        >{{
          !value && !selectedOption
            ? defaultText
            : value !== '' && selectedOption
            ? selectedOption
            : value !== '' && !selectedOption
            ? selectedOptionText
            : selectedOption
        }}</span
      >

      <ChevronDownIcon :stroke="disabled && 'rgba(15, 12, 61, 0.4)'" />
    </div>
    <div
      v-show="dropdown && !disabled"
      class="shadow s-w-full s-max-h-[10rem] s-mt-0.5 s-rounded-[0.625rem] s-border s-border-solid s-border-[#99A4E1] s-bg-[#fff] s-overflow-auto s-absolute s-z-10"
    >
      <ul class="s-w-full s-bg-[#fff]">
        <li
          v-for="(option, i) in options"
          :key="i"
          class="list-item s-text-sm s-font-semibold s-text-[#0F0C3D] s-flex s-justify-between s-items-center s-px-3 s-py-3 s-cursor-pointer"
          @click="handleSelect(option)"
        >
          {{ option.name ? option.name : option.text }}
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
export default {
  mixins: [clickaway],
  props: {
    value: {
      type: undefined,
      default: '',
    },
    options: {
      type: Array,
      default: () => [],
    },
    disabled: {
      type: Boolean,
      default: false,
    },
    icon: {
      type: String,
      default: '',
    },
    label: {
      type: String,
      default: '',
    },
    error: {
      type: Object,
      default: null,
    },
    validationMsg: {
      type: String,
      default: '',
    },
    defaultText: {
      type: String,
      default: 'Select an option',
    },
    noMarginBottom: {
      type: Boolean,
      default: false,
    },
    bank: {
      type: Boolean,
      default: false,
    },
  },
  emits: ['update'],
  data() {
    return {
      dropdown: false,
      selectedOption: null,
    }
  },
  computed: {
    iconStroke() {
      if (this.disabled) {
        return '#B1B7D6'
      } else if (this.error) {
        return '#B1B7D6'
      } else {
        return '#130F26'
      }
    },
    fill() {
      if (this.icon === 'LockIcon' && !this.error) {
        return '#130F26'
      }
      if ((this.icon === 'LockIcon' && this.error) || this.disabled) {
        return '#B1B7D6'
      } else {
        return 'none'
      }
    },
    selectedOptionText() {
      if (!this.bank) {
        const value = this.options.find(
          (el) => el.value === this.selectedOption || el.value === this.value
        )
        return value?.text
      } else {
        const value = this.options.find(
          (el) => el.name === this.selectedOption || el.name === this.value
        )
        return value?.name
      }
    },
  },
  watch: {
    value() {
      if (!this.value) {
        this.selectedOption = null
      }
    },
  },
  methods: {
    handleSelect(option) {
      this.selectedOption = option.name ? option.name : option.text
      this.$emit('update', option.value)
      this.$emit('select', option)
      this.dropdown = false
    },
    away() {
      this.dropdown = false
    },
  },
}
</script>

<style lang="scss" scoped>
.list-item {
  border-bottom: 1px solid rgba(177, 183, 214, 0.19);
}
.shadow {
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.05);
}
.disabled {
  color: rgba(15, 12, 61, 0.4) !important;
}
</style>
