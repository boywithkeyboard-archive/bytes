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

const KB = 1000
, MB = KB * 1000
, GB = MB * 1000
, TB = GB * 1000
, PB = TB * 1000
, EB = PB * 1000
, ZB = EB * 1000
, YB = ZB * 1000
, KiB = 1024
, MiB = KiB * 1024
, GiB = MiB * 1024
, TiB = GiB * 1024
, PiB = TiB * 1024
, EiB = PiB * 1024
, ZiB = EiB * 1024
, YiB = ZiB * 1024

const UNITS: readonly [string, string, number][] = [
  ['B', 'Byte', 1],

  ['KB', 'Kilobyte', KB],
  ['MB', 'Megabyte', MB],
  ['GB', 'Gigabyte', GB],
  ['TB', 'Terabyte', TB],
  ['PB', 'Petabyte', PB],
  ['EB', 'Exabyte', EB],
  ['ZB', 'Zettabyte', ZB],
  ['YB', 'Yottabyte', YB],

  ['KiB', 'Kibibyte', KiB],
  ['MiB', 'Mebibyte', MiB],
  ['GiB', 'Gibibyte', GiB],
  ['TiB', 'Tebibyte', TiB],
  ['PiB', 'Pebibyte', PiB],
  ['EiB', 'Exbibyte', EiB],
  ['ZiB', 'Zebibyte', ZiB],
  ['YiB', 'Yobibyte', YiB]
]

export const INPUT_PATTERN = /^[1-9][0-9]* (B|KB|MB|GB|TB|PB|EB|ZB|YT|KiB|MiB|GiB|TiB|PiB|EiB|ZiB|YiB|(Byte|Kilobyte|Megabyte|Gigabyte|Terabyte|Petabyte|Exabyte|Zettabyte|Yottabyte|Kibibyte|Mebibyte|Gibibyte|Tebibyte|Pebibyte|Exbibyte|Zebibyte|Yobibyte)s?)$/

/**
 * Convert bytes to readable size and vice versa.
 */
export function bytes(
  value: number,
  options?: {
    long?: boolean
    format?: 'string'
    prefix?: 'metric' | 'binary'
  }
): `${number} ${Unit}`

export function bytes(
  value: number,
  options?: {
    long?: boolean
    format?: 'array'
    prefix?: 'metric' | 'binary'
  }
): [number, Unit]

export function bytes(value: `${number} ${Unit}`): number

export function bytes(
  value: `${number} ${Unit}` | number,
  options?: {
    long?: boolean
    format?: 'string' | 'array'
    prefix?: 'metric' | 'binary'
  }
): `${number} ${Unit}` | [number, Unit] | number {
  const long = options?.long ?? false
  , array = options?.format === 'array'
  , binary = options?.prefix === 'binary'

  if (typeof value === 'number') {
    const stringifiedSize: string = value.toString()
    
    , length = stringifiedSize.length
    
    , round = (
      number: number,
      decimalPlaces: number
    ) =>
      Number(
        Math.round(
          Number(number + 'e' + decimalPlaces),
        ) + 'e' + -decimalPlaces,
      )

    , b = (
      divisor: number,
      longName: Unit,
      shortName: Unit
    ): `${number} ${Unit}` | [number, Unit] => {
      const roundedValue = round(value / divisor, 2)
        
      , name = (long
          ? `${longName}${roundedValue > 1 ? 's' : ''}`
          : shortName) as Unit

      return array
        ? [roundedValue, name]
        : `${roundedValue} ${name}`
    }

    return length >= 4 && length < 7
      ? (
        binary ? b(KiB, 'Kibibyte', 'KiB') : b(KB, 'Kilobyte', 'KB')
      )
      : length >= 7 && length < 10
      ? (
        binary ? b(MiB, 'Mebibyte', 'MiB') : b(MB, 'Megabyte', 'MB')
      )
      : length >= 10 && length < 13
      ? (
        binary ? b(GiB, 'Gibibyte', 'GiB') : b(GB, 'Gigabyte', 'GB')
      )
      : length >= 13 && length < 16
      ? (
        binary ? b(TiB, 'Tebibyte', 'TiB') : b(TB, 'Terabyte', 'TB')
      )
      : length >= 16 && length < 19
      ? (
        binary ? b(PiB, 'Pebibyte', 'PiB') : b(PB, 'Petabyte', 'PB')
      )
      : length >= 19 && length < 22
      ? (
        binary ? b(EiB, 'Exbibyte', 'EiB') : b(EB, 'Exabyte', 'EB')
      )
      : length >= 22 && length < 25
      ? (
        binary ? b(ZiB, 'Zebibyte', 'ZiB') : b(ZB, 'Zettabyte', 'ZB')
      )
      : length >= 25
      ? (
        binary ? b(YiB, 'Yobibyte', 'YiB') : b(YB, 'Yottabyte', 'YB')
      )
      : b(1, 'Byte', 'B')
  } else {
    if (!INPUT_PATTERN.test(value))
      throw new Error('Please enter a valid string value, e.g. "25 Kilobytes"!')

    const arr = value.split(' ')

    if (arr.length !== 2)
      return -1

    if (arr[1].endsWith('s'))
      arr[1] = arr[1].slice(0, -1)

    const length = UNITS.length

    let i = 0
    , b = -1

    while (i < length) {
      if (arr[1] === UNITS[i][0] || arr[1] === UNITS[i][1])
        b = parseInt(arr[0]) * UNITS[i][2]

      i++
    }

    return b
  }
}
