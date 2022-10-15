<template>
  <div class="">
    <table
      class="s-w-full s-text-sm s-text-gray-500 custom-table"
      :class="extraClass"
    >
      <thead class="s-bg-[#F7F8FF]">
        <tr>
          <th
            v-for="(header) in tableHead"
            :key="header.id"
            scope="col"
            class="last:s-px-[20px] s-pt-[24px] s-pb-[20px] s-text-xs s-text-gray-700 s-uppercase s-font-semibold s-leading-[19px]"
            :class="{ 's-text-left s-px-7' : header.align == 'start', 's-text-right s-px-7' : header.align == 'end', 's-text-center' : header.align == 'middle' }"
          >
            {{ header.text }}
          </th>
        </tr>
      </thead>
      <tbody>
        <slot />
      </tbody>
    </table>
  </div>
</template>

<script>
export default {
  props: {
    tableHead: {
      type: Array,
      default: () => [],
    },
    tableBody: {
      type: Array,
      default: () => [],
    },
    extraClass: {
      type: String,
      default: 's-min-w-[1000px]',
    },
  },
}
</script>

<style lang="scss">
.custom-table {
  td {
    vertical-align: middle !important;
    border-bottom: 0.5px solid #eaedfd;
  }
  td.no-border-line {
    vertical-align: middle !important;
    border-bottom: 0px;
  }
  tr:last-child {
    td {
      border-bottom: 0px;
    }
  }
}
</style>
