<template>
  <div>
    <div
      class="s-bg-black s-w-full md:s-px-8 s-px-4 md-s:s-pt-6 s-pt-3 s-pb-16 lg:s-px-[4.75rem]"
    >
      <div class="s-max-w-[1440px] s-w-full s-mx-auto">
        <div class="s-mb-5">
          <h5
            class="s-uppercase md-s:s-text-sm s-text-xs s-mb-3.5 s-text-[#07A560] s-font-semibold s-text-left"
          >
            COMMON QUESTIONS
          </h5>
          <h2
            class="md-s:s-text-4xl s-text-2xl s-text-white s-font-bold s-w-full s-text-left s-mb-5"
          >
            Frequently Asked Questions
          </h2>
          <p class="s-text-white">
            Get quick answers to all your questions and concerns about Spleet
            and Spleet homes
          </p>
        </div>
        <!-- <div class="sm:s-flex sm:s-space-x-4 s-flex-wrap s-relative">
          <div
            class="s-bg-[#1F1F1F] s-border s-border-solid s-border-[#454545]/[0.3] s-rounded-xl s-flex-1 space__location"
          >
            <div class="s-flex s-items-center">
              <input
                ref="autocomplete"
                v-model="search"
                type="text"
                class="s-h-[74px] md-s:s-pl-5 s-pl-4 lg:s-pr-12 sm:s-pr-8 s-pr-4 s-py-3.5 s-bg-transparent focus:s-outline-none s-text-[#bbbbbb]/[0.8] md-s:s-text-base s-text-sm s-w-11/12 s-mr-2.5 s-h-fit"
                placeholder="Search for anything"
              />
              <div v-if="search" @click="clearSearch">
                <ClearIcon cancel-color="#BDBDBD" class="s-cursor-pointer" />
              </div>

              <Search
                v-else
                :width="24"
                :height="24"
                stroke="#BDBDBD"
                class="s-block"
              />
            </div>
          </div>
        </div> -->
        <div class="s-mt-5 s-flex s-flex-wrap s-gap-2 s-min-w-md">
          <a
            href="#"
            class="s-text-white s-font-semibold hover:s-bg-primary-blue s-py-2 s-px-5 s-rounded-[3px] s-block hover:s-text-white"
            :class="{ 's-bg-primary-blue': active === 'general' }"
            @click.prevent="activeTab('general')"
            >General</a
          >
          <a
            href="#"
            class="s-text-white s-font-semibold hover:s-bg-primary-blue s-py-2 s-px-5 s-rounded-[3px] s-block hover:s-text-white"
            :class="{ 's-bg-primary-blue': active === 'for Spleet members' }"
            @click.prevent="activeTab('for Spleet members')"
            >For Spleet Members</a
          >
          <a
            href="#"
            class="s-text-white s-font-semibold hover:s-bg-primary-blue s-py-2 s-px-5 s-rounded-[3px] s-block hover:s-text-white"
            :class="{
              's-bg-primary-blue': active === 'for Spleet home owners',
            }"
            @click.prevent="activeTab('for Spleet home owners')"
            >For Spleet Home Owners</a
          >
        </div>
      </div>
    </div>


    <div
      class="s-bg-[#F9FAFD] s-w-full md:s-px-8 s-px-4 md-s:s-pt-6 s-pt-3 s-pb-16 lg:s-px-[4.75rem]"
    >
      <div class="s-max-w-[1440px] s-w-full s-mx-auto">
        <Loading v-if="loader" />
        <div>
          <BaseAccordion v-for="faq in activeFAQs" :key="faq.id">
            <template #title="{ _class }">
              <span
                class="s-font-bold md-s:s-text-lg s-text-base s-text-left"
                :class="_class"
                >{{ faq.title }}?</span
              >
            </template>
            <template #content>
              <p class="s-text-sm s-text-[#4B4F63] s-mb-4">
                {{ faq.description }}
              </p>
            </template>
          </BaseAccordion>
        </div>
      </div>
    </div>
    
  </div>
</template>

<script>
import { mapGetters, mapState, mapActions } from 'vuex'
import Loading from '../components/Loading.vue'
export default {
  components: { Loading },
  layout: 'website',
  data() {
    return {
      search: null,
    }
  },
  computed: {
    ...mapState('website/faq', ['active', 'loader']),
    ...mapGetters('website/faq', ['activeFAQs']),
  },
  mounted() {
    this.getFAQs()
  },
  methods: {
    ...mapActions('website/faq', ['getFAQs', 'activeTab']),
  },
}
</script>

<style lang="scss" scoped></style>
