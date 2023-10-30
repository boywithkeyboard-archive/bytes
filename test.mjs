import { strictEqual } from 'node:assert'
import { test } from 'node:test'
import { bytes } from './dist/index.mjs'

test('bytes to readable size', () => {
  strictEqual(bytes(100), '100 B')
  strictEqual(bytes(25000), '25 KB')
  strictEqual(bytes(50000000), '50 MB')
  strictEqual(bytes(1000000000000), '1 TB')

  strictEqual(bytes(25 * 1024, { prefix: 'binary' }), '25 KiB')
  strictEqual(bytes(50 * 1024 * 1024, { prefix: 'binary' }), '50 MiB')
  strictEqual(bytes(1 * 1024 * 1024 * 1024 * 1024, { prefix: 'binary' }), '1 TiB')

  strictEqual(bytes(25 * 1024, { long: true, prefix: 'binary' }), '25 Kibibytes')
  strictEqual(bytes(50 * 1024 * 1024, { long: true, prefix: 'binary' }), '50 Mebibytes')
  strictEqual(bytes(1 * 1024 * 1024 * 1024 * 1024, { long: true, prefix: 'binary' }), '1 Tebibyte')
})

test('readable size to bytes', () => {
  strictEqual(bytes('100 B'), 100)
  strictEqual(bytes('25 KB'), 25000)
  strictEqual(bytes('50 MB'), 50000000)
  strictEqual(bytes('1 TB'), 1000000000000)

  strictEqual(bytes('25 KiB'), 25 * 1024)
  strictEqual(bytes('50 MiB'), 50 * 1024 * 1024)
  strictEqual(bytes('1 TiB'), 1 * 1024 * 1024 * 1024 * 1024)

  strictEqual(bytes('100 Bytes'), 100)
  strictEqual(bytes('25 Kilobytes'), 25000)
  strictEqual(bytes('50 Megabytes'), 50000000)
  strictEqual(bytes('1 Terabyte'), 1000000000000)

  strictEqual(bytes('25 Kibibytes'), 25 * 1024)
  strictEqual(bytes('50 Mebibytes'), 50 * 1024 * 1024)
  strictEqual(bytes('1 Tebibyte'), 1 * 1024 * 1024 * 1024 * 1024)
})
