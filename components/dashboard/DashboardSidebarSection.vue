<template>
  <div>
    <p
      v-show="isOpen"
      class="s-font-semibold s-text-[0.625rem] s-leading-3 s-ml-10 s-mb-2.5 s-uppercase s-text-[#8a8a8a]"
    >
      {{ title }}
    </p>
    <ul class="sm:s-pl-2.5">
      <li
        v-for="(item, index) in content"
        :key="index"
        class="item__bg s-h-12 s-w-11/12 s-bg-transparent s-flex s-items-center s-cursor-pointer s-mb-2.5 sm:hover:s-rounded-3xl s-overflow-hidden s-border-l-4 sm:s-border-l-0 s-border-transparent s-border-solid"
        :class="[
          !isOpen ? 's-pl-0' : 's-pl-7',
          {
            active:
              currentRouteName === item.to ||
              item.links.some((link) => link === currentRouteName),
          },
        ]"
        @click="gotoLink(item.to)"
      >
        <div
          class="s-text-[#fff] s-font-normal s-text-center s-flex s-items-center s-w-full"
          :class="{ 's-justify-center': !isOpen }"
        >
          <component
            :is="item.icon"
            :stroke="item.icon === 'WalletIcon' ? 'none' : '#fff'"
            :fill="item.icon === 'WalletIcon' ? '#fff' : 'none'"
            class="s-mr-4 s-w-4 s-h-5 sm:s-block s-hidden"
            :class="{ 's-mr-0': !showSidebarText }"
          />
          <component
            :is="item.icon"
            :stroke="
              item.icon === 'WalletIcon'
                ? 'none'
                : currentRouteName === item.to ||
                  item.links.some((link) => link === currentRouteName)
                ? '#3ddc97'
                : '#fff'
            "
            :fill="
              item.icon === 'WalletIcon' &&
              (currentRouteName === item.to ||
                item.links.some((link) => link === currentRouteName))
                ? '#3ddc97'
                : item.icon === 'WalletIcon' &&
                  (currentRouteName !== item.to ||
                    item.links.some((link) => link !== currentRouteName))
                ? '#fff'
                : 'none'
            "
            class="s-mr-4 s-w-4 s-h-5 s-block sm:s-hidden"
            :class="{ 's-mr-0': !showSidebarText }"
          />
          <span
            v-show="showSidebarText"
            class="s-text-sm s-leading-[1.125rem] s-text-[#fff] s-whitespace-nowrap"
            >{{ item.text }}</span
          >
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  props: {
    isOpen: {
      type: Boolean,
      default: false,
    },
    showSidebarText: {
      type: Boolean,
      default: true,
    },
    content: {
      type: Array,
      default: () => [],
    },
    title: {
      type: String,
      default: '',
    },
    icon: {
      type: String,
      default: '',
    },
  },
  computed: {
    currentRouteName() {
      return this.$route.path
    },
  },
  methods : {
    gotoLink(link){
      if(!link.includes("http"))
      {
        this.$router.push(`${link}`)
      }else{
        window.location.href = link
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.item__bg {
  &:hover,
  &:active {
    background: linear-gradient(98.2deg, #2c46cf 43.7%, #32b27b 99.73%);
    @media screen and (max-width: '640px') {
      background: transparent;
    }
  }
}
.active {
  background: linear-gradient(98.2deg, #2c46cf 43.7%, #32b27b 99.73%);
  border-radius: 22px;
  @media screen and (max-width: '640px') {
    background: transparent;
    border-color: #3ddc97;
    border-radius: 0;
    span {
      color: #3ddc97;
      font-weight: 600;
    }
    svg {
      path {
        stroke: #3ddc97 !important;
      }
    }
  }
}
</style>
