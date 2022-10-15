/* eslint-disable no-unused-vars */
/* eslint-disable camelcase */
import * as numeral from 'numeral'
import * as currencysymbol from 'currency-symbol'
import { format } from 'date-fns'

export function sumBookingPriceWithoutCurrency(data) {
  if (!data) {
    return formatCurrencyAmount(0)
  }
  const rent = Number(data.rent) + Number(data.commission)
  const service_charge = Number(data.service_charge)
  const discount = Number(data.discount)
  const booking_fee = Number(data.booking_fee)
  const vat = Number(data.vat)
  const security_deposit = Number(data.security_deposit)
  const eviction_security_deposit = Number(data.eviction_security_deposit)
  return (
    +rent +
    +service_charge +
    +vat +
    +security_deposit +
    +eviction_security_deposit +
    +booking_fee -
    +discount
  )
}

export function formatAmount(amount) {
  return numeral(amount).format('0,0')
}
export function formatCurrencyAmount(amount, withCurrency) {
  return (
    currencysymbol.symbol(withCurrency === 'GHS' ? 'GHC' : 'NGN') +
    numeral(amount).format('0,0.00')
  )
}

export function sumBookingPrice(data, withCurrency) {
  if (!data) {
    return formatCurrencyAmount(0)
  }
  const rent = Number(data.rent) + Number(data.commission)
  const service_charge = Number(data.service_charge)
  const discount = Number(data.discount)
  const booking_fee = Number(data.booking_fee)
  const vat = Number(data.vat)
  const security_deposit = Number(data.security_deposit)
  const eviction_security_deposit = Number(data.eviction_security_deposit)
  return formatCurrencyAmount(
    +rent +
      +service_charge +
      +vat +
      +security_deposit +
      +eviction_security_deposit +
      +booking_fee -
      +discount,
    data.currency
  )
}

export function sumBookingPriceHost(data) {
  if (!data) {
    return formatCurrencyAmount(0)
  }
  const rent = Number(data.rent)
  const service_charge = Number(data.service_charge)
  const discount = Number(data.discount)
  const booking_fee = Number(data.booking_fee)
  const vat = Number(data.vat)
  const security_deposit = Number(data.security_deposit)
  const total = rent + service_charge - discount
  return formatCurrencyAmount(total, data.currency)
}

export function formatReadbleDate(date) {
  return format(new Date(date), 'MMM dd, yyyy')
}

export function formattedDate(date) {
  return format(new Date(date), 'yyyy-MM-dd')
}
