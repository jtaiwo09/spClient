<template>
  <FilterDropdown
    title="TYPE OF SPACE"
    placeholder="Select Space Type"
    :show-dropdown="showDropdown"
    :dashboard-filter="dashboardFilter"
    class="filter_check"
    @closeDropDown="closeDropDown"
  >

  <CustomBox
  v-for="(spaceType, index) in spaceTypes"
        :key="index"
        v-model="selectedSpaceType"
        :name="index"
        :val="spaceType.name"
        :darkMode="true"
      >
        <p
            class="s-text-white s-font-bold s-mb-0.5"
            :class="{ '!s-text-black': dashboardFilter }"
          >
            {{ spaceType.name | capitalize }} space
          </p>
          <p
            class="s-text-[#D2D2D2] s-leading-6 s-text-[0.8125rem]"
            :class="{ '!s-text-black': dashboardFilter }"
          >
            {{ spaceType.description }}
          </p>
      </CustomBox>

    <div class="s-flex s-justify-end s-items-center">
      <button
        class="s-text-sm s-text-white s-mr-6"
        :class="{ '!s-text-black': dashboardFilter }"
        type="button"
        @click="
          $emit('clearSpaceType')
          selectedSpaceType = []
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
          $emit('filterBySpaceType', selectedSpaceType)
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
      selectedSpaceType: [],
      spaceTypes: [
        {
          name: 'entire',
          description: 'Have a whole space to yourself',
        },
        {
          name: 'shared',
          description: 'Enjoy separate rooms & common spaces',
        },
      ],
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
// @import '~pretty-checkbox/src/pretty-checkbox.scss';
</style>
