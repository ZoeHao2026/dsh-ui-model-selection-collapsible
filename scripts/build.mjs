import { readFile, rm } from 'node:fs/promises'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

import { build } from 'esbuild'

const packageName = '@local/dsh-ui-model-selection-collapsible'
const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')
const outDir = path.join(root, 'lib')

await rm(outDir, { recursive: true, force: true })

const inlineCssPlugin = {
  name: 'dsh-inline-css',
  setup(builder) {
    builder.onLoad({ filter: /\.css$/ }, async ({ path: cssPath }) => {
      const css = await readFile(cssPath, 'utf8')
      const tagId = `${packageName}/${path.basename(cssPath)}`
      return {
        loader: 'js',
        contents: `
const tagId = ${JSON.stringify(tagId)};
if (typeof document !== 'undefined' && document.querySelector('style[data-plugin-css="' + tagId + '"]') === null) {
  const tag = document.createElement('style');
  tag.dataset.plugin = ${JSON.stringify(packageName)};
  tag.dataset.pluginCss = tagId;
  tag.textContent = ${JSON.stringify(css)};
  document.head.appendChild(tag);
}
`,
      }
    })
  },
}

await build({
  absWorkingDir: root,
  entryPoints: ['src/client/index.tsx'],
  outfile: 'lib/client.js',
  bundle: true,
  format: 'cjs',
  platform: 'browser',
  target: ['es2022'],
  jsx: 'automatic',
  sourcemap: 'external',
  sourcesContent: true,
  legalComments: 'none',
  external: ['react', 'react/jsx-runtime', '@deepseek-ai/dsh-client-ui-primitives'],
  banner: {
    js: `window.__ModuleLoader__.load({ id: ${JSON.stringify(packageName)}, factory: (require) => { var module = { exports: {} }; var exports = module.exports;`,
  },
  footer: {
    js: 'return module.exports; } });\n//# sourceMappingURL=client.js.map',
  },
  plugins: [inlineCssPlugin],
})

await build({
  absWorkingDir: root,
  entryPoints: ['src/index.ts'],
  outfile: 'lib/index.js',
  bundle: false,
  format: 'esm',
  platform: 'node',
  target: ['node22'],
  sourcemap: false,
  legalComments: 'none',
})

const client = await readFile(path.join(outDir, 'client.js'), 'utf8')
const requiredFragments = [
  `id: ${JSON.stringify(packageName)}`,
  'conversation.input.model',
  'settings.section',
  'settings.modelSelectionCollapsible',
  '@local/dsh-ui-model-selection-collapsible/preferences/v1',
  'priority: -1',
  'locale: "model"',
  'sourceMappingURL=client.js.map',
]
for (const fragment of requiredFragments) {
  if (!client.includes(fragment)) throw new Error(`client bundle is missing ${fragment}`)
}

const forbiddenFragments = [
  'locale.register("model"',
  "locale.register('model'",
  'Simplified Chinese dictionary',
  '正在刷新模型列表',
]
for (const fragment of forbiddenFragments) {
  if (client.includes(fragment)) throw new Error(`client bundle contains forbidden locale ownership: ${fragment}`)
}
