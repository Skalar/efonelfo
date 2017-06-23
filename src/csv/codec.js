/* eslint-disable no-magic-numbers */
import iconv from 'iconv-lite'

const isNothing = value =>
  typeof value === 'undefined' || value === null || value === ''
const leftPad = str => String(`00${str}`).slice(-2)

const codecs = {
  String: {
    decode({value}) {
      return isNothing(value) ? undefined : value
      // return isNothing(value) ? undefined : iconv.decode(Buffer.from(value.toString()), 'utf-8').toString()
    },
    encode({value = '', limit = 100}) {
      return iconv
        .encode(value.toString(), 'iso-8859-1')
        .toString()
        .replace(/;/, '')
        .substr(0, limit)
    },
  },

  Number: {
    decode({value, decimals = undefined}) {
      if (isNothing(value)) return undefined
      return Number.isFinite(decimals)
        ? Number(value) * (1.0 / 10.0 ** Number(decimals))
        : Number(value)
    },
    encode({value = '', decimals}) {
      if (isNaN(value)) return ''
      return Number.isFinite(decimals)
        ? value / (1.0 / 10 ** Number(decimals))
        : value
    },
  },

  Date: {
    decode({value}) {
      const isDateStr = typeof value === 'string' && value.match(/^\d{8}$/)
      return isDateStr
        ? new Date(value.replace(/(\d{4})(\d{2})(\d{2})/g, '$1-$2-$3'))
        : undefined
    },
    encode({value}) {
      return value instanceof Date
        ? [
          value.getFullYear(),
          leftPad(value.getMonth() + 1),
          leftPad(value.getDate()),
        ].join('')
        : ''
    },
  },

  Boolean: {
    decode({value, defaultValue}) {
      if (isNothing(value)) return !!defaultValue
      return typeof value === 'string' ? value.toUpperCase() === 'J' : !!value
    },

    encode({value, defaultValue}) {
      if (isNothing(value)) {
        return defaultValue ? this.encode({value: defaultValue}) : ''
      }
      return value ? 'J' : 'N'
    },
  },
}

export const encode = ({
  value,
  type = 'String',
  decimals,
  limit,
  defaultValue,
}) => codecs[type].encode({value, type, decimals, limit, defaultValue})
export const decode = ({value, type = 'String', defaultValue, decimals}) =>
  codecs[type].decode({value, defaultValue, decimals})
