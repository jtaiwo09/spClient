<template>
  <div
    class="s-max-w-[29.188rem] s-h-max s-min-h-[27.438rem] s-m-auto sm:s-rounded-xl sm:s-border sm:s-border-[#B1B7D6] sm:s-border-solid s-absolute s-top-0 s-left-0 s-right-0 s-bottom-0"
  >
    <div
      class="s-flex s-flex-col s-justify-center s-items-center s-w-full s-mt-10 s-px-8 sm:s-px-0"
    >
      <component :is="icon" v-if="showIcon" :class="'s-mb-10'" />
      <h2
        class="title s-text-center s-mb-6"
        :class="{ 'sm:s-mb-8': showButton }"
      >
        {{ data.title }}
      </h2>
      <p
        class="sub-title s-mb-2.5 s-max-w-[17.188rem] s-text-center"
        :class="[
          { 's-max-w-[23.125rem]': showButton },
          { 's-mb-0': showButton },
        ]"
      >
        {{ data.subTitle }}
      </p>
      <p
        class="sub-title s-max-w-[17.188rem] s-text-center"
        :class="{ 's-max-w-[23.125rem]': showButton }"
      >
        {{ data.subTitle2 }}
      </p>
      <template v-if="resend">
        <Button
          v-if="showButton"
          :text="data.btnText"
          :loading="loading"
          class="s-bg-primary-blue s-w-[80%] s-mt-12"
          @submit="$emit('submit')"
        />
      </template>
      <template v-else>
        <Button
          v-if="showButton"
          :text="data.btnText"
          class="s-bg-primary-blue s-w-[80%] s-mt-12"
          @submit="$router.push({ name: data.btnLink })"
        />
      </template>
      <NuxtLink
        v-if="showLink"
        class="s-flex s-items-center s-mt-[2.188rem]"
        :to="{ name: data.link }"
        :class="{ 's-mt-7': showButton }"
      >
        <div
          class="s-w-[1.188rem] s-h-[1.188rem] s-flex s-items-center s-mr-2.5 s-justify-center s-rounded-full s-border s-border-solid s-border-[#5C5A77]"
        >
          <CollapseIcon :fill="'none'" />
        </div>
        <p class="sub-title s-mb-0">{{ data.linkText }}</p>
      </NuxtLink>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    data: {
      type: Object,
      default: () => {},
    },
    showButton: {
      type: Boolean,
      default: false,
    },
    loading: {
      type: Boolean,
      default: false,
    },
    showIcon: {
      type: Boolean,
      default: true,
    },
    resend: {
      type: Boolean,
      default: false,
    },
    icon: {
      type: String,
      default: 'EnvelopeIcon',
    },
    showLink: {
      type: Boolean,
      default: true,
    },
  },
  emits: ['submit'],
}
</script>

<style></style>
