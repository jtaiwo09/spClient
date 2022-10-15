<template>
  <div
    class="s-max-w-full s-text-center s-rounded-xl s-border s-flex s-justify-center s-items-center s-h-[70vh] s-max-h-[685px]"
    :class="newClass"
  >
    <div>
      <p v-if="title" class="s-font-bold sm:s-text-xl s-text-lg s-leading-6">
        {{ title }}
      </p>

      <slot />
      <div
        class="s-mx-auto s-max-w-fit"
        :class="display ? 's-block' : 's-hidden'"
      >
        <Button
          :text="btnText"
          :loading="loading"
          class="s-py-3 s-rounded-full s-bg-primary-blue s-text-[#fff]/100 s-text-sm s-font-bold s-leading-4 s-w-64 s-mt-7"
          @submit="$emit('btnAction')"
        />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  components: {},
  props: {
    title: {
      type: String,
      default: ' Oh snap! there’s nothing here',
    },
    btnText: {
      type: String,
      default: 'Verify Tenant',
    },
    newClass: {
      type: String,
      default: 's-border-gray-200 s-bg-white  s-py-14',
    },
    loading: {
      type: Boolean,
      default: false,
    },
    display: {
      type: Boolean,
      default: true,
    },
  },
}
</script>

<style lang="scss" scoped></style>
