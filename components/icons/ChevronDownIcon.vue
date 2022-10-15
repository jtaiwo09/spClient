<template>
  <svg
    :width="width"
    :height="height"
    viewBox="0 0 9 5"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M7.68882 0.896484L4.44695 4.10482L1.20508 0.896484"
      :stroke="stroke === false || stroke === '' ? '#130F26' : stroke"
      stroke-width="1.5"
      stroke-linecap="round"
      stroke-linejoin="round"
    />
  </svg>
</template>

<script>
export default {
  props: {
    width: {
      type: String,
      default: '9',
    },
    height: {
      type: String,
      default: '5',
    },
    stroke: {
      type: [String, Boolean],
      default: '#130F26',
    },
  },
}
</script>

<style></style>
