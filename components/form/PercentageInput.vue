<template>
  <div>
    <div>
      <label
        class="s-text-[#222228] s-text-sm s-font-semibold s-block s-mb-3"
        >{{ label }}</label
      >
      <input-facade
        v-model="value"
        :placeholder="placeholder"
        :formatter="formatInputValue"
        masked
        class="s-pr-3 s-py-3.5 s-pl-[1.375rem] s-font-normal s-placeholder-[#8F8FB1] s-text-[#000] s-text-sm s-rounded-full s-border-none s-ring-1 s-ring-[#99A4E1] focus:s-bg-[#F1F3FF] focus:s-ring-primary-blue focus:s-ring-2 s-bg-[#FAFAFE] s-w-full focus:s-outline-none"
      />
    </div>
    <span
      class="s-text-xs s-text-[#EA4335] s-block s-mt-1 s-ml-2 s-font-normal s-leading-4"
      >{{ validationMsg }}</span
    >
  </div>
</template>

<script>
export default {
  name: 'CurrencyInput',
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
    type: {
      type: String,
      default: '',
    },
    validationMsg: {
      type: String,
      default: '',
    },
  },
  computed: {
    value: {
      get() {
        return this.modelValue
      },
      set(inputValue) {
        this.$emit('update:modelValue', inputValue)
      },
    },
  },

  methods: {
    formatInputValue(value) {
      if (value.unmasked) {
        value.masked = `${value.masked}%`
        return true
      }
    },
  },
}
</script>

<style></style>
