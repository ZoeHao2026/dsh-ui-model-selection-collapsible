import assert from 'node:assert/strict'
import { readFile } from 'node:fs/promises'
import path from 'node:path'
import { pathToFileURL } from 'node:url'
import vm from 'node:vm'

import { JSDOM } from 'jsdom'
import React from 'react'
import * as jsxRuntime from 'react/jsx-runtime'

const packageName = '@local/dsh-ui-model-selection-collapsible'
const root = path.resolve(import.meta.dirname, '..')
const clientPath = path.join(root, 'lib', 'client.js')
const mapPath = `${clientPath}.map`
const client = await readFile(clientPath, 'utf8')
const sourceMap = JSON.parse(await readFile(mapPath, 'utf8'))

assert.equal(sourceMap.version, 3)
assert.ok(client.includes('//# sourceMappingURL=client.js.map'))
assert.ok(Array.isArray(sourceMap.sources) && sourceMap.sources.length > 0)
assert.ok(Array.isArray(sourceMap.sourcesContent) && sourceMap.sourcesContent.length > 0)

const dom = new JSDOM('<!doctype html><html><head></head><body></body></html>')
const handoffs = []
dom.window.__ModuleLoader__ = {
  load(handoff) {
    handoffs.push(handoff)
  },
}

const context = vm.createContext({
  window: dom.window,
  document: dom.window.document,
  Node: dom.window.Node,
  Element: dom.window.Element,
  HTMLElement: dom.window.HTMLElement,
  queueMicrotask,
  setTimeout,
  clearTimeout,
})

vm.runInContext(client, context, { filename: clientPath })
assert.equal(handoffs.length, 1)
assert.equal(handoffs[0].id, packageName)
assert.equal(dom.window.document.querySelectorAll('style[data-plugin]').length, 0)

const required = []
const icon = () => null
const primitives = {
  IconCheckOutline16: icon,
  IconChevronDownOutline14: icon,
  IconChevronRightOutline14: icon,
  IconWarningOutline16: icon,
  Toast: () => null,
}
const modules = {
  react: React,
  'react/jsx-runtime': jsxRuntime,
  '@deepseek-ai/dsh-client-ui-primitives': primitives,
}
const exports = handoffs[0].factory((specifier) => {
  required.push(specifier)
  assert.ok(specifier in modules, `unexpected runtime require: ${specifier}`)
  return modules[specifier]
})

assert.equal(typeof exports.apply, 'function')
assert.deepEqual(Array.from(exports.inject), ['slots', 'sessions', 'locale'])
assert.equal(dom.window.document.querySelectorAll('style[data-plugin]').length, 1)
const pluginStyle = dom.window.document.querySelector('style[data-plugin]')
const pluginCss = pluginStyle?.textContent ?? ''
assert.ok(pluginCss.includes("grid-template-rows: 0fr"))
assert.ok(pluginCss.includes("grid-template-rows: 1fr"))
assert.ok(pluginCss.includes("--dsh-cmsc-motion-duration: 160ms"))
assert.ok(pluginCss.includes("--dsh-cmsc-motion-easing: cubic-bezier(0.4, 0, 0.6, 1)"))
const sharedMotion = 'var(--dsh-cmsc-motion-duration) var(--dsh-cmsc-motion-easing)'
const countCss = (needle) => pluginCss.split(needle).length - 1
assert.equal(countCss(`transform ${sharedMotion}`), 2)
assert.equal(countCss(`grid-template-rows ${sharedMotion}`), 2)
assert.equal(countCss(`opacity ${sharedMotion}`), 2)
assert.equal(countCss('visibility 0s linear var(--dsh-cmsc-motion-duration)'), 1)
const reducedMotionRule = Array.from(pluginStyle?.sheet?.cssRules ?? []).find(
  (rule) => 'media' in rule && rule.media.mediaText === '(prefers-reduced-motion: reduce)',
)
assert.ok(reducedMotionRule, 'missing reduced-motion CSSMediaRule')
const transitionNoneRule = Array.from(reducedMotionRule.cssRules).find(
  (rule) => 'style' in rule && rule.style.transition === 'none',
)
assert.ok(transitionNoneRule, 'missing reduced-motion transition override')
const transitionNoneSelectors = new Set(
  transitionNoneRule.selectorText.split(',').map((selector) => selector.trim().replaceAll("'", '"')),
)
assert.deepEqual(transitionNoneSelectors, new Set([
  '.dsh-cmsc-chevron',
  '.dsh-cmsc-groupBody',
  '.dsh-cmsc-groupBody[data-expanded="false"]',
  '.dsh-cmsc-groupBodyInner',
]))
assert.deepEqual([...new Set(required)].sort(), Object.keys(modules).sort())
assert.ok(!required.includes('@deepseek-ai/dsh-client-ui-model-selection'))

let dynamicDependencies
let dynamicMount
let slotName
let registration
let registeredComponent
let registerDisposed = false
const registerDisposer = () => {
  registerDisposed = true
}
const ctx = {
  locale: {
    register() {
      throw new Error('the local plugin must never register a locale')
    },
  },
  inject(dependencies, mount) {
    dynamicDependencies = Array.from(dependencies)
    dynamicMount = mount
  },
}

exports.apply(ctx)
assert.deepEqual(dynamicDependencies, ['modelDirectories'])
assert.equal(registration, undefined)

const store = {
  subscribe: () => () => undefined,
  getSnapshot: () => ({
    current: null,
    routable: null,
    groups: [],
    failures: [],
    status: 'idle',
    error: null,
  }),
}
const scope = {
  modelDirectories: {
    directoryFor() {
      return {
        store,
        load: async () => undefined,
        select: async () => undefined,
      }
    },
  },
  sessions: { subagentAddress: () => undefined },
  slots: {
    inject(name, mount) {
      slotName = name
      return mount()
    },
    register(options, component) {
      registration = options
      registeredComponent = component
      return registerDisposer
    },
  },
}

dynamicMount(scope)
assert.equal(slotName, 'conversation.input.model')
assert.equal(registration.name, 'conversation.input.model')
assert.equal(registration.locale, 'model')
assert.equal(registration.priority, -1)
assert.equal(typeof registeredComponent, 'function')
assert.equal(registerDisposed, false)
registerDisposer()
assert.equal(registerDisposed, true)

const host = await import(`${pathToFileURL(path.join(root, 'lib', 'index.js')).href}?smoke=1`)
assert.equal(typeof host.apply, 'function')
assert.equal(host.apply(), undefined)

console.log('bundle smoke passed')
