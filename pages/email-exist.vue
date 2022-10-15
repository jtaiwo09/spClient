<template>
  <div class="s-relative s-h-screen">
    <WebsiteAuthNavbar />
    <SuccessModal show-button :show-icon="false" :data="mailSentInfo" />
  </div>
</template>

<script>
export default {
  computed: {
    mailSentInfo() {
      return {
        title: 'You already have a Spleet account',
        subTitle:
          'We’ve sent a password reset link to your email incase you forgot your password.',
        subTitle2:
          'If you remember your password, just ignore it and click the button below.',
        link: 'index',
        linkText: 'Back to Homepgae',
        btnLink: 'login',
        btnText: 'Sign in',
      }
    },
  },
}
</script>

<style></style>
