<template>
  <Modal
    :show="show"
    modal-max-width="s-max-w-[20rem]"
    modal-classes="!s-p-6"
    @close="$emit('close')"
  >
    <div>
      <img
        src="@/assets/images/warningIcon.svg"
        alt="warning_icon"
        class="s-mb-4"
      />
      <slot />
      <div class="s-flex s-justify-between s-gap-2 s-mt-2.5">
        <Button
          :text="backBtn"
          class="s-bg-[#CC1D1D] s-flex-1"
          @submit="$emit('close')"
        />
        <Button
          :loading="loading"
          :text="nextBtn"
          class="s-bg-primary-blue s-flex-1"
          @submit="$emit('submit')"
        />
      </div>
    </div>
  </Modal>
</template>

<script>
export default {
  props: {
    backBtn: {
      type: String,
      default: 'Go back',
    },
    nextBtn: {
      type: String,
      default: 'Submit',
    },
    show: {
      type: Boolean,
      default: false,
    },
    loading: {
      type: Boolean,
      default: false,
    },
  },
}
</script>

<style></style>
