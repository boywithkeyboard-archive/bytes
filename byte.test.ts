import { assertEquals } from 'https://deno.land/std@v0.178.0/testing/asserts.ts'
import byte from './byte.ts'

Deno.test('bytes to readable size', () => {
  assertEquals(byte(100), '100 B')
  assertEquals(byte(25000), '25 KB')
  assertEquals(byte(50000000), '50 MB')
  assertEquals(byte(1000000000000), '1 TB')

  assertEquals(byte(25 * 1024, { prefix: 'binary' }), '25 KiB')
  assertEquals(byte(50 * 1024 * 1024, { prefix: 'binary' }), '50 MiB')
  assertEquals(
    byte(1 * 1024 * 1024 * 1024 * 1024, { prefix: 'binary' }),
    '1 TiB',
  )

  assertEquals(
    byte(25 * 1024, { long: true, prefix: 'binary' }),
    '25 Kibibytes',
  )
  assertEquals(
    byte(50 * 1024 * 1024, { long: true, prefix: 'binary' }),
    '50 Mebibytes',
  )
  assertEquals(
    byte(1 * 1024 * 1024 * 1024 * 1024, { long: true, prefix: 'binary' }),
    '1 Tebibyte',
  )
})

Deno.test('readable size to bytes', () => {
  assertEquals(byte('100 B'), 100)
  assertEquals(byte('25 KB'), 25000)
  assertEquals(byte('50 MB'), 50000000)
  assertEquals(byte('1 TB'), 1000000000000)

  assertEquals(byte('25 KiB'), 25 * 1024)
  assertEquals(byte('50 MiB'), 50 * 1024 * 1024)
  assertEquals(byte('1 TiB'), 1 * 1024 * 1024 * 1024 * 1024)

  assertEquals(byte('100 Bytes'), 100)
  assertEquals(byte('25 Kilobytes'), 25000)
  assertEquals(byte('50 Megabytes'), 50000000)
  assertEquals(byte('1 Terabyte'), 1000000000000)

  assertEquals(byte('25 Kibibytes'), 25 * 1024)
  assertEquals(byte('50 Mebibytes'), 50 * 1024 * 1024)
  assertEquals(byte('1 Tebibyte'), 1 * 1024 * 1024 * 1024 * 1024)
})
