<template>
  <div>
    <HeroHeader />
    <DesignLiving />
    <Products />
    <WhySpleet />
    <Listings />
    <Testimonials />
    <FAQ />
  </div>
</template>

<script>
import { mapActions, mapMutations } from 'vuex'
export default {
  layout: 'website',
  head() {
    return {
      title: 'Easier living solutions in Africa',
      meta: [
        {
          name: 'description',
          content:
            'At spleet, we offer access to premium residential solutions, with options of daily, monthly and quarterly subscriptions. We’re simply a living subscription platform.',
        },
        {
          property: 'og:description',
          content:
            'At spleet, we offer access to premium residential solutions, with options of daily, monthly and quarterly subscriptions. We’re simply a living subscription platform.',
        },
        {
          property: 'og:title',
          content: 'Spleet | Easier living solutions in Africa',
        },
        {
          property: 'og:image',
          content:
            'https://res.cloudinary.com/spleetng/image/upload/v1605706261/thumbnail.png',
          itemprop: 'image',
        },
        {
          name: 'twitter:title',
          content: 'Spleet | Easier living solutions in Africa',
        },
        {
          name: 'twitter:description',
          content:
            'At spleet, we offer access to premium residential solutions, with options of daily, monthly and quarterly subscriptions. We’re simply a living subscription platform.',
        },
        {
          name: 'twitter:image',
          content:
            'https://res.cloudinary.com/spleetng/image/upload/v1605706261/thumbnail.png',
        },

        {
          property: 'og:url',
          content: 'https://www.spleet.africa/',
        },
      ],
    }
  },
  mounted() {
    const user = this.$cookies.get('user')
    if (user) {
      this.getUser()
    }
  },
  destroyed() {
    this.PRODUCT_IN_VIEW(false)
    this.TESTIMONY_IN_VIEW(false)
  },
  methods: {
    ...mapActions('user', ['getUser']),
    ...mapMutations('website', ['PRODUCT_IN_VIEW', 'TESTIMONY_IN_VIEW']),
  },
}
</script>

<style></style>
