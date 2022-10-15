<template>
  <div>
    <Loading v-if="loading" />
    <div v-else class="s-pl-[18px] sm:s-pl-14 s-pr-[31px] sm:s-pr-14 s-h-full">
      <div class="sm:s-pt-[8.125rem] s-pt-[30px]">
        <NuxtLink
          :to="`/host/listing?page=${$route.query.page}`"
          class="s-flex s-items-center s-cursor-pointer sm:s-hidden"
        >
          <div
            class="s-w-5 s-h-5 s-rounded-full s-border s-border-primary s-border-solid s-flex s-items-center s-justify-center s-mr-2.5"
          >
            <BackIcon />
          </div>
          <span class="s-font-normal s-text-sm s-leading-6 s-text-[#2F313D]">
            Go Back
          </span>
        </NuxtLink>
        <div class="s-flex s-flex-wrap s-gap-4 s-justify-between">
          <div class="s-flex s-gap-x-2">
            <div
              class="s-hidden s-cursor-pointer s-w-5 s-h-5 s-rounded-full s-border s-border-primary s-border-solid sm:s-flex s-items-center s-justify-center s-mr-2.5"
              @click="
                $router.push({
                  path: '/host/listing',
                  query: { page: $route.query.page },
                })
              "
            >
              <BackIcon />
            </div>
            <div class="s-mt-5 sm:s-mt-0">
              <h1 class="s-pb-3.5 s-text-xl s-leading-6 s-font-bold">
                Edit Listing - {{ spaceName | capitalize }}
              </h1>
              <div class="s-flex s-items-center">
                <p class="s-text-sm s-leading-4 s-pr-2 s-font-semibold">
                  Listing Status:
                </p>
                <div class="s-flex s-items-center">
                  <div
                    class="s-w-[11px] s-h-[11px] s-rounded-full s-mr-[6px] s-self-center"
                    :class="handleColor"
                  ></div>
                  <p class="s-text-sm s-leading-4">
                    {{ listingStatus | capitalize }}
                  </p>
                </div>
              </div>
            </div>
          </div>
          <Button
            v-if="
              listingStatus === 'updated' || listingStatus === 'unavailable'
            "
            text="Submit For Review"
            :loading="loader"
            :class="'s-bg-primary-blue s-w-full sm:s-w-[206px]'"
            @submit="submitForReview"
          />
        </div>
      </div>
      <div class="s-mt-9">
        <div
          class="s-pb-10 s-grid s-grid-cols-[repeat(auto-fill,_minmax(300px,_1fr))] s-gap-x-5 s-gap-y-8"
        >
          <listInformationCard
            :title="'Listing Information'"
            :space-details="listInformation"
            @edit="edits"
          />
          <listInformationCard
            :title="'Booking Information'"
            :space-details="bookingInformation"
            @edit="edits"
          />
        </div>
      </div>
      <div v-if="showSpaceDetails">
        <EditSpaceDetails @cancel="showSpaceDetails = false" />
      </div>
      <div v-if="showRoomsDetails">
        <EditRoomDetails @cancel="showRoomsDetails = false" />
      </div>
      <div v-if="showFurnishingDetails">
        <EditFurnishingDetails @cancel="showFurnishingDetails = false" />
      </div>
      <div v-if="showImages">
        <EditImages @cancel="showImages = false" />
      </div>
      <div v-if="showLocationDetails">
        <EditLocationDetails @cancel="showLocationDetails = false" />
      </div>
      <div v-if="showSubTypeDetails">
        <SubTypeDetails @cancel="showSubTypeDetails = false" />
      </div>
      <div v-if="showPricingDetails">
        <PricingDetails @cancel="showPricingDetails = false" />
      </div>
      <div v-if="showDiscountsDetails">
        <DiscountDetails @cancel="showDiscountsDetails = false" />
      </div>
      <div v-if="showServiceChargesDetails">
        <ServiceChargeDetails @cancel="showServiceChargesDetails = false" />
      </div>
      <div v-if="showHouseRulesDetails">
        <HouseRulesDetails @cancel="showHouseRulesDetails = false" />
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions, mapMutations } from 'vuex'
import listInformationCard from '../../../components/listing/dashboard/listInformationCard.vue'
import EditImages from '../../../components/listing/dashboard/EditImages.vue'
import EditFurnishingDetails from '../../../components/listing/dashboard/EditFurnishingDetails.vue'
import EditLocationDetails from '../../../components/listing/dashboard/EditLocationDetails.vue'
import EditSpaceDetails from '~/components/listing/dashboard/EditSpaceDetails.vue'
import EditRoomDetails from '~/components/listing/dashboard/EditRoomDetails.vue'
export default {
  name: 'IndexPage',
  components: {
    listInformationCard,
    EditSpaceDetails,
    EditRoomDetails,
    EditImages,
    EditFurnishingDetails,
    EditLocationDetails,
  },
  layout: 'host',
  data() {
    return {
      spaceName: '',
      spaceInfo: {},
      listingStatus: '',
      showSpaceDetails: false,
      showRoomsDetails: false,
      showFurnishingDetails: false,
      showImages: false,
      showLocationDetails: false,
      showSubTypeDetails: false,
      showPricingDetails: false,
      showDiscountsDetails: false,
      showServiceChargesDetails: false,
      showHouseRulesDetails: false,
      allRooms: [],
      listInformation: [
        {
          title: 'Space Details',
          level: 1,
          step: 1,
        },
        {
          title: 'Rooms',
          level: 2,
          step: 1,
        },
        {
          title: 'Furnishings',
          level: 3,
          step: 1,
        },
        {
          title: 'Images',
          level: 4,
          step: 1,
        },
        {
          title: 'Location',
          level: 5,
          step: 1,
        },
      ],
      bookingInformation: [
        {
          title: 'Subscription Type',
          level: 1,
          step: 2,
        },
        {
          title: 'Pricing',
          level: 2,
          step: 2,
        },
        {
          title: 'Discounts',
          level: 3,
          step: 2,
        },
        {
          title: 'Service Charge',
          level: 4,
          step: 2,
        },
        {
          title: 'House Rules',
          level: 5,
          step: 2,
        },
      ],
      propertyListingId: this.$route.query.id,
      selectedSingleSpaceToEdit: null,
      loading: false,
      loader: false,
    }
  },
  computed: {
    ...mapState('host/listing', ['propertySetUp', 'listedSpace']),
    handleColor() {
      switch (this.listingStatus) {
        case 'pending':
        case 'awaiting approval':
          return 's-bg-[#F7CE51]'
        case 'paid':
        case 'active':
        case 'accepted':
        case 'published':
          return 's-bg-[#3DDC97]'
        case 'unavailable':
        case 'expired':
          return 's-bg-[#FF7F37]'
        case 'rejected':
          return 's-bg-[#FF4242]/0.4'
        case 'cancelled':
        case 'canceled':
        case 'declined':
          return 's-bg-[#EA4335]'
        case 'updated':
          return 's-bg-purple-500'
        default:
          return ''
      }
    },
  },
  mounted() {
    this.UPDATE_PROPERTY_ID(this.propertyListingId)
    this.getSpaceInfo()
    try {
      this.getPropertySetUp()
    } catch (error) {
      this.$errorHandler(error)
    }
  },
  methods: {
    ...mapMutations('host/listing', [
      'UPDATE_ROOMS',
      'UPDATE_PROPERTY_ID',
      'UPDATE_LIST_TYPE',
    ]),
    ...mapActions('host/listing', [
      'getPropertySetUp',
      'getListingDetail',
      'getSingleListedSpace',
      'publishListing',
    ]),
    async submitForReview() {
      this.loader = true
      try {
        const response = await this.publishListing()
        this.loader = false
        if (response.data.statusCode === 200) {
          this.$router.push('/host/listing')
        }
      } catch (error) {
        this.loader = false
        this.$errorHandler(error)
      }
    },
    edits(d) {
      switch (d.title) {
        case 'Space Details':
          this.showSpaceDetails = true
          break
        case 'Rooms':
          this.showRoomsDetails = true
          break
        case 'Images':
          this.showImages = true
          break
        case 'Furnishings':
          this.showFurnishingDetails = true
          break
        case 'Location':
          this.showLocationDetails = true
          break
        case 'Subscription Type':
          this.showSubTypeDetails = true
          break
        case 'Pricing':
          this.showPricingDetails = true
          break
        case 'Discounts':
          this.showDiscountsDetails = true
          break
        case 'Service Charge':
          this.showServiceChargesDetails = true
          break
        case 'House Rules':
          this.showHouseRulesDetails = true
          break
        default:
          return true
      }
    },
    async getSpaceInfo() {
      this.loading = true
      try {
        const response = await this.getSingleListedSpace(this.propertyListingId)
        this.spaceInfo = response.data.data
        const data = response.data.data
        this.UPDATE_LIST_TYPE(data.listingType)
        if (data?.apartments) {
          this.spaceName = data.apartments[0].bedroomName
        } else {
          this.spaceName = data.listingName
        }
        this.listingStatus = data.listingStatus
        this.loading = false
      } catch (error) {
        this.loading = false
        this.$errorHandler(error)
      }
    },
  },
}
</script>
