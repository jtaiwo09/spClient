<template>
  <div
    class="s-pl-6 s-pt-7 s-pr-7 s-pb-4 s-min-w-[250px] s-mx-auto s-bg-[#fff] s-border s-border-solid s-border-[#EDEDED] s-rounded-xl"
  >
    <div class="s-flex s-justify-between s-items-start">
      <div>
        <img
          v-if="tenant.img"
          :src="tenant.img"
          class="s-rounded-full"
          width="77px"
          height="77px"
        />
        <avatar v-else :width="77" :height="77" />
      </div>
      <div>
        <TableAction @openDropdown="$emit('view')">
          <button
            class="s-border-[0.5px] s-text-sm s-border-[#B1B7D6] s-py-[19px] s-px-[34px] s-rounded-xl"
            @click="$emit('view')"
          >
            <span v-if="loading === true" class="google__wrap-text s-mr-2">
              View
            </span>
            <Loader v-else fill="#B0BCFF" />
          </button>
        </TableAction>
      </div>
    </div>
    <div class="s-mt-[11px]">
      <p class="s-text-[16px] s-leading-6 s-font-bold s-pb-[6px]">
        {{ tenant.firstName }} {{ tenant.lastName }}
      </p>
      <div class="s-flex s-items-center">
        <MessageIcon :width="17" :height="17" :stroke="'#5C5A77'" />
        <span class="s-text-sm s-leading-6 s-ml-2 s-text-[#5C5A77]">
          {{ tenant.email }}
        </span>
      </div>
      <div class="s-flex s-items-center">
        <CallIcon :width="17" :height="17" :stroke="'#5C5A77'" />
        <span class="s-text-sm s-leading-6 s-ml-2 s-text-[#5C5A77]">
          {{ tenant.phone }}
        </span>
      </div>
      <div class="s-mt-7">
        <p class="s-text-xs s-font-semibold s-leading-6">DATE REQUESTED</p>
        <div class="s-flex s-justify-between">
          <div class="s-flex s-items-center">
            <CalendarIcon />
            <p
              class="s-text-sm s-leading-6 s-font-normal s-ml-[10px] s-text-[#5C5A77]"
            >
              {{ tenant.createdAt | formatDate('do MMMM, yyyy') }}
            </p>
          </div>
          <div
            class="s-border s-border-[#B1B7D6] s-rounded-full s-border-solid s-py-1 s-flex s-w-ful s-px-3"
          >
            <div
              class="s-w-[11px] s-h-[11px] s-rounded-full s-mr-[6px] s-bg-[#3DDC97] s-self-center"
              :class="statusBadge"
            ></div>
            <p class="s-text-xs s-leading-6 s-font-semibold">
              {{ tenant.status | capitalize }}
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import TableAction from '../reusables/TableAction.vue'
export default {
  components: {
    TableAction,
  },
  props: {
    statusBadge: {
      type: String,
      default: '',
    },
    loading: {
      type: Boolean,
      default: false,
    },
    tenant: {
      type: Object,
      default: () => {},
    },
  },
}
</script>

<style lang="scss" scoped></style>
