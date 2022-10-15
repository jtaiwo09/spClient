<template>
  <div>
    <Loading v-if="!step" />
    <div v-else class="s-mt-7 sm:s-mt-0">
      <div
        class="s-flex s-w-full s-flex-col-reverse sm:s-flex-row s-min-h-[calc(100vh-87px)] sm:s-min-h-fit s-justify-center"
      >
        <div
          class="sm:s-flex-1 sm:s-flex sm:s-items-center s-mt-8 sm:s-mt-0 s-w-full"
        >
          <div class="sm:s-px-[2.25rem] md:s-px-[4.25rem]">
            <div class="">
              <h2
                v-if="propertyId"
                class="title s-mb-5 s-text-[1.875rem] s-leading-[2.375rem]"
              >
                Finish listing your space
              </h2>
              <h2
                v-else
                class="title s-mb-5 s-text-[1.875rem] s-leading-[2.375rem]"
              >
                Awesome work, Michael
              </h2>
              <p
                v-if="propertyId"
                class="sub-title s-mb-6 s-font-normal s-text-sm s-max-w-[25rem] s-text-[#000] sm:s-text-[#77777D]"
              >
                Let’s continue from where you stopped.
              </p>
              <p
                v-else
                class="sub-title s-mb-6 s-font-normal s-text-sm s-max-w-[25rem] s-text-[#000] sm:s-text-[#77777D]"
              >
                {{
                  step === 2
                    ? 'Now let’s finish setting up your '
                    : step === 3
                    ? 'Now let’s finish your '
                    : ''
                }}
                <span class="s-font-bold">{{
                  step === 2
                    ? 'booking information'
                    : step === 3
                    ? 'Identification & KYC.'
                    : null
                }}</span>
                <span v-if="step === 3" class=""
                  >It only takes a few minutes</span
                >
              </p>
              <div class="sm:s-max-w-[25.625rem] s-w-full">
                <div
                  v-if="step >= 1"
                  class="s-w-full s-flex s-items-center s-border s-border-solid s-border-[#E0E3F2] s-px-4 s-py-[0.875rem] s-rounded-[0.625rem] s-cursor-pointer s-mb-3"
                >
                  <div
                    v-if="step === 1"
                    class="s-w-[1.875rem] s-h-[1.875rem] s-rounded-full s-flex s-justify-center s-items-center s-bg-[#DDE0ED] s-border s-border-solid s-border-[#B1B7D6]"
                  ></div>
                  <div
                    v-else
                    class="s-w-[1.875rem] s-h-[1.875rem] s-rounded-full s-flex s-justify-center s-items-center s-bg-[#D1FAE5]"
                  >
                    <TickWhiteIcon fill="#059669" width="14" height="10" />
                  </div>

                  <p
                    class="s-text-xs s-font-semibold s-text-[#222228] s-ml-6 s-flex-1"
                  >
                    Space Details <span v-if="step > 1">- 100%</span>
                    <span v-if="step === 2" class="s-hidden sm:s-inline">
                      {{ ' Complete' }}</span
                    >
                  </p>
                  <p
                    class="s-text-sm s-font-semibold s-text-primary-blue s-mr-4"
                    @click="stepOneEdit"
                  >
                    Edit
                  </p>
                </div>
                <div
                  v-if="step >= 2"
                  class="s-w-full s-flex s-items-center s-border s-border-solid s-border-[#E0E3F2] s-px-4 s-py-[0.875rem] s-rounded-[0.625rem] s-cursor-pointer s-mb-3"
                >
                  <div
                    v-if="step > 2"
                    class="s-w-[1.875rem] s-h-[1.875rem] s-rounded-full s-flex s-justify-center s-items-center s-bg-[#D1FAE5]"
                  >
                    <TickWhiteIcon fill="#059669" width="14" height="10" />
                  </div>
                  <div
                    v-else
                    class="s-w-[1.875rem] s-h-[1.875rem] s-rounded-full s-flex s-justify-center s-items-center s-bg-[#DDE0ED] s-border s-border-solid s-border-[#B1B7D6]"
                  ></div>

                  <p
                    class="s-text-xs s-font-semibold s-text-[#222228] s-ml-6 s-flex-1"
                  >
                    Booking Information <span v-if="step > 2">- 100%</span>
                    <span v-if="step === 3" class="s-hidden sm:s-inline">
                      {{ ' Complete' }}</span
                    >
                  </p>
                  <p
                    class="s-text-sm s-font-semibold s-text-primary-blue s-mr-4"
                    @click="stepTwoEdit"
                  >
                    Edit
                  </p>
                </div>
                <div
                  v-if="step >= 3"
                  class="s-w-full s-flex s-items-center s-border s-border-solid s-border-[#E0E3F2] s-px-4 s-py-[0.875rem] s-rounded-[0.625rem] s-cursor-pointer s-mb-3"
                >
                  <div
                    v-if="step > 3"
                    class="s-w-[1.875rem] s-h-[1.875rem] s-rounded-full s-flex s-justify-center s-items-center s-bg-[#D1FAE5]"
                  >
                    <TickWhiteIcon fill="#059669" width="14" height="10" />
                  </div>
                  <div
                    v-else
                    class="s-w-[1.875rem] s-h-[1.875rem] s-rounded-full s-flex s-justify-center s-items-center s-bg-[#DDE0ED] s-border s-border-solid s-border-[#B1B7D6]"
                  ></div>

                  <p
                    class="s-text-xs s-font-semibold s-text-[#222228] s-ml-6 s-flex-1"
                  >
                    Identification & KYC <span v-if="step > 3">- 100%</span>
                    <span v-if="step > 3" class="s-hidden sm:s-inline">
                      {{ ' Complete' }}</span
                    >
                  </p>
                  <p
                    class="s-text-sm s-font-semibold s-text-primary-blue s-mr-4"
                    @click="submit"
                  >
                    Edit
                  </p>
                </div>
              </div>
              <Button
                class="s-bg-primary-blue s-px-10 s-text-white s-mt-[1.75rem]"
                :text="buttonText"
                @submit="submit"
              />
            </div>
          </div>
        </div>
        <div
          class="s-w-full sm:s-max-w-[50%] lg:s-max-w-[30.25rem] s-rounded-t-2xl sm:s-rounded-none s-overflow-hidden s-hidden sm:s-block"
        >
          <img
            src="https://res.cloudinary.com/spleetng/image/upload/v1654533025/frontend-images/listing-getstarted.jpg"
            alt=""
            class="s-w-full s-h-[13.125rem] sm:s-h-[calc(100vh-12.375rem)] s-object-cover"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions, mapState, mapMutations } from 'vuex'
export default {
  name: 'IndexPage',
  layout: 'listing-body',
  data() {
    return {
      propertyId: '',
    }
  },
  computed: {
    ...mapState('host/listing', ['step', 'currentLevel', 'listedSpace']),
    list() {
      return [
        'Minimun of 12 hours power supply',
        '24-hour security',
        'Stand by Facility Manager/On-Call Security Guard',
        'Treated water and waste disposal ',
      ]
    },
    buttonText() {
      if (this.step === 1) return 'Space Details'
      else if (this.step === 2) return 'Set Up Booking'
      else return 'Finish KYC'
    },
  },
  watch: {
    listedSpace: 'getListingById',
  },
  mounted() {
    this.propertyId = this.$route.query.id
    // this.next = this.$route.query.next
    if (this.propertyId) {
      localStorage.setItem('propertyId', JSON.stringify(this.propertyId))
    }
    try {
      this.getPropertySetUp()
    } catch (error) {
      this.$errorHandler(error)
    }
  },
  methods: {
    ...mapActions('host/listing', ['getPropertySetUp']),
    ...mapMutations('host/listing', [
      'UPDATE_LEVEL',
      'UPDATE_STEP',
      'CURRENT_POSITION',
    ]),
    getListingById() {
      this.CURRENT_POSITION(this.propertyId)
    },
    stepOneEdit() {
      location.href = '/host/listing/space-details?step=1&level=1'
    },
    stepTwoEdit() {
      location.href = '/host/listing/booking?step=2&level=1'
    },
    submit() {
      if (this.step === 1) {
        if (this.propertyId) {
          this.$router.push({
            name: 'host-listing-space-details',
            query: { step: this.step, level: this.currentLevel },
          })
        } else {
          this.$router.push({
            name: 'host-listing-space-details',
            query: { step: 2, level: 1 },
          })
        }
      } else if (this.step === 2) {
        if (this.propertyId) {
          this.$router.push({
            name: 'host-listing-booking',
            query: { step: this.step, level: this.currentLevel },
          })
        } else {
          this.$router.push({
            name: 'host-listing-booking',
            query: { step: 2, level: 1 },
          })
        }
      } else if (this.step === 3) {
        if (this.propertyId) {
          this.$router.push({
            name: 'host-listing-kyc',
            query: { step: this.step, level: this.currentLevel },
          })
        } else {
          this.$router.push({
            name: 'host-listing-kyc',
            query: { step: 3, level: 1 },
          })
        }
      }
    },
  },
}
</script>
