<template>
  <div class="s-relative s-h-screen">
    <WebsiteAuthNavbar />
    <SuccessModal :data="data" />
  </div>
</template>

<script>
export default {
  computed: {
    data() {
      return {
        title: 'Verify Your Email Address',
        subTitle:
          'We’ve sent a verification link to your email. Please click the link to continue.',
        link: 'index',
        linkText: 'Back to Homepage',
      }
    },
  },
}
</script>

<style></style>
