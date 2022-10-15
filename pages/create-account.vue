v
<template>
  <div>
    <WebsiteAuthNavbar />
    <div class="s-px-8 s-pb-5 lg:pb-0">
      <h2
        class="s-mt-8 s-mb-[1.625rem] s-text-2xl s-font-bold s-leading-[1.938rem] s-ml-auto s-mr-auto s-max-w-fit"
      >
        How will you like to join Spleet?
      </h2>
      <div
        class="s-max-w-[29.188rem] s-w-full sm:s-border-solid sm:s-border sm:s-border-[#B1B7D6] sm:s-py-12 s-mx-auto sm:s-px-8 lg:s-px-10 s-rounded-xl"
      >
        <div
          class="s-pb-6 s-border-solid s-border-b s-border-b-[#B1B7D6] s-mb-9"
        >
          <div class="s-flex s-items-center s-mb-3">
            <div
              class="s-rounded-full s-w-11 s-h-11 s-bg-[#00A45D] s-flex s-justify-center s-items-center"
            >
              <UserIcon :width="24" :height="24" stroke="white" />
            </div>
            <p class="s-ml-3 s-font-semibold s-text-[1rem] s-leading-5">
              Join as a member
            </p>
          </div>
          <p
            class="s-text-sm s-leading-[1.438rem] s-font-normal s-text-[#5C5A77]"
          >
            As a Spleet member, you can view and subscribe to spaces listed on
            Spleet. You can switch this account to access host benefits.
          </p>
          <Button
            :class="'s-border-2 s-border-[#2E48DA] s-font-bold s-text-sm s-leading-[1.125rem] !s-text-[#2E48DA] s-mt-6 s-px-10'"
            type="button"
            text="Continue as member"
            @submit="submit('member')"
          >
          </Button>
        </div>
        <div>
          <div class="s-flex s-items-center s-mb-3">
            <div
              class="s-rounded-full s-w-11 s-h-11 s-bg-[#2E48DA] s-flex s-justify-center s-items-center"
            >
              <UserIcon :width="24" :height="24" stroke="white" />
            </div>
            <p class="s-ml-3 s-font-semibold s-text-[1rem] s-leading-5">
              Join as a host
            </p>
          </div>
          <p
            class="s-text-sm s-leading-[1.438rem] s-font-normal s-text-[#5C5A77]"
          >
            As a Spleet Host, you can list spaces and earn on Spleet. You can
            switch this account to access member benefits.
          </p>
          <Button
            :class="'s-border-2 s-border-[#2E48DA] s-font-bold s-text-sm s-leading-[1.125rem] !s-text-[#2E48DA] s-mt-6 s-px-10'"
            type="button"
            text="Continue as host"
            @submit="submit('host')"
          >
          </Button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapMutations } from 'vuex'
export default {
  data() {
    return {
      loading: false,
    }
  },
  computed: {
    ...mapState('user', ['role']),
    userType: {
      get() {
        return this.role
      },
      set(value) {
        this.UPDATE_ROLE(value)
      },
    },
  },
  methods: {
    ...mapMutations('user', ['UPDATE_ROLE']),
    submit(value) {
      this.userType = value
      this.$router.push('/signup')
    },
  },
}
</script>

<style lang="scss" scoped>
@media screen and (max-width: 434px) {
  .title {
    text-align: left !important;
  }
}
</style>
