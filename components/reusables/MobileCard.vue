<template>
  <div
    class="s-bg-white s-rounded-xl s-border s-border-solid s-border-[#EDEDED] s-min-h-[292px] s-p-[1.625rem] s-mt-3"
  >
    <div class="s-flex s-justify-between s-mb-5">
      <div>
        <h2 class="s-text-base s-text-primary s-font-bold s-mb-2">
          {{ data.space_name }}
        </h2>
        <p class="s-font-normal s-text-sm s-text-[#5C5A77]">
          {{ data.space_type | capitalize }}
        </p>
      </div>
      <div class="">
        <slot />
      </div>
    </div>
    <div class="s-flex s-max-w-[400px] s-mb-5">
      <div class="s-min-w-[80px] s-mr-9">
        <h2
          class="s-text-xs s-leading-6 s-mb-1 s-text-primary s-font-semibold s-uppercase"
        >
          Sub Plan
        </h2>
        <p class="s-font-normal s-text-sm s-text-[#5C5A77]">
          {{ data.sub_plan | capitalize }}
        </p>
      </div>
      <div class="">
        <h2
          class="s-text-xs s-text-primary s-font-semibold s-uppercase s-leading-6 s-mb-1"
        >
          Sub Cost
        </h2>
        <p
          class="s-font-normal s-text-sm s-text-[#5C5A77]"
          v-html="getCurrentAmount"
        ></p>
      </div>
    </div>
    <div>
      <div>
        <h2
          class="s-uppercase s-leading-6 s-mb-1 s-text-xs s-text-primary s-font-semibold"
        >
          Booking Date
        </h2>
        <div class="s-flex s-justify-between">
          <div class="s-flex s-items-center">
            <CalendarIcon />
            <p
              class="s-text-sm s-text-[#5C5A74] s-font-normal s-ml-2.5 s-leading-6"
              v-html="formatDate(data.created_at)"
            >
            </p>
          </div>
          <StatusBadge :text="data.status" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {
  formatReadbleDate,
  formatCurrencyAmount,
  sumBookingPrice,
} from '../../helpers/utils'
export default {
  props: {
    data: {
      type: Object,
      default: () => {},
    },
  },
  computed: {
    getCurrentAmount() {
      if (this.data.price) {
        return formatCurrencyAmount(
          +this.data.price.service_charge +
            +this.data.price.amount +
            +this.data.price.withholdingTax +
            +this.data.price.computed_commission +
            +this.data.price.vat -
            +this.data.price.discount,
          this.data.price.currency
        )
      }
      return sumBookingPrice(this.data.price_template)
    },
  },
  methods: {
    formatDate(date) {
      return formatReadbleDate(date)
    },
    formatCurrency(amount, currency) {
      return formatCurrencyAmount(amount, currency)
    },
  },
}
</script>

<style></style>
