<template>
  <div>
    <div class="s-w-full s-bg-black s-px-10 s-pt-14 md:s-pb-20 s-pb-9">
      <h1
        class="s-text-white md:s-text-5xl s-text-3xl s-mb-6 s-text-center s-font-black"
      >
        The better way to <span class="text-gradient">Rent</span>
      </h1>
      <p
        class="s-text-white md:s-text-lg s-text-sm s-text-center s-w-full s-max-w-2xl s-mx-auto"
      >
        Spleet is the complete rental solution for landlords and tenants - list
        a home, rent a space, take a rental loan, verify tenants and
        automatically collect rent with our rental management tools
      </p>
      <nuxt-link
        v-if="!userData"
        to="/create-account"
        class="md-s:s-hidden s-text-white s-font-semibold s-bg-primary-blue s-py-2 s-text-center s-text-sm s-rounded-[20px] s-block hover:s-text-white s-w-36 s-mx-auto s-mt-6"
      >
        Create Account
      </nuxt-link>
      <nuxt-link
        v-else
        to="/host"
        class="md-s:s-hidden s-text-white s-font-semibold s-bg-primary-blue s-py-2 s-text-center s-text-sm s-rounded-[20px] s-block hover:s-text-white s-w-36 s-mx-auto s-mt-6"
      >
        Dashboard
      </nuxt-link>
    </div>
    <div
      class="s-bg-[url('~/assets/images/landing-page/hero-mobile.jpeg')] sm:s-bg-[url('~/assets/images/landing-page/hero.jpeg')] md:s-bg-center s-bg-bottom s-bg-cover s-w-full md:s-h-[508px] s-h-[250px] s-bg-no-repeat"
    ></div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
export default {
  computed: {
    ...mapState('user', ['userData']),
  },
}
</script>

<style lang="scss" scoped>
.text-gradient {
  background: linear-gradient(180deg, #5c89fc 7.29%, #3ddc97 82.81%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}
</style>
