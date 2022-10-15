<template>
  <div
    class="s-p-12 s-bg-[#99a4e1]/[0.24] s-rounded-xl"
    @dragover.prevent="dragover"
    @dragleave="dragleave"
    @drop.prevent="drop"
  >
    <input
      id="assetsFieldHandle"
      ref="file"
      type="file"
      :multiple="multiple"
      name="fields[assetsFieldHandle][]"
      class="s-w-px s-h-px s-opacity-0 s-overflow-hidden s-absolute"
      :accept="format.join()"
      @change="onChange"
    />

    <label for="assetsFieldHandle" class="s-block s-cursor-pointer">
      <div class="s-w-fit s-h-fit s-mx-auto s-mb-3.5">
        <DragDropUpload v-if="!loader" />
        <Loader v-else width="30" height="30" fill="#2E48DA" />
      </div>
      <p class="s-text-center s-text-base s-font-semibold s-mb-1">
        Drag &amp; Drop Files Here or
        <span class="s-text-primary-blue">Browse</span>
      </p>
      <p class="s-text-xs s-text-[#222228] s-text-center">
        Supported formats: {{ format.join(', ').toUpperCase() }}
      </p>
    </label>
  </div>
</template>

<script>
import { mapActions } from 'vuex'
export default {
  props: {
    format: {
      type: Array,
      default: () => ['.jpeg', '.jpg', '.png'],
    },
    multiple: {
      type: Boolean,
      default: true,
    },
  },
  data() {
    return {
      filelist: [],
      loader: false,
    }
  },
  methods: {
    ...mapActions('util', ['imageUpload']),

    convertToFormData(file) {
      const preset = this.$config.cloudinaryPreset
      const formData = new FormData()
      formData.append('file', file)
      formData.append('upload_preset', preset)
      return formData
    },
    listFiles(files) {
      return files.map((el) => {
        return this.convertToFormData(el)
      })
    },
    async onChange() {
      this.loader = true
      this.filelist = [...this.$refs.file.files, ...this.filelist]
      try {
        const response = await Promise.all(
          this.listFiles(this.filelist).map((file) => this.imageUpload(file))
        )
        this.loader = false
        this.$emit('uploads', response)
        this.filelist = []
      } catch (error) {
        this.loader = false
        this.$errorHandler(error)
      }
    },
    dragover(event) {
      // Add some visual fluff to show the user can drop its files
      if (!event.currentTarget.classList.contains('s-bg-[#99a4e1]/[0.5]')) {
        event.currentTarget.classList.remove('s-bg-[#99a4e1]/[0.24]')
        event.currentTarget.classList.add('s-bg-[#99a4e1]/[0.5]')
      }
    },
    dragleave(event) {
      // Clean up
      event.currentTarget.classList.add('s-bg-[#99a4e1]/[0.24]')
      event.currentTarget.classList.remove('s-bg-[#99a4e1]/[0.5]')
    },
    drop(event) {
      this.$refs.file.files = event.dataTransfer.files
      this.onChange() // Trigger the onChange event manually
      // Clean up
      event.currentTarget.classList.add('s-bg-[#99a4e1]/[0.24]')
      event.currentTarget.classList.remove('s-bg-[#99a4e1]/[0.5]')
    },
  },
}
</script>

<style></style>
