<template>
  <div
    class="s-w-screen s-h-screen s-bg-[#000000cc] s-fixed s-top-0 s-left-0 s-px-5 s-z-[1000]"
    :class="[!show ? 's-hidden' : 's-block']"
    @click="$emit('toggle')"
  >
    <div
      class="s-bg-white s-rounded-md s-p-[30px] s-absolute s-top-0 s-left-0 s-right-0 s-bottom-0 s-m-auto s-h-fit"
      :class="extraClass"
    >
      <CloseIcon
        fill="#000"
        class="s-mb-3 s-block s-mx-auto s-cursor-pointer"
        @click="$emit('toggle')"
      />
      <div class="s-h-[80vh] s-overflow-auto" @click.stop>
        <slot />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    show: {
      type: Boolean,
      default: false,
    },
    extraClass: {
      type: String,
      default: 's-max-w-[600px] s-w-[calc(100%-40px)]',
    },
  },
}
</script>

<style></style>
