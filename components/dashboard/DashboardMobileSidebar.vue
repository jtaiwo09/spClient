<template>
  <div
    class="s-w-full s-bg-[#020202] s-block md:s-hidden s-z-[999] s-sticky s-top-0"
  >
    <div
      class="s-flex s-justify-between s-w-full s-bg-[#020202] s-items-center s-px-7 s-py-6 s-z-10"
    >
      <div class="s-w-6" @click="toggleMenu">
        <HamburgerIcon v-if="!isOpen" />
        <CloseIcon v-else />
      </div>
      <div class="s-flex s-flex-col s-items-end">
        <img
          src="../../assets/images/logo-white.svg"
          alt="spleet logo"
          class="s-max-w-full s-w-[100px] s-h-auto"
        />
        <span
          class="s-text-xs s-font-semibold s-leading-[0.938rem] s-text-white"
          >{{ headerText }}</span
        >
      </div>
      <div
        class="s-w-12 s-h-12 s-rounded-full s-flex s-items-center s-justify-center s-shadow-[0px 4px 10px rgba(0, 0, 0, 0.15)] s-bg-[#18191c]"
      >
        <NotificationIcon />
      </div>
    </div>
    <Transition name="slide">
      <div
        v-if="isOpen"
        class="s-py-6 s-fixed s-top-[96px] s-min-h-[calc(100vh-96px)] s-w-full s-bg-[#020202]"
      >
        <div class="s-overflow-auto s-h-[calc(100vh-155px)]">
          <DashboardSidebarSection
            :is-open="true"
            :content="sidebar['firstLevel']"
            title=""
          />
          <DashboardSidebarSection
            :is-open="true"
            :content="sidebar['secondLevel']"
            title="Account Management"
          />
          <hr class="s-w-4/5 s-mx-auto s-bg-[#1B1B1B]" />

          <div v-if="userData" class="s-pt-4">
            <p
              class="s-font-semibold s-text-[0.625rem] s-leading-3 s-ml-10 s-mb-2.5 s-uppercase s-text-[#8a8a8a]"
            >
              Profile
            </p>
            <div class="s-flex s-items-center s-pl-8">
              <img
                :src="
                  userPhoto
                    ? userPhoto
                    : 'https://res.cloudinary.com/spleetng/image/upload/v1659339587/frontend-images/default-image.jpg'
                "
                alt=""
                class="s-rounded-full s-w-14 s-h-14 s-object-cover"
              />
              <div class="s-ml-2">
                <span
                  class="s-text-white s-font-semibold s-text-sm s-leading-[1.125rem] s-block s-mb-0.5"
                  >{{ userFullname }}</span
                >
                <span
                  class="s-font-normal s-text-xs s-leading-[1.125rem] s-text-[#CDCACA] s-block"
                  >{{ userEmail }}</span
                >
                <span
                  class="s-text-xs s-text-[#CDCACA] s-font-normal s-block s-mt-2 s-uppercase s-cursor-pointer"
                  @click="logout"
                  >Log out</span
                >
              </div>
            </div>
          </div>
        </div>
      </div>
    </Transition>
  </div>
</template>

<script>
import { mapState, mapGetters } from 'vuex'
export default {
  props: {
    sidebar: {
      type: Object,
      default: () => {},
    },
    headerText: {
      type: String,
      default: '',
    },
  },
  data() {
    return {
      isOpen: false,
    }
  },
  computed: {
    ...mapState('user', ['userData']),
    ...mapGetters('user', ['userFullname', 'userEmail', 'userPhoto']),
    fullName() {
      if (this.userData !== null) {
        return `${this.userData.kyc.firstname} ${this.userData.kyc.lastname}`
      }
      return null
    },
  },
  methods: {
    toggleMenu() {
      this.isOpen = !this.isOpen
    },
    logout() {
      localStorage.clear()
      this.$cookies.remove('user', {
        domain:
          this.$config.domain === 'localhost'
            ? this.$config.domain
            : `.${this.$config.domain}`,
        path: '/',
      })
      window.location = '/login'
    },
  },
}
</script>

<style lang="scss" scoped>
.slide-enter-active,
.slide-leave-active {
  transition: all 0.5s ease-in-out;
}
.slide-enter,
.slide-leave-to {
  transform: translateY(calc(-100vh - 96px));
}
</style>
