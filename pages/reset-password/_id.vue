<template>
  <div class="s-h-screen s-w-full">
    <WebsiteAuthNavbar />
    <SuccessModal
      v-if="success"
      :show-link="false"
      show-button
      icon="PasswordIcon"
      :data="data"
    />
    <div
      v-else
      class="s-max-w-[29.188rem] s-min-h-[27.438rem] sm:s-rounded-xl sm:s-border sm:s-border-[#B1B7D6] sm:s-border-solid s-mx-auto s-mt-8 s-px-[1.875rem] s-pt-10 s-pb-[2.188rem]"
    >
      <div
        class="sm:s-border-b sm:s-border-[#b1b7d6]/[0.19] sm:s-border-solid sm:s-pb-8 s-mb-8"
      >
        <h2 class="title s-text-center">Reset your password</h2>
        <p class="sub-title s-max-w-[17.625rem] s-text-center s-mx-auto">
          Please enter your new password. Remember to make it memorable but
          secure
        </p>
      </div>
      <div class="sm:s-px-5">
        <TextField
          :class="'!s-mb-4'"
          label="Password"
          placeholder="Enter your new password"
          type="password"
          icon="LockIcon"
          :error="error && error.password"
          name="password"
          :validation-msg="validationMsg($v.password)"
          :model-value="password"
          @update:modelValue="(value) => (password = value)"
        />
        <password v-model="password" :strength-meter-only="true" />

        <div
          class="s-py-3 s-px-4 s-rounded-[0.25rem] s-mb-12 s-text-xs s-bg-[#2e48da]/[0.04]"
        >
          <span
            class="s-mb-4 s-text-xs s-text-[#5C5A77] s-leading-[1.438rem] s-block"
          >
            Make sure your password has at least:
          </span>
          <ul>
            <li
              v-for="(item, index) in passwordInstructions"
              :key="index"
              class="s-text-xs s-text-[#5C5A77] s-leading-[1.438rem]"
            >
              • {{ item }}
            </li>
          </ul>
        </div>
        <Button
          text="Reset Password"
          :loading="loading"
          type="button"
          :class="'s-bg-primary-blue s-w-full'"
          @submit="submit"
        />
        <NuxtLink
          class="s-flex s-items-center s-mt-7 s-max-w-fit s-mx-auto"
          :to="{ name: 'login' }"
        >
          <div
            class="s-w-[1.188rem] s-h-[1.188rem] s-flex s-items-center s-mr-2.5 s-justify-center s-rounded-full s-border s-border-solid s-border-[#5C5A77]"
          >
            <CollapseIcon :fill="'none'" />
          </div>
          <p class="sub-title">Back to log in</p>
        </NuxtLink>
      </div>
    </div>
  </div>
</template>

<script>
import { required, helpers } from 'vuelidate/lib/validators'
import Password from 'vue-password-strength-meter'
import { mapActions } from 'vuex'
import { validationMessage } from 'vuelidate-messages'

const formMessages = {
  passwordRequired: () => 'Password is required',
  passwordCheck: () => 'Password does not match as required below',
}

const passwordCheck = helpers.regex(
  'password',
  /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/
)

export default {
  components: {
    Password,
  },
  data() {
    return {
      token: this.$route.params.id,
      password: '',
      error: null,
      loading: false,
      success: false,
    }
  },

  validations: {
    password: {
      passwordRequired: required,
      passwordCheck,
    },
  },
  computed: {
    data() {
      return {
        title: 'Yaay! You have a new password',
        subTitle:
          'Let’s be sure you remember it. Click the button below to sign into your account.',
        link: 'index',
        linkText: 'Back to Homepage',
        btnLink: 'login',
        btnText: 'Sign in',
      }
    },
    passwordInstructions() {
      return [
        'One number',
        'One special character',
        '8 characters minimum',
        'One uppercase character',
      ]
    },
  },
  methods: {
    ...mapActions('auth', ['resetPassword']),
    validationMsg: validationMessage(formMessages),
    async submit() {
      this.$v.$touch()
      if (this.$v.$invalid) {
        this.error = this.$v
      } else {
        this.loading = true
        try {
          const response = await this.resetPassword({
            token: this.token,
            password: this.password,
          })
          this.loading = false
          if (response.statusCode === 200) {
            this.success = true
          }
        } catch (error) {
          this.loading = false
          if (error.response.status === 400) {
            this.password = ''
          }
          this.$errorHandler(error)
        }
      }
    },
  },
}
</script>

<style></style>
