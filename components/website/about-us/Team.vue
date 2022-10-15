<template>
  <div>
    <div
      class="s-w-full s-max-w-[1440px] s-mx-auto md-s:s-pt-14 s-pt-9 md-s:s-px-20 s-px-7 s-pb-12"
    >
      <div class="md-s:s-mb-14 s-mb-7">
        <h5
          class="s-uppercase md-s:s-text-sm s-text-xs s-mb-3.5 s-text-center s-text-[#07A560] s-font-semibold"
        >
          SPLEET SUPERHEROES
        </h5>
        <h2
          class="md-s:s-text-3xl s-text-2xl s-text-center s-text-[#000628] s-font-[700] s-max-w-[700px] s-m-auto"
        >
          We're a growing, and diverse team of colourful people
        </h2>

        <div class="md-s:s-grid md-s:s-grid-cols-4 s-gap-0 s-mt-10">
          <div
            v-for="({ name, position, image }, index) in teamData.team"
            :key="index"
            class="s-mb-20 s-text-center"
          >
            <img :src="image" :alt="name" class="s-max-w-[170px] s-m-auto" />

            <p class="s-text-[#000000] s-text-[15px] s-pt-3">
              {{ name }}
            </p>

            <p class="s-text-[#000000] s-text-[14px] s-pt-1">
              {{ position }}
            </p>
          </div>
        </div>
      </div>
    </div>
    <div
      class="s-bg-[url('https://res.cloudinary.com/spleetng/image/upload/v1662975512/frontend-images/value-bg-mobile.png')] sm:s-bg-[url('https://res.cloudinary.com/spleetng/image/upload/f_auto/v1663170471/frontend-images/value-bg.png')] s-bg-cover s-bg-center s-w-full sm:s-h-[590px] s-h-[250px] s-bg-no-repeat"
    ></div>
  </div>
</template>

<script>
import teamData from '~/static/data/theTeam.json'
export default {
  data() {
    return {
      teamData,
    }
  },
}
</script>

<style></style>
