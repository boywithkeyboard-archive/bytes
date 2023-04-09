Deno.writeTextFileSync(
  'byte.iife.js',
  Deno.readTextFileSync('byte.iife.js').slice(0, -2) + '.default;\n',
)
