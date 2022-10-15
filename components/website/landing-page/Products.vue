<template>
  <div
    ref="product"
    class="md-s:s-pt-28 s-pt-20 md-s:s-pl-16 s-px-7 md-s:s-pr-0 md-s:s-pb-44 s-pb-11 s-bg-black s-w-full"
  >
    <div class="s-w-full s-max-w-[1440px] s-mx-auto">
      <div class="md-s:s-mb-12 s-mb-7">
        <h5
          class="s-uppercase md-s:s-text-sm s-text-xs s-mb-3.5 s-text-[#07A560] s-font-semibold s-text-center md-s:s-text-left"
        >
          OUR PRODUCTS
        </h5>
        <h2
          class="md-s:s-text-4xl s-text-2xl s-text-white s-font-bold s-w-full s-max-w-4xl s-text-center md-s:s-text-left"
        >
          Are you looking to rent a home or an apartment? We’ve got you covered
        </h2>
      </div>
      <div class="s-flex md-s:s-flex-nowrap s-flex-wrap">
        <div
          class="md-s:s-block s-flex s-justify-around md-s:s-mx-0 s-mx-auto s-w-full md-s:s-mr-12 md-x:s-mr-32 md-s:s-mb-0 s-mb-7"
          style="width: fit-content; height: fit-content"
        >
          <div
            class="md-s:s-pl-2 s-pr-5 md-s:s-pr-0 s-pl-5 s-pb-3 md-s:s-pb-0 md-s:s-mb-7 s-border-solid s-cursor-pointer"
            :class="{
              'md-s:s-border-l-2 s-border-l-0 md-s:s-border-b-0 s-border-b-2 s-border-[#3DDC97]':
                userType === 'tenants',
            }"
            @click="toggleUserType('tenants')"
          >
            <p
              class="s-text-xs s-font-bold s-text-white s-uppercase s-whitespace-nowrap"
              :class="{ 's-text-[#3DDC97]': userType === 'tenants' }"
            >
              FOR TENANTS
            </p>
          </div>
          <div
            class="md-s:s-pl-2 s-pr-5 md-s:s-pr-0 s-pl-5 s-pb-3 md-s:s-pb-0 md-s:s-mb-7 s-border-solid s-cursor-pointer"
            :class="{
              'md-s:s-border-l-2 s-border-l-0 md-s:s-border-b-0 s-border-b-2 s-border-[#3DDC97]':
                userType === 'landlords',
            }"
            @click="toggleUserType('landlords')"
          >
            <p
              class="s-text-xs s-font-bold s-text-white s-uppercase s-whitespace-nowrap"
              :class="{ 's-text-[#3DDC97]': userType === 'landlords' }"
            >
              FOR LANDLORDS
            </p>
          </div>
        </div>
        <div
          v-show="userType === 'tenants'"
          class="s-flex md-s:s-flex-nowrap s-flex-wrap s-mx-auto md-s:s-mx-0 md-s:s-w-full s-overflow-auto s-scroll-smooth hide-scroll md-s:s-pr-4"
          style="width: fit-content"
        >
          <div
            class="s-w-full s-max-w-md md-s:s-min-w-[400px] md-s:s-mr-16 s-mx-auto s-mb-4 md-s:s-mb-0"
          >
            <div class="s-w-full md-s:s-h-[266px] s-h-56">
              <img
                src="~/assets/images/landing-page/marketplace-prod.jpeg"
                alt="marketplace image"
                class="s-object-center s-rounded-tl-3xl s-rounded-tr-3xl"
              />
            </div>
            <div
              class="md-s:s-px-6 s-px-[18px] md-s:s-py-7 s-py-6 s-bg-[#131414] s-rounded-bl-3xl s-rounded-br-3xl md-s:s-h-[274px] s-relative"
            >
              <div class="s-flex s-mb-8">
                <img
                  src="~/assets/icons/products/mobile/marketplaceIcon.svg"
                  alt="marketplace product"
                  class="s-h-10 s-w-10 s-block s-mr-2.5"
                />
                <div>
                  <h2 class="s-text-white md-s:s-text-2xl s-text-xl s-mb-0.5">
                    Marketplace
                  </h2>
                  <p class="s-text-sm s-text-white">Find a home, pay monthly</p>
                </div>
              </div>
              <p class="s-text-sm s-text-white s-mb-8">
                Find a home you love and pay monthly or quarterly. Our homes
                come fully furnished and equipped with the amenities you need.
                All you have to do is select a space, subscribe and your Spleet
                home is warm, comfortable, and ready for living.
              </p>
              <nuxt-link
                to="/marketplace"
                class="s-text-sm s-text-primary-green s-flex s-items-center hover:s-text-primary-green md-s:s-absolute md-s:s-bottom-[28px]"
              >
                Learn more

                <svg
                  class="s-w-5 -s-rotate-90"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="#3DDC97"
                  aria-hidden="true"
                >
                  <path
                    fill-rule="evenodd"
                    d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                    clip-rule="evenodd"
                  />
                </svg>
              </nuxt-link>
            </div>
          </div>
          <div
            class="s-w-full s-max-w-md md-s:s-min-w-[400px] s-mx-auto s-mb-4 md-s:s-mb-0"
          >
            <div class="s-w-full md-s:s-h-[266px] s-h-56">
              <img
                src="~/assets/images/landing-page/rnpl-prod.jpeg"
                alt="rnpl image"
                class="s-object-center s-rounded-tl-3xl s-rounded-tr-3xl"
              />
            </div>

            <div
              class="md-s:s-px-6 s-px-[18px] md-s:s-py-7 s-py-6 s-bg-[#131414] s-rounded-bl-3xl s-rounded-br-3xl md-s:s-h-[274px] s-relative"
            >
              <div class="s-flex s-mb-8">
                <img
                  src="~/assets/icons/products/mobile/rnplIcon.svg"
                  alt="rnpl product"
                  class="s-h-10 s-w-10 s-block s-mr-2.5"
                />
                <div>
                  <h2 class="s-text-white md-s:s-text-2xl s-text-xl s-mb-0.5">
                    Rent Now, Pay Later
                  </h2>
                  <p class="s-text-sm s-text-white">Rental loans made easy</p>
                </div>
              </div>
              <p class="s-text-sm s-text-white s-mb-8">
                Spleet’s Rent Now, Pay Later gives you access to low interest,
                no collateral loans up to ₦3,000,000 to finance rent payments.
              </p>
              <nuxt-link
                to="#"
                class="s-text-sm s-text-primary-green s-flex s-items-center hover:s-text-primary-green md-s:s-absolute md-s:s-bottom-[28px]"
              >
                Learn more

                <svg
                  class="s-w-5 -s-rotate-90"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="#3DDC97"
                  aria-hidden="true"
                >
                  <path
                    fill-rule="evenodd"
                    d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                    clip-rule="evenodd"
                  />
                </svg>
              </nuxt-link>
            </div>
          </div>
        </div>
        <div
          v-show="userType === 'landlords'"
          class="s-flex md-s:s-flex-nowrap s-flex-wrap s-mx-auto md-s:s-mx-0 md-s:s-w-full s-overflow-auto s-scroll-smooth hide-scroll md-s:s-pr-4"
          style="width: fit-content"
        >
          <div
            class="s-w-full s-max-w-md md-s:s-min-w-[400px] md-s:s-mr-4 s-mx-auto s-mb-4 md-s:s-mb-0"
          >
            <div class="s-w-full md-s:s-h-[266px] s-h-56 s-overflow-hidden">
              <img
                src="~/assets/images/landing-page/verify-prod.jpeg"
                alt="verify image"
                class="s-object-center s-rounded-tl-3xl s-rounded-tr-3xl"
              />
            </div>

            <div
              class="md-s:s-px-6 s-px-[18px] md-s:s-py-7 s-py-6 s-bg-[#131414] s-rounded-bl-3xl s-rounded-br-3xl md-s:s-h-[357px] s-relative"
            >
              <div class="s-flex s-mb-8">
                <img
                  src="~/assets/icons/products/mobile/rnplIcon.svg"
                  alt="rnpl product"
                  class="s-h-10 s-w-10 s-block s-mr-2.5"
                />
                <div>
                  <h2 class="s-text-white md-s:s-text-2xl s-text-xl s-mb-0.5">
                    Verify
                  </h2>
                  <p class="s-text-sm s-text-white">
                    Tenant verification made easy.
                  </p>
                </div>
              </div>
              <p class="s-text-sm s-text-white s-mb-8">
                Spleet Verify provides landlords, property managers and real
                estate investors with real-time, detailed reports on prospective
                tenants. You get complete background checks, and other
                information to help you make the informed decision about who to
                rent to. Protect the value of your investment and safeguard
                against high-risk tenants, no more sleepless nights worrying
                about your property, when your tenant is ‘verified’ by Spleet
                Verify.
              </p>
              <nuxt-link
                to="/host/verify"
                class="s-text-sm s-text-primary-green s-flex s-items-center hover:s-text-primary-green md-s:s-absolute md-s:s-bottom-[28px]"
              >
                Learn more

                <svg
                  class="s-w-5 -s-rotate-90"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="#3DDC97"
                  aria-hidden="true"
                >
                  <path
                    fill-rule="evenodd"
                    d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                    clip-rule="evenodd"
                  />
                </svg>
              </nuxt-link>
            </div>
          </div>
          <div
            class="s-w-full s-max-w-md md-s:s-min-w-[400px] s-mx-auto s-mb-4 md-s:s-mb-0"
          >
            <div class="s-w-full md-s:s-h-[266px] s-h-56 s-overflow-hidden">
              <img
                src="~/assets/images/landing-page/listing-prod.jpeg"
                alt="listing image"
                class="s-object-center s-rounded-tl-3xl s-rounded-tr-3xl"
              />
            </div>

            <div
              class="md-s:s-px-6 s-px-[18px] md-s:s-py-7 s-py-6 s-bg-[#131414] s-rounded-bl-3xl s-rounded-br-3xl md-s:s-h-[357px] s-relative"
            >
              <div class="s-flex s-mb-8">
                <img
                  src="~/assets/icons/products/mobile/listingIcon.svg"
                  alt="listing product"
                  class="s-h-10 s-w-10 s-block s-mr-2.5"
                />
                <div>
                  <h2 class="s-text-white md-s:s-text-2xl s-text-xl s-mb-0.5">
                    List Your Space
                  </h2>
                  <p class="s-text-sm s-text-white">
                    Let your space earn money for you.
                  </p>
                </div>
              </div>
              <p class="s-text-sm s-text-white s-mb-8">
                Earn money from listing your space and reach thousands of
                prospective tenants. With Spleet, you eliminate agent and legal
                hassles, choose from a pool of verified tenants and enjoy 24/7
                maintenance support.
              </p>
              <nuxt-link
                to="/listing"
                class="s-text-sm s-text-primary-green s-flex s-items-center hover:s-text-primary-green md-s:s-absolute md-s:s-bottom-[28px]"
              >
                Learn more

                <svg
                  class="s-w-5 -s-rotate-90"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="#3DDC97"
                  aria-hidden="true"
                >
                  <path
                    fill-rule="evenodd"
                    d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                    clip-rule="evenodd"
                  />
                </svg>
              </nuxt-link>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapMutations } from 'vuex'

export default {
  data() {
    return {
      userType: 'tenants',
    }
  },
  mounted() {
    window.addEventListener('scroll', this.productInVewport, {
      passive: true,
    })
  },
  destroyed() {
    window.removeEventListener('scroll', this.productInVewport)
  },
  methods: {
    ...mapMutations('website', ['PRODUCT_IN_VIEW']),
    toggleUserType(value) {
      this.userType = value
    },
    productInVewport() {
      const rect = this.$refs.product.getBoundingClientRect()
      const inView = rect.top < 115 && rect.bottom > 118
      this.PRODUCT_IN_VIEW(inView)
    },
  },
}
</script>

<style lang="scss" scoped>
.hide-scroll {
  -ms-overflow-style: none;
  scrollbar-width: none;
  &::-webkit-scrollbar {
    display: none;
  }
}
</style>
