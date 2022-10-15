<template>
  <svg
    :width="width"
    :height="width"
    viewBox="0 0 58 58"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <circle cx="29" cy="29" r="29" :fill="bg" />
    <path
      fill-rule="evenodd"
      clip-rule="evenodd"
      d="M32.04 21.0515C33.05 21.4535 33.359 22.8535 33.772 23.3035C34.185 23.7535 34.776 23.9065 35.103 23.9065C36.841 23.9065 38.25 25.3155 38.25 27.0525V32.8475C38.25 35.1775 36.36 37.0675 34.03 37.0675H23.97C21.639 37.0675 19.75 35.1775 19.75 32.8475V27.0525C19.75 25.3155 21.159 23.9065 22.897 23.9065C23.223 23.9065 23.814 23.7535 24.228 23.3035C24.641 22.8535 24.949 21.4535 25.959 21.0515C26.97 20.6495 31.03 20.6495 32.04 21.0515Z"
      stroke="#fff"
      stroke-width="1.5"
      stroke-linecap="round"
      stroke-linejoin="round"
    />
    <path
      d="M34.4955 26.5H34.5045"
      stroke="#fff"
      stroke-width="2"
      stroke-linecap="round"
      stroke-linejoin="round"
    />
    <path
      fill-rule="evenodd"
      clip-rule="evenodd"
      d="M32.1783 30.1282C32.1783 28.3722 30.7553 26.9492 28.9993 26.9492C27.2433 26.9492 25.8203 28.3722 25.8203 30.1282C25.8203 31.8842 27.2433 33.3072 28.9993 33.3072C30.7553 33.3072 32.1783 31.8842 32.1783 30.1282Z"
      stroke="#fff"
      stroke-width="1.5"
      stroke-linecap="round"
      stroke-linejoin="round"
    />
  </svg>
</template>

<script>
export default {
  props: {
    bg: {
      type: String,
      default: '#00A45D',
    },
    width: { type: String, default: '58' },
    height: { type: String, default: '58' },
  },
}
</script>

<style></style>
