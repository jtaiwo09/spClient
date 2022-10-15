<template>
  <div>
    <Loading v-if="loader" />
    <div v-else class="r-wrap s-pb-[2.375rem]">
      <div class="s-px-6 md-x:!s-px-[3.25rem] md-s:s-pb-0 s-pb-24">
        <div
          class="s-mb-[2.375rem] s-flex s-justify-between s-items-center s-sticky s-top-2.5 s-h-[100px] s-z-20 s-w-full s-bg-[#fff]"
        >
          <div class="">
            <h2 class="title s-text-[1.25rem] s-mb-0">Upload Images</h2>
            <p class="sub-title !s-leading-[1.375rem] s-text-xs">
              Add images of your space
            </p>
          </div>
          <div class="md-s:s-flex s-hidden">
            <Button
              :class="'s-mr-1.5 s-w-[7.875rem] s-border-2 s-border-solid s-border-primary-blue s-py-2.5 s-font-bold'"
              text="Back"
              text-class="s-text-primary-blue"
              @submit="back"
            />
            <Button
              :class="'s-w-[7.875rem] s-bg-primary-blue  s-py-2.5 s-font-bold'"
              text="Next"
              :loading="loading"
              @submit="next"
            />
          </div>
        </div>
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
            <div class="s-w-full s-flex ">

              <div class="s-flex s-items-center s-w-2/4">
                <img
                  :src="image.secure_url"
                  alt="image"
                  class="s-object-cover s-w-[3.75rem] s-h-[3.75rem] s-mr-5 s-rounded-xl"
                />
                <p class="s-text-xs">
                  {{ image.original_filename }}.{{ image.original_extension }}
                </p>
              </div>
              <div class="s-order-3 xs:s-order-none s-w-1/4">
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

              <div class="s-flex s-items-center s-w-1/4">
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
              </div>

            </div>
            </li>
          </ul>
        </div>
        <div
          class="border s-mt-auto s-flex s-justify-end md-s:s-hidden s-py-5 s-border-t s-border-solid s-fixed s-bottom-0 s-w-full s-pr-4 s-left-0 s-bg-white"
        >
          <Button
            :class="'s-mr-1.5 s-w-[7.875rem] s-border-2 s-border-solid s-border-primary-blue s-text-primary-blue s-py-2.5 s-font-bold'"
            text="Back"
            text-class="s-text-primary-blue"
            @submit="back"
          />
          <Button
            :class="'s-w-[7.875rem] s-bg-primary-blue s-py-2.5 s-font-bold s-text-[#fff]'"
            text="Next"
            :loading="loading"
            @submit="next"
          />
        </div>
      </div>
      <Modal :show="showPhotoTip" @close="showPhotoTip = false">
        <h3 class="s-text-xl s-text-[#0E0C0C] s-font-bold s-mb-6">
          Taking great pictures of your space
        </h3>
        <CameraIcon :class="'s-hidden sm:s-block'" />

        <div
          class="s-px-2.5 s-pt-5 s-pb-4 s-border-b s-border-gray-one/50 s-border-solid"
        >
          <p class="s-text-xs s-leading-5 s-text-primary">
            Spaces look best in natural light. Turn on your lights if it's dark,
            and avoid using flash on your camera.
          </p>
        </div>
        <div
          class="s-px-2.5 s-pt-5 s-pb-4 s-border-b s-border-gray-one/50 s-border-solid"
        >
          <p class="s-text-xs s-leading-5 s-text-primary">
            To capture as much space as possible, shoot from the corner of the
            room using your camera’s landscape mode.
          </p>
        </div>
        <div class="s-px-2.5 s-pt-5 s-pb-16">
          <p class="s-text-xs s-leading-5 s-text-primary">
            Include all layouts members have access to, like the living room,
            kitchen and rest rooms.
          </p>
        </div>
      </Modal>
    </div>
  </div>
</template>

<script>
import { mapMutations, mapActions, mapState } from 'vuex'
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
      editMode: false,
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
    ...mapMutations('host/listing', ['UPDATE_LEVEL', 'TOGGLE_LOADING']),
    ...mapActions({
      getRooms: 'host/listing/getRooms',
      deleteImage: 'util/deleteCloudinaryImage',
      addImages: 'host/listing/addImages',
      getListingDetail: 'host/listing/getListingDetail',
      updateImages: 'host/listing/updateImages',
    }),
    async getImages() {
      this.TOGGLE_LOADING(true)
      try {
        const response = await this.getListingDetail()
        this.TOGGLE_LOADING(false)
        if (response.data.statusCode === 200) {
          const commonAreas = response?.data?.data?.listingGeneralImages
          const rooms = response?.data?.data?.listingBedrooms
          this.assignImages(commonAreas, rooms)
        }
      } catch (error) {
        this.TOGGLE_LOADING(false)
        this.$errorHandler(error)
      }
    },
    assignImages(commonAreas, rooms) {
      if (commonAreas.length > 0) {
        this.editMode = true
      }
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
    back() {
      this.$router.push({
        name: 'host-listing-space-details',
        query: { step: 1, level: 3 },
      })
      this.UPDATE_LEVEL(3)
    },
    updateMove() {
      this.$router.push({
        name: 'host-listing-space-details',
        query: { step: 1, level: 5 },
      })
      this.UPDATE_LEVEL(5)
    },
    async next() {
      if (!this.validationRooms && !this.editMode) {
        this.roomError =
          'Kindly add atleast 2 images for each room with maximum of 3'
        this.$showToast(
          'Kindly add atleast 2 images for each room with maximum of 3',
          'error'
        )
      } else {
        this.roomError = null
      }

      if (!this.validateOthers && !this.editMode) {
        this.othersError =
          'Kindly add atleast 3 images for other part of the apartment with maximum of 4'
        this.$showToast(
          'Kindly add atleast 3 images for other part of the apartment with maximum of 4',
          'error'
        )
      } else {
        this.othersError = null
      }

      if ((this.validateOthers && this.validationRooms) || this.editMode) {
        this.loading = true
        const payload = {
          property_listing_id: this.propertyListingId,
          listing_images: this.listingImages,
          bedroom_images: this.bedroomImage,
        }
        if (this.editMode) {
          try {
            const response = await this.updateImages(payload)
            this.loading = false
            if (response.data.statusCode === 200) {
              this.updateMove()
            }
          } catch (error) {
            this.loading = false
            this.$errorHandler(error)
          }
        } else {
          try {
            const response = await this.addImages(payload)
            this.loading = false
            if (response.data.statusCode === 201) {
              this.updateMove()
            }
          } catch (error) {
            this.loading = false
            this.$errorHandler(error)
          }
        }
      }
    },
  },
}
</script>

<style lang="scss">
.room_select {
  margin-bottom: 0;
  div {
    &:first-of-type {
      padding-top: 0.5rem;
      padding-bottom: 0.5rem;
    }
  }
}
</style>
