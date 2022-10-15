<template>
  <div>
    <svg
      :width="width"
      :height="height"
      viewBox="0 0 21 21"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <circle
        cx="9.7659"
        cy="9.7659"
        r="8.98856"
        :stroke="stroke"
        stroke-width="1.5"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <path
        d="M16.0176 16.4844L19.5416 19.9992"
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
    width: {
      type: Number,
      default: 21,
    },
    height: {
      type: Number,
      default: 21,
    },
    stroke: {
      type: String,
      default: '#130F26',
    },
  },
}
</script>

<style lang="scss" scoped></style>
