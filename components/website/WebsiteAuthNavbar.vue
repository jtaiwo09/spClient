<template>
  <div
    class="s-flex s-items-center s-justify-center s-w-full s-relative auth__nav"
  >
    <HamburgerIcon
      v-show="
        currentRoute !== 'signup' &&
        currentRoute !== 'login' &&
        currentRoute !== 'create-account' &&
        currentRoute !== 'verify' &&
        currentRoute !== 'forgot-password'
      "
      :class="'sm:s-hidden s-absolute s-left-8'"
      fill="#000000"
    />
    <nuxt-link to="/">
      <img
        class="logo s-block s-ml-auto s-mr-auto"
        src="../../assets/images/spleetLogoBlack.svg"
        alt=""
      />
    </nuxt-link>
    <NavLocationToggle />
  </div>
</template>

<script>
export default {
  data() {
    return {
      showDropdown: false,
    }
  },
  computed: {
    currentRoute() {
      return this.$route.name
    },
  },
}
</script>

<style lang="scss" scoped>
.auth__nav {
  height: 94px;
  .btn__dropdown {
    width: 144px;
    height: 40px;
    padding-left: 17px;
    padding-right: 17px;
    border-radius: 80px;
    font-size: 14px;

    .s-w-20 s-h-15 {
      width: 20px;
      height: 15px;
    }
  }
}
</style>
