<template>
  <FilterDropdown
    title="Duration"
    placeholder="Select Duration"
    :show-dropdown="showDropdown"
    :dashboard-filter="dashboardFilter"
    class="filter_check"
    @closeDropDown="closeDropDown"
  >

  <CustomBox
  v-for="(duration, index) in durations"
        :key="index"
        v-model="selectedDuration"
        :name="index"
        :val="duration"
        :darkMode="true"
        :extraClass="'s-mb-7'"
      >
      <span class="s-relative s-whitespace-nowrap !s-block s-text-white s-font-normal !s-indent-0"
      :class="{ '!s-text-black': dashboardFilter }"
      >
      {{ duration | capitalize }}
    </span>
      </CustomBox>


    <!-- <p-check
      v-for="(duration, index) in durations"
      :key="index"
      v-model="selectedDuration"
      :value="duration"
      class="s-relative s-whitespace-nowrap s-mb-7 last:s-mb-5 !s-block s-text-white s-font-normal !s-indent-0"
      :class="{ '!s-text-black': dashboardFilter }"
      name="Duration"
    >
      <TickWhiteIcon width="11" height="8" :class="'svg'" />
      {{ duration | capitalize }}
    </p-check> -->
    <div class="s-flex s-justify-end s-items-center">
      <button
        class="s-text-sm s-text-white s-mr-6"
        type="button"
        @click="
          $emit('clearDuration')
          selectedDuration = []
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
          $emit('filterByDuration', selectedDuration)
          closeDropDown(false)
        "
      />
    </div>
  </FilterDropdown>
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
      selectedDuration: [],
      durations: ['monthly', 'quarterly', 'biannual'],
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

<style lang="scss">
.filter_check {
  .pretty input:not(:checked) ~ .state label:before {
    border-color: #5c5c5c;
  }
}
</style>
