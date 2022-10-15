<template>
  <small class="s-text-[red] s-text-xs s-block s-mt-1 s-ml-1">{{
    validationMsg
  }}</small>
</template>

<script>
export default {
  props: {
    validationMsg: {
      type: [Function, String],
      default: () => '',
    },
  },
}
</script>

<style></style>
