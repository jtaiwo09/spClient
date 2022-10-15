<template>
  <div>
    <svg
      :width="width"
      :height="height"
      viewBox="0 0 22 22"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <circle cx="11" cy="11" r="11" :fill="fill" />
      <path
        d="M12.1333 8.27332L9.3943 11.0005L12.1333 13.7277"
        :stroke="stroke"
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
    stroke: {
      type: String,
      default: '#0B0B0B',
    },
    width: {
      type: Number,
      default: 22,
    },
    height: {
      type: Number,
      default: 22,
    },
    fill: {
      type: String,
      default: 'white',
    },
  },
}
</script>

<style lang="scss" scoped></style>
