<template>
  <div class="s-mt-7 sm:s-mt-0">
    <h2 class="title s-mb-5 s-text-5 sm:s-hidden">List your space</h2>
    <div
      class="s-flex s-w-full sm:s-h-[calc(100vh-12.375rem)] s-flex-col-reverse sm:s-flex-row"
    >
      <div class="sm:s-flex-1 sm:s-flex sm:s-items-center s-mt-8 sm:s-mt-0">
        <div class="sm:s-px-[2.25rem] md:s-px-[4.25rem]">
          <h2
            class="title s-mb-5 s-text-[1.875rem] s-leading-[2.375rem] s-hidden sm:s-block"
          >
            List your space
          </h2>
          <p
            class="sub-title s-mb-6 s-max-w-[25rem] s-text-[#000] sm:s-text-[#77777D]"
          >
            Please make sure you have the following in your space to be eligible
            for approval
          </p>
          <ul class="s-mb-7 sm:s-mb-10 !s-list-disc">
            <li
              v-for="(item, i) in list"
              :key="i"
              class="sub-title s-text-[#000] sm:s-text-[#77777D] s-flex s-items-center s-mb-2"
            >
              <div class="s-w-[15px] s-mr-2">
                <Dot />
              </div>
              <span class="">{{ item }}</span>
            </li>
          </ul>
          <p class="s-text-sm sm:s-text-[#77777D]">
            By proceeding you agree with our
            <Nuxt-Link
              class="s-text-primary-blue s-underline hover:s-text-primary-blue"
              to="#"
              >Listing Terms of Service</Nuxt-Link
            >
          </p>
          <div class="s-px-5 sm:s-px-0 s-mb-10 sm:s-mb-0">
            <Button
              :class="'s-bg-primary-blue s-w-full sm:s-w-[10rem] s-mt-6 s-text-[#fff]'"
              type="button"
              text="Get Started"
              @submit="startListing"
            >
            </Button>
          </div>
        </div>
      </div>
      <div
        class="s-w-full sm:s-max-w-[50%] lg:s-max-w-[30.25rem] s-rounded-t-2xl sm:s-rounded-none s-overflow-hidden"
      >
        <img
          src="https://res.cloudinary.com/spleetng/image/upload/v1654533025/frontend-images/listing-getstarted.jpg"
          alt=""
          class="s-w-full s-h-[13.125rem] sm:s-h-[calc(100vh-12.375rem)] s-object-cover"
        />
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions } from 'vuex'
export default {
  name: 'IndexPage',
  layout: 'listing-body',
  computed: {
    list() {
      return [
        'Minimun of 12 hours power supply',
        '24-hour security',
        'Stand by Facility Manager/On-Call Security Guard',
        'Treated water and waste disposal ',
      ]
    },
  },
  mounted() {
    localStorage.removeItem('propertyId')
    try {
      this.getPropertySetUp()
    } catch (error) {
      this.$errorHandler(error)
    }
  },
  methods: {
    ...mapActions('host/listing', ['getPropertySetUp']),
    startListing() {
      location.href = '/host/listing/space-details?step=1&level=1'
    },
  },
}
</script>
