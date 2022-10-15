<template>
  <div
    v-on-clickaway="away"
    class="s-mr-10 s-absolute s-right-0 s-hidden sm:s-block"
  >
    <div class="s-relative s-inline-block s-text-left">
      <div>
        <button
          id="menu-button"
          type="button"
          class="s-inline-flex s-items-center s-rounded-3xl s-bg-[#F7F7F7] s-border s-border-[#E4E7FB] s-focus:outline-none s-h-10 s-w-34 s-px-4 s-text-base-x"
          aria-expanded="true"
          aria-haspopup="true"
          @click="showDropdown = !showDropdown"
        >
          <div class="s-w-[25px] s-h-[17px] s-mr-1.5">
            <img
              :src="imageSource(selectedlocation.icon)"
              alt=""
              class="s-w-full s-h-full s-object-center"
            />
          </div>

          <p class="s-mr -auto s-leading-[1.125rem] s-text-sm">
            {{ selectedlocation.name }}
          </p>
          <svg
            class="s-w-8 s-h-5"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            fill="currentColor"
            aria-hidden="true"
          >
            <path
              fill-rule="evenodd"
              d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
              clip-rule="evenodd"
            />
          </svg>
        </button>
      </div>
      <div
        v-if="showDropdown"
        class="s-origin-top-right s-absolute s-right-0 s-mt-2 s-w-40 s-rounded-md s-shadow-lg s-bg-[#fff] s-ring-1 s-ring-[#b1b7d6]/[0.19] s-ring-opacity-5 s-focus:outline-none"
        role="menu"
        aria-orientation="vertical"
        aria-labelledby="menu-button"
        tabindex="-1"
      >
        <div class="s-py-1 s-px-2" role="none">
          <!-- Active: "bg-gray-100 text-gray-900", Not Active: "text-gray-700" -->
          <div
            v-for="(country, index) in countries"
            :key="index"
            class="s-flex s-text-sm s-leading-[1.125rem] s-items-center s-text-[#000000] s-py-0.5 s-py-3 s-cursor-pointer"
            role="menuitem"
            tabindex="-1"
            @click="setLocation(country)"
          >
            <div class="s-w-[25px] s-h-[17px] s-mr-1.5">
              <img
                :src="imageSource(country.icon)"
                alt=""
                class="s-w-full s-h-full s-object-center"
              />
            </div>
            {{ country.name }}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mixin as clickaway } from 'vue-clickaway'
export default {
  mixins: [clickaway],
  data() {
    return {
      showDropdown: false,
      selectedlocation: {
        name: 'Nigeria',
        icon: 'ng',
      },
      countries: [
        {
          name: 'Nigeria',
          icon: 'ng',
        },
        {
          name: 'Ghana',
          icon: 'gh',
        },
        {
          name: 'Kenya',
          icon: 'ke',
        },
      ],
    }
  },
  methods: {
    setLocation(value) {
      this.selectedlocation = value
      this.showDropdown = !this.showDropdown
    },
    imageSource(flag) {
      return require(`~/assets/icons/countries/${flag}.svg`)
    },
    away() {
      this.showDropdown = false
    },
  },
}
</script>

<style></style>
