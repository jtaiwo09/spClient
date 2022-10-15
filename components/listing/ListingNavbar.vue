<template>
  <div class="s-bg-[#020202] s-w-full s-sticky s-top-0 s-z-50">
    <div class="s-h-[59px] s-flex s-items-center s-max-w-[14400px] s-m-auto">
      <div
        class="s-h-full s-pl-[26px] s-pr-[15px] s-flex s-items-center s-border-r s-border-solid s-border-[#fff]/[0.26]"
      >
        <nuxt-link
          to="/host/listing"
          class="s-h-[19px] s-w-[19px] s-rounded-full s-border s-border-solid s-border-[#fff] s-flex s-items-center s-justify-center s-cursor-pointer"
        >
          <CollapseIcon fill="" stroke="#fff" />
        </nuxt-link>
      </div>
      <div class="s-flex s-justify-between s-w-full s-items-center s-px-5">
        <img
          src="https://res.cloudinary.com/spleetng/image/upload/v1654526455/frontend-images/spleet-logo-white.svg"
          alt=""
          class="s-cursor-pointer"
          @click="$router.push({ name: 'index' })"
        />
        <div class="s-w-10 s-h-10">
          <img
            :src="userPhoto"
            alt=""
            class="s-rounded-full s-w-full s-h-full s-object-cover"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'

export default {
  computed: {
    ...mapGetters('user', ['userPhoto']),
  },
  mounted() {
    const user = this.$cookies.get('user')
    if (user) {
      try {
        this.getUser()
      } catch (error) {
        this.$errorHandler(error)
      }
    }
  },
  methods: {
    ...mapActions('user', ['getUser']),
  },
}
</script>

<style></style>
