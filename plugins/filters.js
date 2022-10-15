import Vue from 'vue'
import { format, parse, formatDistanceToNow } from 'date-fns'

const formatDateTime = (dateValue, type) => {
  if (!dateValue) {
    return 'N/A'
  }
  type = type || 'MMM dd, yyyy hh:mm a'
  if (new Date(dateValue) !== 'Invalid Date' && !isNaN(new Date(dateValue))) {
    return format(new Date(dateValue), type)
  } else {
    return 'N/A'
  }
}

const formatTime = (dateValue, type) => {
  if (!dateValue) {
    return 'N/A'
  }
  type = type || 'hh:mm a'
  // return timeZone.tz(dateValue, "h:mm:ss A", "UTC").format(format);
  if (new Date(dateValue) !== 'Invalid Date' && !isNaN(new Date(dateValue))) {
    return format(new Date(dateValue), type)
  } else {
    return 'N/A'
  }
}

const formatTimeHour = (dateValue, type) => {
  if (!dateValue) {
    return 'N/A'
  }
  type = type || 'hh:mm a'
  return format(parse(dateValue, 'HH:mm:ss', new Date()), type)
}

const formatDate = (dateValue, type) => {
  if (!dateValue) {
    return 'N/A'
  }
  type = type || 'dd/MM/yyyy'
  if (new Date(dateValue) !== 'Invalid Date' && !isNaN(new Date(dateValue))) {
    return format(new Date(dateValue), type)
  } else {
    return 'N/A'
  }
}

const formatDaysAgo = (dateValue) => {
  if (new Date(dateValue) !== 'Invalid Date' && !isNaN(new Date(dateValue))) {
    return formatDistanceToNow(new Date(dateValue))
  } else {
    return ''
  }
}

const separateTime = (str) => {
  if (!str) {
    return 'N/A'
  } else {
    return str.split(':')
  }
}
const humanize = (str) => {
  if (str.includes('_')) {
    const frags = str.split('_')
    for (let i = 0; i < frags.length; i++) {
      frags[i] = frags[i].charAt(0).toUpperCase() + frags[i].slice(1)
    }
    return frags.join(' ')
  } else {
    return str.charAt(0).toUpperCase() + str.slice(1)
  }
}

const initials = (str) => {
  const frags = str.split(' ')
  return frags[0][0] + (frags[1] ? frags[1][0] : frags[0][1])
}

const hashCode = (str) => {
  let hash = 0
  for (let i = 0; i < str.length; i++) {
    hash = str.charCodeAt(i) + ((hash << 5) - hash)
  }
  return hash
}

const strToRGB = (str) => {
  const i = hashCode(str)
  const c = (i & 0x00ffffff).toString(16).toUpperCase()

  return '00000'.substring(0, 6 - c.length) + c
}

const truncate = (text, length, clamp) => {
  clamp = clamp || '...'
  const node = document.createElement('div')
  node.innerHTML = text
  const content = node.textContent
  return content.length > length ? content.slice(0, length) + clamp : content
}

const capitalize = (value) => {
  if (!value) {
    return ''
  }
  value = value.toString()
  return value.charAt(0).toUpperCase() + value.slice(1)
}

const currency = (value) => {
  if (!value) {
    return 'N/A'
  }
  return new Intl.NumberFormat().format(value)
}

const age = (value) => {
  if (!value) {
    return ''
  }
  const ageDifMs = Date.now() - new Date(value)
  const ageDate = new Date(ageDifMs)
  return Math.abs(ageDate.getUTCFullYear() - 1970)
}

const secondsToTime = (value) => {
  if (!value) {
    return '0'
  }
  const m = Math.floor((Number(value) % 3600) / 60)
    .toString()
    .padStart(2, '0')
  const s = Math.floor(Number(value) % 60)
    .toString()
    .padStart(2, '0')

  return m + ':' + s
}

Vue.filter('humanize', humanize)
Vue.filter('initials', initials)
Vue.filter('initials', initials)
Vue.filter('hashCode', hashCode)
Vue.filter('strToRGB', strToRGB)
Vue.filter('formatDateTime', formatDateTime)
Vue.filter('formatTime', formatTime)
Vue.filter('formatTimeHour', formatTimeHour)
Vue.filter('formatDaysAgo', formatDaysAgo)
Vue.filter('truncate', truncate)
Vue.filter('capitalize', capitalize)
Vue.filter('currency', currency)
Vue.filter('age', age)
Vue.filter('separateTime', separateTime)
Vue.filter('formatDate', formatDate)
Vue.filter('secondsToTime', secondsToTime)
