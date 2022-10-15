<template>
  <div class="s-mb-5">
    <v-date-picker
      :value="modelValue"
      mode="date"
      :min-date="minDate"
      :max-date="maxDate"
      :masks="masks"
      is-required
      @input="handleChange"
    >
      <template #default="{ inputValue, togglePopover }">
        <label
          v-if="label"
          class="s-leading-[0.938rem] s-font-bold s-text-[#242428] s-text-xs s-ml-1 s-mb-2 s-block s-uppercase"
          for=""
          >{{ label }}</label
        >
        <div
          class="s-relative s-flex s-items-center s-text-gray-400 focus-within:s-text-gray-600"
        >
          <CalendarIcon :class="'s-absolute s-left-6'" />
          <input
            :disabled="disabled"
            class="s-pr-14 s-pl-14 disabled:s-cursor-not-allowed s-py-3.5 s-font-normal s-placeholder-[#8F8FB1] s-text-[#000] s-text-sm s-rounded-full s-border-none s-ring-1 s-ring-[#99A4E1] focus:s-bg-[#F1F3FF] focus:s-ring-primary-blue focus:s-ring-2 s-bg-[#FAFAFE] s-w-full focus:s-outline-none"
            :class="[
              {
                's-border-none s-ring-0 s-bg-[#f4f6ff] s-cursor-pointer':
                  disabled,
              },
              {
                's-ring-[#EA4335] focus:s-ring-[#EA4335]':
                  error !== null && error.$error,
              },
            ]"
            :value="inputValue"
            placeholder=" DD / MM / YYYY"
            @click="togglePopover()"
          />
          <component
            :is="'ErrorIcon'"
            v-if="error !== null && error.$error"
            class="s-absolute s-right-5"
            :stroke="'#EA4335'"
          />
        </div>
        <span
          class="s-text-xs s-text-[#EA4335] s-block s-mt-1 s-ml-2 s-font-normal s-leading-4"
          >{{ validationMsg }}</span
        >
      </template>
    </v-date-picker>
  </div>
</template>
<script>
export default {
  props: {
    error: {
      type: Object,
      default: null,
    },
    modelValue: {
      type: [Date, String],
      default: '',
    },
    label: {
      type: String,
      default: '',
    },
    disabled: {
      type: Boolean,
      default: false,
    },
    validationMsg: {
      type: String,
      default: '',
    },
    maxDate: {
      type: Number,
      default: null,
    },
    minDate: {
      type: [Date],
      default: null,
    },
  },
  data() {
    return {
      date: null,
      masks: {
        input: 'DD / MMM / YYYY',
      },
    }
  },
  computed: {},
  methods: {
    handleChange(value) {
      this.$emit('update:modelValue', value)
    },
  },
}
</script>
