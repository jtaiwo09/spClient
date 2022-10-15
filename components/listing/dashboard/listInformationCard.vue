<template>
  <div
    class="s-mx-auto s-bg-white s-max-w-[416px] s-w-full s- s-rounded-xl s-px-5 s-py-8"
  >
    <h1 class="s-text-lg s-text-[#0E0C0C] s-pr-6 s-pl-2.5 s-font-bold">
      {{ title }}
    </h1>
    <div class="s-mt-7">
      <div
        v-for="(detail, i) in spaceDetails"
        :key="i"
        class="s-flex s-items-center s-justify-between s-pr-6 s-pl-2.5 s-h-12 s-border-solid s-border-b st s-border-b-[#99A4E1]/25"
      >
        <p class="s-text-sm s-text-[#242428] s-font-normal s-capitalize">
          {{ detail.title }}
        </p>
        <Button
          :text="'Edit'"
          class="!s-text-primary-blue s-text-sm s-leading-4 s-font-semibold s-py-0"
          @submit="handleEdit(detail)"
        />
      </div>
    </div>
  </div>
</template>

<script>
import { mapMutations } from 'vuex'

export default {
  props: {
    title: {
      type: String,
      default: 'Listing Information',
    },
    spaceDetails: {
      type: Array,
      default: () => [],
    },
  },
  methods: {
    ...mapMutations('host/listing', ['UPDATE_LEVEL', 'UPDATE_STEP']),
    handleEdit(detail) {
      this.UPDATE_LEVEL(detail.level)
      this.UPDATE_STEP(detail.step)
      this.$emit('edit', detail)
    },
  },
}
</script>

<style lang="scss" scoped>
.st:last-child {
  border-bottom: 0px;
}
</style>
