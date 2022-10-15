<template>
  <FilterDropdown
    title="Price"
    placeholder="Select Price Range"
    :show-dropdown="showDropdown"
    :dashboard-filter="dashboardFilter"
    @closeDropDown="closeDropDown"
  >
    <div class="md-x:s-w-[280px] s-w-full s-pt-6">
      <vue-slider
        v-model="priceSelected"
        dot-size="21"
        :dot-options="dotOptions"
        :height="2"
        :min="minPrice"
        :max="maxPrice"
        tooltip="always"
        :rail-style="railStyle"
        :process-style="processStyle"
        :tooltip-style="tooltipStyle"
        :tooltip-formatter="formatter"
      />
    </div>
    <div class="s-flex s-justify-end s-items-center s-mt-6">
      <button
        class="s-text-sm s-text-white s-mr-6"
        :class="{ '!s-text-black': dashboardFilter }"
        type="button"
        @click="
          $emit('clearPrice')
          priceSelected = [60000, 1000000]
          closeDropDown(false)
        "
      >
        Clear
      </button>
      <Button
        text="Save"
        type="button"
        text-class="s-w-[100px] s-bg-primary-blue s-text-white s-h-10"
        @submit="
          $emit('filterByPrice', priceSelected)
          closeDropDown(false)
        "
      />
    </div>
  </FilterDropdown>
</template>

<script>
import VueSlider from 'vue-slider-component'
import 'vue-slider-component/theme/antd.css'
export default {
  components: {
    VueSlider,
  },
  props: {
    dashboardFilter: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      priceSelected: [60000, 1000000],
      minPrice: 60000,
      maxPrice: 1000000,
      railStyle: {
        background: 'rgba(217, 217, 217, 0.38)',
      },
      processStyle: {
        background: '#2E48DA',
      },
      tooltipStyle: {
        background: '#4B4B4B',
        color: '#fff',
        fontWeight: 600,
        fontSize: '12px',
        textAlign: 'center',
      },
      dotOptions: {
        style: {
          background: '#2E48DA',
          border: '1px solid #FFFFFF',
          boxShadow: '0px 4px 4px rgba(0, 0, 0, 0.25);',
        },
      },
      formatter: (v) => `NGN${(' ' + v).replace(/\B(?=(\d{3})+(?!\d))/g, ',')}`,
      showDropdown: false,
    }
  },
  methods: {
    closeDropDown(value) {
      this.showDropdown = value
    },
  },
}
</script>

<style></style>
