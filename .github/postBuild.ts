import { createMinifier } from 'https://deno.land/x/dts_minify@0.3.2/mod.ts'
import { build, stop } from 'https://deno.land/x/esbuild@v0.17.18/mod.js'
import * as ts from 'https://esm.sh/typescript@5.0.4'

// solve default export for iife format

await Deno.writeTextFile(
  'byte.iife.js',
  (await Deno.readTextFile('byte.iife.js')).slice(0, -2) + '.default;\n',
)

// solve default export for commonjs format

await Deno.writeTextFile(
  './wrapper.cjs',
  `module.exports = require('./byte.cjs').default`,
)

await build({
  entryPoints: ['./wrapper.cjs'],
  minify: true,
  bundle: true,
  format: 'cjs',
  outfile: './byte.cjs',
  allowOverwrite: true,
})

await Deno.remove('./wrapper.cjs')

stop()

// minify type definitions

const minifier = createMinifier(ts)

await Deno.writeTextFile(
  'byte.d.ts',
  minifier.minify(await Deno.readTextFile('byte.d.ts'), { keepJsDocs: true }),
)
