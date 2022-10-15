<template>
  <div class="s-w-full s-mb-6">
    <label
      for=""
      class="s-leading-[0.938rem] s-font-bold s-text-[#242428] s-text-xs s-ml-2 s-mb-2 s-block s-uppercase"
      >{{ label }}
    </label>
    <vue-phone-number-input
      ref="phoneInput"
      v-model="value"
      :required="true"
      :no-example="true"
      :default-country-code="countryCode"
      :error="true"
      @update="handleUpdate"
    />

    <span
      v-if="!isValid"
      class="s-text-xs s-text-[#EA4335] s-block s-mt-1 s-ml-2 s-font-normal s-leading-4"
      >{{ label }} is not valid</span
    >
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
      type: String,
      default: '',
    },
    label: {
      type: String,
      default: 'Phone number',
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
  },
  data() {
    return {
      isValid: true,
    }
  },
  computed: {
    value: {
      get() {
        return this.modelValue
      },
      set(value) {
        this.$emit('update:modelValue', value)
      },
    },
  },
  watch: {
    modelValue() {
      if (!this.modelValue) {
        this.isValid = true
      }
    },
  },
  methods: {
    handleUpdate(value) {
      this.$emit('updatePhone', value)
      if (value.isValid) {
        this.isValid = true
      } else {
        this.isValid = false
      }
    },
  },
}
</script>

<style lang="scss">
.vue-phone-number-input {
  width: 100%;
  .select-country-container {
    margin-right: 9px;
    border-radius: 40px !important;
    border: 1px solid #99a4e1;
    display: flex;
    align-items: center;
    padding: 0px 15px;
    min-height: 48px;
    background-color: #fafafe;
    &:focus-within {
      background-color: #f1f3ff;
      border: 2px solid #2e48da;
    }

    .country-selector {
      display: flex;
      align-items: center;
      input {
        max-height: initial !important;
        height: initial;
        padding: 0 !important;
        margin: 0;
        border: none;
        box-shadow: none !important;
        color: #0f0c3d;
        font-size: 14px;
        font-weight: 400;
        background-color: transparent;
        &:focus {
          outline: none !important;
          border: none !important;
          box-shadow: none !important;
        }
      }
      .country-selector__toggle {
        .country-selector__toggle__arrow {
          width: 18px;
        }
      }

      label {
        display: none;
      }
      .country-selector__country-flag {
        position: relative;
        top: 0;
        left: 0;
        margin-right: 8px;

        .iti-flag-small {
          width: 21px;
          object-fit: cover !important;
        }
      }
      .country-selector__list {
        margin-top: 12px;
      }
    }
  }
  .input-tel {
    border-radius: 40px !important;
    border: 1px solid #99a4e1;
    padding: 10px 20px;
    overflow: hidden;
    min-height: 48px !important;
    height: initial;
    background-color: #fafafe;
    &:focus-within {
      background-color: #f1f3ff;
      border: 2px solid #2e48da;
    }

    input {
      border: none;
      padding: 0 !important;
      min-height: initial;
      height: initial;
      color: #0f0c3d;
      font-size: 14px;
      font-weight: 400;
      background-color: transparent;
      &:focus {
        box-shadow: none !important;
        outline: none;
      }
      &::placeholder {
        color: #8f8fb1;
      }
    }
    label {
      display: none;
    }
  }
}
</style>
