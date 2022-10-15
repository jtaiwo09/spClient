<template>
  <div
    class="sm:s-w-full s-min-w-[343px] s-rounded-t-xl s-py-4 s-px-4 sm:s-px-0"
    :class="newClass"
  >
    <p class="s-text-sm s-font-normal s-text-center s-leading-6">
      {{ title }}
      <slot />
    </p>
  </div>
</template>

<script>
export default {
  props: {
    title: {
      type: String,
      default:
        'You don’t have enough funds in your account to use this service.',
    },
    newClass: {
      type: String,
      default: 's-bg-[#EAEDFF]',
    },
    route: {
      type: Object,
      default: () => ({
        text: 'Click here to top up or subscribe to a plan',
        link: '#',
      }),
    },
  },
}
</script>

<style lang="scss" scoped></style>
