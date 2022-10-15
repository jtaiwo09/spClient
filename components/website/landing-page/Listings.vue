<template>
  <div
    class="s-bg-white md-s:s-pt-36 s-pt-20 md-s:s-pl-20 s-pl-7 md-s:s-pb-44 s-pb-32 s-w-full"
  >
    <div class="s-w-full s-max-w-[1440px] s-mx-auto">
      <div class="s-flex md-x:s-flex-nowrap s-flex-wrap s-items-center">
        <div
          class="md-x:s-mr-24 md-x:s-w-[430px] s-w-full md-x:s-mb-0 s-mb-16 md-s:s-pr-0 s-pr-7"
        >
          <h5
            class="s-uppercase md-s:s-text-sm s-text-xs s-mb-3.5 s-text-[#07A560] s-font-semibold s-text-left"
          >
            Listings
          </h5>
          <h2
            class="md-s:s-text-4xl s-text-2xl s-text-black s-font-bold s-w-full s-max-w-md s-text-left s-mb-5"
          >
            Explore amazing spaces on Spleet
          </h2>
          <p class="s-text-sm s-text-[#4B4F63] s-w-full s-max-w-md">
            Our homes come fully furnished and equipped with handpicked
            essentials. When you subscribe, You have complete access to these
            and more benefits than you can imagine. When you arrive, your Spleet
            home is warm, comfortable, and ready for living.
          </p>
          <nuxt-link
            to="/marketplace"
            class="s-block s-bg-primary-blue s-text-white s-text-sm s-w-40 s-py-4 s-rounded-[28px] s-text-center s-mt-8 s-mb-7 hover:s-text-white"
            >View Listings</nuxt-link
          >
          <p class="s-text-sm s-text-[#4B4F63] s-w-full s-max-w-md">
            Looking to list your apartment instead?
            <nuxt-link
              to="/create-account"
              class="s-text-primary-blue hover:s-text-primary-blue s-underline hover:s-underline"
              >Sign up as a Host</nuxt-link
            >
          </p>
          <div class="s-flex s-space-x-5 s-mt-7">
            <button
              class="s-rounded-full s-w-[3.25rem] s-h-[3.25rem] s-bg-[#E6E9FB] s-relative"
              type="button"
              @click="slideSpacesLeft"
            >
              <ChevronDownIcon
                width="12px"
                height="8px"
                stroke="#2E48DA"
                class="s-absolute s-inset-0 s-m-auto s-rotate-90"
              />
            </button>
            <button
              class="s-rounded-full s-w-[3.25rem] s-h-[3.25rem] s-bg-[#E6E9FB] s-relative"
              type="button"
              @click="slideSpacesRight"
            >
              <ChevronDownIcon
                width="12px"
                height="8px"
                stroke="#2E48DA"
                class="s-absolute s-inset-0 s-m-auto -s-rotate-90"
              />
            </button>
          </div>
        </div>
        <div
          ref="spaces"
          class="s-flex s-overflow-auto md-x:s-flex-1 hide-scroll s-scroll-smooth"
        >
          <nuxt-link
            v-for="(image, index) in spaceImages"
            :key="index"
            class="s-block md-x:s-min-w-[380px] s-min-w-[250px] md-x:s-min-h-[486px] s-min-h-[318px] s-mr-4"
            :to="`/apartments/${image.slug}`"
          >
            <img
              :src="image.imagePath"
              :alt="image.slug"
              class="s-rounded-[20px] s-h-full s-w-full s-object-cover s-object-center"
            />
          </nuxt-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'
export default {
  data() {
    return {}
  },
  computed: {
    ...mapState('renters/spaces', ['spaces']),
    spaceImages() {
      return this.spaces.map((el) => {
        return {
          slug: el.apartment_slug,
          imagePath: el.images[0].image_path,
        }
      })
    },
  },
  created() {
    this.getSpaces()
  },
  methods: {
    ...mapActions({
      getSpaces: 'renters/spaces/getSpaces',
    }),
    slideSpacesLeft() {
      this.$refs.spaces.scrollLeft -= 300
    },
    slideSpacesRight() {
      this.$refs.spaces.scrollLeft += 300
    },
  },
}
</script>

<style lang="scss" scoped>
.hide-scroll {
  -ms-overflow-style: none;
  scrollbar-width: none;
  &::-webkit-scrollbar {
    display: none;
  }
}
</style>
