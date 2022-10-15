<template>
  <nav
    v-on-clickaway="away"
    class="s-w-full s-h-[116px] s-top-0 s-bg-black s-px-8 lg:s-pl-[4.75rem] lg:s-pr-[3.125rem] md-s:s-block s-hidden s-sticky s-z-20"
    :class="{ '!s-bg-white': isWhite || productInView || testimonyInView }"
  >
    <div
      class="s-flex s-items-center s-justify-between s-mx-auto s-w-full s-max-w-[1440px] s-h-full"
    >
      <ul class="s-flex s-items-center s-justify-between">
        <li
          v-for="(link, index) in navLink"
          :key="index"
          class="s-mr-6 md-x:s-mr-10 last:s-mr-0"
        >
          <div v-if="link.others" class="s-cursor-pointer nav-link s-relative">
            <div class="s-flex" @click="showDropdown(index)">
              <span
                class="s-text-white s-text-sm s-block s-mr-3.5 hover:s-text-[#3DDC97]"
                :class="{
                  's-text-[#3DDC97]': dropdown === index,
                  '!s-text-[#000000]':
                    isWhite || productInView || testimonyInView,
                }"
                >{{ link.name }}
              </span>
              <svg
                class="s-w-5"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                :fill="
                  dropdown === index
                    ? '#3DDC97'
                    : isWhite || productInView || testimonyInView
                    ? '#000'
                    : '#fff'
                "
                aria-hidden="true"
              >
                <path
                  fill-rule="evenodd"
                  d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                  clip-rule="evenodd"
                />
              </svg>
            </div>
            <div
              v-if="dropdown === index"
              class="s-flex s-flex-wrap s-justify-between s-border-solid s-border-l-[0.15px] s-border-r-[0.25px] s-border-b-[0.25px] s-border-[#3B3D41] s-bg-[#060606] s-px-10 s-pt-11 s-pb-2 s-absolute s-top-[68px] -s-left-10 s-w-[600px] s-rounded-br-[10px] s-rounded-bl-[10px]"
              :class="{
                '!s-bg-white': isWhite || productInView || testimonyInView,
              }"
              @click="dropdown = null"
            >
              <nuxt-link
                v-for="(item, i) in link.others"
                :key="i"
                :to="item.path"
                class="s-flex s-items-center s-text-white hover:s-text-[#3DDC97] s-mb-9"
                :class="{
                  '!s-text-[#000000]':
                    isWhite || productInView || testimonyInView,
                }"
              >
                <img
                  :src="imageSource(item.icon)"
                  alt="icon"
                  class="s-object-center"
                />
                <div class="s-ml-2.5">
                  <p class="s-text-base s-font-semibold s-mb-1">
                    {{ item.name }}
                  </p>
                  <p
                    class="s-text-sm s-text-[#D8D8D8]"
                    :class="{
                      '!s-text-[#000000]':
                        isWhite || productInView || testimonyInView,
                    }"
                  >
                    {{ item.subText }}
                  </p>
                </div>
              </nuxt-link>
            </div>
          </div>

          <nuxt-link
            v-if="link.path && !link.target"
            class="s-text-white s-text-sm hover:s-text-[#3DDC97]"
            :class="{
              '!s-text-[#000000]': isWhite || productInView || testimonyInView,
            }"
            :to="link.path"
            >{{ link.name }}</nuxt-link
          >
          <a
            v-if="link.path && link.target"
            class="s-text-white s-text-sm hover:s-text-[#3DDC97]"
            :class="{
              '!s-text-[#000000]': isWhite || productInView || testimonyInView,
            }"
            :href="link.path"
            target="_blank"
            >{{ link.name }}</a
          >
        </li>
      </ul>
      <nuxt-link
        to="/"
        class="s-block s-absolute s-left-0 s-right-0 s-mx-auto s-w-fit"
      >
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
      </nuxt-link>
      <div class="s-flex s-items-center">
        <div v-if="!userData" class="s-flex s-items-center">
          <nuxt-link
            to="/login"
            class="s-text-sm s-text-white s-mr-7 hover:s-text-[#3ddc97]"
            :class="{
              '!s-text-[#000000]': isWhite || productInView || testimonyInView,
            }"
            >Log In</nuxt-link
          >
          <nuxt-link
            to="/create-account"
            class="s-text-white s-font-semibold s-bg-primary-blue s-py-2 s-px-6 s-rounded-[20px] s-block hover:s-text-white s-mr-5"
          >
            Create Account
          </nuxt-link>
        </div>
        <nuxt-link
          v-else
          :to="userRole"
          class="s-text-white s-font-semibold s-bg-primary-blue s-py-2 s-px-6 s-rounded-[20px] s-block hover:s-text-white s-mr-5"
        >
          Dashboard
        </nuxt-link>
        <WebsiteNavLocationToggle
          :is-white="isWhite || productInView || testimonyInView"
        />
      </div>
    </div>
  </nav>
</template>

<script>
import { mapActions, mapMutations, mapState } from 'vuex'
import { mixin as clickaway } from 'vue-clickaway'
import navLink from '~/static/data/websiteNav.json'
export default {
  mixins: [clickaway],
  props: {
    isWhite: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      navLink,
      dropdown: null,
    }
  },
  computed: {
    ...mapState('user', ['userData', 'role']),
    ...mapState('website', ['productInView', 'testimonyInView']),
    userRole() {
      const roleArray = this.role.map((el) => el.userType)
      if (roleArray.includes('host')) return '/host'
      else return '/renter'
    },
  },
  async mounted() {
    const user = this.$cookies.get('user')
    if (user) {
      this.LOGGED_IN_SUCCESS(true)
      try {
        await this.getUser()
      } catch (error) {
        this.$errorHandler(error)
      }
    }
  },
  methods: {
    ...mapActions('user', ['getUser']),
    ...mapMutations('auth', ['LOGGED_IN_SUCCESS']),
    showDropdown(value) {
      this.dropdown = value
    },
    imageSource(product) {
      return require(`~/assets/icons/products/${product}.svg`)
    },
    away() {
      this.dropdown = null
    },
  },
}
</script>

<style lang="scss" scoped>
.nav-link {
  &:hover {
    span {
      color: #3ddc97;
    }
    svg {
      fill: #3ddc97;
    }
  }
}
</style>
