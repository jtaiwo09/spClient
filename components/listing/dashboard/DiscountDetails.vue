<template>
  <MoreInfoModal
    :new-class="'s-px-5 s-relative sm:s-px-7 s-pb-16  md-x:s-w-[647px] sm:s-w-[532px] s-min-w-[375px] s-w-full'"
    @cancel="closeForm"
  >
    <Loading v-if="loader" :class="'s-absolute'" />
    <transition>
      <div v-if="data" class="s-max-w-fit">
        <div
          class="s-flex s-justify-end s-sticky s-top-0 s-bg-white s-z-10 s-py-7"
        >
          <Button
            :text="'Cancel'"
            class="s-outline s-outline-primary-blue !s-text-primary-blue s-text-sm s-leading-[18px] s-font-bold s-px-10 s-mr-2 sm:s-mt-0 s-rounded-full sm:s-py-[15px] s-py-[8px]"
            @submit="closeForm"
          />
          <Button
            :text="'Update'"
            :loading="loading"
            class="s-bg-primary-blue s-text-sm s-leading-[18px] s-text-white s-font-bold s-px-10 s-mr-2 s-rounded-full sm:s-py-[15px] s-py-[12px]"
            @submit="submitForm"
          />
        </div>
        <div class="s-mt-3">
          <h1
            class="s-text-[#121212] s-mb-1.5 sm:s-text-xl s-text-lg s-leading-6 s-font-bold"
          >
            Booking Information >
            <span class="s-text-[#2E48DA]">Discounts</span>
          </h1>
          <p class="s-text-sm s-font-normal s-text-[#242428] s-leading-5">
            Update information about your space here
          </p>
        </div>
        <div class="s-mt-10 s-px-0.5">
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
      </div>
    </transition>
  </MoreInfoModal>
</template>

<script>
import { mapActions, mapMutations, mapState } from 'vuex'

export default {
  data() {
    return {
      loading: false,
      show: [],
      roomData: [],
      monthlyEntire: '',
      quarterlyEntire: '',
      biannualEntire: '',
      yearlyEntire: '',
      pricingId: {},
      error: null,
      data: null,
      monthly: false,
      biannually: false,
      quarterly: false,
      yearly: false,
    }
  },
  computed: {
    ...mapState('host/listing', [
      'subPlan',
      'listingType',
      'listedSpace',
      'rooms',
      'propertyListingId',
      'loader',
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
    closeForm() {
      this.$emit('cancel')
    },
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
      try {
        const response = await this.getListingDetail()
        if (response.data.statusCode === 200) {
          this.data = response.data.data
          this.SET_ROOMS(this.data)
          this.data.listingType && this.UPDATE_LIST_TYPE(this.data.listingType)
        }
      } catch (error) {
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
    assignDiscountInRoom() {
      if (this.rooms.listingType === 'shared') {
        this.roomData = this.rooms.discount?.map((room) => {
          const pricingId = {}
          room.prices.forEach((el) => {
            if (el.listing_type === 'shared') {
              if (el.sub_plan === 'monthly') {
                pricingId.monthly = el.id
                this.monthly = true
              } else if (el.sub_plan === 'quarterly') {
                pricingId.quarterly = el.id
                this.quarterly = true
              } else if (el.sub_plan === 'biannual') {
                pricingId.biannually = el.id
                this.biannually = true
              } else if (el.sub_plan === 'yearly') {
                pricingId.yearly = el.id
                this.yearly = true
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
              this.monthly = true
              break
            case 'quarterly':
              this.quarterlyEntire = room.percentageDiscount
              this.pricingId.quarterly = room.id
              this.quarterly = true
              break
            case 'biannual':
              this.biannualEntire = room.percentageDiscount
              this.pricingId.biannual = room.id
              this.biannually = true
              break
            case 'yearly':
              this.yearlyEntire = room.percentageDiscount
              this.pricingId.yearly = room.id
              this.yearly = true
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
              this.monthly = true
              break
            case 'quarterly':
              this.quarterlyEntire = room.percentageDiscount
              this.pricingId.quarterly = room.id
              this.quarterly = true
              break
            case 'biannual':
              this.biannualEntire = room.percentageDiscount
              this.pricingId.biannual = room.id
              this.biannually = true
              break
            case 'yearly':
              this.yearlyEntire = room.percentageDiscount
              this.pricingId.yearly = room.id
              this.yearly = true
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
                this.monthly = true
              } else if (el.sub_plan === 'quarterly') {
                pricingId.quarterly = el.id
                this.quarterly = true
              } else if (el.sub_plan === 'biannual') {
                pricingId.biannually = el.id
                this.biannually = true
              } else if (el.sub_plan === 'yearly') {
                pricingId.yearly = el.id
                this.yearly = true
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
    async submitForm() {
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
      this.loading = true
      try {
        const response = await this.updateDiscount(data)
        this.loading = false
        if (response.data.statusCode === 200) {
          this.closeForm()
        }
      } catch (error) {
        this.loading = false
        this.$errorHandler(error)
      }
    },
  },
}
</script>

<style lang="scss" scoped>
.v-enter-active,
.v-leave-active {
  transition: all 1s ease;
}

.v-enter,
.v-leave-to {
  opacity: 0;
  transform: translateX(100px);
}

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
