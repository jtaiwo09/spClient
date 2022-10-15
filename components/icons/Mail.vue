<template>
  <div>
    <svg
      :width="width"
      :height="height"
      viewBox="0 0 17 17"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M12.6811 6.26953L9.53379 8.82877C8.93915 9.30052 8.10252 9.30052 7.50787 8.82877L4.33398 6.26953"
        stroke=""
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <path
        fill-rule="evenodd"
        clip-rule="evenodd"
        d="M11.9765 14.875C14.1308 14.8809 15.5827 13.1109 15.5827 10.9355V6.07043C15.5827 3.895 14.1308 2.125 11.9765 2.125H5.02224C2.86795 2.125 1.41602 3.895 1.41602 6.07043V10.9355C1.41602 13.1109 2.86795 14.8809 5.02224 14.875H11.9765Z"
        stroke="#5C5A77"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
    </svg>
  </div>
</template>

<script>
export default {
  props: {
    width: {
      type: Number,
      default: 17,
    },
    height: {
      type: Number,
      default: 17,
    },
    stroke: {
      type: String,
      default: '#5C5A77',
    },
  },
}
</script>

<style lang="scss" scoped></style>
