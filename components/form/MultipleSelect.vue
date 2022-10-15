<template>
  <div class="s-relative">
    <div v-on-clickaway="away" class="s-relative">
      <div
        class="s-w-full s-py-3.5 s-px-4 s-rounded-full s-bg-[#FAFAFE] s-border s-border-solid s-border-[#99A4E1] s-flex s-justify-between s-items-center s-cursor-pointer"
        :class="[
          {
            's-bg-[#FAFAFE]': value.length > 0,
          },
          {
            '!s-border-[#EA4335] focus:!s-border-[#EA4335]':
              error !== null && error.$error,
          },
        ]"
        @click="dropdown = !dropdown"
      >
        <span class="s-text-sm s-block">{{
          value.length === 0
            ? 'Select options'
            : `${value.length} option(s) selected`
        }}</span>
        <ChevronDownIcon />
      </div>

      <div
        v-show="dropdown"
        class="shadow s-w-full s-h-[10rem] s-mt-0.5 s-rounded-[0.625rem] s-border s-border-solid s-border-[#B1B7D6] s-bg-[#fff] s-overflow-auto s-absolute s-z-10"
      >
        <ul class="s-w-full s-bg-[#fff]">
          <li
            v-for="(option, i) in options"
            :key="i"
            class="list-item s-text-sm s-font-semibold s-text-[#0F0C3D] s-flex s-justify-between s-items-center s-px-3 s-py-3 s-cursor-pointer"
            @click.self="add(option)"
          >
            {{ option.name }}
          </li>
        </ul>
      </div>
      <span
        class="s-text-xs s-text-[#EA4335] s-block s-mt-1 s-ml-2 s-font-normal s-leading-4"
        >{{ validationMsg }}</span
      >
    </div>

    <ul class="s-w-full s-bg-[#fff]">
      <li
        v-for="(option, i) in value"
        :key="i"
        class="list-item s-text-sm s-font-semibold s-text-[#0F0C3D] s-flex s-justify-between s-items-center s-px-3 s-py-3"
      >
        {{ option.name }}
        <div class="s-w-4 s-h-4" @click="remove(option)">
          <CloseIcon
            fill="#000"
            :width="11"
            :height="11"
            :class="'s-cursor-pointer'"
          />
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
import { mixin as clickaway } from 'vue-clickaway'
export default {
  mixins: [clickaway],
  props: {
    options: {
      type: Array,
      default: () => [],
    },
    selectedValue: {
      type: Array,
      default: () => [],
    },
    error: {
      type: Object,
      default: null,
    },
    validationMsg: {
      type: String,
      default: '',
    },
  },
  data() {
    return {
      value: [],
      dropdown: false,
    }
  },
  watch: {
    selectedValue: {
      handler() {
        this.value = this.selectedValue
      },
      immediate: true,
    },
  },
  methods: {
    away() {
      this.dropdown = false
    },
    remove(v) {
      if (this.value.length > 0 && this.value.some((obj) => obj.id === v.id)) {
        const index = this.value.findIndex((object) => {
          return object.id === v.id
        })
        // const index = this.value.indexOf(v)
        this.value.splice(index, 1)
        this.$emit('update', this.value)
      }
    },
    add(v) {
      const index = this.value.findIndex((object) => object.id === v.id)
      if (index === -1) {
        this.value.push(v)

        if (v.name === 'None') {
          this.value = this.value.filter((el) => el.name === 'None')
        } else {
          this.value = this.value.filter((el) => el.name !== 'None')
        }
      }
      this.$emit('update', this.value)
    },
  },
}
</script>

<style lang="scss" scoped>
.list-item {
  border-bottom: 1px solid rgba(177, 183, 214, 0.19);
  &:last-child {
    border-bottom: none;
  }
}
.shadow {
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.05);
}
</style>
