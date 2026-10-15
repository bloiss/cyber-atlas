// Génère src/types/*.ts à partir de schemas/*.schema.json.
// Ajouter une ressource reste une simple modification du JSON : ce script ne touche jamais aux données,
// seulement aux types TypeScript qui en décrivent la forme.
import { compile } from 'json-schema-to-typescript'
import { readFile, writeFile, mkdir, readdir } from 'node:fs/promises'
import path from 'node:path'

const root = path.resolve(import.meta.dirname, '..')
const schemasDir = path.join(root, 'schemas')
const outDir = path.join(root, 'src', 'types')

const pascal = (s) => s.replace(/(^|[-_])(\w)/g, (_, __, c) => c.toUpperCase())

await mkdir(outDir, { recursive: true })

const files = (await readdir(schemasDir)).filter((f) => f.endsWith('.schema.json'))

for (const file of files) {
  const base = file.replace('.schema.json', '')
  const schema = JSON.parse(await readFile(path.join(schemasDir, file), 'utf8'))
  const typeName = pascal(base)
  delete schema.title // sinon json-schema-to-typescript nomme le type d'après le titre humain du schéma
  const ts = await compile(schema, typeName, {
    bannerComment: `/* Généré à partir de schemas/${file} par \`npm run gen:types\`. Ne pas éditer à la main. */`,
    additionalProperties: false,
  })
  await writeFile(path.join(outDir, `${base}.ts`), ts)
  console.log(`src/types/${base}.ts ← ${file}`)
}
