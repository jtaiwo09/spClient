<template>
  <div>
    <div class="border s-pb-3 s-mb-4">
      <div
        class="s-w-full s-h-[55px] s-bg-[#fff] s-z-10 s-flex s-justify-between s-items-center s-rounded-[10px] s-border s-border-solid s-border-[#E0E3F2] s-px-5 s-mb-3 s-cursor-pointer"
        @click="showTab"
      >
        <span class="s-text-[#0F0C3D] s-text-xs s-leading-6 s-font-semibold">{{
          room.bedroomName
        }}</span>
        <ChevronDownIcon
          class="-s-rotate-90 s-transition-all s-duration-300"
          :class="[
            {
              '!s-rotate-0': isShowing,
            },
          ]"
        />
      </div>
      <div class="s-flex s-justify-end">
        <span
          class="s-text-[#EA4335] s-text-xs s-font-bold s-block s-mr-4 s-cursor-pointer"
          @click="$emit('delete', room.id)"
          >Remove</span
        >
      </div>
    </div>
    <div v-if="isShowing">
      <div>
        <div class="s-mb-[2.125rem] s-flex s-flex-col sm:s-flex-row">
          <div
            class="textfield-wrap s-mb-[1.375rem] sm:s-mb-0 sm:s-mr-5 md-x:!s-mr-[3.25rem] s-flex-1"
          >
            <label
              class="s-text-[#222228] s-text-sm s-font-semibold s-block s-mb-3"
              >Name this bedroom</label
            >
            <TextField
              :class="'!s-mr-0 md:s-mr-8 s-w-full !s-mb-0'"
              placeholder="Bedroom One"
              type="text"
              name="bedroomName"
              :model-value="room.bedroomName"
            />
          </div>
          <div class="s-flex-1">
            <label
              class="s-text-[#222228] s-text-sm s-font-semibold s-block s-mb-3"
              >Is this a master bedroom?</label
            >
            <div class="s-flex">
              <SelectButton name="Yes" :value="room.masterBed" text="Yes" />
              <SelectButton name="No" :value="room.masterBed" text="No" />
            </div>
          </div>
        </div>
        <div class="s-mb-[2.125rem] s-w-full sm:s-w-[47%]">
          <div class="s-mb-[1.375rem] sm:s-mb-0 s-flex-1">
            <label
              class="s-text-[#222228] s-text-sm s-font-semibold s-block s-mb-3"
              >What furnishings are in the bedroom?</label
            >
            <MultipleSelect
              :selected-value="room.bedroomFurnishings"
              @update="(value) => (formData.bedroomFurnishings = value)"
            />
          </div>
        </div>
        <div class="s-mb-[2.125rem]">
          <div class="s-flex s-flex-col sm:s-flex-row">
            <div
              class="textfield-wrap s-mb-[1.375rem] sm:s-mb-0 sm:s-mr-5 md-x:!s-mr-[3.25rem] s-flex-1"
            >
              <label
                class="s-text-[#222228] s-text-sm s-font-semibold s-block s-mb-3"
                >What type of bathroom do you have?</label
              >
              <div class="s-flex">
                <SelectButton
                  name="ensuite"
                  :value="room.bathroomType"
                  text="Ensuite"
                />
                <SelectButton
                  name="shared"
                  :value="room.bathroomType"
                  text="Shared"
                />
              </div>
            </div>
            <div class="s-flex-1">
              <label
                class="s-text-[#222228] s-text-sm s-font-semibold s-block s-mb-3"
                >What furnishings are in the bathroom?</label
              >
              <MultipleSelect
                :selected-value="room.bathroomFurnishings"
                @update="(value) => (formData.bathroomFurnishings = value)"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { required } from 'vuelidate/lib/validators'
import { validationMessage } from 'vuelidate-messages'

const formMessages = {
  bedroomNameRequired: () => 'Bedroom name is required',
  masterBedroomRequired: () => 'Master bedroom is required',
  bedroomFurnishingsRequired: () => 'kindly select bedroom Furnishings',
  bathroomFurnishingsRequired: () => 'Kindly select bathroom Furnishings',
  bathroomTypeRequired: () => 'Kindly select bathroom type',
}
export default {
  props: {
    room: {
      type: Object,
      default: () => {},
    },
  },
  data() {
    return {
      isShowing: false,
      formData: {
        bedroomName: '',
        masterBedroom: '',
        bedroomFurnishings: [],
        bathroomFurnishings: [],
        bathroomType: '',
      },
    }
  },
  validations: {
    formData: {
      bedroomName: {
        bedroomNameRequired: required,
      },
      masterBedroom: {
        masterBedroomRequired: required,
      },
      bedroomFurnishings: {
        bedroomFurnishingsRequired: required,
      },
      bathroomFurnishings: {
        bathroomFurnishingsRequired: required,
      },
      bathroomType: {
        bathroomTypeRequired: required,
      },
    },
  },
  computed: {},
  methods: {
    validationMsg: validationMessage(formMessages),
    showTab() {
      this.isShowing = !this.isShowing
      this.$emit('toggleForm', this.isShowing)
    },
  },
}
</script>

<style lang="scss" scoped>
.border {
  border-bottom: 1px solid rgba(177, 183, 214, 0.26);
}
</style>
