import Vue from 'vue'
import moment from 'moment'

Vue.filter('ddmmyyyy', function (value) {
  if (!value) return ''
  value = value.toString()
  return moment(value).format('DD-MM-YYYY')
})
Vue.filter('mm', function (value) {
  if (!value) return ''
  value = value.toString()
  return moment(value).format('MMMM')
})