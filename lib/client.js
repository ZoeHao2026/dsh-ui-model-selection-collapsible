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
  tag.textContent = ".dsh-cmsc-root {\n  min-width: 0;\n  position: relative;\n  --dsh-cmsc-motion-duration: 160ms;\n  --dsh-cmsc-motion-easing: cubic-bezier(0.4, 0, 0.6, 1);\n}\n\n.dsh-cmsc-trigger {\n  min-width: 0;\n  max-width: 220px;\n  height: 28px;\n  color: var(--dsw-alias-label-secondary);\n  cursor: pointer;\n  background: transparent;\n  border: 0;\n  border-radius: 24px;\n  outline: none;\n  display: flex;\n  align-items: center;\n  gap: 4px;\n  padding: 0 4px 0 8px;\n  font-size: 13px;\n  font-weight: 500;\n  line-height: 20px;\n}\n\n.dsh-cmsc-trigger:hover:not(:disabled),\n.dsh-cmsc-trigger:focus-visible {\n  background: var(--dsw-alias-interactive-bg-hover);\n}\n\n.dsh-cmsc-trigger:focus-visible {\n  box-shadow: 0 0 0 2px var(--dsw-alias-border-l3);\n}\n\n.dsh-cmsc-trigger:disabled {\n  color: var(--dsw-alias-label-dimmed);\n  cursor: default;\n}\n\n.dsh-cmsc-triggerLabel {\n  min-width: 0;\n  overflow: hidden;\n  text-overflow: ellipsis;\n  white-space: nowrap;\n}\n\n.dsh-cmsc-triggerEffort,\n.dsh-cmsc-chevron,\n.dsh-cmsc-cellChevron {\n  color: var(--dsw-alias-label-caption);\n  flex: none;\n}\n\n.dsh-cmsc-chevron {\n  transition: transform var(--dsh-cmsc-motion-duration) var(--dsh-cmsc-motion-easing);\n}\n\n.dsh-cmsc-chevronOpen {\n  transform: rotate(180deg);\n}\n\n.dsh-cmsc-menu {\n  z-index: 20;\n  width: min(260px, calc(100vw - 32px));\n  max-height: min(420px, calc(100vh - 96px));\n  position: absolute;\n  right: 0;\n  bottom: calc(100% + 8px);\n  overflow: hidden;\n  display: flex;\n  flex-direction: column;\n  padding: 4px;\n  color: var(--dsw-alias-label-primary);\n  background: var(--dsw-specific-menu);\n  border: 1px solid var(--dsw-alias-border-inverted);\n  border-radius: 12px;\n  box-shadow: var(--dsw-shadow-lv3);\n  --dsh-scrollbar-thumb: var(--dsw-alias-scrollbar-bg-l2);\n  --dsh-scrollbar-thumb-hover: var(--dsw-alias-scrollbar-hover-l2);\n}\n\n.dsh-cmsc-status,\n.dsh-cmsc-empty {\n  padding: 10px;\n  color: var(--dsw-alias-label-tertiary);\n  font-size: 13px;\n  line-height: 20px;\n}\n\n.dsh-cmsc-error,\n.dsh-cmsc-warning {\n  display: flex;\n  align-items: flex-start;\n  justify-content: space-between;\n  gap: 8px;\n  margin-bottom: 4px;\n  padding: 7px 8px;\n  color: var(--dsw-alias-state-error-primary);\n  background: var(--dsw-alias-interactive-bg-hover-danger);\n  border-radius: 8px;\n  font-size: 12px;\n  line-height: 18px;\n}\n\n.dsh-cmsc-warning {\n  color: var(--dsw-alias-state-warn-label);\n  background: var(--dsw-alias-bg-module-platform);\n}\n\n.dsh-cmsc-retry {\n  flex: none;\n  padding: 0;\n  color: inherit;\n  cursor: pointer;\n  background: transparent;\n  border: 0;\n  font: inherit;\n  font-weight: 600;\n}\n\n.dsh-cmsc-retry:focus-visible {\n  outline: 2px solid currentColor;\n  outline-offset: 2px;\n}\n\n.dsh-cmsc-groups {\n  min-height: 0;\n  overflow-y: auto;\n}\n\n.dsh-cmsc-group + .dsh-cmsc-group {\n  margin-top: 4px;\n}\n\n.dsh-cmsc-groupHeader {\n  width: 100%;\n  min-height: 32px;\n  display: flex;\n  align-items: center;\n  gap: 6px;\n  padding: 5px 8px;\n  color: var(--dsw-alias-label-secondary);\n  text-align: left;\n  cursor: pointer;\n  background: transparent;\n  border: 0;\n  border-radius: 8px;\n  outline: none;\n  font-size: 13px;\n  font-weight: 600;\n  line-height: 20px;\n}\n\n.dsh-cmsc-groupHeader:hover:not(:disabled),\n.dsh-cmsc-groupHeader:focus-visible {\n  background: var(--dsw-alias-interactive-bg-hover);\n}\n\n.dsh-cmsc-groupHeader:disabled {\n  color: var(--dsw-alias-label-dimmed);\n  cursor: default;\n}\n\n.dsh-cmsc-groupTitle {\n  min-width: 0;\n  flex: 1;\n  overflow: hidden;\n  color: var(--dsw-alias-label-primary);\n  text-overflow: ellipsis;\n  white-space: nowrap;\n}\n\n.dsh-cmsc-groupCount {\n  flex: none;\n  color: var(--dsw-alias-label-caption);\n  font-size: 12px;\n  font-weight: 400;\n  line-height: 18px;\n}\n\n.dsh-cmsc-groupBody {\n  min-width: 0;\n  display: grid;\n  grid-template-rows: 1fr;\n  opacity: 1;\n  visibility: visible;\n  pointer-events: auto;\n  transition:\n    grid-template-rows var(--dsh-cmsc-motion-duration) var(--dsh-cmsc-motion-easing),\n    opacity var(--dsh-cmsc-motion-duration) var(--dsh-cmsc-motion-easing),\n    visibility 0s linear 0s;\n}\n\n.dsh-cmsc-groupBody[data-expanded='false'] {\n  grid-template-rows: 0fr;\n  opacity: 0;\n  visibility: hidden;\n  pointer-events: none;\n  transition:\n    grid-template-rows var(--dsh-cmsc-motion-duration) var(--dsh-cmsc-motion-easing),\n    opacity var(--dsh-cmsc-motion-duration) var(--dsh-cmsc-motion-easing),\n    visibility 0s linear var(--dsh-cmsc-motion-duration);\n}\n\n.dsh-cmsc-groupBodyInner {\n  min-height: 0;\n  overflow: hidden;\n  display: flex;\n  flex-direction: column;\n  transform: translateY(0);\n  transition: transform var(--dsh-cmsc-motion-duration) var(--dsh-cmsc-motion-easing);\n}\n\n.dsh-cmsc-groupBody[data-expanded='false'] .dsh-cmsc-groupBodyInner {\n  transform: translateY(-4px);\n}\n\n.dsh-cmsc-option {\n  width: 100%;\n  min-height: 38px;\n  display: flex;\n  align-items: center;\n  gap: 8px;\n  padding: 6px 8px;\n  color: inherit;\n  text-align: left;\n  cursor: pointer;\n  background: transparent;\n  border: 0;\n  border-radius: 10px;\n  outline: none;\n}\n\n.dsh-cmsc-option:hover:not(:disabled),\n.dsh-cmsc-option:focus-visible,\n.dsh-cmsc-selected {\n  background: var(--dsw-alias-interactive-bg-hover);\n}\n\n.dsh-cmsc-option:disabled {\n  color: var(--dsw-alias-label-dimmed);\n  cursor: default;\n}\n\n.dsh-cmsc-optionCopy {\n  min-width: 0;\n  flex: 1;\n  display: flex;\n  flex-direction: column;\n}\n\n.dsh-cmsc-modelName,\n.dsh-cmsc-description {\n  overflow: hidden;\n  text-overflow: ellipsis;\n  white-space: nowrap;\n}\n\n.dsh-cmsc-modelName {\n  color: inherit;\n  font-size: 14px;\n  font-weight: 500;\n  line-height: 20px;\n}\n\n.dsh-cmsc-description {\n  color: var(--dsw-alias-label-tertiary);\n  font-size: 12px;\n  line-height: 18px;\n}\n\n.dsh-cmsc-check {\n  flex: 0 0 18px;\n  display: grid;\n  place-items: center;\n  color: var(--dsw-alias-label-primary);\n}\n\n.dsh-cmsc-cell {\n  width: 100%;\n  height: 40px;\n  display: flex;\n  align-items: center;\n  gap: 8px;\n  padding: 0 10px;\n  color: var(--dsw-alias-label-primary);\n  cursor: pointer;\n  text-align: left;\n  background: transparent;\n  border: 0;\n  border-radius: 10px;\n  outline: none;\n  font-size: 14px;\n  line-height: 22px;\n}\n\n.dsh-cmsc-cell:hover,\n.dsh-cmsc-cell:focus-visible {\n  background: var(--dsw-alias-interactive-bg-hover);\n}\n\n.dsh-cmsc-cellLabel,\n.dsh-cmsc-cellValue {\n  min-width: 0;\n  overflow: hidden;\n  text-overflow: ellipsis;\n  white-space: nowrap;\n}\n\n.dsh-cmsc-cellLabel {\n  flex: auto;\n}\n\n.dsh-cmsc-cellValue {\n  flex: 0 1 auto;\n  color: var(--dsw-alias-label-tertiary);\n}\n\n@media (prefers-reduced-motion: reduce) {\n  .dsh-cmsc-chevron,\n  .dsh-cmsc-groupBody,\n  .dsh-cmsc-groupBody[data-expanded='false'],\n  .dsh-cmsc-groupBodyInner {\n    transition: none;\n  }\n\n  .dsh-cmsc-groupBodyInner,\n  .dsh-cmsc-groupBody[data-expanded='false'] .dsh-cmsc-groupBodyInner {\n    transform: none;\n  }\n}\n";
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
function defaultExpanded(current) {
  return current === void 0 ? /* @__PURE__ */ new Set() : /* @__PURE__ */ new Set([current.group.id]);
}
function toggled(expanded, providerId) {
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
  cellChevron: "dsh-cmsc-cellChevron"
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
  t
}) {
  const state = (0, import_react.useSyncExternalStore)(
    (notify) => directory.subscribe(notify),
    () => directory.getSnapshot()
  );
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
    setExpanded(currentProviderId === void 0 ? /* @__PURE__ */ new Set() : /* @__PURE__ */ new Set([currentProviderId]));
  }, [pane, currentProviderId]);
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
    setExpanded(defaultExpanded(currentChoice));
    setPane("model");
    focusBoundary("first");
  };
  const enterEffortPane = () => {
    setPane("effort");
    focusBoundary("first");
  };
  const toggleGroup = (groupId) => {
    groupTouchedRef.current = true;
    setExpanded((previous) => toggled(previous, groupId));
  };
  const modelLabel = currentChoice?.model.name ?? t("trigger.fallback");
  const triggerLabel = effortLabel === void 0 ? modelLabel : `${modelLabel} \xB7 ${effortLabel}`;
  const triggerAria = currentChoice === void 0 ? t("trigger.selectAria") : effortLabel === void 0 ? t("trigger.aria", { model: modelLabel }) : t("trigger.ariaEffort", { model: modelLabel, effort: effortLabel });
  return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { ref: rootRef, className: styles.root, onKeyDown: onRootKeyDown, onBlur, children: [
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
            /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: clsx_default(styles.groups, "scrollable"), children: state.groups.map((group) => {
              const headingId = `${id}-${group.id}-header`;
              const listId = `${id}-${group.id}-models`;
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
                    children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: styles.groupBodyInner, children: group.models.map((model) => {
                      const selected = state.current?.provider === group.id && state.current.model === model.id;
                      return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(
                        "button",
                        {
                          type: "button",
                          role: "menuitemradio",
                          "aria-label": model.description === void 0 ? model.name : `${model.name} ${model.description}`,
                          "aria-checked": selected,
                          className: clsx_default(styles.option, selected && styles.selected),
                          title: model.name,
                          tabIndex: groupOpen ? void 0 : -1,
                          disabled: busy,
                          onClick: () => choose({ provider: group.id, model: model.id }),
                          children: [
                            /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { className: styles.optionCopy, children: [
                              /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: styles.modelName, children: model.name }),
                              model.description === void 0 ? null : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: styles.description, children: model.description })
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
  ] });
}

// src/client/index.tsx
var inject = ["slots", "sessions", "locale"];
function apply(ctx) {
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
