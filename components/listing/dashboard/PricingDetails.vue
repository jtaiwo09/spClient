<template>
  <MoreInfoModal
    :new-class="'s-px-5 s-relative sm:s-px-7 s-pb-16  md-x:s-w-[647px] sm:s-w-[532px] s-min-w-[375px] s-w-full'"
    @cancel="closeForm"
  >
    <Loading v-if="loader" :class="'s-absolute'" />
    <transition>
      <div class="s-min-w-fit">
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
            <span class="s-text-[#2E48DA]">Pricing</span>
          </h1>
          <p class="s-text-sm s-font-normal s-text-[#242428] s-leading-5">
            Update information about your space here
          </p>
        </div>
        <div class="s-mt-10 s-px-0.5">
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
                      's-transform s-rotate-180 s-duration-200': show.includes(
                        room.id
                      ),
                    }"
                  />
                </div>
                <transition name="slide" mode="out-in">
                  <div
                    v-if="show.includes(room.id)"
                    class="s-bg-white s-z-[5] s-px-3 s-pt-7"
                  >
                    <div
                      v-if="monthly"
                      class="s-mb-[1.375rem] sm:s-mr-3.5 md:s-mr-8 sm:s-w-1/2"
                    >
                      <CurrencyInput
                        label="What is the monthly rent only of this unit?"
                        placeholder="₦ 0.00"
                        :class="'s-w-full'"
                        :model-value="room.monthly"
                        @update:modelValue="(value) => (room.monthly = value)"
                      />
                      <FormFieldInfo :class="'s-mt-4'">
                        Please note that the cost for the fields below is
                        automatically calculated based on your input here. You
                        can make adjustments as preferred.
                      </FormFieldInfo>
                    </div>
                    <div class="s-flex s-flex-col sm:s-flex-row">
                      <div
                        v-if="quarterly"
                        class="s-w-full sm:s-w-1/2 sm:s-mr-3.5 md:s-mr-8 s-mb-[1.375rem]"
                      >
                        <CurrencyInput
                          label="Quarterly Rent"
                          placeholder="₦ 0.00"
                          :class="'s-w-full !s-mb-0'"
                          :model-value="room.quarterly"
                          @update:modelValue="
                            (value) => (room.quarterly = value)
                          "
                        />
                      </div>
                      <div
                        v-if="biannually"
                        class="s-w-full sm:s-w-1/2 s-mb-[1.375rem]"
                      >
                        <CurrencyInput
                          label="Biannual Rent"
                          placeholder="₦ 0.00"
                          :class="'s-w-full'"
                          :model-value="room.biannually"
                          @update:modelValue="
                            (value) => (room.biannually = value)
                          "
                        />
                      </div>
                    </div>
                    <div
                      v-if="yearly"
                      class="s-mb-[1.375rem] sm:s-mr-3.5 md:s-mr-8 sm:s-w-1/2"
                    >
                      <CurrencyInput
                        label="Annual Rent"
                        placeholder="₦ 0.00"
                        :class="'s-w-full'"
                        :model-value="room.yearly"
                        @update:modelValue="(value) => (room.yearly = value)"
                      />
                    </div>
                  </div>
                </transition>
              </div>
            </div>
          </div>
          <div v-if="listingType === 'entire'">
            <div>
              <div class="s-mb-9 sm:s-mr-3.5 md:s-mr-8 s-w-full sm:s-w-1/2">
                <CurrencyInput
                  label="What is the monthly rent of this entire unit?"
                  placeholder="₦ 0.00"
                  :class="'s-w-full'"
                  :model-value="monthlyEntire"
                  @update:modelValue="(value) => (monthlyEntire = value)"
                />
                <FormFieldInfo>
                  Please note that the cost for other fields is automatically
                  calculated for based on this, you can also make adjustments
                </FormFieldInfo>
              </div>
              <div class="s-flex s-flex-col sm:s-flex-row">
                <div
                  v-if="quarterly"
                  class="s-mb-9 sm:s-mr-3.5 md:s-mr-8 sm:s-w-1/2 s-w-full"
                >
                  <CurrencyInput
                    label="Quarterly Rent"
                    placeholder="₦ 0.00"
                    :class="'s-w-full'"
                    :model-value="quarterlyEntire"
                    @update:modelValue="(value) => (quarterlyEntire = value)"
                  />
                </div>
                <div v-if="biannually" class="s-mb-9 sm:s-w-1/2 s-w-full">
                  <CurrencyInput
                    label="Biannual Rent"
                    placeholder="₦ 0.00"
                    :class="'s-w-full'"
                    :model-value="biannualEntire"
                    @update:modelValue="(value) => (biannualEntire = value)"
                  />
                </div>
              </div>
              <div v-if="yearly" class="s-flex s-flex-col sm:s-flex-row">
                <div class="s-mb-9 s-flex-1">
                  <CurrencyInput
                    label="Annual Rent"
                    placeholder="₦ 0.00"
                    :class="'s-w-full sm:s-w-1/2'"
                    :model-value="yearlyEntire"
                    @update:modelValue="(value) => (yearlyEntire = value)"
                  />
                </div>
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
                      's-transform s-rotate-180 s-duration-200': show.includes(
                        room.id
                      ),
                    }"
                  />
                </div>
                <transition name="slide" mode="out-in">
                  <div
                    v-if="show.includes(room.id)"
                    class="s-bg-white s-z-[5] s-px-3 s-pt-7"
                  >
                    <div
                      v-if="monthly"
                      class="s-mb-[1.375rem] sm:s-mr-3.5 md:s-mr-8 sm:s-w-1/2"
                    >
                      <CurrencyInput
                        label="What is the monthly rent of this entire unit?"
                        placeholder="₦ 0.00"
                        :model-value="room.monthly"
                        @update:modelValue="(value) => (room.monthly = value)"
                      />
                      <FormFieldInfo :class="'s-mt-4'">
                        Please note that the cost for the fields below is
                        automatically calculated based on your input here. You
                        can make adjustments as preferred.
                      </FormFieldInfo>
                    </div>
                    <div class="s-flex s-flex-col sm:s-flex-row">
                      <div
                        v-if="quarterly"
                        class="s-w-full sm:s-w-1/2 sm:s-mr-3.5 md:s-mr-8 s-mb-[1.375rem]"
                      >
                        <CurrencyInput
                          label="Quarterly Rent"
                          placeholder="₦ 0.00"
                          :model-value="room.quarterly"
                          @update:modelValue="
                            (value) => (room.quarterly = value)
                          "
                        />
                      </div>
                      <div
                        v-if="biannually"
                        class="s-w-full sm:s-w-1/2 s-mb-[1.375rem]"
                      >
                        <CurrencyInput
                          label="Biannual Rent"
                          placeholder="₦ 0.00"
                          :model-value="room.biannually"
                          @update:modelValue="
                            (value) => (room.biannually = value)
                          "
                        />
                      </div>
                    </div>
                    <div
                      v-if="yearly"
                      class="s-mb-[1.375rem] sm:s-mr-3.5 md:s-mr-8 sm:s-w-1/2"
                    >
                      <CurrencyInput
                        label="Annual Rent"
                        placeholder="₦ 0.00"
                        :model-value="room.yearly"
                        @update:modelValue="(value) => (room.yearly = value)"
                      />
                    </div>
                  </div>
                </transition>
              </div>
            </div>
            <div>
              <div class="s-mb-9 sm:s-mr-3.5 md:s-mr-8 s-w-full sm:s-w-1/2">
                <CurrencyInput
                  label="What is the monthly rent of this entire unit?"
                  placeholder="₦ 0.00"
                  :class="'s-w-full'"
                  :model-value="monthlyEntire"
                  @update:modelValue="(value) => (monthlyEntire = value)"
                />
                <FormFieldInfo>
                  Please note that the cost for other fields is automatically
                  calculated for based on this, you can also make adjustments
                </FormFieldInfo>
              </div>
              <div class="s-flex s-flex-col sm:s-flex-row">
                <div
                  v-if="quarterly"
                  class="s-mb-9 sm:s-mr-3.5 md:s-mr-8 sm:s-w-1/2 s-w-full"
                >
                  <CurrencyInput
                    label="Quarterly Rent"
                    placeholder="₦ 0.00"
                    :class="'s-w-full'"
                    :model-value="quarterlyEntire"
                    @update:modelValue="(value) => (quarterlyEntire = value)"
                  />
                </div>
                <div v-if="biannually" class="s-mb-9 sm:s-w-1/2 s-w-full">
                  <CurrencyInput
                    label="Biannual Rent"
                    placeholder="₦ 0.00"
                    :class="'s-w-full'"
                    :model-value="biannualEntire"
                    @update:modelValue="(value) => (biannualEntire = value)"
                  />
                </div>
              </div>
              <div v-if="yearly" class="s-flex s-flex-col sm:s-flex-row">
                <div class="s-mb-9 s-flex-1">
                  <CurrencyInput
                    label="Annual Rent"
                    placeholder="₦ 0.00"
                    :class="'s-w-full sm:s-w-1/2'"
                    :model-value="yearlyEntire"
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
    fillAll() {
      if (this.listingType === 'shared') {
        const checkEmpty = []
        this.roomData?.forEach((room) => {
          if (this.monthly) {
            if (room.monthly === '') checkEmpty.push(false)
            else checkEmpty.push(true)
          }
          if (this.quarterly) {
            if (room.quarterly === '') checkEmpty.push(false)
            else checkEmpty.push(true)
          }
          if (this.biannually) {
            if (room.biannually === '') checkEmpty.push(false)
            else checkEmpty.push(true)
          }
          if (this.yearly) {
            if (room.yearly === '') checkEmpty.push(false)
            else checkEmpty.push(true)
          }
        })
        return checkEmpty.every((val) => val === true)
      } else if (this.listingType === 'entire') {
        const checkEmpty = []
        if (this.monthly) {
          if (this.monthlyEntire === '') checkEmpty.push(false)
          else checkEmpty.push(true)
        }
        if (this.quarterly) {
          if (this.quarterlyEntire === '') checkEmpty.push(false)
          else checkEmpty.push(true)
        }
        if (this.biannually) {
          if (this.biannualEntire === '') checkEmpty.push(false)
          else checkEmpty.push(true)
        }
        if (this.yearly) {
          if (this.yearlyEntire === '') checkEmpty.push(false)
          else checkEmpty.push(true)
        }
        return checkEmpty.every((val) => val === true)
      } else {
        const checkEmpty = []
        // Entire
        if (this.monthly) {
          if (this.monthlyEntire === '') checkEmpty.push(false)
          else checkEmpty.push(true)
        }
        if (this.quarterly) {
          if (this.quarterlyEntire === '') checkEmpty.push(false)
          else checkEmpty.push(true)
        }
        if (this.biannually) {
          if (this.biannualEntire === '') checkEmpty.push(false)
          else checkEmpty.push(true)
        }
        if (this.yearly) {
          if (this.yearlyEntire === '') checkEmpty.push(false)
          else checkEmpty.push(true)
        }
        // Shared
        this.roomData?.forEach((room) => {
          if (this.monthly) {
            if (room.monthly === '') checkEmpty.push(false)
            else checkEmpty.push(true)
          }
          if (this.quarterly) {
            if (room.quarterly === '') checkEmpty.push(false)
            else checkEmpty.push(true)
          }
          if (this.biannually) {
            if (room.biannually === '') checkEmpty.push(false)
            else checkEmpty.push(true)
          }
          if (this.yearly) {
            if (room.yearly === '') checkEmpty.push(false)
            else checkEmpty.push(true)
          }
        })
        return checkEmpty.every((val) => val === true)
      }
    },
  },
  watch: {
    rooms() {
      this.assignPricingInRoom()
    },
  },
  mounted() {
    this.getAllRooms()
  },
  methods: {
    ...mapActions('host/listing', ['getListingDetail', 'updatePrice']),
    ...mapMutations('host/listing', ['SET_ROOMS', 'UPDATE_LIST_TYPE']),
    closeForm() {
      this.$emit('cancel')
    },
    getPricesFromRooms(room, subPlan) {
      if (
        room.prices?.some(
          (el) => el.sub_plan === subPlan && el?.listing_type === 'shared'
        )
      )
        return room.prices?.find((el) => el.sub_plan === subPlan).amount
      else return ''
    },
    async getAllRooms() {
      try {
        const response = await this.getListingDetail()
        if (response.data.statusCode === 200) {
          const data = response.data.data
          this.SET_ROOMS(data)
          data.listingType && this.UPDATE_LIST_TYPE(data.listingType)
        }
      } catch (error) {
        this.$errorHandler(error)
      }
    },
    convertToNumber(str) {
      const newStr = str.replace(/\D/g, '')
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
        query: { step: 2, level: 1 },
      })
    },
    assignPricingInRoom() {
      if (this.listingType === 'shared') {
        const pricingId = {}
        let name
        this.roomData = this.rooms.prices.forEach((room) => {
          name = room.name
          room.prices?.forEach((el) => {
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
          })
        })
        if (this.rooms.updatedPrice.length) {
          this.roomData = this.rooms.updatedPrice.map((room) => {
            const data = {
              id: room.id,
              name,
              pricingId,
            }
            switch (room.sub_plan) {
              case 'monthly':
                data.monthly = room.amount
                break
              case 'quarterly':
                data.quarterly = room.amount
                break
              case 'biannual':
                data.biannually = room.amount
                break
              case 'yearly':
                data.yearly = room.amount
                break
              default:
                break
            }

            return data
          })
        } else {
          this.roomData = this.rooms.prices.map((room) => {
            return {
              id: room.id,
              name: room.name,
              pricingId,
              monthly: this.getPricesFromRooms(room, 'monthly'),
              quarterly: this.getPricesFromRooms(room, 'quarterly'),
              biannually: this.getPricesFromRooms(room, 'biannual'),
              yearly: this.getPricesFromRooms(room, 'yearly'),
            }
          })
        }
      }
      if (this.listingType === 'entire') {
        this.rooms.prices?.forEach((room) => {
          if (room.listing_type === 'entire') {
            switch (room.sub_plan) {
              case 'monthly':
                this.monthlyEntire = room.amount
                this.pricingId.monthly = room.id
                this.monthly = true
                break
              case 'quarterly':
                this.quarterlyEntire = room.amount
                this.pricingId.quarterly = room.id
                this.quarterly = true
                break
              case 'biannual':
                this.biannualEntire = room.amount
                this.pricingId.biannual = room.id
                this.biannually = true
                break
              case 'yearly':
                this.yearlyEntire = room.amount
                this.pricingId.yearly = room.id
                this.yearly = true
                break
              default:
                break
            }
          }
        })
      }
      if (this.listingType === 'both') {
        const { entireListingPricing, sharedBedroomPicing } = this.rooms
        entireListingPricing.forEach((room) => {
          if (room.listing_type === 'entire') {
            switch (room.sub_plan) {
              case 'monthly':
                this.monthlyEntire = room.amount
                this.pricingId.monthly = room.id
                this.monthly = true
                break
              case 'quarterly':
                this.quarterlyEntire = room.amount
                this.pricingId.quarterly = room.id
                this.quarterly = true
                break
              case 'biannual':
                this.biannualEntire = room.amount
                this.pricingId.biannual = room.id
                this.biannually = true
                break
              case 'yearly':
                this.yearlyEntire = room.amount
                this.pricingId.yearly = room.id
                this.yearly = true
                break
              default:
                break
            }
          }
        })
        this.roomData = sharedBedroomPicing.map((room) => {
          const pricingId = {}
          room.prices?.forEach((el) => {
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
            monthly: this.getPricesFromRooms(room, 'monthly'),
            quarterly: this.getPricesFromRooms(room, 'quarterly'),
            biannually: this.getPricesFromRooms(room, 'biannual'),
            yearly: this.getPricesFromRooms(room, 'yearly'),
          }
        })
      }
    },
    async submitForm() {
      if (!this.fillAll) {
        this.$showToast('Kindly check all input fields are filled', 'error')
      } else {
        const data = {}
        data.property_listing_id = this.propertyListingId
        data.pricing = []
        if (this.listingType === 'shared') {
          this.roomData.forEach(
            ({ pricingId, monthly, quarterly, biannually, yearly, id }) => {
              let subPlan = []
              this.rooms.prices?.forEach((room) => {
                room.prices.forEach((price) => {
                  switch (price.sub_plan) {
                    case 'monthly':
                      !subPlan.includes('monthly') && subPlan.push('monthly')
                      break
                    case 'quarterly':
                      !subPlan.includes('quarterly') &&
                        subPlan.push('quarterly')
                      break
                    case 'biannual':
                      !subPlan.includes('biannual') && subPlan.push('biannual')
                      break
                    case 'yearly':
                      !subPlan.includes('yearly') && subPlan.push('yearly')
                      break
                    default:
                      break
                  }
                })
              })
              subPlan = [...new Set(subPlan)]
              if (this.monthly) {
                if (subPlan.includes('monthly')) {
                  data.pricing.push({
                    amount: this.convertToNumber(monthly),
                    pricingId: pricingId.monthly,
                  })
                } else {
                  data.pricing.push({
                    bedroom_id: id,
                    listing_type: this.listingType,
                    amount: this.convertToNumber(monthly),
                    sub_plan: 'monthly',
                  })
                }
              }
              if (this.quarterly) {
                if (subPlan.includes('quarterly')) {
                  data.pricing.push({
                    amount: this.convertToNumber(quarterly),
                    pricingId: pricingId.quarterly,
                  })
                } else {
                  data.pricing.push({
                    bedroom_id: id,
                    listing_type: this.listingType,
                    amount: this.convertToNumber(quarterly),
                    sub_plan: 'quarterly',
                  })
                }
              }
              if (this.biannually) {
                if (subPlan.includes('biannual')) {
                  data.pricing.push({
                    amount: this.convertToNumber(biannually),
                    pricingId: pricingId.biannually,
                  })
                } else {
                  data.pricing.push({
                    bedroom_id: id,
                    listing_type: this.listingType,
                    amount: this.convertToNumber(biannually),
                    sub_plan: 'biannual',
                  })
                }
              }
              if (this.yearly) {
                if (subPlan.includes('yearly')) {
                  data.pricing.push({
                    amount: this.convertToNumber(yearly),
                    pricingId: pricingId.yearly,
                  })
                } else {
                  data.pricing.push({
                    bedroom_id: id,
                    listing_type: this.listingType,
                    amount: this.convertToNumber(yearly),
                    sub_plan: 'yearly',
                  })
                }
              }
            }
          )
        } else if (this.listingType === 'entire') {
          const subPlan = []
          this.rooms.prices?.forEach((room) => {
            switch (room.sub_plan) {
              case 'monthly':
                !subPlan.includes('monthly') && subPlan.push('monthly')
                break
              case 'quarterly':
                !subPlan.includes('quarterly') && subPlan.push('quarterly')
                break
              case 'biannual':
                !subPlan.includes('biannual') && subPlan.push('biannual')
                break
              case 'yearly':
                !subPlan.includes('yearly') && subPlan.push('yearly')
                break
              default:
                break
            }
          })
          if (this.monthly) {
            if (subPlan.includes('monthly')) {
              data.pricing.push({
                amount: this.convertToNumber(this.monthlyEntire),
                pricingId: this.pricingId.monthly,
              })
            } else {
              data.pricing.push({
                amount: this.convertToNumber(this.monthlyEntire),
                sub_plan: 'monthly',
                listing_type: this.listingType,
              })
            }
          }
          if (this.quarterly) {
            if (subPlan.includes('quarterly')) {
              data.pricing.push({
                amount: this.convertToNumber(this.quarterlyEntire),
                pricingId: this.pricingId.quarterly,
              })
            } else {
              data.pricing.push({
                amount: this.convertToNumber(this.quarterlyEntire),
                sub_plan: 'quarterly',
                listing_type: this.listingType,
              })
            }
          }
          if (this.biannually) {
            if (subPlan.includes('biannual')) {
              data.pricing.push({
                amount: this.convertToNumber(this.biannualEntire),
                pricingId: this.pricingId.biannual,
              })
            } else {
              data.pricing.push({
                amount: this.convertToNumber(this.biannualEntire),
                sub_plan: 'biannual',
                listing_type: this.listingType,
              })
            }
          }
          if (this.yearly) {
            if (subPlan.includes('yearly')) {
              data.pricing.push({
                amount: this.convertToNumber(this.yearlyEntire),
                pricingId: this.pricingId.yearly,
              })
            } else {
              data.pricing.push({
                amount: this.convertToNumber(this.yearlyEntire),
                sub_plan: 'yearly',
                listing_type: this.listingType,
              })
            }
          }
        } else if (this.listingType === 'both') {
          // Entire
          const subPlan = []
          this.rooms.entireListingPricing.forEach((room) => {
            switch (room.sub_plan) {
              case 'monthly':
                !subPlan.includes('monthly') && subPlan.push('monthly')
                break
              case 'quarterly':
                !subPlan.includes('quarterly') && subPlan.push('quarterly')
                break
              case 'biannual':
                !subPlan.includes('biannual') && subPlan.push('biannual')
                break
              case 'yearly':
                !subPlan.includes('yearly') && subPlan.push('yearly')
                break
              default:
                break
            }
          })

          if (this.monthly) {
            if (subPlan.includes('monthly')) {
              data.pricing.push({
                amount: this.convertToNumber(this.monthlyEntire),
                pricingId: this.pricingId.monthly,
              })
            } else {
              data.pricing.push({
                amount: this.convertToNumber(this.monthlyEntire),
                sub_plan: 'monthly',
                listing_type: 'entire',
              })
            }
          }
          if (this.quarterly) {
            if (subPlan.includes('quarterly')) {
              data.pricing.push({
                amount: this.convertToNumber(this.quarterlyEntire),
                pricingId: this.pricingId.quarterly,
              })
            } else {
              data.pricing.push({
                amount: this.convertToNumber(this.quarterlyEntire),
                sub_plan: 'quarterly',
                listing_type: 'entire',
              })
            }
          }
          if (this.biannually) {
            if (subPlan.includes('biannual')) {
              data.pricing.push({
                amount: this.convertToNumber(this.biannualEntire),
                pricingId: this.pricingId.biannual,
              })
            } else {
              data.pricing.push({
                amount: this.convertToNumber(this.biannualEntire),
                sub_plan: 'biannual',
                listing_type: 'entire',
              })
            }
          }
          if (this.yearly) {
            if (subPlan.includes('yearly')) {
              data.pricing.push({
                amount: this.convertToNumber(this.yearlyEntire),
                pricingId: this.pricingId.yearly,
              })
            } else {
              data.pricing.push({
                amount: this.convertToNumber(this.yearlyEntire),
                sub_plan: 'yearly',
                listing_type: 'entire',
              })
            }
          }
          // Shared
          this.roomData.forEach(
            ({ pricingId, monthly, quarterly, biannually, yearly, id }) => {
              const subPlan = []
              this.rooms.sharedBedroomPicing.forEach((room) => {
                room.prices.forEach((price) => {
                  switch (price.sub_plan) {
                    case 'monthly':
                      !subPlan.includes('monthly') && subPlan.push('monthly')
                      break
                    case 'quarterly':
                      !subPlan.includes('quarterly') &&
                        subPlan.push('quarterly')
                      break
                    case 'biannual':
                      !subPlan.includes('biannual') && subPlan.push('biannual')
                      break
                    case 'yearly':
                      !subPlan.includes('yearly') && subPlan.push('yearly')
                      break
                    default:
                      break
                  }
                })
              })
              if (this.monthly) {
                if (subPlan.includes('monthly')) {
                  data.pricing.push({
                    amount: this.convertToNumber(monthly),
                    pricingId: pricingId.monthly,
                  })
                } else {
                  data.pricing.push({
                    bedroom_id: id,
                    listing_type: 'shared',
                    amount: this.convertToNumber(monthly),
                    sub_plan: 'monthly',
                  })
                }
              }
              if (this.quarterly) {
                if (subPlan.includes('quarterly')) {
                  data.pricing.push({
                    amount: this.convertToNumber(quarterly),
                    pricingId: pricingId.quarterly,
                  })
                } else {
                  data.pricing.push({
                    bedroom_id: id,
                    listing_type: 'shared',
                    amount: this.convertToNumber(quarterly),
                    sub_plan: 'quarterly',
                  })
                }
              }
              if (this.biannually) {
                if (subPlan.includes('biannual')) {
                  data.pricing.push({
                    amount: this.convertToNumber(biannually),
                    pricingId: pricingId.biannually,
                  })
                } else {
                  data.pricing.push({
                    bedroom_id: id,
                    listing_type: 'shared',
                    amount: this.convertToNumber(biannually),
                    sub_plan: 'biannual',
                  })
                }
              }
              if (this.yearly) {
                if (subPlan.includes('yearly')) {
                  data.pricing.push({
                    amount: this.convertToNumber(yearly),
                    pricingId: pricingId.yearly,
                  })
                } else {
                  data.pricing.push({
                    bedroom_id: id,
                    listing_type: 'shared',
                    amount: this.convertToNumber(yearly),
                    sub_plan: 'yearly',
                  })
                }
              }
            }
          )
        }
        this.loading = true
        try {
          const response = await this.updatePrice(data)
          this.loading = false
          if (response.data.statusCode === 200) {
            this.closeForm()
          }
        } catch (error) {
          this.loading = false
          this.$errorHandler(error)
        }
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
  transition: all 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275);
  // transition: all 0.5s ease-in-out;
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
