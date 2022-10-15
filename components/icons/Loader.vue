<template>
  <svg
    class="s-animate-spin s-mr-3"
    :width="width"
    :height="height"
    viewBox="0 0 23 23"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      fill-rule="evenodd"
      clip-rule="evenodd"
      d="M6.73701 21.5917C1.3682 18.7702 -0.70445 12.106 2.11707 6.73723C3.93789 3.27255 7.50004 1.02153 11.416 0.861676L11.4981 2.85918C8.29417 2.99071 5.37771 4.83219 3.8876 7.66757C1.57887 12.0606 3.27423 17.5123 7.6675 19.8211C12.0608 22.1299 17.5122 20.4345 19.821 16.0412C22.1299 11.648 20.4344 6.19655 16.0411 3.88771L16.9716 2.11729C22.3404 4.93882 24.413 11.603 21.5915 16.9718C18.77 22.3406 12.1058 24.4132 6.73699 21.5917"
      :fill="fill"
    />
  </svg>
</template>

<script>
export default {
  props: {
    fill: {
      type: String,
      default: '#B0BCFF',
    },
    width: {
      type: String,
      default: '23',
    },
    height: {
      type: String,
      default: '23',
    },
  },
}
</script>

<style lang="scss" scoped></style>
