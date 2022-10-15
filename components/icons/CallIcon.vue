<template>
  <svg
    :width="width"
    :height="height"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      fill-rule="evenodd"
      clip-rule="evenodd"
      d="M12.496 12.2982C15.5792 7.57482 10.878 7.63721 12.8401 4.63C14.7326 1.73061 14.9234 0.25252 18.5963 2.65139C18.9817 2.96753 23.1661 4.61182 16.4596 14.8861C9.75229 25.1617 6.56188 21.9947 6.11748 21.7688C2.43472 19.3643 3.72101 18.6017 5.61357 15.7024C7.57665 12.6949 9.41282 17.0217 12.496 12.2982Z"
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
      default: 24,
    },
    height: {
      type: Number,
      default: 24,
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
