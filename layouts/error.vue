<template>
  <div class="s-px-[2rem] lg:s-pr-[3.15rem] lg:s-pl-[4.75rem]">
    <div
      class="s-max-w-[90rem] s-mx-auto s-bg-white md-s:s-pt-[9.3rem] s-pt-[6.2rem] xs:s-pt-[9rem] md-s:s-pb-[9rem] s-pb-[6.2rem] xs:s-pb-[9rem] s-w-full"
    >
      <div class="md:s-flex s-w-full">
        <div class="md:s-w-[50%]">
          <div class="md:s-w-[60%]">
            <h5
              class="s-uppercase md-s:s-text-sm s-text-xs s-mb-3.5 s-text-[#07A560] s-font-normal s-text-left"
            >
              ERROR 404
            </h5>
            <h2
              class="md-s:s-text-4xl s-text-2xl s-text-[#000628] s-font-bold s-w-full s-max-w-md s-text-left s-mb-5"
            >
              Page could not be found
            </h2>
            <p
              class="s-text-[0.9rem] s-text-[#0E0E0E] s-font-[400] s-w-full s-max-w-xl"
            >
              The page you’re looking for might have been deleted or is
              temporarily unavailable.
            </p>

            <nuxt-link
              to="/"
              class="s-text-white s-text-[0.8rem] s-font-[400] s-w-[fit-content] s-mt-5 s-bg-primary-blue s-py-2 s-px-8 s-rounded-[20px] s-block hover:s-text-white"
            >
              Go Home
            </nuxt-link>
          </div>
        </div>

        <div class="md:s-w-[50%] md:s-mt-0 s-mt-20">
          <img
            src="https://res.cloudinary.com/spleetng/image/upload/v1662462600/frontend-images/Box.svg"
            alt="404 bg"
            class="s-object-cover lg:s-w-[35rem] lg:s-h-[24rem]"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  layout: 'error-layout',
}
</script>

<style></style>
