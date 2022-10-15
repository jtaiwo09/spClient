<template>
  <div>
    <slot />
    <div class="s-px-2.5">
      <p class="s-uppercase s-font-bold s-text-xs s-text-[#242428] s-mb-5">
        Choose Your Payment Option
      </p>
      <flutterwave-pay-button
        ref="flutterwave"
        :tx_ref="generateReference()"
        :amount="totalAmountRenew"
        :currency="currency"
        :country="currency === 'GHS' ? 'GH' : 'NG'"
        payment_options="card,ussd,banktransfer"
        redirect_url=""
        class="s-hidden"
        style=""
        :meta="meta"
        :customer="user"
        :customizations="customizeFlutter"
        :callback="renewWithFlutterwave"
        :onclose="closedPaymentModal"
      >
        Click To Pay
      </flutterwave-pay-button>
      <div v-if="hasCard" class="s-mb-4">
        <input
          id="card"
          v-model="selectedPaymentOption"
          type="radio"
          value="card"
        />
        <label for="card" class="s-ml-2">
          <img
            src="@/assets/images/card.svg"
            alt="card"
            class="s-inline-block s-cursor-pointer"
          />
        </label>
      </div>
      <div class="s-mb-4">
        <input
          id="flutterwave"
          v-model="selectedPaymentOption"
          type="radio"
          value="flutterwave"
        />
        <label for="flutterwave" class="s-ml-2">
          <img
            src="@/assets/images/flutterwave.svg"
            alt="flutterwave"
            class="s-inline-block s-cursor-pointer"
          />
        </label>
      </div>
      <div v-if="currency === 'NGN'">
        <input
          id="paystack"
          v-model="selectedPaymentOption"
          type="radio"
          value="paystack"
        />
        <label for="paystack" class="s-ml-3.5">
          <img
            src="@/assets/images/paystack.svg"
            alt="paystack"
            class="s-inline-block s-cursor-pointer"
          />
        </label>
      </div>
      <Button
        text="Pay & Submit"
        :loading="loading"
        class="s-bg-primary-blue s-min-w-[10.625rem] s-mt-[2.25rem]"
        @submit="payForSubscription"
      />
    </div>
  </div>
</template>

<script>
export default {
  props: {
    totalAmountRenew: {
      type: Number,
      required: true,
    },
    user: {
      type: Object || undefined,
      required: true,
    },
    customizeFlutter: {
      type: Object || undefined,
      default: () => {},
    },
    renewWithFlutterwave: { type: Function, default: () => {} },
    closedPaymentModal: { type: Function, default: () => {} },
    renewWithPaystack: { type: Function, default: () => {} },
    renewWithCard: { type: Function, default: () => {} },
    selectedSubscription: {
      type: Object || null,
      required: true,
    },
    meta: {
      type: Object || null,
      default: () => {},
    },
    currency: {
      type: String || '',
      required: true,
    },
    loading: {
      type: Boolean,
      default: false,
    },
    hasCard: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      selectedPaymentOption: '',
    }
  },
  methods: {
    generateReference() {
      const date = new Date()
      return date.getTime().toString()
    },
    payForSubscription() {
      if (this.selectedPaymentOption) {
        switch (this.selectedPaymentOption) {
          case 'flutterwave': {
            this.$refs.flutterwave.$el.click()
            break
          }
          case 'paystack': {
            this.renewWithPaystack()
            break
          }
          case 'card': {
            this.renewWithCard(this.selectedSubscription.id)
            break
          }
        }
      }
    },
  },
}
</script>

<style></style>
