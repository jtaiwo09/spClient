<template>
  <div v-on-clickaway="away" class="s-block">
    <div class="s-relative s-inline-block s-text-left">
      <div>
        <button
          id="menu-button"
          type="button"
          class="s-flex s-items-center"
          aria-expanded="true"
          aria-haspopup="true"
          @click="showDropdown = !showDropdown"
        >
          <div class="s-w-[25px] s-h-[17px] s-mr-1">
            <img
              :src="imageSource(selectedlocation.icon)"
              alt=""
              class="s-w-full s-h-full s-object-center"
            />
          </div>
          <svg
            class="s-w-8 s-h-5"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            :fill="`${
              isWhite || productInView || testimonyInView ? '#000' : '#fff'
            }`"
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
        class="s-origin-top-right s-absolute s-right-0 md-s:s-top-[62px] s-top-[43px] s-px-4 s-mt-2 s-w-40 s-rounded-br-[10px] s-rounded-bl-[10px] s-shadow-lg s-bg-black"
        :class="{ '!s-bg-white': isWhite || productInView || testimonyInView }"
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
            class="s-flex s-text-sm s-leading-[1.125rem] s-items-center s-text-white s-py-3 s-cursor-pointer"
            :class="{
              '!s-text-[#000000]': isWhite || productInView || testimonyInView,
            }"
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
import { mapState } from 'vuex'
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
  computed: {
    ...mapState('website', ['productInView', 'testimonyInView']),
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
