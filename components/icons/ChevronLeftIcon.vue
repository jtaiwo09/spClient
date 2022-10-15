<template>
  <div>
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M19.75 11.7246L4.75 11.7246"
        :stroke="stroke"
        stroke-width="1.5"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <path
        d="M13.6992 5.701L19.7492 11.725L13.6992 17.75"
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
      default: 'white',
    },
  },
}
</script>

<style lang="scss" scoped></style>
