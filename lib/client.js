window.__ModuleLoader__.load({ id: "@local/dsh-ui-model-selection-collapsible", factory: (require) => { var module = { exports: {} }; var exports = module.exports;
"use strict";
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// src/client/index.tsx
var index_exports = {};
__export(index_exports, {
  apply: () => apply,
  inject: () => inject
});
module.exports = __toCommonJS(index_exports);

// src/client/CollapsibleModelSelect.tsx
var import_dsh_client_ui_primitives = require("@deepseek-ai/dsh-client-ui-primitives");

// node_modules/.pnpm/clsx@2.1.1/node_modules/clsx/dist/clsx.mjs
function r(e) {
  var t, f, n = "";
  if ("string" == typeof e || "number" == typeof e) n += e;
  else if ("object" == typeof e) if (Array.isArray(e)) {
    var o = e.length;
    for (t = 0; t < o; t++) e[t] && (f = r(e[t])) && (n && (n += " "), n += f);
  } else for (f in e) e[f] && (n && (n += " "), n += f);
  return n;
}
function clsx() {
  for (var e, t, f = 0, n = "", o = arguments.length; f < o; f++) (e = arguments[f]) && (t = r(e)) && (n && (n += " "), n += t);
  return n;
}
var clsx_default = clsx;

// src/client/CollapsibleModelSelect.tsx
var import_react = require("react");

// src/client/styles.css
var tagId = "@local/dsh-ui-model-selection-collapsible/styles.css";
if (typeof document !== "undefined" && document.querySelector('style[data-plugin-css="' + tagId + '"]') === null) {
  const tag = document.createElement("style");
  tag.dataset.plugin = "@local/dsh-ui-model-selection-collapsible";
  tag.dataset.pluginCss = tagId;
  tag.textContent = ".dsh-cmsc-root {\n  min-width: 0;\n  position: relative;\n  --dsh-cmsc-motion-duration: 160ms;\n  --dsh-cmsc-motion-easing: cubic-bezier(0.4, 0, 0.6, 1);\n}\n\n.dsh-cmsc-trigger {\n  min-width: 0;\n  max-width: 220px;\n  height: 28px;\n  color: var(--dsw-alias-label-secondary);\n  cursor: pointer;\n  background: transparent;\n  border: 0;\n  border-radius: 24px;\n  outline: none;\n  display: flex;\n  align-items: center;\n  gap: 4px;\n  padding: 0 4px 0 8px;\n  font-size: 13px;\n  font-weight: 500;\n  line-height: 20px;\n}\n\n.dsh-cmsc-trigger:hover:not(:disabled),\n.dsh-cmsc-trigger:focus-visible {\n  background: var(--dsw-alias-interactive-bg-hover);\n}\n\n.dsh-cmsc-trigger:focus-visible {\n  box-shadow: 0 0 0 2px var(--dsw-alias-border-l3);\n}\n\n.dsh-cmsc-trigger:disabled {\n  color: var(--dsw-alias-label-dimmed);\n  cursor: default;\n}\n\n.dsh-cmsc-triggerLabel {\n  min-width: 0;\n  overflow: hidden;\n  text-overflow: ellipsis;\n  white-space: nowrap;\n}\n\n.dsh-cmsc-triggerEffort,\n.dsh-cmsc-chevron,\n.dsh-cmsc-cellChevron {\n  color: var(--dsw-alias-label-caption);\n  flex: none;\n}\n\n.dsh-cmsc-chevron {\n  transition: transform var(--dsh-cmsc-motion-duration) var(--dsh-cmsc-motion-easing);\n}\n\n.dsh-cmsc-chevronOpen {\n  transform: rotate(180deg);\n}\n\n.dsh-cmsc-menu {\n  z-index: 20;\n  width: min(260px, calc(100vw - 32px));\n  max-height: min(420px, calc(100vh - 96px));\n  position: absolute;\n  right: 0;\n  bottom: calc(100% + 8px);\n  overflow: hidden;\n  display: flex;\n  flex-direction: column;\n  padding: 4px;\n  color: var(--dsw-alias-label-primary);\n  background: var(--dsw-specific-menu);\n  border: 1px solid var(--dsw-alias-border-inverted);\n  border-radius: 12px;\n  box-shadow: var(--dsw-shadow-lv3);\n  --dsh-scrollbar-thumb: var(--dsw-alias-scrollbar-bg-l2);\n  --dsh-scrollbar-thumb-hover: var(--dsw-alias-scrollbar-hover-l2);\n}\n\n.dsh-cmsc-status,\n.dsh-cmsc-empty {\n  padding: 10px;\n  color: var(--dsw-alias-label-tertiary);\n  font-size: 13px;\n  line-height: 20px;\n}\n\n.dsh-cmsc-error,\n.dsh-cmsc-warning {\n  display: flex;\n  align-items: flex-start;\n  justify-content: space-between;\n  gap: 8px;\n  margin-bottom: 4px;\n  padding: 7px 8px;\n  color: var(--dsw-alias-state-error-primary);\n  background: var(--dsw-alias-interactive-bg-hover-danger);\n  border-radius: 8px;\n  font-size: 12px;\n  line-height: 18px;\n}\n\n.dsh-cmsc-warning {\n  color: var(--dsw-alias-state-warn-label);\n  background: var(--dsw-alias-bg-module-platform);\n}\n\n.dsh-cmsc-retry {\n  flex: none;\n  padding: 0;\n  color: inherit;\n  cursor: pointer;\n  background: transparent;\n  border: 0;\n  font: inherit;\n  font-weight: 600;\n}\n\n.dsh-cmsc-retry:focus-visible {\n  outline: 2px solid currentColor;\n  outline-offset: 2px;\n}\n\n.dsh-cmsc-groups {\n  min-height: 0;\n  overflow-y: auto;\n}\n\n.dsh-cmsc-group + .dsh-cmsc-group {\n  margin-top: 4px;\n}\n\n.dsh-cmsc-groupHeader {\n  width: 100%;\n  min-height: 32px;\n  display: flex;\n  align-items: center;\n  gap: 6px;\n  padding: 5px 8px;\n  color: var(--dsw-alias-label-secondary);\n  text-align: left;\n  cursor: pointer;\n  background: transparent;\n  border: 0;\n  border-radius: 8px;\n  outline: none;\n  font-size: 13px;\n  font-weight: 600;\n  line-height: 20px;\n}\n\n.dsh-cmsc-groupHeader:hover:not(:disabled),\n.dsh-cmsc-groupHeader:focus-visible {\n  background: var(--dsw-alias-interactive-bg-hover);\n}\n\n.dsh-cmsc-groupHeader:disabled {\n  color: var(--dsw-alias-label-dimmed);\n  cursor: default;\n}\n\n.dsh-cmsc-groupTitle {\n  min-width: 0;\n  flex: 1;\n  overflow: hidden;\n  color: var(--dsw-alias-label-primary);\n  text-overflow: ellipsis;\n  white-space: nowrap;\n}\n\n.dsh-cmsc-groupCount {\n  flex: none;\n  color: var(--dsw-alias-label-caption);\n  font-size: 12px;\n  font-weight: 400;\n  line-height: 18px;\n}\n\n.dsh-cmsc-groupBody {\n  min-width: 0;\n  display: grid;\n  grid-template-rows: 1fr;\n  opacity: 1;\n  visibility: visible;\n  pointer-events: auto;\n  transition:\n    grid-template-rows var(--dsh-cmsc-motion-duration) var(--dsh-cmsc-motion-easing),\n    opacity var(--dsh-cmsc-motion-duration) var(--dsh-cmsc-motion-easing),\n    visibility 0s linear 0s;\n}\n\n.dsh-cmsc-groupBody[data-expanded='false'] {\n  grid-template-rows: 0fr;\n  opacity: 0;\n  visibility: hidden;\n  pointer-events: none;\n  transition:\n    grid-template-rows var(--dsh-cmsc-motion-duration) var(--dsh-cmsc-motion-easing),\n    opacity var(--dsh-cmsc-motion-duration) var(--dsh-cmsc-motion-easing),\n    visibility 0s linear var(--dsh-cmsc-motion-duration);\n}\n\n.dsh-cmsc-groupBodyInner {\n  min-height: 0;\n  overflow: hidden;\n  display: flex;\n  flex-direction: column;\n  transform: translateY(0);\n  transition: transform var(--dsh-cmsc-motion-duration) var(--dsh-cmsc-motion-easing);\n}\n\n.dsh-cmsc-groupBody[data-expanded='false'] .dsh-cmsc-groupBodyInner {\n  transform: translateY(-4px);\n}\n\n.dsh-cmsc-option {\n  width: 100%;\n  min-height: 38px;\n  display: flex;\n  align-items: center;\n  gap: 8px;\n  padding: 6px 8px;\n  color: inherit;\n  text-align: left;\n  cursor: pointer;\n  background: transparent;\n  border: 0;\n  border-radius: 10px;\n  outline: none;\n}\n\n.dsh-cmsc-option:hover:not(:disabled),\n.dsh-cmsc-option:focus-visible,\n.dsh-cmsc-selected {\n  background: var(--dsw-alias-interactive-bg-hover);\n}\n\n.dsh-cmsc-option:disabled {\n  color: var(--dsw-alias-label-dimmed);\n  cursor: default;\n}\n\n.dsh-cmsc-optionCopy {\n  min-width: 0;\n  flex: 1;\n  display: flex;\n  flex-direction: column;\n}\n\n.dsh-cmsc-modelName,\n.dsh-cmsc-description {\n  overflow: hidden;\n  text-overflow: ellipsis;\n  white-space: nowrap;\n}\n\n.dsh-cmsc-modelName {\n  color: inherit;\n  font-size: 14px;\n  font-weight: 500;\n  line-height: 20px;\n}\n\n.dsh-cmsc-description {\n  color: var(--dsw-alias-label-tertiary);\n  font-size: 12px;\n  line-height: 18px;\n}\n\n.dsh-cmsc-check {\n  flex: 0 0 18px;\n  display: grid;\n  place-items: center;\n  color: var(--dsw-alias-label-primary);\n}\n\n.dsh-cmsc-cell {\n  width: 100%;\n  height: 40px;\n  display: flex;\n  align-items: center;\n  gap: 8px;\n  padding: 0 10px;\n  color: var(--dsw-alias-label-primary);\n  cursor: pointer;\n  text-align: left;\n  background: transparent;\n  border: 0;\n  border-radius: 10px;\n  outline: none;\n  font-size: 14px;\n  line-height: 22px;\n}\n\n.dsh-cmsc-cell:hover,\n.dsh-cmsc-cell:focus-visible {\n  background: var(--dsw-alias-interactive-bg-hover);\n}\n\n.dsh-cmsc-cellLabel,\n.dsh-cmsc-cellValue {\n  min-width: 0;\n  overflow: hidden;\n  text-overflow: ellipsis;\n  white-space: nowrap;\n}\n\n.dsh-cmsc-cellLabel {\n  flex: auto;\n}\n\n.dsh-cmsc-cellValue {\n  flex: 0 1 auto;\n  color: var(--dsw-alias-label-tertiary);\n}\n\n.dsh-cmsc-root[data-density='compact'] .dsh-cmsc-groupHeader {\n  min-height: 28px;\n  padding-block: 3px;\n}\n\n.dsh-cmsc-root[data-density='compact'] .dsh-cmsc-option {\n  min-height: 32px;\n  padding-block: 4px;\n}\n\n.dsh-cmsc-root[data-density='compact'] .dsh-cmsc-description {\n  width: 1px;\n  height: 1px;\n  position: absolute;\n  overflow: hidden;\n  clip: rect(0 0 0 0);\n  clip-path: inset(50%);\n  white-space: nowrap;\n}\n\n.dsh-cmsc-root[data-motion='none'] .dsh-cmsc-chevron,\n.dsh-cmsc-root[data-motion='none'] .dsh-cmsc-groupBody,\n.dsh-cmsc-root[data-motion='none'] .dsh-cmsc-groupBody[data-expanded='false'],\n.dsh-cmsc-root[data-motion='none'] .dsh-cmsc-groupBodyInner {\n  transition: none;\n}\n\n.dsh-cmsc-root[data-motion='none'] .dsh-cmsc-groupBodyInner,\n.dsh-cmsc-root[data-motion='none']\n  .dsh-cmsc-groupBody[data-expanded='false']\n  .dsh-cmsc-groupBodyInner {\n  transform: none;\n}\n\n.dsh-cmsc-settingsSection {\n  width: min(680px, 100%);\n  display: flex;\n  flex-direction: column;\n  gap: 24px;\n  padding: 4px 0 28px;\n  color: var(--dsw-alias-label-primary);\n}\n\n.dsh-cmsc-settingsHeader {\n  display: flex;\n  flex-direction: column;\n  gap: 8px;\n}\n\n.dsh-cmsc-settingsTitle {\n  margin: 0;\n  font-size: 22px;\n  font-weight: 650;\n  line-height: 30px;\n}\n\n.dsh-cmsc-settingsIntro,\n.dsh-cmsc-settingsScope,\n.dsh-cmsc-settingsDescription {\n  margin: 0;\n  color: var(--dsw-alias-label-tertiary);\n  font-size: 13px;\n  line-height: 20px;\n}\n\n.dsh-cmsc-settingsScope {\n  width: fit-content;\n  padding: 6px 9px;\n  color: var(--dsw-alias-label-secondary);\n  background: var(--dsw-alias-bg-module-platform);\n  border-radius: 8px;\n}\n\n.dsh-cmsc-settingsGroup {\n  min-width: 0;\n  margin: 0;\n  padding: 0;\n  border: 0;\n}\n\n.dsh-cmsc-settingsLegend {\n  padding: 0;\n  color: var(--dsw-alias-label-primary);\n  font-size: 15px;\n  font-weight: 600;\n  line-height: 22px;\n}\n\n.dsh-cmsc-settingsDescription {\n  margin-top: 3px;\n}\n\n.dsh-cmsc-settingsChoices {\n  display: grid;\n  grid-template-columns: repeat(2, minmax(0, 1fr));\n  gap: 8px;\n  margin-top: 10px;\n}\n\n.dsh-cmsc-settingsChoice {\n  min-width: 0;\n  min-height: 70px;\n  position: relative;\n  display: grid;\n  grid-template-columns: minmax(0, 1fr) 20px;\n  align-items: center;\n  gap: 10px;\n  padding: 11px 12px;\n  cursor: pointer;\n  background: var(--dsw-alias-bg-module-platform);\n  border: 1px solid var(--dsw-alias-border-l3);\n  border-radius: 12px;\n}\n\n.dsh-cmsc-settingsChoice:hover,\n.dsh-cmsc-settingsChoice[data-selected='true'] {\n  background: var(--dsw-alias-interactive-bg-hover);\n}\n\n.dsh-cmsc-settingsChoice[data-selected='true'] {\n  border-color: var(--dsw-alias-label-secondary);\n}\n\n.dsh-cmsc-settingsChoice:has(.dsh-cmsc-settingsRadio:focus-visible) {\n  outline: 2px solid var(--dsw-alias-border-l3);\n  outline-offset: 2px;\n}\n\n.dsh-cmsc-settingsRadio {\n  width: 1px;\n  height: 1px;\n  position: absolute;\n  overflow: hidden;\n  clip: rect(0 0 0 0);\n  clip-path: inset(50%);\n  white-space: nowrap;\n}\n\n.dsh-cmsc-settingsChoiceCopy {\n  min-width: 0;\n  display: flex;\n  flex-direction: column;\n  gap: 2px;\n}\n\n.dsh-cmsc-settingsChoiceTitle {\n  color: var(--dsw-alias-label-primary);\n  font-size: 14px;\n  font-weight: 600;\n  line-height: 20px;\n}\n\n.dsh-cmsc-settingsChoiceDescription {\n  color: var(--dsw-alias-label-tertiary);\n  font-size: 12px;\n  line-height: 18px;\n}\n\n.dsh-cmsc-settingsChoiceCheck {\n  width: 20px;\n  height: 20px;\n  display: grid;\n  place-items: center;\n  color: var(--dsw-alias-label-primary);\n}\n\n.dsh-cmsc-settingsReset {\n  width: fit-content;\n  min-height: 32px;\n  padding: 5px 12px;\n  color: var(--dsw-alias-label-primary);\n  cursor: pointer;\n  background: transparent;\n  border: 1px solid var(--dsw-alias-border-l3);\n  border-radius: 9px;\n  font: inherit;\n  font-size: 13px;\n  font-weight: 600;\n}\n\n.dsh-cmsc-settingsReset:hover:not(:disabled),\n.dsh-cmsc-settingsReset:focus-visible {\n  background: var(--dsw-alias-interactive-bg-hover);\n}\n\n.dsh-cmsc-settingsReset:focus-visible {\n  outline: 2px solid var(--dsw-alias-border-l3);\n  outline-offset: 2px;\n}\n\n.dsh-cmsc-settingsReset:disabled {\n  color: var(--dsw-alias-label-dimmed);\n  cursor: default;\n}\n\n@media (max-width: 640px) {\n  .dsh-cmsc-settingsChoices {\n    grid-template-columns: minmax(0, 1fr);\n  }\n}\n\n@media (prefers-reduced-motion: reduce) {\n  .dsh-cmsc-chevron,\n  .dsh-cmsc-groupBody,\n  .dsh-cmsc-groupBody[data-expanded='false'],\n  .dsh-cmsc-groupBodyInner {\n    transition: none;\n  }\n\n  .dsh-cmsc-groupBodyInner,\n  .dsh-cmsc-groupBody[data-expanded='false'] .dsh-cmsc-groupBodyInner {\n    transform: none;\n  }\n}\n";
  document.head.appendChild(tag);
}

// src/client/model-state.ts
function choicesOf(groups) {
  return groups.flatMap(
    (group) => group.models.map((model) => ({
      group,
      model,
      selection: {
        provider: group.id,
        model: model.id,
        ...model.reasoning?.defaultEffort === void 0 ? {} : { reasoningEffort: model.reasoning.defaultEffort }
      }
    }))
  );
}
function currentChoiceOf(choices, current) {
  if (current === null) return void 0;
  return choices.find(
    (choice) => choice.selection.provider === current.provider && choice.selection.model === current.model
  );
}
function defaultExpanded(current, groups, disclosure) {
  if (disclosure === "all") return new Set(groups.map((group) => group.id));
  if (disclosure === "none") return /* @__PURE__ */ new Set();
  return current === void 0 ? /* @__PURE__ */ new Set() : /* @__PURE__ */ new Set([current.group.id]);
}
function toggled(expanded, providerId, disclosure) {
  if (disclosure === "accordion") {
    return expanded.has(providerId) ? /* @__PURE__ */ new Set() : /* @__PURE__ */ new Set([providerId]);
  }
  const next = new Set(expanded);
  if (next.has(providerId)) next.delete(providerId);
  else next.add(providerId);
  return next;
}

// src/client/styles.ts
var styles = {
  root: "dsh-cmsc-root",
  trigger: "dsh-cmsc-trigger",
  triggerLabel: "dsh-cmsc-triggerLabel",
  triggerEffort: "dsh-cmsc-triggerEffort",
  chevron: "dsh-cmsc-chevron",
  chevronOpen: "dsh-cmsc-chevronOpen",
  menu: "dsh-cmsc-menu",
  status: "dsh-cmsc-status",
  empty: "dsh-cmsc-empty",
  error: "dsh-cmsc-error",
  warning: "dsh-cmsc-warning",
  retry: "dsh-cmsc-retry",
  groups: "dsh-cmsc-groups",
  group: "dsh-cmsc-group",
  groupHeader: "dsh-cmsc-groupHeader",
  groupTitle: "dsh-cmsc-groupTitle",
  groupCount: "dsh-cmsc-groupCount",
  groupBody: "dsh-cmsc-groupBody",
  groupBodyInner: "dsh-cmsc-groupBodyInner",
  option: "dsh-cmsc-option",
  selected: "dsh-cmsc-selected",
  optionCopy: "dsh-cmsc-optionCopy",
  modelName: "dsh-cmsc-modelName",
  description: "dsh-cmsc-description",
  check: "dsh-cmsc-check",
  cell: "dsh-cmsc-cell",
  cellLabel: "dsh-cmsc-cellLabel",
  cellValue: "dsh-cmsc-cellValue",
  cellChevron: "dsh-cmsc-cellChevron",
  settingsSection: "dsh-cmsc-settingsSection",
  settingsHeader: "dsh-cmsc-settingsHeader",
  settingsTitle: "dsh-cmsc-settingsTitle",
  settingsIntro: "dsh-cmsc-settingsIntro",
  settingsScope: "dsh-cmsc-settingsScope",
  settingsGroup: "dsh-cmsc-settingsGroup",
  settingsLegend: "dsh-cmsc-settingsLegend",
  settingsDescription: "dsh-cmsc-settingsDescription",
  settingsChoices: "dsh-cmsc-settingsChoices",
  settingsChoice: "dsh-cmsc-settingsChoice",
  settingsRadio: "dsh-cmsc-settingsRadio",
  settingsChoiceCopy: "dsh-cmsc-settingsChoiceCopy",
  settingsChoiceTitle: "dsh-cmsc-settingsChoiceTitle",
  settingsChoiceDescription: "dsh-cmsc-settingsChoiceDescription",
  settingsChoiceCheck: "dsh-cmsc-settingsChoiceCheck",
  settingsReset: "dsh-cmsc-settingsReset"
};

// src/client/CollapsibleModelSelect.tsx
var import_jsx_runtime = require("react/jsx-runtime");
var MENU_ITEM_SELECTOR = '[role="menuitem"],[role="menuitemradio"]';
function CollapsibleModelSelect({
  locked,
  available,
  directory,
  load,
  select,
  preferences,
  t
}) {
  const state = (0, import_react.useSyncExternalStore)(
    (notify) => directory.subscribe(notify),
    () => directory.getSnapshot()
  );
  const preferenceSnapshot = (0, import_react.useSyncExternalStore)(
    preferences.subscribe,
    preferences.getSnapshot
  );
  const preference = preferenceSnapshot.value;
  const [open, setOpen] = (0, import_react.useState)(false);
  const [pane, setPane] = (0, import_react.useState)("root");
  const [expanded, setExpanded] = (0, import_react.useState)(() => /* @__PURE__ */ new Set());
  const [toast, setToast] = (0, import_react.useState)(null);
  const lastActionRef = (0, import_react.useRef)("load");
  const toastSeq = (0, import_react.useRef)(0);
  const groupTouchedRef = (0, import_react.useRef)(false);
  const rootRef = (0, import_react.useRef)(null);
  const menuRef = (0, import_react.useRef)(null);
  const triggerRef = (0, import_react.useRef)(null);
  const id = (0, import_react.useId)();
  const choices = (0, import_react.useMemo)(() => choicesOf(state.groups), [state.groups]);
  const currentChoice = currentChoiceOf(choices, state.current);
  const currentProviderId = currentChoice?.group.id;
  const reasoning = currentChoice?.model.reasoning;
  const effectiveEffort = state.current?.reasoningEffort ?? reasoning?.defaultEffort;
  const effortLabel = reasoning === void 0 ? void 0 : effectiveEffort === void 0 ? t("effort.providerDefault") : reasoning.efforts.find((level) => level.id === effectiveEffort)?.name ?? effectiveEffort;
  const effortChoices = (0, import_react.useMemo)(
    () => reasoning === void 0 ? [] : [
      ...reasoning.defaultEffort === void 0 ? [
        {
          key: "provider-default",
          effort: void 0,
          label: t("effort.providerDefault")
        }
      ] : [],
      ...reasoning.efforts.map((effort) => ({
        key: `effort:${effort.id}`,
        effort: effort.id,
        label: effort.name,
        ...effort.description === void 0 ? {} : { description: effort.description }
      }))
    ],
    [reasoning, t]
  );
  const busy = state.status === "selecting";
  const reload = () => {
    lastActionRef.current = "load";
    load();
  };
  (0, import_react.useEffect)(() => {
    if (!available) return;
    lastActionRef.current = "load";
    load();
  }, [available, load]);
  (0, import_react.useEffect)(() => {
    if (!open) return;
    const closeOutside = (event) => {
      if (event.target instanceof Node && !rootRef.current?.contains(event.target)) {
        setOpen(false);
        setPane("root");
      }
    };
    document.addEventListener("mousedown", closeOutside);
    return () => document.removeEventListener("mousedown", closeOutside);
  }, [open]);
  (0, import_react.useEffect)(() => {
    if (pane !== "model" || groupTouchedRef.current) return;
    setExpanded(defaultExpanded(currentChoice, state.groups, preference.providerDisclosure));
  }, [pane, currentChoice, state.groups, preference.providerDisclosure]);
  if (!available) return null;
  const menuItems = () => {
    if (menuRef.current === null) return [];
    return Array.from(menuRef.current.querySelectorAll(MENU_ITEM_SELECTOR)).filter(
      (item) => !item.matches(":disabled") && item.closest('[hidden],[inert],[aria-hidden="true"],[data-expanded="false"]') === null
    );
  };
  const focusBoundary = (boundary) => {
    queueMicrotask(() => {
      const items = menuItems();
      items[boundary === "first" ? 0 : items.length - 1]?.focus();
    });
  };
  const close = (restoreFocus = false) => {
    setOpen(false);
    setPane("root");
    if (restoreFocus) queueMicrotask(() => triggerRef.current?.focus());
  };
  const show = () => {
    setPane("root");
    setOpen(true);
    reload();
  };
  const moveFocus = (direction) => {
    const items = menuItems();
    if (items.length === 0) return;
    const active = items.findIndex((item) => item === document.activeElement);
    const next = active === -1 ? direction === 1 ? 0 : items.length - 1 : (active + direction + items.length) % items.length;
    items[next]?.focus();
  };
  const onRootKeyDown = (event) => {
    if (event.key === "Escape" && open) {
      event.preventDefault();
      if (pane === "root") close(true);
      else {
        setPane("root");
        focusBoundary("first");
      }
      return;
    }
    if (!open) return;
    if (event.key === "ArrowDown" || event.key === "ArrowUp") {
      event.preventDefault();
      moveFocus(event.key === "ArrowDown" ? 1 : -1);
    } else if (event.key === "Home" || event.key === "End") {
      event.preventDefault();
      focusBoundary(event.key === "Home" ? "first" : "last");
    }
  };
  const onBlur = (event) => {
    if (event.relatedTarget instanceof Node && rootRef.current?.contains(event.relatedTarget)) return;
    close();
  };
  const settleSelection = (accepted) => {
    if (accepted) {
      close(true);
      return;
    }
    const message = directory.getSnapshot().error;
    if (message === null) return;
    toastSeq.current += 1;
    setToast({ seq: toastSeq.current, text: t("error.action", { message }) });
  };
  const choose = (selection) => {
    if (state.current?.provider === selection.provider && state.current.model === selection.model) {
      close(true);
      return;
    }
    lastActionRef.current = "select";
    void select(selection).then(settleSelection);
  };
  const chooseEffort = (effort) => {
    if (state.current === null) return;
    if (effectiveEffort === effort) {
      close(true);
      return;
    }
    lastActionRef.current = "select";
    void select({
      provider: state.current.provider,
      model: state.current.model,
      ...effort === void 0 ? {} : { reasoningEffort: effort }
    }).then(settleSelection);
  };
  const enterModelPane = () => {
    groupTouchedRef.current = false;
    setExpanded(defaultExpanded(currentChoice, state.groups, preference.providerDisclosure));
    setPane("model");
    focusBoundary("first");
  };
  const enterEffortPane = () => {
    setPane("effort");
    focusBoundary("first");
  };
  const toggleGroup = (groupId) => {
    groupTouchedRef.current = true;
    setExpanded((previous) => toggled(previous, groupId, preference.providerDisclosure));
  };
  const modelLabel = currentChoice?.model.name ?? t("trigger.fallback");
  const triggerLabel = effortLabel === void 0 ? modelLabel : `${modelLabel} \xB7 ${effortLabel}`;
  const triggerAria = currentChoice === void 0 ? t("trigger.selectAria") : effortLabel === void 0 ? t("trigger.aria", { model: modelLabel }) : t("trigger.ariaEffort", { model: modelLabel, effort: effortLabel });
  return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(
    "div",
    {
      ref: rootRef,
      className: styles.root,
      "data-density": preference.density,
      "data-motion": preference.motion,
      onKeyDown: onRootKeyDown,
      onBlur,
      children: [
        /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(
          "button",
          {
            ref: triggerRef,
            type: "button",
            className: styles.trigger,
            "aria-label": triggerAria,
            "aria-haspopup": "menu",
            "aria-expanded": open,
            "aria-controls": open ? `${id}-menu` : void 0,
            title: triggerLabel,
            disabled: locked,
            onClick: () => open ? close() : show(),
            onKeyDown: (event) => {
              if (open || event.key !== "ArrowDown" && event.key !== "ArrowUp") return;
              event.preventDefault();
              event.stopPropagation();
              show();
              focusBoundary(event.key === "ArrowDown" ? "first" : "last");
            },
            children: [
              /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: styles.triggerLabel, children: modelLabel }),
              effortLabel === void 0 ? null : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: styles.triggerEffort, children: effortLabel }),
              /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
                import_dsh_client_ui_primitives.IconChevronDownOutline14,
                {
                  className: clsx_default(styles.chevron, open && styles.chevronOpen)
                }
              )
            ]
          }
        ),
        open ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(
          "div",
          {
            ref: menuRef,
            id: `${id}-menu`,
            className: styles.menu,
            role: "menu",
            "aria-label": t("menu.aria"),
            "aria-busy": state.status === "loading" || busy,
            children: [
              pane === "root" ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
                /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", { type: "button", role: "menuitem", className: styles.cell, onClick: enterModelPane, children: [
                  /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: styles.cellLabel, children: t("menu.model") }),
                  /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: styles.cellValue, children: modelLabel }),
                  /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_dsh_client_ui_primitives.IconChevronRightOutline14, { className: styles.cellChevron })
                ] }),
                reasoning === void 0 ? null : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", { type: "button", role: "menuitem", className: styles.cell, onClick: enterEffortPane, children: [
                  /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: styles.cellLabel, children: t("menu.effort") }),
                  /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: styles.cellValue, children: effortLabel }),
                  /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_dsh_client_ui_primitives.IconChevronRightOutline14, { className: styles.cellChevron })
                ] })
              ] }) : null,
              pane === "model" ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
                state.status === "loading" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: styles.status, role: "status", children: t("status.loading") }) : null,
                state.error !== null && lastActionRef.current === "load" ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { className: styles.error, role: "alert", children: [
                  /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: t("error.action", { message: state.error }) }),
                  /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", { type: "button", role: "menuitem", className: styles.retry, onClick: reload, children: t("action.reload") })
                ] }) : null,
                state.failures.map((failure) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { className: styles.warning, role: "status", children: [
                  /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: t("warning.groupLoad", { name: failure.name, message: failure.message }) }),
                  /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", { type: "button", role: "menuitem", className: styles.retry, onClick: reload, children: t("action.reload") })
                ] }, failure.id)),
                /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: clsx_default(styles.groups, "scrollable"), children: state.groups.map((group, groupIndex) => {
                  const headingId = `${id}-group-${groupIndex}-header`;
                  const listId = `${id}-group-${groupIndex}-models`;
                  const groupOpen = expanded.has(group.id);
                  return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { role: "presentation", className: styles.group, children: [
                    /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(
                      "button",
                      {
                        type: "button",
                        role: "menuitem",
                        id: headingId,
                        className: styles.groupHeader,
                        "aria-label": `${group.name} ${group.models.length}`,
                        "aria-expanded": groupOpen,
                        "aria-controls": listId,
                        disabled: busy,
                        onClick: () => toggleGroup(group.id),
                        children: [
                          /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: styles.groupTitle, children: group.name }),
                          /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: styles.groupCount, children: group.models.length }),
                          /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
                            import_dsh_client_ui_primitives.IconChevronDownOutline14,
                            {
                              className: clsx_default(styles.chevron, groupOpen && styles.chevronOpen)
                            }
                          )
                        ]
                      }
                    ),
                    /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
                      "div",
                      {
                        ref: (node) => node?.toggleAttribute("inert", !groupOpen),
                        id: listId,
                        role: "group",
                        "aria-labelledby": headingId,
                        "aria-hidden": !groupOpen,
                        "data-expanded": groupOpen,
                        className: styles.groupBody,
                        children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: styles.groupBodyInner, children: group.models.map((model, modelIndex) => {
                          const selected = state.current?.provider === group.id && state.current.model === model.id;
                          const descriptionId = `${listId}-model-${modelIndex}-description`;
                          return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(
                            "button",
                            {
                              type: "button",
                              role: "menuitemradio",
                              "aria-label": model.name,
                              "aria-describedby": model.description === void 0 ? void 0 : descriptionId,
                              "aria-checked": selected,
                              className: clsx_default(styles.option, selected && styles.selected),
                              title: model.description === void 0 ? model.name : `${model.name} \u2014 ${model.description}`,
                              tabIndex: groupOpen ? void 0 : -1,
                              disabled: busy,
                              onClick: () => choose({ provider: group.id, model: model.id }),
                              children: [
                                /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { className: styles.optionCopy, children: [
                                  /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: styles.modelName, children: model.name }),
                                  model.description === void 0 ? null : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { id: descriptionId, className: styles.description, children: model.description })
                                ] }),
                                /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: styles.check, children: selected ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_dsh_client_ui_primitives.IconCheckOutline16, {}) : null })
                              ]
                            },
                            `${group.id}/${model.id}`
                          );
                        }) })
                      }
                    )
                  ] }, group.id);
                }) }),
                state.status === "ready" && choices.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: styles.empty, children: t("empty.models") }) : null
              ] }) : null,
              pane === "effort" ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
                state.error !== null && lastActionRef.current === "load" ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { className: styles.error, role: "alert", children: [
                  /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: t("error.action", { message: state.error }) }),
                  /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", { type: "button", role: "menuitem", className: styles.retry, onClick: reload, children: t("action.reload") })
                ] }) : null,
                effortChoices.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: styles.empty, children: t("empty.efforts") }) : effortChoices.map((level) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(
                  "button",
                  {
                    type: "button",
                    role: "menuitemradio",
                    "aria-checked": effectiveEffort === level.effort,
                    className: clsx_default(styles.option, effectiveEffort === level.effort && styles.selected),
                    disabled: busy,
                    onClick: () => chooseEffort(level.effort),
                    children: [
                      /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { className: styles.optionCopy, children: [
                        /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: styles.modelName, children: level.label }),
                        level.description === void 0 ? null : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: styles.description, children: level.description })
                      ] }),
                      /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: styles.check, children: effectiveEffort === level.effort ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_dsh_client_ui_primitives.IconCheckOutline16, {}) : null })
                    ]
                  },
                  level.key
                ))
              ] }) : null
            ]
          }
        ) : null,
        toast === null ? null : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
          import_dsh_client_ui_primitives.Toast,
          {
            text: toast.text,
            icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_dsh_client_ui_primitives.IconWarningOutline16, {}),
            anchor: rootRef.current?.closest("[data-composer-card]") ?? null,
            onDone: () => setToast(null)
          },
          toast.seq
        )
      ]
    }
  );
}

// src/client/ChatModelSelect.tsx
var import_react2 = require("react");
var import_jsx_runtime2 = require("react/jsx-runtime");
function ChatModelSelect({ t, preferences, getDirectory, load, select }) {
  const directory = getDirectory();
  const state = (0, import_react2.useSyncExternalStore)(directory.subscribe, directory.getSnapshot);
  return /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(
    CollapsibleModelSelect,
    {
      available: state.available,
      locked: state.locked,
      directory,
      load,
      select,
      preferences,
      t
    }
  );
}

// src/client/SettingsSection.tsx
var import_dsh_client_ui_primitives2 = require("@deepseek-ai/dsh-client-ui-primitives");
var import_react3 = require("react");

// src/client/locales.ts
var SETTINGS_LOCALE_NS = "settings.modelSelectionCollapsible";
var en = {
  nav: "Model selector",
  title: "Model selector",
  intro: "Tune how provider groups are presented without changing model configuration or calls.",
  "scope.browser": "Saved in this browser for the current DSH web address.",
  "scope.memory": "Browser storage is unavailable. Changes last until this page is refreshed or closed.",
  "disclosure.title": "Provider groups",
  "disclosure.description": "Choose which providers are expanded when you open the model list.",
  "disclosure.current": "Current provider",
  "disclosure.current.description": "Expand only the provider of the selected model.",
  "disclosure.all": "All providers",
  "disclosure.all.description": "Start with every provider expanded.",
  "disclosure.none": "All collapsed",
  "disclosure.none.description": "Start with a compact list of provider names.",
  "disclosure.accordion": "One at a time",
  "disclosure.accordion.description": "Keep at most one provider expanded.",
  "density.title": "List density",
  "density.description": "Adjust spacing in provider and model rows.",
  "density.comfortable": "Comfortable",
  "density.comfortable.description": "Roomier rows with model descriptions.",
  "density.compact": "Compact",
  "density.compact.description": "Shorter rows while keeping descriptions available to assistive technology.",
  "motion.title": "Animation",
  "motion.description": "Control provider expand and collapse motion.",
  "motion.system": "Follow system",
  "motion.system.description": "Use smooth motion unless reduced motion is enabled in the system.",
  "motion.none": "Off",
  "motion.none.description": "Apply expand and collapse changes immediately.",
  reset: "Restore defaults"
};
var zh = {
  nav: "\u6A21\u578B\u9009\u62E9\u5668",
  title: "\u6A21\u578B\u9009\u62E9\u5668",
  intro: "\u8C03\u6574\u4F9B\u5E94\u5546\u5206\u7EC4\u7684\u663E\u793A\u65B9\u5F0F\uFF0C\u4E0D\u4F1A\u6539\u53D8\u6A21\u578B\u914D\u7F6E\u6216\u8C03\u7528\u903B\u8F91\u3002",
  "scope.browser": "\u8FD9\u4E9B\u504F\u597D\u4FDD\u5B58\u5728\u5F53\u524D\u6D4F\u89C8\u5668\u4E0E DSH Web \u5730\u5740\u4E2D\u3002",
  "scope.memory": "\u6D4F\u89C8\u5668\u5B58\u50A8\u4E0D\u53EF\u7528\uFF1B\u66F4\u6539\u53EA\u4FDD\u7559\u5230\u5237\u65B0\u6216\u5173\u95ED\u5F53\u524D\u9875\u9762\u3002",
  "disclosure.title": "\u4F9B\u5E94\u5546\u5206\u7EC4",
  "disclosure.description": "\u9009\u62E9\u6BCF\u6B21\u6253\u5F00\u6A21\u578B\u5217\u8868\u65F6\u9ED8\u8BA4\u5C55\u5F00\u54EA\u4E9B\u4F9B\u5E94\u5546\u3002",
  "disclosure.current": "\u5F53\u524D\u4F9B\u5E94\u5546",
  "disclosure.current.description": "\u4EC5\u5C55\u5F00\u5F53\u524D\u6240\u9009\u6A21\u578B\u7684\u4F9B\u5E94\u5546\u3002",
  "disclosure.all": "\u5168\u90E8\u5C55\u5F00",
  "disclosure.all.description": "\u6253\u5F00\u5217\u8868\u65F6\u5C55\u5F00\u6240\u6709\u4F9B\u5E94\u5546\u3002",
  "disclosure.none": "\u5168\u90E8\u6298\u53E0",
  "disclosure.none.description": "\u4EE5\u7CBE\u7B80\u7684\u4F9B\u5E94\u5546\u540D\u79F0\u5217\u8868\u5F00\u59CB\u3002",
  "disclosure.accordion": "\u5355\u7EC4\u5C55\u5F00",
  "disclosure.accordion.description": "\u540C\u4E00\u65F6\u95F4\u6700\u591A\u5C55\u5F00\u4E00\u4E2A\u4F9B\u5E94\u5546\u3002",
  "density.title": "\u5217\u8868\u5BC6\u5EA6",
  "density.description": "\u8C03\u6574\u4F9B\u5E94\u5546\u548C\u6A21\u578B\u884C\u7684\u95F4\u8DDD\u3002",
  "density.comfortable": "\u8212\u9002",
  "density.comfortable.description": "\u4F7F\u7528\u8F83\u5BBD\u677E\u7684\u884C\u8DDD\u5E76\u663E\u793A\u6A21\u578B\u8BF4\u660E\u3002",
  "density.compact": "\u7D27\u51D1",
  "density.compact.description": "\u7F29\u77ED\u884C\u9AD8\uFF0C\u540C\u65F6\u4FDD\u7559\u8F85\u52A9\u6280\u672F\u53EF\u8BFB\u53D6\u7684\u6A21\u578B\u8BF4\u660E\u3002",
  "motion.title": "\u52A8\u753B",
  "motion.description": "\u63A7\u5236\u4F9B\u5E94\u5546\u5C55\u5F00\u548C\u6298\u53E0\u7684\u52A8\u6001\u6548\u679C\u3002",
  "motion.system": "\u8DDF\u968F\u7CFB\u7EDF",
  "motion.system.description": "\u9ED8\u8BA4\u4F7F\u7528\u5E73\u6ED1\u52A8\u753B\uFF1B\u7CFB\u7EDF\u5F00\u542F\u51CF\u5C11\u52A8\u6001\u6548\u679C\u65F6\u81EA\u52A8\u5173\u95ED\u3002",
  "motion.none": "\u5173\u95ED",
  "motion.none.description": "\u7ACB\u5373\u5B8C\u6210\u5C55\u5F00\u548C\u6298\u53E0\u3002",
  reset: "\u6062\u590D\u9ED8\u8BA4\u8BBE\u7F6E"
};
var dictionaries = { zh, en };

// src/client/preferences.ts
var PREFERENCES_STORAGE_KEY = "@local/dsh-ui-model-selection-collapsible/preferences/v1";
var providerDisclosureValues = ["current", "all", "none", "accordion"];
var densityValues = ["comfortable", "compact"];
var motionValues = ["system", "none"];
var DEFAULT_PREFERENCES = Object.freeze({
  providerDisclosure: "current",
  density: "comfortable",
  motion: "system"
});
function memberOf(values, value) {
  return typeof value === "string" && values.includes(value);
}
function decodePreferences(input) {
  if (typeof input !== "object" || input === null) return { ...DEFAULT_PREFERENCES };
  const value = input;
  return {
    providerDisclosure: memberOf(providerDisclosureValues, value.providerDisclosure) ? value.providerDisclosure : DEFAULT_PREFERENCES.providerDisclosure,
    density: memberOf(densityValues, value.density) ? value.density : DEFAULT_PREFERENCES.density,
    motion: memberOf(motionValues, value.motion) ? value.motion : DEFAULT_PREFERENCES.motion
  };
}
function preferencesEqual(left, right) {
  return left.providerDisclosure === right.providerDisclosure && left.density === right.density && left.motion === right.motion;
}
function parseStored(raw) {
  if (raw === null) return { ...DEFAULT_PREFERENCES };
  try {
    return decodePreferences(JSON.parse(raw));
  } catch {
    return void 0;
  }
}
function browserStorage() {
  if (typeof window === "undefined") return void 0;
  try {
    return window.localStorage;
  } catch {
    return void 0;
  }
}
function browserWindow() {
  return typeof window === "undefined" ? void 0 : window;
}
var BrowserPreferencesStore = class {
  constructor(storage = browserStorage(), eventTarget = browserWindow()) {
    this.storage = storage;
    this.eventTarget = eventTarget;
    let value = { ...DEFAULT_PREFERENCES };
    let persistence = "memory";
    if (storage !== void 0) {
      try {
        value = parseStored(storage.getItem(PREFERENCES_STORAGE_KEY)) ?? {
          ...DEFAULT_PREFERENCES
        };
        persistence = "browser";
      } catch {
        persistence = "memory";
      }
    }
    this.snapshot = { value, persistence };
    eventTarget?.addEventListener("storage", this.onStorage);
  }
  listeners = /* @__PURE__ */ new Set();
  snapshot;
  getSnapshot = () => this.snapshot;
  subscribe = (listener) => {
    this.listeners.add(listener);
    return () => this.listeners.delete(listener);
  };
  setPreference(field, value) {
    const next = { ...this.snapshot.value, [field]: value };
    if (preferencesEqual(next, this.snapshot.value)) return;
    this.publish(next, this.persist(next));
  }
  reset() {
    let persistence = this.storage === void 0 ? "memory" : "browser";
    if (this.storage !== void 0) {
      try {
        this.storage.removeItem(PREFERENCES_STORAGE_KEY);
      } catch {
        persistence = "memory";
      }
    }
    this.publish({ ...DEFAULT_PREFERENCES }, persistence);
  }
  dispose() {
    this.eventTarget?.removeEventListener("storage", this.onStorage);
    this.listeners.clear();
  }
  onStorage = (event) => {
    if (this.storage === void 0) return;
    if (event.key !== PREFERENCES_STORAGE_KEY && event.key !== null) return;
    if (event.storageArea !== null && event.storageArea !== this.storage) {
      return;
    }
    const next = parseStored(event.newValue);
    if (next === void 0) return;
    if (preferencesEqual(next, this.snapshot.value) && this.snapshot.persistence === "browser") {
      return;
    }
    this.publish(next, "browser");
  };
  persist(value) {
    if (this.storage === void 0) return "memory";
    try {
      this.storage.setItem(PREFERENCES_STORAGE_KEY, JSON.stringify(value));
      return "browser";
    } catch {
      return "memory";
    }
  }
  publish(value, persistence) {
    if (preferencesEqual(value, this.snapshot.value) && persistence === this.snapshot.persistence) {
      return;
    }
    this.snapshot = { value, persistence };
    for (const listener of this.listeners) listener();
  }
};

// src/client/SettingsSection.tsx
var import_jsx_runtime3 = require("react/jsx-runtime");
function ChoiceGroup({
  field,
  titleKey,
  descriptionKey,
  values,
  value,
  preferences,
  labelKey,
  optionDescriptionKey,
  t
}) {
  const id = (0, import_react3.useId)();
  return /* @__PURE__ */ (0, import_jsx_runtime3.jsxs)("fieldset", { className: styles.settingsGroup, "aria-describedby": `${id}-description`, children: [
    /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("legend", { className: styles.settingsLegend, children: t(titleKey) }),
    /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("p", { id: `${id}-description`, className: styles.settingsDescription, children: t(descriptionKey) }),
    /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("div", { className: styles.settingsChoices, children: values.map((option) => {
      const selected = value === option;
      return /* @__PURE__ */ (0, import_jsx_runtime3.jsxs)("label", { className: styles.settingsChoice, "data-selected": selected, children: [
        /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(
          "input",
          {
            className: styles.settingsRadio,
            type: "radio",
            name: `${id}-${String(field)}`,
            value: String(option),
            checked: selected,
            onChange: () => preferences.setPreference(field, option)
          }
        ),
        /* @__PURE__ */ (0, import_jsx_runtime3.jsxs)("span", { className: styles.settingsChoiceCopy, children: [
          /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("span", { className: styles.settingsChoiceTitle, children: t(labelKey(option)) }),
          /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("span", { className: styles.settingsChoiceDescription, children: t(optionDescriptionKey(option)) })
        ] }),
        /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("span", { className: styles.settingsChoiceCheck, "aria-hidden": "true", children: selected ? /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(import_dsh_client_ui_primitives2.IconCheckOutline16, {}) : null })
      ] }, String(option));
    }) })
  ] });
}
function SettingsSection({ preferences, t }) {
  const snapshot = (0, import_react3.useSyncExternalStore)(preferences.subscribe, preferences.getSnapshot);
  const value = snapshot.value;
  const isDefault = preferencesEqual(value, DEFAULT_PREFERENCES);
  return /* @__PURE__ */ (0, import_jsx_runtime3.jsxs)("div", { className: styles.settingsSection, children: [
    /* @__PURE__ */ (0, import_jsx_runtime3.jsxs)("header", { className: styles.settingsHeader, children: [
      /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("h2", { className: styles.settingsTitle, children: t("title") }),
      /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("p", { className: styles.settingsIntro, children: t("intro") }),
      /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("p", { className: styles.settingsScope, role: "status", children: t(snapshot.persistence === "browser" ? "scope.browser" : "scope.memory") })
    ] }),
    /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(
      ChoiceGroup,
      {
        field: "providerDisclosure",
        titleKey: "disclosure.title",
        descriptionKey: "disclosure.description",
        values: providerDisclosureValues,
        value: value.providerDisclosure,
        preferences,
        labelKey: (option) => `disclosure.${option}`,
        optionDescriptionKey: (option) => `disclosure.${option}.description`,
        t
      }
    ),
    /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(
      ChoiceGroup,
      {
        field: "density",
        titleKey: "density.title",
        descriptionKey: "density.description",
        values: densityValues,
        value: value.density,
        preferences,
        labelKey: (option) => `density.${option}`,
        optionDescriptionKey: (option) => `density.${option}.description`,
        t
      }
    ),
    /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(
      ChoiceGroup,
      {
        field: "motion",
        titleKey: "motion.title",
        descriptionKey: "motion.description",
        values: motionValues,
        value: value.motion,
        preferences,
        labelKey: (option) => `motion.${option}`,
        optionDescriptionKey: (option) => `motion.${option}.description`,
        t
      }
    ),
    /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(
      "button",
      {
        type: "button",
        className: styles.settingsReset,
        disabled: isDefault,
        onClick: () => preferences.reset(),
        children: t("reset")
      }
    )
  ] });
}

// src/client/index.tsx
var inject = ["slots", "sessions", "locale"];
function apply(ctx) {
  const preferences = new BrowserPreferencesStore();
  ctx.effect(
    () => () => preferences.dispose(),
    "ui-model-selection-collapsible: browser preference storage"
  );
  ctx.effect(
    () => ctx.locale.register(SETTINGS_LOCALE_NS, dictionaries),
    "ui-model-selection-collapsible: settings dictionaries"
  );
  ctx.slots.inject(
    "settings.section",
    () => ctx.slots.register(
      {
        name: "settings.section",
        id: "model-selection-collapsible",
        order: 30,
        label: () => ctx.locale.bind(SETTINGS_LOCALE_NS)("nav"),
        locale: SETTINGS_LOCALE_NS,
        inject: () => ({ preferences })
      },
      SettingsSection
    )
  );
  ctx.slots.inject(
    "chat.input.model",
    () => ctx.slots.register(
      {
        name: "chat.input.model",
        locale: "model",
        inject: () => ({ preferences })
      },
      ChatModelSelect
    )
  );
  ctx.inject(["modelDirectories"], (scope) => {
    const models = scope.modelDirectories;
    if (typeof models?.directoryFor !== "function") return;
    const sessions = scope.sessions;
    scope.slots.inject(
      "conversation.input.model",
      () => scope.slots.register(
        {
          name: "conversation.input.model",
          locale: "model",
          priority: -1,
          inject: (sessionId) => {
            const directory = models.directoryFor(sessionId);
            const available = sessions.subagentAddress(sessionId) === void 0;
            return {
              available,
              preferences,
              directory: directory.store,
              load: () => {
                if (available) void directory.load().catch(() => void 0);
              },
              select: (selection) => available ? directory.select(selection).then(
                () => true,
                () => false
              ) : Promise.resolve(false)
            };
          }
        },
        CollapsibleModelSelect
      )
    );
  });
}
return module.exports; } });
//# sourceMappingURL=client.js.map
