<template>
  <div
    class="s-pl-6 s-pt-7 s-pr-7 s-pb-4 s-min-w-[250px] s-mx-auto s-bg-[#fff] s-border s-border-solid s-border-[#EDEDED] s-rounded-xl"
  >
    <div class="s-flex s-justify-between s-items-start">
      <div class="s-self-end s-mb-8">
        <h1 class="s-text-sm s-leading-6 s-font-bold s-pb-1 s-capitalize">
          {{ space.title || '-' }}
        </h1>
        <p
          class="s-text-sm s-font-normal s-leading-6 s-pb-2 s-text-[#5C5A77] s-capitalize"
        >
          {{ space.listing_type }}
        </p>
      </div>
      <div>
        <TableAction>
          <div
            class="s-border-[0.5px] s-border-solid s-text-sm s-border-[#B1B7D6] s-rounded-xl s-bg-white s-w-fit s-translate-x-[-42%]"
          >
            <ul>
              <li
                v-for="action in actionsDropdown"
                :key="action.id"
                class="s-border-b-[0.5px] s-border-solid s-border-b-[#E7E9F1] s-rounded-t-xl s-cursor-pointer"
                @click="$emit('dropdownAction', action, space)"
              >
                <p class="s-px-[34px] s-py-3 s-text-[#242428]">
                  {{ action.text }}
                </p>
              </li>
            </ul>
          </div>
        </TableAction>
      </div>
    </div>
    <div class="s-flex s-justify-between">
      <div>
        <h1 class="s-text-xs s-font-semibold s-leading-6">Location</h1>
        <div class="s-flex s-items-center s-mt-1.5">
          <LocationIcon />
          <p
            class="s-text-sm s-font-normal s-leading-6 s-text-[#5C5A77] s-pl-3"
          >
            {{ space.city || '-' }}
          </p>
        </div>
      </div>
      <div
        class="s-border s-border-[#B1B7D6] s-rounded-full s-border-solid s-py-1 s-flex s-w-ful s-px-3 s-self-end"
      >
        <div
          class="s-w-[11px] s-h-[11px] s-rounded-full s-mr-[6px] s-bg-[#3DDC97] s-self-center"
          :class="statusBadge"
        ></div>
        <p class="s-text-xs s-leading-6 s-font-semibold">
          {{ space.status | capitalize }}
        </p>
      </div>
    </div>
  </div>
</template>

<script>
import LocationIcon from '../../icons/LocationIcon.vue'
export default {
  components: { LocationIcon },
  props: {
    space: {
      type: Object,
      default: () => {},
    },
    statusBadge: {
      type: String,
      default: '',
    },
    actionsDropdown: {
      type: Array,
      default: () => [],
    },
  },
}
</script>

<style lang="scss" scoped></style>
