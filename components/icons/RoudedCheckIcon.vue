<template>
  <svg
    :width="width"
    :height="height"
    viewBox="0 0 66 66"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M33 66C51.2254 66 66 51.2254 66 33C66 14.7746 51.2254 0 33 0C14.7746 0 0 14.7746 0 33C0 51.2254 14.7746 66 33 66Z"
      :fill="fillBg"
    />
    <path
      d="M27.9984 50.118L12.7875 34.907C12.5813 34.7008 12.5813 34.3914 12.7875 34.1852L17.1703 29.8023C17.3766 29.5961 17.6859 29.5961 17.8922 29.8023L28.3594 40.2695L48.0562 20.5727C48.2625 20.3664 48.5719 20.3664 48.7781 20.5727L53.1609 24.9555C53.3672 25.1617 53.3672 25.4711 53.1609 25.6773L28.7203 50.118C28.5141 50.3242 28.2047 50.3242 27.9984 50.118Z"
      :fill="fill"
    />
  </svg>
</template>

<script>
export default {
  props: {
    fillBg: {
      type: String,
      default: '#18CE7F',
    },
    fill: {
      type: String,
      default: 'white',
    },
    width: {
      type: Number,
      default: 66,
    },
    height: {
      type: Number,
      default: 66,
    },
  },
}
</script>

<style lang="scss" scoped></style>
