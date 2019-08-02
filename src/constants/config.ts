import { Dimensions } from 'react-native'

export const screenWidth = Dimensions.get('window').width

export const monthNames = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December'
]

export const weekDayNames = [
  'Monday',
  'Tuesday',
  'Wednesday',
  'Thursday',
  'Friday',
  'Saturday',
  'Sunday'
]

export const shortWeekDayNames = [
  'MON',
  'TUE',
  'WED',
  'THU',
  'FRI',
  'SAT',
  'SUN'
]

export const eventTypes = ['Event', 'Holiday', 'Birthday', 'Meeting']

export const msInDay = 86400000 // 1000 * 60 * 60 * 24

// TODO: variable names to uppercase
