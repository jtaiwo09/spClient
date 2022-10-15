<template>
  <div
    class="s-w-full s-bg-[#020202] s-block md-s:s-hidden s-sticky s-top-0 s-h-[76px] s-z-[100]"
    :class="{ '!s-bg-white': isWhite || productInView || testimonyInView }"
  >
    <div
      class="s-flex s-justify-between s-w-full s-bg-[#020202] s-items-center s-relative sm:s-px-9 s-pl-6 s-pr-4 s-py-6 s-z-10"
      :class="{ '!s-bg-white': isWhite || productInView || testimonyInView }"
    >
      <div class="s-w-6" @click="toggleMenu">
        <HamburgerIcon
          v-if="!isOpen"
          :fill="
            isWhite || productInView || testimonyInView ? '#000000' : '#ffffff'
          "
        />
        <CloseIcon
          v-else
          :fill="
            isWhite || productInView || testimonyInView ? '#000000' : '#ffffff'
          "
        />
      </div>
      <div class="s-flex s-flex-col s-items-end">
        <img
          v-if="isWhite || productInView || testimonyInView"
          :src="require('~/assets/images/spleetLogoBlack.svg')"
          alt="logo"
          class="s-object-center s-h-10"
        />
        <img
          v-else
          :src="require('~/assets/images/logo-white.svg')"
          alt="logo"
          class="s-object-center s-h-10"
        />
      </div>
      <WebsiteNavLocationToggle />
    </div>
    <Transition name="slide">
      <div
        v-if="isOpen"
        class="s-py-6 sm:s-px-9 s-px-7 s-fixed s-top-[76px] s-min-h-[calc(100vh-76px)] s-w-full s-bg-[#020202]"
      >
        <div class="s-overflow-auto s-h-[calc(100vh-116px)] s-pb-24">
          <div @click="isOpen = false">
            <nuxt-link to="/" class="s-flex s-items-center">
              <img
                src="~/assets/icons/products/homeIcon.svg"
                alt="home icon"
                class="s-block s-mr-2.5 s-object-center s-w-7 s-h-7"
              />
              <span class="s-text-white s-test-sm">Home</span>
            </nuxt-link>
          </div>

          <div v-for="(link, index) in navLink" :key="index">
            <div v-if="link.others" class="s-mt-8">
              <p class="s-text-[#B1B7D6] s-text-xs s-mb-5">
                {{ link.name.toUpperCase() }}
              </p>
              <div @click="isOpen = false">
                <nuxt-link
                  v-for="(item, i) in link.others"
                  :key="i"
                  :to="item.path"
                  class="s-flex s-items-center s-text-white hover:s-text-[#3DDC97] s-mb-4 last:s-mb-0"
                >
                  <img
                    :src="imageSource(item.icon)"
                    alt="icon"
                    class="s-object-center s-w-7 s-h-7 s-block s-mr-2.5"
                  />
                  <span class="s-text-white s-test-sm">{{ item.name }}</span>
                </nuxt-link>
              </div>
            </div>
          </div>
          <div class="s-mt-8 s-mb-8">
            <p class="s-text-[#B1B7D6] s-text-xs s-mb-5">LEARN</p>
            <div @click="isOpen = false">
              <nuxt-link
                to="/"
                class="s-flex s-items-center s-text-white hover:s-text-[#3DDC97] s-mb-4 last:s-mb-0"
              >
                <img
                  src="~/assets/icons/helpIcon.svg"
                  alt="icon"
                  class="s-object-center s-w-7 s-h-7 s-block s-mr-2.5"
                />
                <span class="s-text-white s-test-sm">Help</span>
              </nuxt-link>
            </div>
            <div @click="isOpen = false">
              <nuxt-link
                to="/faq"
                class="s-flex s-items-center s-text-white hover:s-text-[#3DDC97] s-mb-4 last:s-mb-0"
              >
                <img
                  src="~/assets/icons/faqIcon.svg"
                  alt="icon"
                  class="s-object-center s-w-7 s-h-7 s-block s-mr-2.5"
                />
                <span class="s-text-white s-test-sm">FAQs</span>
              </nuxt-link>
            </div>
          </div>
          <div
            v-if="!userData"
            class="sm:s-w-[calc(100%-72px)] s-w-[calc(100%-56px)]"
          >
            <nuxt-link
              to="/create-account"
              class="s-text-white s-font-semibold s-bg-primary-blue s-py-2 s-text-center s-rounded-[20px] s-block hover:s-text-white s-w-full s-mb-2"
            >
              Create Account
            </nuxt-link>
            <nuxt-link
              to="/login"
              class="s-text-white s-font-semibold s-bg-transparent s-border-2 s-border-solid s-border-white s-py-2 s-text-center s-rounded-[20px] s-block hover:s-text-white s-w-full"
            >
              Sign In
            </nuxt-link>
          </div>
          <div v-else class="sm:s-w-[calc(100%-72px)] s-w-[calc(100%-56px)]">
            <nuxt-link
              :to="`${userRole ? '/renter' : '/host'}`"
              class="s-text-white s-font-semibold s-bg-primary-blue s-py-2 s-text-center s-rounded-[20px] s-block hover:s-text-white s-w-full s-mb-2"
            >
              Dashboard
            </nuxt-link>
          </div>
        </div>
      </div>
    </Transition>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import navLink from '~/static/data/websiteNav.json'

export default {
  props: {
    isWhite: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      navLink,
      isOpen: false,
      loggedIn: null,
    }
  },
  computed: {
    ...mapState('user', ['userData', 'role']),
    ...mapState('website', ['productInView', 'testimonyInView']),
    userRole() {
      return this.role.some((el) => el.userType === 'member')
    },
  },
  methods: {
    toggleMenu() {
      this.isOpen = !this.isOpen
    },
    imageSource(product) {
      return require(`~/assets/icons/products/mobile/${product}.svg`)
    },
  },
}
</script>

<style lang="scss" scoped>
.slide-enter-active,
.slide-leave-active {
  transition: all 0.9s ease-in-out;
}
.slide-enter,
.slide-leave-to {
  transform: translateY(calc(-100vh - 96px));
}
</style>
