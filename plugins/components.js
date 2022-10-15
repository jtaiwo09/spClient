/* eslint-disable vue/component-definition-name-casing */
import Vue from 'vue'
import Vuelidate from 'vuelidate'
import VCalendar from 'v-calendar'
import WebCam from 'vue-web-cam'
import VuePhoneNumberInput from 'vue-phone-number-input'
import 'vue-phone-number-input/dist/vue-phone-number-input.css'
import Flutterwave from 'flutterwave-vue-v3'
import Cleave from 'vue-cleave-component'
import InputFacade from 'vue-input-facade'
import PrettyInput from 'pretty-checkbox-vue/input'
import PrettyCheck from 'pretty-checkbox-vue/check'
import PrettyRadio from 'pretty-checkbox-vue/radio'
// import VueLazyLoad from 'vue-lazyload'
import VueTailwind from 'vue-tailwind'
import { TPagination } from 'vue-tailwind/dist/components'

Vue.component('p-input', PrettyInput)
Vue.component('p-check', PrettyCheck)
Vue.component('p-radio', PrettyRadio)

const settings = {
  't-pagination': {
    component: TPagination,
    props: {
      classes: {
        wrapper: 's-flex s-gap-x-2 s-mt-3 s-mx-auto sm:s-ml-0',
        element:
          's-min-w-[35px] s-min-h-[35px] s-bg-white s-transition s-duration-100 s-ease-in-out hover:s-bg-blue-100 s-rounded-lg',
        activeElement:
          's-w-[35px] s-h-[35px] s-border s-border-blue-500 s-table-cell hover:s-border-blue-600',
        disabledElement:
          's-w-[35px] s-h-[35px] s-border s-border-gray-200 s-table-cell',
        ellipsisElement: 's-hidden',
        activeButton:
          's-font-bold s-rounded-lg s-bg-primary-blue s-w-full s-h-full s-text-white hover:s-bg-blue-600 s-transition s-duration-100 s-ease-in-out focus:s-ring-2 focus:s-ring-blue-500 focus:s-outline-none focus:s-ring-opacity-50',
        disabledButton:
          's-opacity-25 s-w-full s-h-full s-cursor-not-allowed s-transition s-duration-100 s-ease-in-out',
        button:
          's-rounded-lg s-w-full s-h-full focus:s-outline-none s-px-4 s-font-bold s-text-[#707070]',
      },
    },
  },
}
Vue.use(VueTailwind, settings)

Vue.component('vue-phone-number-input', VuePhoneNumberInput)

Vue.use(Vuelidate)
Vue.use(WebCam)
Vue.use(Cleave)
Vue.use(VCalendar, {
  componentPrefix: 'v',
})
Vue.use(InputFacade)

Vue.use(Flutterwave, {
  publicKey: window.__NUXT__.config.flutterwavePublic,
})
// Vue.use(VueLazyLoad)
