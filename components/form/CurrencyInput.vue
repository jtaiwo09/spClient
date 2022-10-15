<template>
  <div class="s-mb-6">
    <label
      v-if="label"
      class="s-text-[#222228] s-text-sm s-font-semibold s-block s-mb-3"
      >{{ label }}</label
    >
    <cleave
      v-model="value"
      :placeholder="placeholder"
      class="s-pr-3 s-py-3.5 s-pl-[1.375rem] s-font-normal s-placeholder-[#8F8FB1] s-text-[#000] s-text-sm s-rounded-full s-border-none s-ring-1 s-ring-[#99A4E1] focus:s-bg-[#F1F3FF] focus:s-ring-primary-blue focus:s-ring-2 s-bg-[#FAFAFE] s-w-full focus:s-outline-none"
      :options="inputType"
    ></cleave>
    <span
      class="s-text-xs s-text-[#EA4335] s-block s-mt-1 s-ml-2 s-font-normal s-leading-4"
      >{{ validationMsg }}</span
    >
  </div>
</template>

<script>
export default {
  props: {
    modelValue: {
      type: [String, Number],
      default: '',
    },
    label: {
      type: String,
      default: '',
    },
    placeholder: {
      type: String,
      default: '',
    },
    validationMsg: {
      type: String,
      default: '',
    },
  },
  data() {
    return {
      country: 'Nigeria',
      monthlyEntire: '',
    }
  },
  computed: {
    inputType() {
      return {
        prefix:
          this.country === 'Nigeria'
            ? '₦ '
            : this.country === 'Ghana'
            ? 'GH₵ '
            : '₦ ',
        numeral: true,
        numeralPositiveOnly: true,
        noImmediatePrefix: true,
        rawValueTrimPrefix: true,
        numeralIntegerScale: 9,
        numeralDecimalScale: 2,
      }
    },
    value: {
      get() {
        return this.modelValue
      },
      set(inputValue) {
        this.$emit('update:modelValue', inputValue)
      },
    },
  },
}
</script>

<style></style>
