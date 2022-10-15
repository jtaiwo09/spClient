<template>
  <div
    v-if="Object.keys(apartment).length !== 0"
    class="s-bg-white s-px-2.5 s-pt-2 s-rounded-xl s-w-full s-h-[400px]"
  >
    <div class="apartment__slider s-relative">
      <div class="s-absolute s-top-[12px] s-right-[12px] s-z-10">
        <button
          class="s-w-7 s-h-7 s-bg-[#0F0F0F] s-rounded-full s-relative s-mr-1.5 s-shadow-[0_4px_4px_rgba(0,0,0,0.1)]"
          @click="$refs.apartmentImages.previous()"
        >
          <ChevronDownIcon
            stroke="#fff"
            class="s-rotate-90 s-absolute s-inset-0 s-m-auto"
          />
        </button>
        <button
          class="s-w-7 s-h-7 s-bg-[#0F0F0F] s-rounded-full s-relative s-shadow-[0_4px_4px_rgba(0,0,0,0.1)]"
          @click="$refs.apartmentImages.next()"
        >
          <ChevronDownIcon
            stroke="#fff"
            class="-s-rotate-90 s-absolute s-inset-0 s-m-auto"
          />
        </button>
      </div>

      <VueperSlides
        ref="apartmentImages"
        :infinite="false"
        class="no-shadow"
        :arrows="false"
        :touchable="true"
      >
        <VueperSlide
          v-for="(image, index) in apartment.images"
          :key="index"
          :title="index.toString()"
          class="space__listing-images-wrap"
        >
          <template #content>
            <router-link
              :to="`/apartment/${apartment.slug}`"
              class="space__listing-info"
            >
              <div
                class="s-w-full s-h-[228px] s-bg-center s-bg-cover s-bg-no-repeat s-rounded-t-md"
                :style="{
                  backgroundImage: `url(${image})`,
                }"
              >
                <div
                  v-if="apartment.images.length > 0"
                  class="space__listing-overlay"
                ></div>
              </div>
            </router-link>
          </template>
        </VueperSlide>
      </VueperSlides>
    </div>
    <router-link
      :to="`/apartment/${apartment.slug}`"
      class="space__listing-info"
    >
      <div class="sm:s-px-2.5 s-px-1 s-py-4">
        <div class="s-flex s-justify-between s-items-center">
          <div>
            <h3
              class="s-font-bold sm:s-text-lg s-text-base s-mb-4"
              :title="apartment.name"
            >
              {{ apartment.name | truncate(15) }}
            </h3>
            <div class="s-flex s-items-center">
              <span class="md:s-text-sm s-text-xs s-text-[#4B4F63]"
                >{{ apartment.beds }} bed(s)</span
              >
              <span
                class="s-block s-bg-[#4B4F63] s-h-[5px] s-w-[5px] s-rounded-full s-mx-2.5"
              ></span>
              <span class="md:s-text-sm s-text-xs s-text-[#4B4F63]"
                >{{
                  apartment.bath && apartment.bath.endsWith('.5')
                    ? apartment.bath
                    : Number(apartment.bath)
                }}
                bath(s)</span
              >
            </div>
          </div>
          <div>
            <div class="s-flex s-items-center s-mb-4">
              <LocationIcon
                width="16"
                height="18"
                stroke="#4B4F63"
                class="s-mr-1"
              />
              <span
                class="md:s-text-sm s-text-xs s-text-[#4B4F63]"
                :title="apartment.city"
                >{{ apartment.city | truncate(15) }}</span
              >
            </div>
            <div class="s-flex s-items-center">
              <HomeIcon
                width="16"
                height="16"
                stroke="#4B4F63"
                class="s-mr-1"
              />
              <span class="md:s-text-sm s-text-xs s-text-[#4B4F63]"
                >{{ apartment.spaceType | capitalize }} space</span
              >
            </div>
          </div>
        </div>
        <hr class="s-w-full s-my-4 s-border-[#2e48da]/[0.1]" />
        <div class="s-flex s-items-center s-justify-between">
          <div class="s-flex s-items-center">
            <CheckedIcon class="s-mr-1.5" />
            <span class="md:s-text-sm s-text-xs s-text-[#4B4F63]"
              >All bills included</span
            >
          </div>
          <p
            v-if="apartment.subType"
            class="md:s-text-sm s-text-xs s-text-[#4B4F63]"
          >
            From
            <span class="s-font-bold s-text-black"
              >{{ apartment.country === 'Ghana' ? 'GHC' : 'NGN' }}
              {{
                new Intl.NumberFormat().format(
                  Number(apartment.subType.amount) +
                    Number(apartment.subType.computed_commission) +
                    Number(apartment.subType.service_charge) +
                    Number(apartment.subType.withholdingTax)
                )
              }}</span
            >{{ ' '
            }}{{
              apartment.subType.sub_plan == 'daily'
                ? 'day'
                : apartment.subType.sub_plan == 'monthly'
                ? 'monthly'
                : apartment.subType.sub_plan == 'yearly'
                ? 'annually'
                : apartment.subType.sub_plan == 'biannual'
                ? 'biannually'
                : ''
            }}
          </p>
        </div>
      </div>
    </router-link>
  </div>
</template>

<script>
import { VueperSlides, VueperSlide } from 'vueperslides'
import 'vueperslides/dist/vueperslides.css'
export default {
  components: {
    VueperSlides,
    VueperSlide,
  },
  props: {
    apartment: {
      type: Object,
      default: () => {},
    },
  },
}
</script>

<style lang="scss">
.apartment__slider {
  .vueperslides__track {
    position: relative;
  }

  .vueperslides__parallax-wrapper {
    padding-bottom: unset !important;
  }

  .vueperslides__bullet .default {
    width: 37px;
    height: 3px;
    border-color: rgba(231, 231, 231, 0.48);
    border-width: 2px;
    box-shadow: none !important;
    border-radius: 0;
  }

  .vueperslides__bullet {
    margin-top: 8px;
    margin-bottom: 8px;
  }

  .vueperslides__bullet,
  .vueperslides__bullets button {
    &:focus {
      outline: none;
    }
  }

  .vueperslides__bullet--active .default {
    border-color: #3ddc97;
  }

  .vueperslides__arrow {
    svg {
      width: 3em;
      stroke-width: 2;
      stroke: #fff;
    }
  }
}
</style>
