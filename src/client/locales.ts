import type { LocaleDictOf } from '@deepseek-ai/dsh-client-ui-slots'

export const SETTINGS_LOCALE_NS = 'settings.modelSelectionCollapsible'

export const en = {
  nav: 'Model selector',
  title: 'Model selector',
  intro: 'Tune how provider groups are presented without changing model configuration or calls.',
  'scope.browser': 'Saved in this browser for the current DSH web address.',
  'scope.memory': 'Browser storage is unavailable. Changes last until this page is refreshed or closed.',
  'disclosure.title': 'Provider groups',
  'disclosure.description': 'Choose which providers are expanded when you open the model list.',
  'disclosure.current': 'Current provider',
  'disclosure.current.description': 'Expand only the provider of the selected model.',
  'disclosure.all': 'All providers',
  'disclosure.all.description': 'Start with every provider expanded.',
  'disclosure.none': 'All collapsed',
  'disclosure.none.description': 'Start with a compact list of provider names.',
  'disclosure.accordion': 'One at a time',
  'disclosure.accordion.description': 'Keep at most one provider expanded.',
  'density.title': 'List density',
  'density.description': 'Adjust spacing in provider and model rows.',
  'density.comfortable': 'Comfortable',
  'density.comfortable.description': 'Roomier rows with model descriptions.',
  'density.compact': 'Compact',
  'density.compact.description': 'Shorter rows while keeping descriptions available to assistive technology.',
  'motion.title': 'Animation',
  'motion.description': 'Control provider expand and collapse motion.',
  'motion.system': 'Follow system',
  'motion.system.description': 'Use smooth motion unless reduced motion is enabled in the system.',
  'motion.none': 'Off',
  'motion.none.description': 'Apply expand and collapse changes immediately.',
  reset: 'Restore defaults',
} as const

export type SettingsLocaleKey = keyof typeof en

declare module '@deepseek-ai/dsh-client-ui-slots' {
  interface LocaleNamespaceMap {
    'settings.modelSelectionCollapsible': SettingsLocaleKey
  }
}

export const zh: LocaleDictOf<typeof SETTINGS_LOCALE_NS> = {
  nav: '模型选择器',
  title: '模型选择器',
  intro: '调整供应商分组的显示方式，不会改变模型配置或调用逻辑。',
  'scope.browser': '这些偏好保存在当前浏览器与 DSH Web 地址中。',
  'scope.memory': '浏览器存储不可用；更改只保留到刷新或关闭当前页面。',
  'disclosure.title': '供应商分组',
  'disclosure.description': '选择每次打开模型列表时默认展开哪些供应商。',
  'disclosure.current': '当前供应商',
  'disclosure.current.description': '仅展开当前所选模型的供应商。',
  'disclosure.all': '全部展开',
  'disclosure.all.description': '打开列表时展开所有供应商。',
  'disclosure.none': '全部折叠',
  'disclosure.none.description': '以精简的供应商名称列表开始。',
  'disclosure.accordion': '单组展开',
  'disclosure.accordion.description': '同一时间最多展开一个供应商。',
  'density.title': '列表密度',
  'density.description': '调整供应商和模型行的间距。',
  'density.comfortable': '舒适',
  'density.comfortable.description': '使用较宽松的行距并显示模型说明。',
  'density.compact': '紧凑',
  'density.compact.description': '缩短行高，同时保留辅助技术可读取的模型说明。',
  'motion.title': '动画',
  'motion.description': '控制供应商展开和折叠的动态效果。',
  'motion.system': '跟随系统',
  'motion.system.description': '默认使用平滑动画；系统开启减少动态效果时自动关闭。',
  'motion.none': '关闭',
  'motion.none.description': '立即完成展开和折叠。',
  reset: '恢复默认设置',
}

export const dictionaries = { zh, en } satisfies Record<
  'zh' | 'en',
  LocaleDictOf<typeof SETTINGS_LOCALE_NS>
>
