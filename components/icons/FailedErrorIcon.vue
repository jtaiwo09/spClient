<template>
  <svg
    :width="width"
    :height="height"
    viewBox="0 0 51 51"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M25.5 51C39.5833 51 51 39.5833 51 25.5C51 11.4167 39.5833 0 25.5 0C11.4167 0 0 11.4167 0 25.5C0 39.5833 11.4167 51 25.5 51Z"
      fill="#CC1D1D"
    />
    <path
      d="M40.4574 15.1929L36.2464 10.9824L25.7199 21.5094L15.1929 10.9824L10.9824 15.1929L21.5089 25.7199L10.9824 36.2469L15.1929 40.4574L25.7199 29.9304L36.2464 40.4574L40.4574 36.2469L29.9299 25.7199L40.4574 15.1929Z"
      fill="white"
    />
  </svg>
</template>

<script>
export default {
  props: {
    width: {
      type: String,
      default: '51',
    },
    height: {
      type: String,
      default: '51',
    },
  },
}
</script>

<style></style>
