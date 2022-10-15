<template>
  <div>
    <Loading v-if="loading" />
    <div v-else class="md-s:!s-min-h-fit">
      <div
        class="s-mb-2 s-px-6 md-x:!s-px-[3.25rem] s-flex s-justify-between s-items-center s-sticky s-top-0 md-s:s-top-2.5 s-h-[100px] s-w-full s-bg-[#fff] s-z-20"
      >
        <div>
          <h2 class="title s-text-[1.25rem] s-mb-0">Subscription & Booking</h2>
          <p class="sub-title !s-leading-[1.375rem] s-text-xs">Discounts</p>
        </div>
        <div class="md-s:s-flex s-hidden">
          <Button
            :class="'s-mr-1.5 s-w-[7.875rem] s-border-2 s-border-solid s-border-primary-blue s-py-2.5 s-font-bold'"
            text="Back"
            text-class="s-text-primary-blue"
            @submit="back"
          />
          <Button
            :class="'s-w-[7.875rem] s-bg-primary-blue  s-py-2.5 s-font-bold s-text-[#fff]'"
            text="Next"
            :loading="loader"
            @submit="next"
          />
        </div>
      </div>
      <div class="s-flex md-s:s-block s-flex-col">
        <div class="s-px-6 md-x:!s-px-[3.25rem]">
          <FormFieldInfo :class="'s-mb-9'">
            You can boost the chance of your space being booked on time by
            applying a certain percentage of your rent as discount.
          </FormFieldInfo>
          <div v-if="listingType === 'shared'">
            <div v-for="room in roomData" :key="room.id">
              <div class="s-relative s-overflow-hidden s-mb-7">
                <div
                  class="s-z-[2] s-sticky s-top-0 s-bg-white s-cursor-pointer s-w-full s-flex s-justify-between s-items-center s-px-5 s-py-2 s-border s-border-solid s-border-[#D5D9EF] s-rounded-[8px]"
                  @click="toggle(room.id)"
                >
                  <p class="s-font-bold s-text-[#222228] s-text-sm">
                    {{ room.name }}
                  </p>
                  <ChevronDownIcon
                    :class="{
                      's-transform s-rotate-180 s-duration-500':
                        show === room.id,
                    }"
                  />
                </div>
                <transition name="slide">
                  <div
                    v-if="show.includes(room.id)"
                    class="s-bg-white s-z-[5] s-px-3 s-py-7"
                  >
                    <div
                      class="sm:s-mb-[2.125rem] s-flex s-flex-col sm:s-flex-row"
                    >
                      <div
                        v-if="monthly"
                        class="s-w-full sm:s-w-1/2 s-mr-3.5 md:s-mr-8 s-mb-[1.375rem] sm:s-mb-0"
                        :class="{ 'sm:!s-w-[48%]': !quarterly }"
                      >
                        <PercentageInput
                          place-holder="0.0%"
                          type="percentage"
                          label="Monthly Discount"
                          :model-value="room.monthly"
                          :class="'s-w-full !s-mb-0'"
                          @update:modelValue="(value) => (room.monthly = value)"
                        />
                      </div>
                      <div
                        v-if="quarterly"
                        class="s-w-full sm:s-w-1/2 s-mb-[1.375rem] sm:s-mb-0"
                        :class="{ 'sm:!s-w-[48%]': !monthly }"
                      >
                        <PercentageInput
                          place-holder="0.0%"
                          type="percentage"
                          label="Quarterly Discount"
                          :model-value="room.quarterly"
                          :class="'s-w-full !s-mb-0'"
                          @update:modelValue="
                            (value) => (room.quarterly = value)
                          "
                        />
                      </div>
                    </div>
                    <div class="s-flex s-flex-col sm:s-flex-row">
                      <div
                        v-if="biannually"
                        class="s-w-full sm:s-w-1/2 sm:s-mr-3.5 md:s-mr-8 s-mb-[1.375rem] sm:s-mb-0"
                        :class="{ 'sm:!s-w-[48%]': !yearly }"
                      >
                        <PercentageInput
                          place-holder="0.0%"
                          type="percentage"
                          label="Biannual Discount"
                          :model-value="room.biannually"
                          :class="'s-w-full !s-mb-0'"
                          @update:modelValue="
                            (value) => (room.biannually = value)
                          "
                        />
                      </div>
                      <div
                        v-if="yearly"
                        class="s-flex-1 s-mb-[1.375rem] sm:s-mb-0"
                        :class="{ 'sm:!s-w-[48%]': !biannually }"
                      >
                        <PercentageInput
                          place-holder="0.0%"
                          type="percentage"
                          label="Yearly Discount"
                          :model-value="room.yearly"
                          :class="'s-w-full !s-mb-0'"
                          @update:modelValue="(value) => (room.yearly = value)"
                        />
                      </div>
                    </div>
                  </div>
                </transition>
              </div>
            </div>
          </div>
          <div v-if="listingType === 'entire'">
            <div class="s-flex s-flex-col sm:s-flex-row">
              <div
                v-if="monthly"
                class="s-w-full sm:s-w-1/2 sm:s-mr-3.5 md:s-mr-8 s-mb-9"
                :class="{ 'sm:!s-w-[48%]': !quarterly }"
              >
                <PercentageInput
                  placeholder="0.0%"
                  type="percentage"
                  label="Monthly Discount"
                  :model-value="monthlyEntire"
                  :class="'s-w-full'"
                  @update:modelValue="(value) => (monthlyEntire = value)"
                />
              </div>
              <div
                v-if="quarterly"
                class="s-w-full sm:s-w-1/2 s-mb-9"
                :class="{ 'sm:!s-w-[48%]': !monthly }"
              >
                <PercentageInput
                  placeholder="0.0%"
                  type="percentage"
                  label="Quarterly Discount"
                  :model-value="quarterlyEntire"
                  :class="'s-w-full'"
                  @update:modelValue="(value) => (quarterlyEntire = value)"
                />
              </div>
            </div>
            <div class="s-flex s-flex-col sm:s-flex-row">
              <div
                v-if="biannually"
                class="s-w-full sm:s-w-1/2 sm:s-mr-3.5 md:s-mr-8 s-mb-9"
                :class="{ 'sm:!s-w-[48%]': !yearly }"
              >
                <PercentageInput
                  placeholder="0.0%"
                  type="percentage"
                  label="Biannual Discount"
                  :model-value="biannualEntire"
                  :class="'s-w-full'"
                  @update:modelValue="(value) => (biannualEntire = value)"
                />
              </div>
              <div
                v-if="yearly"
                class="s-w-full sm:s-w-1/2 s-mb-9"
                :class="{ 'sm:!s-w-[48%]': !biannually }"
              >
                <PercentageInput
                  placeholder="0.0%"
                  type="percentage"
                  label="Yearly Discount"
                  :model-value="yearlyEntire"
                  :class="'s-w-full'"
                  @update:modelValue="(value) => (yearlyEntire = value)"
                />
              </div>
            </div>
          </div>
          <div v-if="listingType === 'both'">
            <div v-for="room in roomData" :key="room.id">
              <div class="s-relative s-overflow-hidden s-mb-7">
                <div
                  class="s-z-[2] s-sticky s-top-0 s-bg-white s-cursor-pointer s-w-full s-flex s-justify-between s-items-center s-px-5 s-py-2 s-border s-border-solid s-border-[#D5D9EF] s-rounded-[8px]"
                  @click="toggle(room.id)"
                >
                  <p class="s-font-bold s-text-[#222228] s-text-sm">
                    {{ room.name }}
                  </p>
                  <ChevronDownIcon
                    :class="{
                      's-transform s-rotate-180 s-duration-500':
                        show === room.id,
                    }"
                  />
                </div>
                <transition name="slide">
                  <div
                    v-if="show.includes(room.id)"
                    class="s-bg-white s-z-[5] s-px-3 s-py-7"
                  >
                    <div
                      class="sm:s-mb-[2.125rem] s-flex s-flex-col sm:s-flex-row"
                    >
                      <div
                        v-if="monthly"
                        class="s-w-full sm:s-w-1/2 s-mr-3.5 md:s-mr-8 s-mb-[1.375rem] sm:s-mb-0"
                        :class="{ 'sm:!s-w-[48%]': !quarterly }"
                      >
                        <PercentageInput
                          place-holder="0.0%"
                          type="percentage"
                          label="Monthly Discount"
                          :model-value="room.monthly"
                          :class="'s-w-full !s-mb-0'"
                          @update:modelValue="(value) => (room.monthly = value)"
                        />
                      </div>
                      <div
                        v-if="quarterly"
                        class="s-w-full sm:s-w-1/2 s-mb-[1.375rem] sm:s-mb-0"
                        :class="{ 'sm:!s-w-[48%]': !monthly }"
                      >
                        <PercentageInput
                          place-holder="0.0%"
                          type="percentage"
                          label="Quarterly Discount"
                          :model-value="room.quarterly"
                          :class="'s-w-full !s-mb-0'"
                          @update:modelValue="
                            (value) => (room.quarterly = value)
                          "
                        />
                      </div>
                    </div>
                    <div class="s-flex s-flex-col sm:s-flex-row">
                      <div
                        v-if="biannually"
                        class="s-w-full sm:s-w-1/2 sm:s-mr-3.5 md:s-mr-8 s-mb-[1.375rem] sm:s-mb-0"
                        :class="{ 'sm:!s-w-[48%]': !yearly }"
                      >
                        <PercentageInput
                          place-holder="0.0%"
                          type="percentage"
                          label="Biannual Discount"
                          :model-value="room.biannually"
                          :class="'s-w-full !s-mb-0'"
                          @update:modelValue="
                            (value) => (room.biannually = value)
                          "
                        />
                      </div>
                      <div
                        v-if="yearly"
                        class="s-flex-1 s-mb-[1.375rem] sm:s-mb-0"
                        :class="{ 'sm:!s-w-[48%]': !biannually }"
                      >
                        <PercentageInput
                          place-holder="0.0%"
                          type="percentage"
                          label="Yearly Discount"
                          :model-value="room.yearly"
                          :class="'s-w-full !s-mb-0'"
                          @update:modelValue="(value) => (room.yearly = value)"
                        />
                      </div>
                    </div>
                  </div>
                </transition>
              </div>
            </div>
            <div>
              <div class="s-flex s-flex-col sm:s-flex-row">
                <div
                  v-if="monthly"
                  class="s-w-full sm:s-w-1/2 sm:s-mr-3.5 md:s-mr-8 s-mb-9"
                  :class="{ 'sm:!s-w-[48%]': !quarterly }"
                >
                  <PercentageInput
                    placeholder="0.0%"
                    type="percentage"
                    label="Monthly Discount"
                    :model-value="monthlyEntire"
                    :class="'s-w-full'"
                    @update:modelValue="(value) => (monthlyEntire = value)"
                  />
                </div>
                <div
                  v-if="quarterly"
                  class="s-w-full sm:s-w-1/2 s-mb-9"
                  :class="{ 'sm:!s-w-[48%]': !monthly }"
                >
                  <PercentageInput
                    placeholder="0.0%"
                    type="percentage"
                    label="Quarterly Discount"
                    :model-value="quarterlyEntire"
                    :class="'s-w-full'"
                    @update:modelValue="(value) => (quarterlyEntire = value)"
                  />
                </div>
              </div>
              <div class="s-flex s-flex-col sm:s-flex-row">
                <div
                  v-if="biannually"
                  class="s-w-full sm:s-w-1/2 sm:s-mr-3.5 md:s-mr-8 s-mb-9"
                  :class="{ 'sm:!s-w-[48%]': !yearly }"
                >
                  <PercentageInput
                    placeholder="0.0%"
                    type="percentage"
                    label="Biannual Discount"
                    :model-value="biannualEntire"
                    :class="'s-w-full'"
                    @update:modelValue="(value) => (biannualEntire = value)"
                  />
                </div>
                <div
                  v-if="yearly"
                  class="s-w-full sm:s-w-1/2 s-mb-9"
                  :class="{ 'sm:!s-w-[48%]': !biannually }"
                >
                  <PercentageInput
                    placeholder="0.0%"
                    type="percentage"
                    label="Yearly Discount"
                    :model-value="yearlyEntire"
                    :class="'s-w-full'"
                    @update:modelValue="(value) => (yearlyEntire = value)"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
        <div
          class="border s-mt-auto s-flex s-justify-end md-s:s-hidden s-py-5 s-border-t s-border-solid sm:s-border-0 s-fixed s-bottom-0 s-w-full s-pr-4 s-left-0 s-bg-white"
        >
          <Button
            :class="'s-mr-1.5 s-w-[7.875rem] s-border-2 s-border-solid s-border-primary-blue s-py-2.5 s-font-bold'"
            text="Back"
            text-class="s-text-primary-blue"
            @submit="back"
          />
          <Button
            :class="'s-w-[7.875rem] s-bg-primary-blue s-py-2.5 s-font-bold s-text-[#fff]'"
            text="Next"
            :loading="loader"
            @submit="next"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters, mapMutations, mapState } from 'vuex'

export default {
  data() {
    return {
      loading: false,
      loader: false,
      editMode: false,
      show: [],
      roomData: [],
      monthlyEntire: '',
      quarterlyEntire: '',
      biannualEntire: '',
      yearlyEntire: '',
      pricingId: {},
      error: null,
    }
  },
  computed: {
    ...mapState('host/listing', [
      'subPlan',
      'listingType',
      'listedSpace',
      'rooms',
      'propertyListingId',
    ]),
    ...mapGetters('host/listing', [
      'monthly',
      'biannually',
      'quarterly',
      'yearly',
    ]),
  },
  watch: {
    rooms: {
      handler() {
        this.assignDiscountInRoom()
      },
      immediate: true,
    },
  },
  async mounted() {
    await this.getAllRooms()
  },
  methods: {
    ...mapActions('host/listing', ['getListingDetail', 'updateDiscount']),
    ...mapMutations('host/listing', ['SET_ROOMS', 'UPDATE_LIST_TYPE']),
    getDiscountFromRooms(room, subPlan) {
      if (
        room.prices?.some(
          (el) => el.sub_plan === subPlan && el.listing_type === 'shared'
        )
      )
        return room.prices?.find((el) => el.sub_plan === subPlan)
          .percentageDiscount
      else return '0.0'
    },
    async getAllRooms() {
      this.loading = true
      try {
        const response = await this.getListingDetail()
        this.loading = false
        if (response.data.statusCode === 200) {
          const data = response.data.data
          this.SET_ROOMS(data)
          data.listingType && this.UPDATE_LIST_TYPE(data.listingType)
        }
      } catch (error) {
        this.loading = false
        this.$errorHandler(error)
      }
    },
    convertToNumber(str) {
      const newStr = str.replace('%', '')
      return Number(newStr)
    },
    toggle(id) {
      if (!this.show.includes(id)) {
        this.show.push(id)
      } else {
        this.show = this.show.filter((showId) => showId !== id)
      }
    },
    back() {
      this.$router.push({
        name: 'host-listing-booking',
        query: { step: 2, level: 2 },
      })
    },
    assignDiscountInRoom() {
      if (this.rooms.listingType === 'shared') {
        this.roomData = this.rooms.discount?.map((room) => {
          const pricingId = {}
          room.prices.forEach((el) => {
            if (el.listing_type === 'shared') {
              if (el.sub_plan === 'monthly') {
                pricingId.monthly = el.id
              } else if (el.sub_plan === 'quarterly') {
                pricingId.quarterly = el.id
              } else if (el.sub_plan === 'biannual') {
                pricingId.biannually = el.id
              } else if (el.sub_plan === 'yearly') {
                pricingId.yearly = el.id
              }
            }
          })
          return {
            id: room.id,
            name: room.name,
            pricingId,
            monthly: this.getDiscountFromRooms(room, 'monthly'),
            quarterly: this.getDiscountFromRooms(room, 'quarterly'),
            biannually: this.getDiscountFromRooms(room, 'biannual'),
            yearly: this.getDiscountFromRooms(room, 'yearly'),
          }
        })
      }
      if (this.rooms.listingType === 'entire') {
        this.rooms.discount?.forEach((room) => {
          switch (room.sub_plan) {
            case 'monthly':
              this.monthlyEntire = room.percentageDiscount
              this.pricingId.monthly = room.id
              break
            case 'quarterly':
              this.quarterlyEntire = room.percentageDiscount
              this.pricingId.quarterly = room.id
              break
            case 'biannual':
              this.biannualEntire = room.percentageDiscount
              this.pricingId.biannual = room.id
              break
            case 'yearly':
              this.yearlyEntire = room.percentageDiscount
              this.pricingId.yearly = room.id
              break
            default:
              break
          }
        })
      }
      if (this.rooms.listingType === 'both') {
        const { sharedBedroomPicingDiscount, entireListingPricingDiscount } =
          this.rooms

        entireListingPricingDiscount?.forEach((room) => {
          switch (room.sub_plan) {
            case 'monthly':
              this.monthlyEntire = room.percentageDiscount
              this.pricingId.monthly = room.id
              break
            case 'quarterly':
              this.quarterlyEntire = room.percentageDiscount
              this.pricingId.quarterly = room.id
              break
            case 'biannual':
              this.biannualEntire = room.percentageDiscount
              this.pricingId.biannual = room.id
              break
            case 'yearly':
              this.yearlyEntire = room.percentageDiscount
              this.pricingId.yearly = room.id
              break
            default:
              break
          }
        })

        this.roomData = sharedBedroomPicingDiscount?.map((room) => {
          const pricingId = {}
          room.prices.forEach((el) => {
            if (el.listing_type === 'shared') {
              if (el.sub_plan === 'monthly') {
                pricingId.monthly = el.id
              } else if (el.sub_plan === 'quarterly') {
                pricingId.quarterly = el.id
              } else if (el.sub_plan === 'biannual') {
                pricingId.biannually = el.id
              } else if (el.sub_plan === 'yearly') {
                pricingId.yearly = el.id
              }
            }
          })
          return {
            id: room.id,
            name: room.name,
            pricingId,
            monthly: this.getDiscountFromRooms(room, 'monthly'),
            quarterly: this.getDiscountFromRooms(room, 'quarterly'),
            biannually: this.getDiscountFromRooms(room, 'biannual'),
            yearly: this.getDiscountFromRooms(room, 'yearly'),
          }
        })
      }
    },
    async next() {
      const data = {}
      data.property_listing_id = this.propertyListingId
      data.discounts = []
      if (this.rooms.listingType === 'shared') {
        this.roomData.forEach((room) => {
          if (this.monthly) {
            data.discounts.push({
              pricingId: room.pricingId.monthly,
              percentageDiscount: this.convertToNumber(room.monthly),
            })
          }
          if (this.quarterly) {
            data.discounts.push({
              pricingId: room.pricingId.quarterly,
              percentageDiscount: this.convertToNumber(room.quarterly),
            })
          }
          if (this.biannually) {
            data.discounts.push({
              pricingId: room.pricingId.biannually,
              percentageDiscount: this.convertToNumber(room.biannually),
            })
          }
          if (this.yearly) {
            data.discounts.push({
              pricingId: room.pricingId.yearly,
              percentageDiscount: this.convertToNumber(room.yearly),
            })
          }
        })
      } else if (this.rooms.listingType === 'entire') {
        if (this.monthly) {
          data.discounts.push({
            percentageDiscount: this.convertToNumber(this.monthlyEntire),
            pricingId: this.pricingId.monthly,
          })
        }
        if (this.quarterly) {
          data.discounts.push({
            percentageDiscount: this.convertToNumber(this.quarterlyEntire),
            pricingId: this.pricingId.quarterly,
          })
        }
        if (this.biannually) {
          data.discounts.push({
            percentageDiscount: this.convertToNumber(this.biannualEntire),
            pricingId: this.pricingId.biannual,
          })
        }
        if (this.yearly) {
          data.discounts.push({
            percentageDiscount: this.convertToNumber(this.yearlyEntire),
            pricingId: this.pricingId.yearly,
          })
        }
      } else if (this.listingType === 'both') {
        // Shared
        this.roomData.forEach((room) => {
          if (this.monthly) {
            data.discounts.push({
              pricingId: room.pricingId.monthly,
              percentageDiscount: this.convertToNumber(room.monthly),
            })
          }
          if (this.quarterly) {
            data.discounts.push({
              pricingId: room.pricingId.quarterly,
              percentageDiscount: this.convertToNumber(room.quarterly),
            })
          }
          if (this.biannually) {
            data.discounts.push({
              pricingId: room.pricingId.biannually,
              percentageDiscount: this.convertToNumber(room.biannually),
            })
          }
          if (this.yearly) {
            data.discounts.push({
              pricingId: room.pricingId.yearly,
              percentageDiscount: this.convertToNumber(room.yearly),
            })
          }
        })

        // Entire
        if (this.monthly) {
          data.discounts.push({
            percentageDiscount: this.convertToNumber(this.monthlyEntire),
            pricingId: this.pricingId.monthly,
          })
        }
        if (this.quarterly) {
          data.discounts.push({
            percentageDiscount: this.convertToNumber(this.quarterlyEntire),
            pricingId: this.pricingId.quarterly,
          })
        }
        if (this.biannually) {
          data.discounts.push({
            percentageDiscount: this.convertToNumber(this.biannualEntire),
            pricingId: this.pricingId.biannual,
          })
        }
        if (this.yearly) {
          data.discounts.push({
            percentageDiscount: this.convertToNumber(this.yearlyEntire),
            pricingId: this.pricingId.yearly,
          })
        }
      }
      this.loader = true
      try {
        const response = await this.updateDiscount(data)
        this.loader = false
        if (response.data.statusCode === 200) {
          this.$router.push({
            name: 'host-listing-booking',
            query: { step: 2, level: 4 },
          })
        }
      } catch (error) {
        this.loader = false
        this.$errorHandler(error)
      }
    },
  },
}
</script>

<style lang="scss" scoped>
.slide-enter-active,
.slide-leave-active {
  transition: all 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275);
}
.slide-enter {
  transform: translateY(-100%);
}
.slide-enter-to {
  transform: translateY(0);
}
.slide-leave-to {
  transform: translateY(-100%);
}
</style>
