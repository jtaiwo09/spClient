<template>
  <div>
    <svg
      :width="width"
      :height="height"
      viewBox="0 0 24 25"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        fill-rule="evenodd"
        clip-rule="evenodd"
        d="M12 2.86523C6.892 2.86523 2.75 7.17878 2.75 12.5007C2.75 17.8215 6.892 22.1361 12 22.1361C17.108 22.1361 21.25 17.8215 21.25 12.5007C21.25 7.17878 17.108 2.86523 12 2.86523Z"
        :stroke="stroke"
        stroke-width="1.5"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <path
        d="M13.4424 8.88477L9.95638 12.5004L13.4424 16.116"
        stroke="#130F26"
        stroke-width="1.5"
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
      default: 24,
    },
    height: {
      type: Number,
      default: 25,
    },
    stroke: {
      type: String,
      default: '#130F26',
    },
  },
}
</script>

<style lang="scss" scoped></style>
