<template>
  <div>
    <Loading v-if="loading" />
    <div v-else class="s-mx-0 sm:s-mx-2">
      <p
        class="s-text-center s-text-sm sm:s-hidden s-mb-7 s-max-w-[29rem] s-mx-auto s-px-6 s-text-base-x s-font-semibold s-leading-6 s-text-[#0F0C3D]"
      >
        Already a Spleet Member?
        <NuxtLink
          class="s-text-primary-blue s-font-normal hover:s-text-primary-blue"
          to="#"
          >Sign In</NuxtLink
        >
      </p>
      <div
        class="s-w-full s-bg-white s-rounded-xl height s-flex s-flex-col-reverse sm:s-flex-row"
      >
        <div
          class="s-flex-1 s-relative s-block sm:s-flex sm:s-flex-col sm:s-items-center sm:s-justify-center"
        >
          <div
            class="s-max-w-[464px] s-flex-1 s-flex s-flex-col s-justify-center s-mx-6 s-mt-12 s-mb-14 md:s-mb-0 md:s-mt-0"
          >
            <h1 class="title s-mb-5">
              Hi {{ tenantFirstName }}, Let’s get you verified.
            </h1>
            <p
              class="s-text-sm s-font-normal s-leading-[1.438rem] s-text-[#63687E]"
            >
              We need some important information to enable us verify your
              identity on behalf of your Spleet host
              <strong>{{ landlordFullName }}.</strong> No sensitive data is
              shared directly with your with your host and this is used solely
              for verification purposes.
            </p>
            <Button
              :class="'s-max-w-[159px] x-bg-primary s-text-white s-bg-primary-blue s-block s-py-3 s-mt-7'"
              text="Get Started"
              @submit="$router.push('/tenants/form')"
            />
          </div>
          <div
            class="s-w-full s-border-t s-border-t-[#E2E5F1] s-border-solid s-pt-[25px] s-pb-[42px] s-hidden sm:s-block"
          >
            <p
              class="s-max-w-[464px] s-mx-auto s-px-6 md-x:s-px-0 s-text-sm s-font-semibold s-leading-[1.438rem] s-text-[#0F0C3D]"
            >
              Already a Spleet Member?
              <NuxtLink
                class="s-text-primary-blue s-font-normal hover:s-text-primary-blue"
                to="#"
                >Sign In</NuxtLink
              >
            </p>
          </div>
        </div>
        <div
          class="img-container s-h-[259px] s-w-full xs:s-h-[380px] sm:s-h-[calc(100vh-200px)] sm:s-max-w-[320px] lg:!s-max-w-[30.25rem] s-overflow-hidden s-rounded-t-xl sm:s-rounded-tl-none sm:s-rounded-r-xl"
        >
          <img
            src="https://res.cloudinary.com/spleetng/image/upload/v1657800761/frontend-images/man.jpg"
            class="s-object-cover s-h-full s-w-full"
            alt=""
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions, mapMutations, mapState } from 'vuex'
export default {
  name: 'IndexPage',
  layout: 'tenants',
  data() {
    return {
      userCode: this.$route.params.id,
      loading: false,
    }
  },
  computed: {
    ...mapState('renters/verify', ['tenantFirstName', 'landlordFullName']),
  },
  created() {},
  async mounted() {
    localStorage.removeItem('userCode')
    localStorage.removeItem('userToken')
    localStorage.setItem('userCode', this.userCode)
    try {
      this.loading = true
      await this.getUserToken(this.userCode)
      this.loading = false
    } catch (error) {
      this.loading = false
      this.$errorHandler(error)
    }
  },
  methods: {
    ...mapActions('renters/verify', ['getUserToken']),
    ...mapMutations('renters/verify', ['SET_STEP']),
  },
}
</script>

<style lang="scss" scoped>
@media screen and (min-width: 767px) {
  .img-container {
    max-width: 400px;
  }
}
</style>
