<template>
  <svg
    :width="width"
    :height="height"
    viewBox="0 0 22 20"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M16.9028 6.8512L12.4596 10.4642C11.6201 11.1302 10.4389 11.1302 9.59944 10.4642L5.11865 6.8512"
      :stroke="stroke"
      :stroke-width="strokeWidth"
      stroke-linecap="round"
      stroke-linejoin="round"
    />
    <path
      fill-rule="evenodd"
      clip-rule="evenodd"
      d="M15.9089 19C18.9502 19.0084 21 16.5095 21 13.4384V6.57001C21 3.49883 18.9502 1 15.9089 1H6.09114C3.04979 1 1 3.49883 1 6.57001V13.4384C1 16.5095 3.04979 19.0084 6.09114 19H15.9089Z"
      :stroke="stroke"
      :stroke-width="strokeWidth"
      stroke-linecap="round"
      stroke-linejoin="round"
    />
  </svg>
</template>

<script>
export default {
  props: {
    width: {
      type: Number,
      default: 22,
    },
    height: {
      type: Number,
      default: 20,
    },
    stroke: {
      type: String,
      default: '#130F26',
    },
    strokeWidth: {
      type: String,
      default: '1.5',
    },
  },
}
</script>

<style></style>
