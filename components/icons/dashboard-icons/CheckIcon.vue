<template>
  <svg
    :width="width"
    :height="height"
    viewBox="0 0 20 20"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      fill-rule="evenodd"
      clip-rule="evenodd"
      d="M14.3345 0.750244H5.66549C2.64449 0.750244 0.750488 2.88924 0.750488 5.91624V14.0842C0.750488 17.1112 2.63549 19.2502 5.66549 19.2502H14.3335C17.3645 19.2502 19.2505 17.1112 19.2505 14.0842V5.91624C19.2505 2.88924 17.3645 0.750244 14.3345 0.750244Z"
      :stroke="stroke"
      :stroke-width="strokeWidth"
      stroke-linecap="round"
      stroke-linejoin="round"
    />
    <path
      d="M6.43994 10.0002L8.81394 12.3732L13.5599 7.6272"
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
      type: String,
      default: '20',
    },
    height: {
      type: String,
      default: '20',
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
