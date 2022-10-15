<template>
  <div>
    <label
      for="furnishing"
      class="sm:s-text-[#3B3A4A] s-text-white sm:s-text-sm s-text-xs s-uppercase s-mb-5 s-font-bold s-block"
      :class="{ '!s-text-[#3B3A4A]': dashboardFilter }"
      >FURNISHING</label
    >
    <div class="s-flex s-flex-wrap s-items-center sm:s-space-x-7">

      <CustomBox
        v-model="furnishing"
        label="furnishing"
        name="furnishing"
        :val="true"
        type="radio"
      >
      Furnished
      </CustomBox>

      <CustomBox
        v-model="furnishing"
        label="unfurnishing"
        name="furnishing"
        :val="false"
        type="radio"
      >
      Unfurnished
      </CustomBox>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    dashboardFilter: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      furnishing: '',
    }
  },
  watch: {
    furnishing(value) {
      this.$emit('furnish', value)
    },
  },
  methods: {
    clear() {
      this.furnishing = ''
    },
  },
}
</script>

<style lang="scss">
.form {
  &__radio {
    font-size: 14px;
    color: rgba(0, 0, 0, 0.8);
    margin-bottom: 10px;
    display: block;

    &.pretty .state label {
      &::before {
        border-color: #d1d5db !important;
        border-width: 1px;
        width: 16px;
        height: 16px;
        border-radius: 100% !important;
        top: unset;
      }
      &::after {
        width: 16px;
        height: 16px;
        border-radius: 100% !important;
        top: 0;
      }
    }

    &.pretty input:checked ~ .state label:after,
    .pretty.p-toggle .state label:after {
      background-color: #2e48da !important;
    }

    &.pretty.p-default .state label:after {
      transform: scale(0.5);
    }

    &.pretty .state .svg {
      bottom: 6px;
      left: 1px;
      top: unset;
    }
  }
}
</style>
