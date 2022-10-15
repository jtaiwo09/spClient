<template>
  <div class="s-mb-5 sm:s-mb-6">
    <label
      class="s-leading-[0.938rem] s-font-bold s-text-[#242428] s-text-xs s-ml-2 s-mb-2 s-block s-uppercase"
      for=""
      >{{ label }}</label
    >
    <div
      class="s-relative s-flex s-items-center s-text-gray-400 focus-within:s-text-gray-600"
    >
      <component
        :is="icon"
        class="s-absolute s-left-6"
        :fill="fill"
        :stroke="icon !== 'LockIcon' && iconStroke"
      />
      <input
        v-model.lazy="value"
        name="name"
        required
        class="s-pr-3 s-py-3.5 s-pl-[1.375rem] s-font-normal s-placeholder-[#8F8FB1] s-text-[#000] s-text-sm s-rounded-full s-border-none s-ring-1 s-ring-[#99A4E1] focus:s-bg-[#F1F3FF] focus:s-ring-primary-blue focus:s-ring-2 s-bg-[#FAFAFE] s-w-full focus:s-outline-none"
        :class="[
          {
            's-border-none s-ring-0 s-bg-[#f4f6ff] s-cursor-not-allowed':
              disabled,
          },
          {
            's-ring-[#EA4335] focus:s-ring-[#EA4335] !s-pr-12':
              error !== null && error.$error,
          },
          {
            '!s-pl-14': icon !== '',
          },
        ]"
        :placeholder="placeholder"
        autocomplete="off"
        :type="type"
        :icon="icon"
        :disabled="disabled"
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
  </div>
</template>

<script>
export default {
  props: {
    name: {
      type: String,
      default: '',
    },
    disabled: {
      type: Boolean,
      default: false,
    },
    icon: {
      type: String,
      default: '',
    },
    placeholder: {
      type: String,
      default: '',
    },
    type: {
      type: String,
      default: 'text',
    },
    label: {
      type: String,
      default: '',
    },
    error: {
      type: Object,
      default: null,
    },
    modelValue: {
      type: String,
      default: '',
    },
    validationMsg: {
      type: String,
      default: '',
    },
  },
  emits: ['update:modelValue'],
  data() {
    return {
      currentRoute: this.$route.path,
    }
  },
  computed: {
    iconStroke() {
      if (this.disabled) {
        return '#B1B7D6'
      } else if (this.error && this.error.$error) {
        return '#B1B7D6'
      } else {
        return '#130F26'
      }
    },
    fill() {
      if (this.icon === 'LockIcon' && this.error && !this.error.$error) {
        return '#130F26'
      }
      if (this.icon === 'LockIcon' && !this.error) {
        return '#130F26'
      }
      if (this.icon === 'LockIcon' && this.error && this.error) {
        return '#B1B7D6'
      } else {
        return 'none'
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
