<template>
  <p-check
    v-model.lazy="checked"
    class="s-m-0 s-relative s-inline-block s-whitespace-nowrap"
    :name="name"
    :disabled="disabled"
  >
    <TickWhiteIcon width="11" height="8" :class="'svg'" />
    {{ label | capitalize }}
  </p-check>
</template>

<script>
export default {
  props: {
    value: {
      type: Boolean,
      default: false,
    },
    modelValue: {
      type: Boolean,
      default: false,
    },
    disabled: {
      type: Boolean,
      default: false,
    },
    label: {
      type: String,
      default: '',
    },
    name: {
      type: String,
      default: '',
    },
  },
  emits: ['update:modelValue'],
  data() {
    return {
      checked: false,
    }
  },
  watch: {
    value: {
      handler(val) {
        this.checked = val
      },
      immediate: true,
    },
  },
}
</script>

<style lang="scss">
.pretty {
  position: relative;
  display: inline-block;
  line-height: 1;
  box-sizing: border-box;
  font-size: 14px;

  input {
    position: absolute;
    left: 0;
    top: 0;
    min-width: 1em;
    width: 100%;
    height: 100%;
    z-index: 2;
    margin: 0;
    padding: 0;
    cursor: pointer;
    opacity: 0;
  }
  .state {
    .svg {
      opacity: 0;
      position: absolute;
      font-size: 1em;
      width: 15px;
      height: 12px;
      left: 3.5px;
      z-index: 1;
      text-align: center;
      line-height: normal;
      top: 1px;
      border: 1px solid transparent;
    }

    label {
      position: initial;
      display: inline-block;
      font-weight: normal;
      margin: 0;
      text-indent: 2.5em;

      &:before {
        content: '';
        width: 23px;
        height: 23px;
        display: block;
        box-sizing: border-box;
        border: 1px solid transparent;
        z-index: 0;
        position: absolute;
        left: 0;
        top: -5px;
        background-color: transparent !important;
      }
      &:after {
        content: '';
        width: 23px;
        height: 23px;
        display: block;
        box-sizing: border-box;
        border-radius: 20%;
        border: 1px solid transparent;
        z-index: 0;
        position: absolute;
        left: 0;
        top: -5px;
        background-color: transparent;
      }
    }
  }
}
.pretty input:checked ~ .state .svg {
  opacity: 1;
}

.pretty input:checked ~ .state label:after {
  background-color: #2e48da;
}

.pretty input:not(:checked) ~ .state label:after {
  background-color: transparent;
}

.pretty input:not(:checked) ~ .state label:before {
  border-color: #b1b7d6;
  border-radius: 20%;
  border-width: 1px;
}
.pretty input:disabled ~ .state label {
  opacity: 0.5;
}
</style>
