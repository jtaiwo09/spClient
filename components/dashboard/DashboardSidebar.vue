<template>
  <div class="md:s-block s-hidden">
    <div
      class="no-scrollbar s-pb-5 s-w-72 s-sticky s-top-0 s-bg-[#020202] s-z-10 s-h-screen s-overflow-auto s-transition-all s-duration-300 sm:s-block s-hidden"
      :class="{ 's-w-20': !isOpen }"
    >
      <div
        class="s-flex s-w-full s-justify-between s-text-[#fff] s-px-9 s-my-14"
        :class="{ 's-justify-center s-items-center s-flex-col': !isOpen }"
      >
        <nuxt-link
          v-show="showSidebarText"
          to="/"
          class="s-flex s-flex-col s-items-end"
        >
          <img
            src="../../assets/images/logo-white.svg"
            alt="spleet logo"
            class="s-max-w-full s-h-auto s-cursor-pointer"
          />
          <span class="s-text-xs s-font-semibold s-leading-[0.938rem]"
            >For {{ headerText }}</span
          >
        </nuxt-link>
        <div>
          <nuxt-link to="/">
            <img
              v-show="!isOpen"
              src="https://res.cloudinary.com/splmic/image/upload/v1663318978/frontend/spleet-icon_avhxpr.svg"
              alt=""
              class="s-block s-mb-[2.25rem]"
            />
          </nuxt-link>
          <div class="s-cursor-pointer" @click="toggleSidebar">
            <CollapseIcon
              :width="22"
              :height="22"
              :class="{ 's-rotate-180': !isOpen }"
            />
          </div>
        </div>
      </div>
      <DashboardSidebarSection
        :is-open="isOpen"
        :content="sidebar['firstLevel']"
        title="Menu"
        :show-sidebar-text="showSidebarText"
      />
      <DashboardSidebarSection
        :is-open="isOpen"
        :content="sidebar['secondLevel']"
        title="Account Management"
        :show-sidebar-text="showSidebarText"
      />
      <div v-if="userData" class="s-pt-12">
        <p
          class="s-font-semibold s-text-[0.625rem] s-leading-3 s-ml-10 s-mb-2.5 s-uppercase s-text-[#8a8a8a]"
          :class="{ 's-hidden': !isOpen }"
        >
          Profile
        </p>
        <div
          class="s-flex s-w-full s-items-center s-pl-8"
          :class="{ '!s-pl-0 s-justify-center s-flex-col': !isOpen }"
        >
          <img
            :src="
              userPhoto
                ? userPhoto
                : 'https://res.cloudinary.com/spleetng/image/upload/v1659339587/frontend-images/default-image.jpg'
            "
            alt=""
            class="s-rounded-full s-w-14 s-h-14 s-object-cover"
          />
          <div class="s-ml-2" :class="{ 's-hidden': !isOpen }">
            <span
              class="s-text-white s-font-semibold s-text-sm s-leading-[1.125rem] s-block s-mb-0.5"
              >{{ userFullname }}</span
            >
            <span
              class="s-font-normal s-text-xs s-leading-[1.125rem] s-text-[#CDCACA] s-block"
              >{{ userEmail }}</span
            >
            <div class="s-flex s-justify-between s-w-full">
              <span
                class="s-text-xs s-text-[#CDCACA] s-font-normal s-block s-mt-2 s-uppercase s-cursor-pointer"
                @click="logout"
                >Log out</span
              >
              <span
                v-if="userRole.length == 1 && userRole.includes('member')"
                class="s-text-[0.625rem] s-underline s-text-[#CDCACA] s-font-normal s-block s-mt-2 s-uppercase s-cursor-pointer s-ml-2.5"
                @click="assignRole"
              >
                <Loader v-if="switchRoleLoader" />
                <span v-else> Become a Host </span>
              </span>
              <span
                v-if="userRole.includes('host') || userRole.includes('both')"
                class="s-text-[0.625rem] s-underline s-text-[#CDCACA] s-font-normal s-block s-mt-2 s-uppercase s-cursor-pointer s-ml-2.5"
                @click="
                  {
                    headerText === 'Host'
                      ? $router.push('/renter')
                      : $router.push('/host')
                  }
                "
                >Switch to
                {{ headerText === 'Members' ? 'Host' : 'Member' }}</span
              >
            </div>
          </div>
          <div
            class="s-mt-2.5 s-hidden s-cursor-pointer"
            :class="{ '!s-block': !isOpen }"
            @click="logout"
          >
            <LogoutIcon />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapGetters, mapActions, mapMutations } from 'vuex'

export default {
  props: {
    isOpen: {
      type: Boolean,
    },
    toggleSidebar: {
      type: Function,
      default: () => {},
    },
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
      showSidebarText: true,
      switchRoleLoader: false,
    }
  },
  computed: {
    ...mapState('user', ['userData', 'role']),
    ...mapGetters('user', ['userFullname', 'userEmail', 'userPhoto']),
    userRole() {
      return this.role.map((el) => el.userType)
    },
  },
  watch: {
    isOpen(value) {
      if (value) {
        setTimeout(() => {
          this.showSidebarText = true
        }, 180)
      } else {
        this.showSidebarText = false
      }
    },
  },
  methods: {
    ...mapActions('auth', ['setNewRole']),
    ...mapMutations('auth', ['LOGGED_IN_SUCCESS']),
    async assignRole() {
      this.switchRoleLoader = true
      try {
        await this.setNewRole('host')
        this.switchRoleLoader = false
        window.location.reload()
      } catch (error) {
        this.switchRoleLoader = false
        this.$errorHandler(error)
      }
    },
    logout() {
      localStorage.clear()
      this.LOGGED_IN_SUCCESS(false)
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
.no-scrollbar {
  &::-webkit-scrollbar {
    display: none;
  }
}
</style>
