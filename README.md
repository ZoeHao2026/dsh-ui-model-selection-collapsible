# DSH Collapsible Model Selector

为 DeepSeek Harness（DSH）的模型选择器添加按供应商独立折叠的分组界面，同时保留官方的数据、选择、配置和调用逻辑。

Adds independently collapsible provider groups to the DeepSeek Harness model selector while preserving the official data, selection, configuration, and invocation paths.

![AI 生成的插件概念横幅](docs/assets/model-selector-hero-ai.png)

上图是 AI 生成的原创概念图，用于表达供应商分组、展开、折叠和模型连接关系，不代表 DSH 的实际界面或 DeepSeek 官方视觉。

## 实际界面

模型菜单：

![DSH 折叠模型选择器](docs/assets/model-selector-expanded.png)

设置页：

![DSH 模型选择器设置](docs/assets/model-selector-settings.jpg)

## 功能

- 每个模型供应商可以独立展开或折叠，并显示模型数量。
- 可在 DSH 设置中选择“当前供应商”“全部展开”“全部折叠”或“单组展开”。
- 可切换舒适/紧凑列表密度，以及跟随系统/关闭折叠动画。
- 展开、收起、箭头和透明度使用统一的 160 ms 对称动画，并支持 `prefers-reduced-motion`。
- 提供 `menuitem`、`menuitemradio`、`aria-expanded`、`aria-controls`、`aria-checked` 和可见项键盘导航。
- 模型触发器支持上下方向键直接打开菜单，并聚焦首项或末项。
- 直接复用官方 `modelDirectories` 服务、`model` 本地化命名空间和选择数据结构。
- 自定义席位使用优先级 `-1`；官方优先级 `0` 的模型选择器保持安装并作为运行时后备。
- 不新增命令、Host 配置 schema 或 RPC，也绝不重复注册官方 `model` 本地化命名空间。

## 设置

打开 DSH 的“设置”，选择“模型选择器”即可修改：

- 供应商分组的初始展开策略。
- 模型列表的舒适或紧凑密度。
- 折叠动画是否跟随系统设置。

默认值与 `0.1.x` 的行为一致：仅展开当前供应商、舒适密度、动画跟随系统。偏好保存在当前浏览器与 DSH Web 地址的 `localStorage` 中，会即时生效并在刷新后保留；它们不会写入 `settings.yaml`、修改模型配置或改变调用数据。浏览器阻止本地存储时，设置页会明确提示，更改仅在当前页面生命周期内有效。

## 兼容性

当前经过完整验证的基线是 DSH `0.1.0-rc.6`、Web 平台和 Node.js 22 或更高版本。DSH 仍处于开发预览阶段；升级 DSH 后，请先重新运行类型、bundle 和浏览器生命周期测试。

## 从 GitHub 安装

在 PowerShell 中运行：

```powershell
$dshBin = Join-Path $env:USERPROFILE '.dsh\profiles\node_modules\@deepseek-ai\dsh\lib\bin.js'
node $dshBin plugin --profile web add 'https://github.com/ZoeHao2026/dsh-ui-model-selection-collapsible.git'
```

安装完成后重启 DSH，并在浏览器中执行一次硬刷新。插件包名保持为 `@local/dsh-ui-model-selection-collapsible`，以兼容已有的 DSH 配置。

## 卸载

```powershell
$dshBin = Join-Path $env:USERPROFILE '.dsh\profiles\node_modules\@deepseek-ai\dsh\lib\bin.js'
node $dshBin plugin --profile web remove '@local/dsh-ui-model-selection-collapsible'
```

卸载后重启 DSH。官方模型选择器会继续提供默认席位。

## 本地开发

```powershell
git clone https://github.com/ZoeHao2026/dsh-ui-model-selection-collapsible.git
Set-Location dsh-ui-model-selection-collapsible
pnpm install --frozen-lockfile
pnpm run verify

$dshBin = Join-Path $env:USERPROFILE '.dsh\profiles\node_modules\@deepseek-ai\dsh\lib\bin.js'
$sourceRoot = (Get-Location).Path
node $dshBin plugin --profile web add "link:$sourceRoot"
```

`pnpm run verify` 会依次执行 TypeScript 类型检查、Vitest/jsdom 测试、bundle 构建和真实 lazy-CJS/apply 冒烟测试。仓库提交 `lib/` 构建产物，CI 会在重新构建后验证产物没有差异。

## 设计边界

插件只替换 `conversation.input.model` 的可视席位，并通过官方 `settings.section` 扩展点添加自己的设置页。它不会修改 DSH 官方插件或模型选择 RPC，也不会注册 `model` locale。`modelDirectories` 服务延迟出现、卸载或不兼容时，自定义席位不会挂载，由官方席位接管；设置外壳不存在时，仅隐藏设置页，不影响模型席位。

## 项目状态

这是独立的社区插件，并非 DeepSeek 官方项目。仓库通过 GitHub 的 `dsh-plugin` topic 加入 DSH 官方推荐的社区插件发现机制。

## 许可证

插件代码采用 MIT License。基于 DeepSeek Harness 的组件行为和样式，并在 bundle 中包含 `clsx`；完整归属与第三方许可证见 [THIRD_PARTY_NOTICES.md](THIRD_PARTY_NOTICES.md) 和 [LICENSES](LICENSES)。
