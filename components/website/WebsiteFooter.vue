<template>
  <div class="s-px-8 s-bg-black s-w-full sm:s-pt-[108px] s-pt-16">
    <div class="s-w-full s-max-w-[1366px] s-mx-auto">
      <div class="s-flex s-flex-wrap s-justify-between md-s:s-px-8">
        <div class="s-w-full s-max-w-[332px] s-mr-auto s-mb-12">
          <img
            src="~/assets/images/logo-white.svg"
            alt="spleet logo"
            class="s-max-w-full s-w-[134px] s-h-auto s-mb-9"
          />
          <p class="s-text-sm s-text-white">
            Spleet's mission is building a future where everyone gets a fair
            chance at efficient and affordable living spaces.
          </p>
        </div>
        <div class="s-flex s-justify-between s-flex-wrap s-w-full s-max-w-3xl">
          <div class="xs:s-w-auto s-w-full s-mb-7 xs:s-mb-0">
            <h3 class="s-text-sm s-font-bold s-uppercase s-text-white s-mb-5">
              Why Spleet
            </h3>
            <nuxt-link
              to="/marketplace"
              class="s-text-sm s-block s-text-white hover:s-text-[#3ddc97] s-mb-6"
            >
              Find Your Home
            </nuxt-link>
            <nuxt-link
              to="/host"
              class="s-text-sm s-block s-text-white hover:s-text-[#3ddc97] s-mb-6"
            >
              List your Space
            </nuxt-link>
            <nuxt-link
              to="#"
              class="s-text-sm s-block s-text-white hover:s-text-[#3ddc97] s-mb-6"
            >
              Rent Now Pay Later
            </nuxt-link>
            <!-- <nuxt-link
              to="/host"
              class="s-text-sm s-block s-text-white hover:s-text-[#3ddc97] s-mb-6"
            >
              All Bills Inclusive
            </nuxt-link> -->
          </div>
          <div class="xs:s-w-auto s-w-full s-mb-7 xs:s-mb-0">
            <h3 class="s-text-sm s-font-bold s-uppercase s-text-white s-mb-5">
              Company
            </h3>
            <nuxt-link
              to="/about"
              class="s-text-sm s-block s-text-white hover:s-text-[#3ddc97] s-mb-6"
            >
              About
            </nuxt-link>
            <nuxt-link
              to="/faq"
              class="s-text-sm s-block s-text-white hover:s-text-[#3ddc97] s-mb-6"
            >
              FAQ
            </nuxt-link>
            <nuxt-link
              to="/career"
              class="s-text-sm s-block s-text-white hover:s-text-[#3ddc97] s-mb-6"
            >
              Careers
            </nuxt-link>
            <a
              href="mailto:info@spleet.africa"
              class="s-text-sm s-block s-text-white hover:s-text-[#3ddc97] s-mb-6"
            >
              Support
            </a>
          </div>
          <div class="xs:s-w-auto s-w-full s-mb-7 xs:s-mb-0">
            <h3 class="s-text-sm s-font-bold s-uppercase s-text-white s-mb-5">
              Get in touch
            </h3>
            <a
              href="mailto:info@spleet.africa"
              class="s-text-sm s-block s-text-white hover:s-text-[#3ddc97] s-mb-6"
              >Info@spleet.africa</a
            >
            <a
              href="tel:+234 (0) 812 252 8187"
              class="s-text-sm s-block s-text-white hover:s-text-[#3ddc97] s-mb-6"
              >+234 (0) 812 252 8187</a
            >
          </div>
        </div>
      </div>
      <hr class="s-w-full s-border-[#242424]" />
      <div class="s-pt-7 md-s:s-px-8 s-flex s-flex-wrap">
        <p class="s-text-sm s-block s-text-white s-mb-9 s-mr-20">
          &copy; Spleet Inc, {{ new Date().getFullYear() }}
        </p>
        <nuxt-link
          to="/terms-privacy"
          class="s-text-sm s-block s-text-white hover:s-text-[#3ddc97] s-mb-9 s-mr-14"
        >
          Terms of Service
        </nuxt-link>
        <nuxt-link
          to="/terms-privacy"
          class="s-text-sm s-block s-text-white hover:s-text-[#3ddc97] s-mb-9"
        >
          Privacy Policy
        </nuxt-link>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'WebsiteFooter',
}
</script>

<style></style>
