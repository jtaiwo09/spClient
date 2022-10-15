<template>
  <button
    class="s-rounded-full s-font-bold s-leading-5 s-text-sm s-py-3.5 s-flex s-justify-center s-items-center s-h-12"
    :class="textClass"
    :disabled="loading"
    :type="type"
    @click.prevent="$emit('submit')"
  >
    <Loader v-if="loading" width="18" height="18" />
    <span v-if="icon" :class="{ 's-text-[#b0bcff]': loading }">{{ text }}</span>
    <div v-else>
      <slot />
    </div>
  </button>
</template>

<script>
export default {
  props: {
    loading: {
      type: Boolean,
      default: false,
    },
    type: {
      type: String,
      default: 'submit',
    },
    text: {
      type: String,
      default: 'submit',
    },
    icon: {
      type: Boolean,
      default: true,
    },
    textClass: {
      type: String,
      default: 's-text-white',
    },
  },
  emits: ['submit'],
}
</script>
