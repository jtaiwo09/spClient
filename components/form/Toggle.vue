<template>
  <div>
    <label
      :for="toggleName"
      class="s-flex s-relative s-items-center s-cursor-pointer"
    >
      <div class="s-relative">
        <input
          :id="toggleName"
          v-model="setIsToggled"
          type="checkbox"
          :disabled="disabled"
          class="s-sr-only"
          @click="toggleCheckbox"
        />
        <div
          class="so s-block s-bg-[#D9D9D9] s-w-14 s-h-8 s-rounded-full"
        ></div>
        <div
          class="dot s-absolute s-left-1 s-top-1 s-bg-white s-w-6 s-h-6 s-rounded-full s-transition"
        ></div>
      </div>
      <span v-if="showText" class="s-ml-3 s-text-sm s-font-normal">
        {{ isChecked === null ? setIsToggleText : checkStatus }}
      </span>
    </label>
  </div>
</template>

<script>
export default {
  props: {
    showText: {
      type: Boolean,
      default: true,
    },
    toggleName: {
      type: String,
      default: '',
    },
    disabled: {
      type: Boolean,
      default: false,
    },
    isToggled: {
      type: Boolean,
      default: false,
    },
    isChecked: {
      type: Boolean,
      default: null,
    },
  },
  data() {
    return {
      status: '',
    }
  },
  computed: {
    setIsToggled: {
      get() {
        return this.isToggled
      },
      set(value) {
        this.$emit('setCheckboxVal', value)
      },
    },
    checkStatus() {
      switch (this.isChecked) {
        case true:
          return 'Online'
        case false:
          return 'Offline'
        default:
          return null
      }
    },
    setIsToggleText() {
      if (this.isToggled) return 'Online'
      else return 'Offline'
    },
  },
  methods: {
    toggleCheckbox() {
      if (this.isToggled) {
        this.status = 'available'
      } else {
        this.status = 'unavailable'
      }
    },
  },
}
</script>

<style lang="scss" scoped>
input:checked ~ .dot {
  transform: translateX(100%);
}
input:checked ~ .so {
  background-color: #3ddc97;
}
</style>
