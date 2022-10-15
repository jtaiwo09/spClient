<template>
  <div class="s-flex s-items-center s-h-full">
    <div class="s-max-w-lg">
      <div
        class="s-w-[4.25rem] s-h-[4.25rem] s-rounded-full s-flex s-items-center s-justify-center s-bg-[#18CE7F] s-mb-[0.938rem]"
      >
        <TickWhiteIcon />
      </div>
      <h1 class="title s-mb-[0.438rem]">Your response has been submitted.</h1>
      <p class="s-font-normal s-leading-[1.438rem] s-text-sm s-text-[#63687E]">
        Thank you for taking time to complete the verification form. You should
        receive a response within 2-3 working days.
      </p>
      <div class="s-flex s-mt-10 sm:s-mt-[2.188rem]">
        <Button
          text="Explore Spleet"
          :class="'s-bg-primary-blue s-text-[#fff] s-py-3 s-w-full sm:s-w-[11.188rem] s-mr-4 '"
          @submit="redirect('login')"
        />
        <Button
          text="Sign Up"
          :class="'s-bg-[#fff] s-border-2 s-border-solid s-border-primary-blue !s-text-primary-blue s-py-3 s-w-full sm:s-w-32'"
          @submit="redirect('signup')"
        />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  methods: {
    redirect(redirectTo) {
      if (redirectTo === 'signup') {
        location.href = `${location.protocol}//${location.host}/signup`
      } else {
        location.href = `${location.protocol}//${location.host}`
      }
    },
  },
}
</script>

<style></style>
