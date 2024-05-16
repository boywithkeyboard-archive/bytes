export type Unit =
  | 'B'
  | 'Byte'
  | 'Bytes'
  | 'KB'
  | 'Kilobyte'
  | 'Kilobytes'
  | 'MB'
  | 'Megabyte'
  | 'Megabytes'
  | 'GB'
  | 'Gigabyte'
  | 'Gigabytes'
  | 'TB'
  | 'Terabyte'
  | 'Terabytes'
  | 'PB'
  | 'Petabyte'
  | 'Petabytes'
  | 'EB'
  | 'Exabyte'
  | 'Exabytes'
  | 'ZB'
  | 'Zettabyte'
  | 'Zettabytes'
  | 'YB'
  | 'Yottabyte'
  | 'Yottabytes'
  | 'KiB'
  | 'Kibibyte'
  | 'Kibibytes'
  | 'MiB'
  | 'Mebibyte'
  | 'Mebibytes'
  | 'GiB'
  | 'Gibibyte'
  | 'Gibibytes'
  | 'TiB'
  | 'Tebibyte'
  | 'Tebibytes'
  | 'PiB'
  | 'Pebibyte'
  | 'Pebibytes'
  | 'EiB'
  | 'Exbibyte'
  | 'Exbibytes'
  | 'ZiB'
  | 'Zebibyte'
  | 'Zebibytes'
  | 'YiB'
  | 'Yobibyte'
  | 'Yobibytes'

const METRIC: Readonly<[string, string][]> = [
  ['KB', 'Kilobyte'],
  ['MB', 'Megabyte'],
  ['GB', 'Gigabyte'],
  ['TB', 'Terabyte'],
  ['PB', 'Petabyte'],
  ['EB', 'Exabyte'],
  ['ZB', 'Zettabyte'],
  ['YB', 'Yottabyte']
]

const BINARY: Readonly<[string, string][]> = [
  ['KiB', 'Kibibyte'],
  ['MiB', 'Mebibyte'],
  ['GiB', 'Gibibyte'],
  ['TiB', 'Tebibyte'],
  ['PiB', 'Pebibyte'],
  ['EiB', 'Exbibyte'],
  ['ZiB', 'Zebibyte'],
  ['YiB', 'Yobibyte']
]

/**
 * Convert bytes to readable size and vice versa.
 */
export function bytes(
  value: number,
  options?: {
    fmt?: 'long' | 'short'
    unit?: 'metric' | 'binary'
  }
): `${number} ${Unit}`

export function bytes(value: `${number} ${Unit}`): number

export function bytes(
  val: `${number} ${Unit}` | number,
  opt: {
    fmt?: 'long' | 'short'
    unit?: 'metric' | 'binary'
  } = {}
): `${number} ${Unit}` | number {
  if (typeof val === 'string') {
    const arr = val.split(' ')

    if (arr.length !== 2)
      throw Error()

    if (arr[1].endsWith('s'))
      arr[1] = arr[1].slice(0, -1)

    if (arr[1] === 'B' || arr[1] === 'Byte')
      return parseInt(arr[0])

    for (let i = 0; i < BINARY.length; i++)
      if (arr[1] === BINARY[i][0] || arr[1] === BINARY[i][1])
        return parseInt(arr[0]) * 1024 ** (i + 1)

    for (let i = 0; i < METRIC.length; i++)
      if (arr[1] === METRIC[i][0] || arr[1] === METRIC[i][1])
        return parseInt(arr[0]) * 1000 ** (i + 1)

    throw Error()
  }

  let div = 1000
  , units = METRIC

  if (opt.unit === 'binary') {
    div = 1024
    units = BINARY
  }

  if (val < div) {
    const unit = opt.fmt === 'long' ? 'Byte' : 'B'

    return val + ' ' + unit as `${number} ${Unit}`
  }

  let i = 0
  , rest = val

  while (rest >= div && i < 8) {
    rest = val / (div ** (i + 1))

    i++
  }

  let unit

  if (opt.fmt === 'long') {
    unit = units[i - 1][1]

    if (rest > 1)
      unit += 's'
  } else {
    unit = units[i - 1][0]
  }

  rest = Number(
    Math.round(
      Number(rest + 'e' + 2)
    ) + 'e' + -2
  )

  return rest + ' ' + unit as `${number} ${Unit}`
}
