<template>
  <MoreInfoModal
    :new-class="'s-px-5 s-relative sm:s-px-7 s-pb-16  md-x:s-w-[647px] sm:s-w-[532px] s-min-w-[375px] s-w-full'"
    @cancel="closeForm"
  >
    <Loading v-if="loader" :class="'s-absolute'" />
    <transition>
      <div v-if="data" class="s-min-w-fit">
        <div>
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
              class="s-bg-primary-blue s-text-sm s-leading-[18px] s-text-white s-font-bold s-px-10 s-mr-2 s-rounded-full sm:s-py-[15px] s-py-[12px]"
              @submit="submitForm"
            />
          </div>
          <div class="s-mt-3">
            <h1
              class="s-text-[#121212] s-mb-1.5 sm:s-text-xl s-text-lg s-leading-6 s-font-bold"
            >
              Listing Information >
              <span class="s-text-[#2E48DA]">Images</span>
            </h1>
            <p class="s-text-sm s-font-normal s-text-[#242428] s-leading-5">
              Update information about your space here
            </p>
          </div>
        </div>
        <div class="s-mt-10 s-px-0.5">
          <div>
            <div class="s-flex s-justify-between s-mb-4 s-flex-wrap">
              <div>
                <h2 class="title s-text-black s-text-base s-mb-1">
                  Bedroom &amp; Common areas
                </h2>
                <p class="s-text-gray-700 !s-leading-[1.375rem] s-text-xs">
                  Upload Images of this space (Maximum of 3 images per room)
                </p>
              </div>
              <button
                class="s-appearance-none s-text-xs s-text-primary-blue s-underline"
                type="button"
                @click="togglePhotoTip"
              >
                View Photo Tips
              </button>
            </div>

            <div>
              <DragDrop
                :format="uploadAcceptedFormat"
                @uploads="uploadedImages"
              />
            </div>

            <p
              v-if="othersError || roomError"
              class="s-text-xs s-text-red s-mt-2"
            >
              {{ othersError || roomError }}
            </p>
            <ul class="s-mt-5">
              <li
                v-for="image in images"
                :key="image.id"
                class="s-flex s-flex-wrap xs:s-flex-nowrap s-justify-between s-items-center s-border-solid s-border-[#b1b7d6]/[0.3] s-border-b s-py-3.5"
              >
                <div class="s-flex s-items-center">
                  <img
                    :src="image.secure_url"
                    alt="image"
                    class="s-object-cover s-w-[3.75rem] s-h-[3.75rem] s-mr-5 s-rounded-xl"
                  />
                  <p class="s-text-xs">
                    {{ image.original_filename }}.{{ image.original_extension }}
                  </p>
                </div>
                <div class="s-order-3 xs:s-order-none s-w-full xs:s-w-fit">
                  <Select
                    :class="'sm:!s-mb-0 s-min-w-[7.5rem] s-max-w-fit room_select s-mt-4'"
                    label=""
                    name="room"
                    icon=""
                    default-text="Select room"
                    :options="roomList"
                    :value="setRoomValue(image)"
                    @select="getSelectedRoom($event, image)"
                  />
                </div>

                <button
                  v-if="!removeLoader(image.public_id)"
                  class="s-text-xs s-text-[#EA4335]"
                  @click="deleteUploadedImage(image.public_id)"
                >
                  Remove
                </button>
                <Loader
                  v-if="removeLoader(image.public_id)"
                  width="20"
                  height="20"
                  fill="#EA4335"
                />
              </li>
            </ul>
          </div>
        </div>
      </div>
    </transition>
  </MoreInfoModal>
</template>

<script>
import { mapActions, mapState } from 'vuex'
export default {
  name: 'UploadUmages',
  data() {
    return {
      showPhotoTip: false,
      uploadAcceptedFormat: ['.jpeg', '.jpg', '.png'],
      images: [],
      loading: false,
      bedroomImage: [],
      listingImages: [],
      deleteId: null,
      roomError: null,
      othersError: null,
      data: null,
    }
  },
  computed: {
    ...mapState('host/listing', ['rooms', 'propertyListingId', 'loader']),
    roomList() {
      if (this.rooms) {
        const roomOpt = this.rooms.map((el) => {
          return { ...el, text: el.name, value: el.name }
        })
        return [...roomOpt, { text: 'Common areas', value: 'Common areas' }]
      }
      return undefined
    },
    validateOthers() {
      const others = this.roomList
        .filter((list) => list.text === 'Common areas')
        .map((el) => {
          return {
            name: el.text,
            images: this.listingImages.filter((img) => img.image_path),
          }
        })

      const result = others.every(
        (el) => el.images.length >= 3 && el.images.length <= 4
      )

      return result
    },
    validationRooms() {
      const rooms = this.roomList
        .filter((list) => list.text !== 'Common areas')
        .map((el) => {
          return {
            name: el.name,
            images: this.bedroomImage.filter((img) => img.bedroom_id === el.id),
          }
        })

      const result = rooms.every(
        (el) => el.images.length >= 2 && el.images.length <= 3
      )

      return result
    },
  },
  async created() {
    await Promise.all([this.getRooms(), this.getImages()])
  },
  methods: {
    closeForm() {
      this.$emit('cancel')
    },
    setRoomValue(image) {
      if (image.value) {
        if (image?.value === 'Common areas') {
          return 'Common areas'
        } else {
          const value = this.roomList.find((el) => el.id === image?.value)?.text
          return value
        }
      } else {
        return ''
      }
    },
    removeLoader(id) {
      if (this.deleteId === id) {
        return true
      } else {
        return false
      }
    },
    togglePhotoTip() {
      this.showPhotoTip = !this.showPhotoTip
    },
    ...mapActions({
      getRooms: 'host/listing/getRooms',
      deleteImage: 'util/deleteCloudinaryImage',
      addImages: 'host/listing/addImages',
      getListingDetail: 'host/listing/getListingDetail',
      updateImages: 'host/listing/updateImages',
    }),
    async getImages() {
      try {
        const response = await this.getListingDetail()
        this.data = response.data.data
        if (response.data.statusCode === 200) {
          const commonAreas = response?.data?.data?.listingGeneralImages
          const rooms = response?.data?.data?.listingBedrooms
          this.assignImages(commonAreas, rooms)
        }
      } catch (error) {
        this.$errorHandler(error)
      }
    },
    assignImages(commonAreas, rooms) {
      const commonImages = commonAreas.map((el) => {
        return {
          secure_url: el.image_path,
          public_id: el.publicId,
          id: el.id,
          original_filename: 'other-image',
          original_extension: 'jpg',
          value: 'Common areas',
        }
      })
      this.listingImages = commonImages.map((el) => {
        return {
          image_path: el.secure_url,
          publicId: el.public_id,
          id: el.id,
        }
      })
      const roomImages = []
      rooms.forEach((room) => {
        roomImages.push(...room.images)
      })

      const roomImg = roomImages.map((img) => {
        return {
          secure_url: img.image_path,
          public_id: img.publicId,
          id: img.id,
          original_filename: 'room-image',
          original_extension: 'jpg',
          value: img.bedroom_id,
        }
      })
      this.bedroomImage = roomImg.map((el) => {
        return {
          image_path: el.secure_url,
          publicId: el.public_id,
          id: el.id,
        }
      })

      this.images = [...commonImages, ...roomImg]
    },
    async deleteUploadedImage(publicId) {
      this.deleteId = publicId
      const response = await this.deleteImage(publicId)
      if (response?.data?.statusCode === 200) {
        const imageIndex = this.images.findIndex(
          (img) => img.public_id === publicId
        )
        if (imageIndex !== -1) {
          this.images.splice(imageIndex, 1)
        }

        const roomImg = this.bedroomImage.findIndex(
          (img) => img.publicId === publicId
        )
        if (roomImg !== -1) {
          this.bedroomImage.splice(roomImg, 1)
        }

        const livingImg = this.listingImages.findIndex(
          (img) => img.publicId === publicId
        )
        if (roomImg !== -1) {
          this.listingImages.splice(livingImg, 1)
        }
      }
      this.deleteId = null
      return response
    },
    uploadedImages(images) {
      if (images && images.length > 0) {
        this.images = [...images, ...this.images]
      }
    },
    getSelectedRoom(room, image) {
      if (room.text !== 'Common areas') {
        const roomObj = {
          bedroom_id: room.id,
          image_path: image.secure_url,
          publicId: image.public_id,
        }
        const index = this.bedroomImage.findIndex(
          (object) => object.publicId === image.public_id
        )
        const livingIndex = this.listingImages.findIndex(
          (object) => object.publicId === image.public_id
        )
        if (livingIndex !== -1) {
          this.listingImages.splice(livingIndex, 1)
        }
        if (index === -1) {
          this.bedroomImage.push(roomObj)
        } else {
          this.bedroomImage[index] = roomObj
        }
      } else {
        const roomObj = {
          property_listing_id: this.propertyListingId,
          image_path: image.secure_url,
          publicId: image.public_id,
        }
        const index = this.listingImages.findIndex(
          (object) => object.publicId === image.public_id
        )
        const roomIndex = this.bedroomImage.findIndex(
          (object) => object.publicId === image.public_id
        )
        if (roomIndex !== -1) {
          this.bedroomImage.splice(roomIndex, 1)
        }
        if (index === -1) {
          this.listingImages.push(roomObj)
        } else {
          this.listingImages[index] = roomObj
        }
      }
    },
    async submitForm() {
      if (!this.validationRooms) {
        this.roomError =
          'Kindly add atleast 2 images for each room with maximum of 3'
        this.$showToast(
          'Kindly add atleast 2 images for each room with maximum of 3',
          'error'
        )
      } else {
        this.roomError = null
      }

      if (!this.validateOthers) {
        this.othersError =
          'Kindly add atleast 3 images for other part of the apartment with maximum of 4'
        this.$showToast(
          'Kindly add atleast 3 images for other part of the apartment with maximum of 4',
          'error'
        )
      } else {
        this.othersError = null
      }

      if (this.validateOthers && this.validationRooms) {
        this.loading = true
        const payload = {
          property_listing_id: this.propertyListingId,
          listing_images: this.listingImages,
          bedroom_images: this.bedroomImage,
        }
        try {
          const response = await this.updateImages(payload)
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
</style>
