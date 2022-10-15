<template>
  <div
    class="s-bg-[#F9FAFD] md-s:s-pt-24 s-pt-20 md-s:s-pb-32 s-pb-20 s-w-full"
  >
    <div class="s-w-full s-max-w-[1366px] s-mx-auto md-s:s-px-32 s-px-7">
      <h5
        class="s-uppercase md-s:s-text-sm s-text-xs s-mb-3.5 s-text-[#07A560] s-font-semibold s-text-left"
      >
        COMMON QUESTIONS
      </h5>
      <h2
        class="md-s:s-text-4xl s-text-2xl s-text-black s-font-bold s-w-full s-text-left s-mb-5"
      >
        Frequently asked questions
      </h2>
      <p class="s-text-sm s-text-[#4B4F63] s-w-full s-max-w-4xl">
        Get quick answers to all your questions and concerns about Spleet and
        Spleet homes. Whether as a member, host or just a visitor, we will have
        an answer waiting for you.
      </p>
      <nuxt-link
        to="/faq"
        class="s-block s-bg-primary-blue s-text-white s-text-sm s-w-40 s-py-4 s-rounded-[28px] s-text-center s-mt-8 s-mb-7 hover:s-text-white"
        >Visit FAQs</nuxt-link
      >

      <div>
        <BaseAccordion>
          <template #title="{ _class }">
            <span
              class="s-font-bold md-s:s-text-lg s-text-base s-text-left"
              :class="_class"
              >How does Spleet Work?</span
            >
          </template>
          <template #content>
            <p class="s-text-sm s-text-[#4B4F63] s-mb-4">
              At Spleet, we offer access to premium residential solutions with
              options of daily, monthly and quarterly and biannual subscription.
              Once you find a space you like, simply create a booking along with
              a few details about yourself. This request is then processed
              within a few hours.
            </p>
            <p class="s-text-sm s-text-[#4B4F63]">
              No payment is taken until the booking is accepted. We will charge
              you the rent upfront plus a one-off booking fee and security
              deposit. You will then receive a confirmation email with the
              details of your new space.
            </p>
          </template>
        </BaseAccordion>
        <BaseAccordion>
          <template #title="{ _class }">
            <span
              class="s-font-bold md-s:s-text-lg s-text-base s-text-left"
              :class="_class"
              >Does Spleet organise viewings?</span
            >
          </template>
          <template #content>
            <p class="s-text-sm s-text-[#4B4F63]">
              Yes.
            </p>
          </template>
        </BaseAccordion>
        <BaseAccordion>
          <template #title="{ _class }">
            <span
              class="s-font-bold md-s:s-text-lg s-text-base s-text-left"
              :class="_class"
              >Does Spleet own the spaces listed?</span
            >
          </template>
          <template #content>
            <p class="s-text-sm s-text-[#4B4F63]">
              No Spleet does not own the spaces listed, as we have homeowners
              that list these spaces on our platform.
            </p>
          </template>
        </BaseAccordion>
      </div>
    </div>
  </div>
</template>

<script>
export default {}
</script>

<style></style>
