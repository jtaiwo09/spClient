<template>
  <svg
    :width="width"
    :height="height"
    viewBox="0 0 16 17"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M13.7143 7.94504V8.50361C13.7136 9.81287 13.3146 11.0868 12.5768 12.1354C11.839 13.1841 10.8019 13.9512 9.6202 14.3224C8.43853 14.6936 7.17558 14.6491 6.0197 14.1953C4.86382 13.7416 3.87695 12.903 3.20626 11.8047C2.53558 10.7063 2.21702 9.40708 2.2981 8.10066C2.37918 6.79424 2.85555 5.55067 3.65616 4.55541C4.45677 3.56015 5.53873 2.86653 6.74068 2.57799C7.94262 2.28945 9.20015 2.42146 10.3257 2.95433M13.7143 3.64648L8 9.72398L6.28571 7.90255"
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
      default: '16',
    },
    height: {
      type: String,
      default: '17',
    },
    stroke: {
      type: String,
      default: '#4B4F63',
    },
  },
}
</script>

<style></style>
