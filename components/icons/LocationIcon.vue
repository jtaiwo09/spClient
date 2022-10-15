<template>
  <svg
    :width="width"
    :height="height"
    viewBox="0 0 17 18"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      fill-rule="evenodd"
      clip-rule="evenodd"
      d="M10.2702 7.5583C10.2702 6.5799 9.47739 5.78711 8.49971 5.78711C7.52131 5.78711 6.72852 6.5799 6.72852 7.5583C6.72852 8.53598 7.52131 9.32878 8.49971 9.32878C9.47739 9.32878 10.2702 8.53598 10.2702 7.5583Z"
      :stroke="stroke"
      stroke-linecap="round"
      stroke-linejoin="round"
    />
    <path
      fill-rule="evenodd"
      clip-rule="evenodd"
      d="M8.49965 14.9961C7.65073 14.9961 3.1875 11.3824 3.1875 7.60342C3.1875 4.64496 5.56545 2.24609 8.49965 2.24609C11.4339 2.24609 13.8125 4.64496 13.8125 7.60342C13.8125 11.3824 9.34857 14.9961 8.49965 14.9961Z"
      :stroke="stroke"
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
      default: '18',
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
