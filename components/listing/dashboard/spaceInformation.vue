<template>
  <div
    class="s-min-w-[375px] sm:s-w-full s-pl-8 s-px-10 sm:s-pl-16 s-pt-7 sm:s-pt-12 s-pb-16 s-overflow-scroll s-h-[100vh]"
  >
    <div class="s-flex s-justify-end">
      <button @click="$emit('close')">
        <CloseIcon :fill="'black'" :width="15" :height="15" />
      </button>
    </div>
    <div>
      <div
        class="s-border s-border-[#B1B7D6] s-rounded-full s-border-solid s-py-1 s-flex s-w-fit s-px-5"
      >
        <div
          class="s-w-[11px] s-h-[11px] s-rounded-full s-bg-[#3DDC97] s-mr-[6px] s-self-center"
          :class="handleColor(spaceData.listingStatus)"
        ></div>
        <p class="s-text-xs s-leading-6 s-text-[#0F0C3D] s-whitespace-nowrap">
          {{ spaceData.listingStatus | capitalize }}
        </p>
      </div>
      <div class="s-mt-6">
        <h1 class="s-text-xl s-leading-6 s-font-bold s-text-[#0E0C0C] s-mb-1.5">
          Space Details
        </h1>
        <p class="s-text-sm s-leading-6 s-text-[#3F3D56] s-font-normal">
          Here’s a quick overview of your space
        </p>

        <img
          src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRR6FCSmHybkkY5Ta7aRkST5RyY4UBHISWYRA&usqp=CAU"
          alt=""
          class="s-rounded-xl s-my-6 s-max-w-[507px] s-w-full s-max-h-[219px] s-h-full"
        />
        <div>
          <h1 class="s-mb-2.5 s-text-[16px] s-leading-6 s-font-bold">
            {{ spaceData.listingName || '--' }}
          </h1>
          <p
            class="s-text-sm s-leading-6 s-text-[#3F3D56] s-font-normal s-mb-5"
          >
            {{ spaceData.listingDescription || '--' }}
          </p>
        </div>
      </div>
      <div class="s-mt-12">
        <h1 class="s-mb-2.5 s-text-[16px] s-leading-6 s-font-bold">
          Property Status
        </h1>
        <p class="s-text-sm s-leading-6 s-text-[#3F3D56] s-font-normal s-mb-5">
          Seamlessly change the status of rooms in your space.
        </p>
      </div>
      <div v-if="selectedSpace.listing_type === 'entire'">
        <div
          class="s-flex s-justify-between s-items-center s-max-w-[28.063rem] s-w-full"
        >
          <h1 class="s-text-sm s-leading-5 s-text-[#3F3D56] s-font-semibold">
            Entire
          </h1>
          <div>
            <Toggle
              :toggle-name="'living'"
              :disabled="
                spaceData.listingStatus !== 'published' &&
                spaceData.listingStatus !== 'unavailable'
              "
              :is-toggled="spaceData.is_available"
              :is-checked="isChecked"
              @setCheckboxVal="setpropertyStatus"
            />
          </div>
        </div>
        <hr class="s-mt-3.5 s-mb-7" />
      </div>
      <div v-else>
        <div
          v-for="apartmentDetail in apartmentDetails"
          :key="apartmentDetail.id"
        >
          <div
            class="s-flex s-justify-between s-items-center s-max-w-[28.063rem] s-w-full"
          >
            <h1 class="s-text-sm s-leading-5 s-text-[#3F3D56] s-font-semibold">
              {{ apartmentDetail.bedroomName }}
            </h1>
            <div>
              <Toggle
                :toggle-name="apartmentDetail.id"
                :disabled="
                  spaceData.listingStatus !== 'published' &&
                  spaceData.listingStatus !== 'unavailable'
                "
                :is-toggled="apartmentDetail.is_available"
                :is-checked="isChecked"
                @setCheckboxVal="
                  (test) => setApartmentStatus(apartmentDetail.id, test)
                "
              />
            </div>
          </div>
          <hr class="s-mt-3.5 s-mb-7" />
        </div>
      </div>
      <div
        v-if="
          selectedSpace.listing_type === 'shared' &&
          (spaceData.listingStatus === 'published' ||
            spaceData.listingStatus === 'unavailable')
        "
        class="sm:s-flex s-block sm:s-mt-8 s-mt-[30px]"
      >
        <Button
          :text="'Take All Offline'"
          :loading="offllineLoadingState"
          :disabled="spaceData.listingStatus === 'unavailable'"
          class="s-bg-primary-blue s-text-sm s-leading-[18px] s-text-white s-font-bold s-w-full sm:s-w-[11.625rem] s-mr-2 s-rounded-full sm:!s-py-[15px] s-py-[10px]"
          @submit="setpropertyStatus('unavailable')"
        />
        <Button
          :text="'Take All Online'"
          :loading="onlineLoadingState"
          :disabled="spaceData.listingStatus === 'published'"
          class="s-outline s-outline-primary-blue !s-text-primary-blue s-text-sm s-leading-[18px] s-font-bold s-w-full sm:s-w-[11.625rem] s-mr-2 s-mt-5 sm:s-mt-0 s-rounded-full sm:!s-py-[6px] s-py-[10px]"
          @submit="setpropertyStatus('available')"
        />
      </div>
      <div
        v-if="
          spaceData.listingStatus !== 'published' &&
          spaceData.listingStatus !== 'unavailable'
        "
        class="s-px-3 s-py-2 s-bg-[#2E48DA]/5 s-rounded s-text-[#706D9D]"
      >
        <p class="s-text-xs s-leading-6">
          Sorry, you can’t perform any action except the status is published or
          unavailable
        </p>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions } from 'vuex'
import Toggle from '../../form/Toggle.vue'
export default {
  components: { Toggle },
  props: {
    spaceData: {
      type: Object,
      default: () => {},
    },
    selectedSpace: {
      type: Object,
      default: () => {},
    },
  },
  data() {
    return {
      onlineLoadingState: false,
      offllineLoadingState: false,
      isChecked: null,
    }
  },
  computed: {
    apartmentDetails() {
      const data = []
      this.spaceData.apartments?.forEach((el) => {
        data.push(el)
      })
      return data
    },
  },
  methods: {
    ...mapActions('host/listing', ['updateListingApartmentStatus']),
    handleColor(status) {
      const chipColors = {
        published: 's-bg-[#3DDC97]',
        pending: 's-bg-[#F7CE51]',
        rejected: 's-bg-[#CC1D1D]',
        updated: 's-bg-purple-500',
      }
      return chipColors[status]
    },
    async setpropertyStatus(status) {
      if (status === 'available') {
        this.onlineLoadingState = true
      } else {
        this.offllineLoadingState = true
      }
      try {
        await this.$axios.$patch(
          `property/listing/status/${this.selectedSpace.id}`,
          {
            status,
          }
        )
        this.$emit('refresh')
        if (status === 'available') {
          this.onlineLoadingState = false
        } else {
          this.offllineLoadingState = false
        }
      } catch (error) {
        if (status === 'available') {
          this.onlineLoadingState = false
        } else {
          this.offllineLoadingState = false
        }
        this.$errorHandler(error)
      }
    },
    async setApartmentStatus(id, status) {
      this.isChecked = status
      try {
        await this.$axios.$patch(`property/listing/apartment/status/${id}`, {
          isAvailable: status,
        })
      } catch (error) {
        this.$errorHandler(error)
      }
    },
  },
}
</script>

<style lang="scss" scoped></style>
