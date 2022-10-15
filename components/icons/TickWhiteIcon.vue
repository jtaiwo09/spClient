<template>
  <svg
    :width="width"
    :height="height"
    viewBox="0 0 42 31"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M15.8469 30.6371L0.175 14.9652C-0.0375 14.7527 -0.0375 14.434 0.175 14.2215L4.69063 9.70586C4.90313 9.49336 5.22188 9.49336 5.43438 9.70586L16.2188 20.4902L36.5125 0.196484C36.725 -0.0160156 37.0438 -0.0160156 37.2562 0.196484L41.7719 4.71211C41.9844 4.92461 41.9844 5.24336 41.7719 5.45586L16.5906 30.6371C16.3781 30.8496 16.0594 30.8496 15.8469 30.6371Z"
      :fill="fill"
    />
  </svg>
</template>

<script>
export default {
  props: {
    width: {
      type: String,
      default: '42',
    },
    height: {
      type: String,
      default: '31',
    },
    fill: {
      type: String,
      default: 'white',
    },
  },
}
</script>

<style></style>
