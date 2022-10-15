<template>
  <div class="s-bg-white" :class="scrollTab && 's-overflow-scroll'">
    <div
      class="s-border-[#E3EBF6] s-rounded-t-xl s-bg-[#fff] s-border s-border-solid s-border-x-[#fff] s-border-t-[#fff]"
    >
      <div class="s-flex s-justify-between s-ml-[14px] s-mr-[29px]">
        <slot />
        <div
          class="s-flex s-self-center"
          :class="toggleRequestBtn ? 's-hidden' : 's-block'"
        >
          <button @click="toggleRequestBtn = true">
            <Search class="s-self-center" />
          </button>
          <button
            v-if="showBtn"
            class="s-ml-[30px] s-bg-primary-blue s-rounded-full s-text-sm s-font-bold s-py-[11px] s-px-10 s-text-[#fff] s-whitespace-nowrap"
            @click="$emit('btnAction')"
          >
            {{ btnText }}
          </button>
        </div>
      </div>
    </div>
    <div v-if="toggleRequestBtn" class="s-mt-5 s-mx-5">
      <div class="sm:s-flex-row s-flex s-items-center s-flex-col">
        <div class="s-relative s-w-full">
          <div
            class="s-flex s-items-center s-absolute s-inset-y-0 s-left-0 s-pl-3 s-pointer-events-none"
          >
            <Search class="s-absolute s-left-6" />
          </div>
          <input
            v-model="searchData"
            type="search"
            class="s-pl-14 s-pr-[140px] s-w-full s-px-4 s-h-12 s-rounded-full s-border-[#99A4E1] s-border-solid s-border s-bg-[#FAFAFE] focus:s-outline-none placeholder:s-text-sm s-text-sm"
            :placeholder="placeholder"
          />
          <div v-if="showBtn" :class="!loading && 's-mt-[1px]'">
            <Button
              :loading="!loading"
              :text="'Search'"
              class="s-text-white s-absolute s-right-[5px] s-bottom-[3px] s-bg-blue-700 s-rounded-full s-text-sm s-px-10 s-py-[11px] s-font-bold"
              @submit="$emit('searchData')"
            />
          </div>
        </div>
        <button
          v-if="showBtn"
          class="s-outline-primary-blue s-outline s-outline-2 s-ml-1 s-rounded-full s-text-sm s-font-bold s-py-[11px] s-min-w-[174px] s-text-primary-blue"
          @click="$emit('btnAction')"
        >
          {{ btnText }}
        </button>
      </div>
      <button
        class="s-text-primary-blue s-text-xs s-leading-6 s-underline s-ml-[14px]"
        @click="collapseBtn"
      >
        collapse
      </button>
    </div>
  </div>
</template>

<script>
import Search from '~/components/icons/Search.vue'
export default {
  components: {
    Search,
  },
  props: {
    tabs: {
      type: Array,
      default: () => [],
    },
    openTab: {
      type: Number,
      default: 1,
    },
    loading: {
      type: Boolean,
      default: true,
    },
    btnText: {
      type: String,
      default: '',
    },
    scrollTab: {
      type: Boolean,
      default: true,
    },
    showBtn: {
      type: Boolean,
      default: true,
    },
    placeholder: {
      type: String,
      default: 'Search for tenant',
    },
  },
  data() {
    return {
      toggleRequestBtn: false,
      searchData: '',
    }
  },
  watch: {
    searchData() {
      this.$emit('customInput', this.searchData)
    },
  },
  methods: {
    collapseBtn() {
      this.toggleRequestBtn = false
      this.searchData = ''
    },
  },
}
</script>

<style lang="scss" scoped></style>
