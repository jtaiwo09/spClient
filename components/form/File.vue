<template>
  <div>
    <div class="s-mb-5 sm:s-mb-6">
      <label
        class="s-leading-[0.938rem] s-font-bold s-text-[#242428] s-text-xs s-ml-2 s-mb-2 s-block s-uppercase"
        for=""
        >{{ label }}</label
      >
      <div
        class="s-relative s-flex s-items-center s-text-gray-400 focus-within:s-text-gray-600"
      >
        <input
          :id="name"
          :ref="name"
          :name="name"
          required
          class="file s-pr-14 s-pl-6 s-py-3.5 s-font-normal s-placeholder-[#8F8FB1] s-text-[#000] s-text-sm s-rounded-full s-border-none s-ring-1 s-ring-[#99A4E1] focus:s-bg-[#F1F3FF] focus:s-ring-primary-blue focus:s-ring-2 s-bg-[#FAFAFE] s-w-full focus:s-outline-none"
          :class="[
            {
              's-border-none s-ring-0 s-bg-[#f4f6ff] s-cursor-not-allowed':
                disabled,
            },
            {
              's-ring-[#EA4335] focus:s-ring-[#EA4335]':
                error !== null && error.$error,
            },
          ]"
          type="file"
          icon="icon"
          :disabled="disabled"
          @change="upload($event)"
        />

        <div
          v-if="file !== null"
          class="s-absolute s-right-5 s-cursor-pointer"
          @click="showModal"
        >
          <VisibleIcon v-if="file !== null" />
        </div>

        <label
          v-else
          :for="name"
          class="s-absolute s-right-5 s-text-primary-blue s-text-sm s-cursor-pointer"
          @click="TriggerFile"
          >Browse</label
        >
      </div>
      <div
        v-if="file !== null"
        class="s-flex s-items-center s-ml-[0.625rem] s-mt-[0.438rem] s-cursor-pointer"
        @click="remove"
      >
        <TrashIcon />
        <span class="s-text-xs s-text-[#EA4335] s-font-semibold s-ml-2"
          >Remove</span
        >
      </div>
      <span
        class="s-text-xs s-text-[#EA4335] s-block s-mt-1 s-ml-2 s-font-normal s-leading-4"
        >{{ validationMsg }}</span
      >
    </div>
    <Modal :show="show" @close="show = false">
      <h2 class="s-font-bold s-text-[1.25rem] s-text-[#0E0C0C] s-mb-7">
        Upload File
      </h2>
      <div class="s-w-full s-h-[17.125rem] s-bg-[#D9D9D9]">
        <img
          :src="file ? file.secure_url : ''"
          alt=""
          class="s-w-full s-h-full s-object-cover"
        />
      </div>
      <div class="s-flex s-justify-end s-mt-[2.5rem]">
        <Button
          text="Change"
          :class="'s-w-[8.375rem] s-border-2 s-border-solid s-border-primary-blue !s-py-3 !s-text-primary-blue s-mr-2'"
          @submit="TriggerFile"
        />
        <Button
          text="Continue"
          :class="'s-w-[8.375rem] s-bg-primary-blue !s-py-3'"
          @submit="show = false"
        />
      </div>
    </Modal>
  </div>
</template>

<script>
import { mapActions } from 'vuex'
export default {
  props: {
    name: {
      type: String,
      default: '',
    },
    disabled: {
      type: Boolean,
      default: false,
    },
    label: {
      type: String,
      default: '',
    },
    value: {
      type: [Object, String],
      default: null,
    },
    error: {
      type: Object,
      default: null,
    },
    validationMsg: {
      type: String,
      default: '',
    },
    folder: {
      type: String,
      default: '',
    },
  },
  emits: ['update', 'show', 'remove'],
  data() {
    return {
      show: false,
      file: null,
      loading: false,
    }
  },
  watch: {
    file() {
      if (this.file === null) {
        this.$refs[this.name].value = ''
      }
    },
  },
  methods: {
    ...mapActions('util', ['imageUpload', 'deleteCloudinaryImage']),
    showModal() {
      this.show = true
      // $emit('show', value)
    },
    async upload(e) {
      // $emit('update', $event.target.files[0])
      const file = e.target.files[0]
      if (file !== undefined) {
        this.loading = true
        const preset = this.$config.cloudinaryPreset
        const formData = new FormData()
        formData.append('file', file)
        formData.append('upload_preset', preset)
        if (this.folder) {
          formData.append('folder', this.folder)
        }
        try {
          const response = await this.imageUpload(formData)
          this.loading = false
          this.file = response
          this.$emit('uploaded', this.file)
        } catch (error) {
          this.loading = false
          return error
        }
      }
    },
    async remove() {
      try {
        const response = await this.deleteCloudinaryImage(this.file.public_id)
        if (response.data.statusCode === 200) {
          this.$showToast(response.data.message, 'success')
          this.file = null
          this.$emit('remove')
        }
      } catch (error) {
        this.$errorHandler(error.response.data.message)
      }
    },
    TriggerFile() {
      this.show = false
      this.$refs[this.name].click()
    },
  },
}
</script>

<style lang="scss" scoped>
.file::-webkit-file-upload-button {
  display: none;
  user-select: none;
}
</style>
