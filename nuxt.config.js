export default {
  // Disable server-side rendering: https://go.nuxtjs.dev/ssr-mode
  ssr: false,
  server: {
    host: process.env.NUXT_HOST,
    port: process.env.NUXT_PORT,
  },

  env: {
    baseNwURL: process.env.BASE_URL,
  },
  publicRuntimeConfig: {
    baseURL: process.env.BASE_URL,
    verifyCallBackURL: process.env.VERIFY_CALLBACKURL,
    cloudinaryUrl: process.env.CLOUDINARY_URL,
    cloudinaryPreset: process.env.CLOUDINARY_PRESET,
    googleClientId: process.env.GOOGLE_CLIENT_ID,
    domain: process.env.DOMAIN,
    paystackPublic: process.env.PAYSTACK_PUBLIC,
    flutterwavePublic: process.env.FLUTTERWAVE_PUBLIC,
    configureLogin: process.env.CONFIGURE_LOGIN,
    emailVerificationPage: process.env.EMAIL_VERIFICATION_PAGE,
    forgetPasswordPage: process.env.FORGET_PASSWORD_PAGE,
    welcomePage: process.env.WELCOME_PAGE,
    verifyCallbackUrl: process.env.VERIFY_CALLBACKURL,
    metaMapClientId: process.env.METAMAP_CLIENT_ID,
    metaMapFlowId: process.env.METAMAP_FLOW_ID,
    googleMapKey: process.env.GOOGLE_MAP_KEY,
  },
  privateRuntimeConfig: {},
  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    title: 'Spleet Africa',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { 
        hid: 'description', 
        name: 'description', 
        content: 'At spleet, we offer access to premium residential solutions, with options of daily, monthly and quarterly subscriptions. We’re simply a living subscription platform.'
      },
      { 
        hid: 'twitter:card', 
        name: 'twitter:card', 
        content: 'summary_large_image'
      },
      { 
        hid: 'twitter:site', 
        name: 'twitter:site', 
        content: 'http://spleet.africa/'
      },
      { 
        hid: 'twitter:title', 
        name: 'twitter:title', 
        content: 'Spleet Africa'
      },

      { 
        hid: 'twitter:description', 
        name: 'twitter:description', 
        content: 'At spleet, we offer access to premium residential solutions, with options of daily, monthly and quarterly subscriptions. We’re simply a living subscription platform.'
      },

      { 
        hid: 'twitter:image', 
        name: 'twitter:image', 
        content: 'https://new-dev.spleet.africa/_nuxt/img/logo-white.da7c507.svg'
      },

      ///

      { 
        hid: 'og:type', 
        property: 'og:type', 
        content: 'article'
      },


      { 
        hid: 'og:title', 
        property: 'og:title', 
        content: 'Spleet Africa'
      },


      { 
        hid: 'og:description', 
        property: 'og:description', 
        content: 'At spleet, we offer access to premium residential solutions, with options of daily, monthly and quarterly subscriptions. We’re simply a living subscription platform.'
      },


      { 
        hid: 'og:url', 
        property: 'og:url', 
        content: 'http://spleet.africa/'
      },

      { 
        hid: 'og:image', 
        property: 'og:image', 
        content: 'https://new-dev.spleet.africa/_nuxt/img/logo-white.da7c507.svg'
      },

      { name: 'format-detection', content: 'telephone=no' },
    ],
    link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }],
    script: [
      {
        src: `https://maps.googleapis.com/maps/api/js?key=${process.env.GOOGLE_MAP_KEY}&libraries=places`,
        body: true,
        defer: true,
        async: true,
      },
    ],
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: ['~/assets/styles/main.scss', '@/assets/styles/css/main.css'],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [
    '~/plugins/components.js',
    '~/plugins/configurations/axios.js',
    '~/plugins/functions/showToast.js',
    '~/plugins/functions/errorHandler.js',
    '~/plugins/filters.js',
  ],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: [
    '~/components',
    '~/components/icons',
    '~/components/icons/flag-icons',
    '~/components/icons/dashboard-icons',
    '~/components/form',
    '~/components/verify-tenant',
    '~/components/dashboard',
    '~/components/listing',
    '~/components/listing/step-one',
    '~/components/listing/step-two',
    '~/components/listing/step-three',
    '~/components/listing/dashboard',
    '~/components/verify',
    '~/components/reusables',
    '~/components/website',
    '~/components/settings',
    '~/components/website/landing-page',
    '~/components/website/about-us',
    '~/components/website/marketplace',
  ],

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    // https://go.nuxtjs.dev/eslint
    '@nuxtjs/eslint-module',
    // https://go.nuxtjs.dev/tailwindcss
    // '@nuxtjs/tailwindcss',
    '@nuxtjs/style-resources',
    '@nuxt/postcss8',

    '@hexdigital/nuxt-intercom'
  ],

  intercom: {
    appId: 'ahd2x6cy',
  },

  styleResources: {
    scss: ['~assets/styles/core/mixins.scss'],
  },

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    // https://go.nuxtjs.dev/axios
    '@nuxtjs/axios',
    // https://go.nuxtjs.dev/pwa
    '@nuxtjs/pwa',
    'vue-toastification/nuxt',
    'vue-web-cam/nuxt',
    ['cookie-universal-nuxt', { parseJSON: true }],
  ],

  toast: {
    timeout: 2000,
    closeOnClick: false,
  },

  // Axios module configuration: https://go.nuxtjs.dev/config-axios
  axios: {
    // Workaround to avoid enforcing hard-coded localhost:3000: https://github.com/nuxt-community/axios-module/issues/308
    baseURL: '/',
  },

  // PWA module configuration: https://go.nuxtjs.dev/pwa
  pwa: {
    manifest: {
      lang: 'en',
    },
  },

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {
    postcss: {
      plugins: {
        tailwindcss: {},
        autoprefixer: {},
      },
    },
  },
}
