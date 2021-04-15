import dayjs from 'dayjs'

export default function (date, format = 'MMM DD, YYYY') {
  return dayjs(date).format(format)
}
