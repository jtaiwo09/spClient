<template>
  <div ref="testimony" class="s-bg-black s-w-full s-relative">
    <div class="s-w-full s-max-w-[1440px] s-mx-auto">
      <div
        v-for="(slide, index) in slides"
        v-show="visibleSlide === index"
        :key="index"
        class="s-flex s-items-center s-justify-between md-s:s-flex-nowrap s-flex-wrap-reverse"
      >
        <div
          class="md-s:s-mr-24 md-s:s-pl-20 s-pl-7 md-s:s-pr-0 s-pr-7 md-s:s-pb-0 s-pb-16"
        >
          <h5
            class="s-uppercase md-s:s-text-sm s-text-xs s-mb-3.5 s-text-[#07A560] s-font-semibold s-text-left"
          >
            Testimonials
          </h5>
          <h2
            class="md-s:s-text-4xl s-text-2xl s-text-white s-font-bold s-w-full s-max-w-md s-text-left s-mb-5"
          >
            Why Customers Love Us
          </h2>
          <p
            class="md-s:s-text-lg s-text-base s-text-white s-w-full s-max-w-md s-mb-12 s-font-normal"
          >
            {{ slide.text }}
          </p>
          <div class="s-flex s-space-x-1 s-mb-12">
            <span
              class="s-block s-h-1 s-w-9"
              :class="[visibleSlide === 0 ? 's-bg-white' : 's-bg-[#1E1E1E]']"
            ></span>
            <span
              class="s-block s-h-1 s-w-9"
              :class="[visibleSlide === 1 ? 's-bg-white' : 's-bg-[#1E1E1E]']"
            ></span>
            <span
              class="s-block s-h-1 s-w-9"
              :class="[visibleSlide === 2 ? 's-bg-white' : 's-bg-[#1E1E1E]']"
            ></span>
          </div>

          <div>
            <h4 class="s-text-lg s-text-white">{{ slide.name }}</h4>
            <p class="s-uppercase s-text-[#ADADAD] s-text-xs">
              {{ slide.title }}
            </p>
          </div>
        </div>
        <div
          class="s-mb-10 md-s:s-mb-0 md:s-h-[600px] md-s:s-h-[750px] s-h-[474px] md-s:s-w-[unset] s-w-full"
        >
          <img
            src="~/assets/images/testimonial.jpeg"
            class="s-w-full s-h-full s-object-cover s-object-center"
            alt="testimonial"
          />
        </div>
      </div>
    </div>
    <img
      src="~/assets/images/landing-page/ribbon.svg"
      class="s-absolute s-left-0 s-bottom-0 s-hidden md-s:s-block"
      alt=""
    />
  </div>
</template>

<script>
import { mapMutations } from 'vuex'

export default {
  data() {
    return {
      slides: [
        {
          name: 'Tofola',
          title: 'Spleet Member',
          image: '',
          text: "Thoroughly enjoyed my Spleet space, ticks all the boxes. 😁",
        },
        {
          name: 'Daniella',
          title: 'Spleet Host',
          image: '',
          text: "It has been such a pleasure hosting a room in my apartment on the Spleet platform and to welcome guests. I have met some great people and made lifelong friendships.",
        },
        {
          name: 'Abraham',
          title: 'Spleet Member',
          image: '',
          text: "I travel a lot and I've had different customer service experiences. Spleet platform is the first time I'm speaking to a pleasant customer service person in Nigeria or anywhere.",
        },
      ],
      visibleSlide: null,
    }
  },
  watch: {
    visibleSlide(newValue) {
      // alert(newValue)
      setTimeout(() => {
        if (this.visibleSlide === 2) {
          this.visibleSlide = 0
        } else {
          this.visibleSlide++
        }
      }, 5000)
    },
  },
  mounted() {
    this.visibleSlide = 0
    window.addEventListener('scroll', this.testimonyInVewport, {
      passive: true,
    })
  },
  destroyed() {
    window.removeEventListener('scroll', this.testimonyInVewport)
  },
  methods: {
    ...mapMutations('website', ['TESTIMONY_IN_VIEW']),
    testimonyInVewport() {
      const rect = this.$refs.testimony.getBoundingClientRect()
      const inView = rect.top < 114 && rect.bottom > 114
      this.TESTIMONY_IN_VIEW(inView)
    },
  },
}
</script>

<style></style>
