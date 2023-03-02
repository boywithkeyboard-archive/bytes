## byte

```ts
import byte from 'https://deno.land/x/byte@v0.1.1/byte.ts'

/*
 * Convert bytes to a readable size.
 */

byte(100) // '100 B'
byte(25000) // '25 KB'
byte(50000000) // '50 MB'
byte(1000000000000) // '1 TB'

byte(100, { long: true }) // '100 Bytes'
byte(25000, { long: true }) // '25 Kilobytes'
byte(50000000, { long: true }) // '50 Megabytes'
byte(1000000000000, { long: true }) // '1 Terabyte'

byte(100, { format: 'array' }) // [100, 'B']
byte(25000, { format: 'array' }) // [25, 'KB']
byte(50000000, { long: true, format: 'array' }) // [50, 'Megabytes']
byte(1000000000000, { long: true, format: 'array' }) // [1, 'Terabyte']

// binary prefix

byte(25 * 1024, { prefix: 'binary' }) // '25 KiB'
byte(25 * 1024, { long: true, prefix: 'binary' }) // '25 Kibibytes'

/*
 * Convert a readable size to bytes.
 */

byte('100 B') // 100
byte('25 KB') // 25*1000
byte('50 MB') // 50*1000*1000
byte('1 TB') // 1000*1000*1000*1000

byte('100 Bytes') // 100
byte('25 Kilobytes') // 25*1000*1000
byte('50 Megabytes') // 50*1000*1000
byte('1 Terabyte') // 1000*1000*1000*1000

// binary prefix

byte('25 Kibibytes') // 25*1024
byte('50 Mebibytes') // 50*1024*1024
byte('1 Tebibyte') // 1*1024*1024*1024
```

### Configuration

- **long**
- **format** - `string` | `array`
- **prefix** - `binary` | `metric`
