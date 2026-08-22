import type { ModelSelection } from '@deepseek-ai/dsh-api-remotes/client'
import type { ObservableSnapshot } from '@deepseek-ai/dsh-client-runtime/client'
import type {
  ModelDirectoryState,
  ModelSelectInjected,
} from '@deepseek-ai/dsh-client-ui-model-selection/client'
import type { PropsLocale } from '@deepseek-ai/dsh-client-ui-slots'
import {
  IconCheckOutline16,
  IconChevronDownOutline14,
  IconChevronRightOutline14,
  IconWarningOutline16,
  Toast,
} from '@deepseek-ai/dsh-client-ui-primitives'
import clsx from 'clsx'
import {
  useEffect,
  useId,
  useMemo,
  useRef,
  useState,
  useSyncExternalStore,
  type FocusEvent,
  type KeyboardEvent,
} from 'react'

import './styles.css'
import { choicesOf, currentChoiceOf, defaultExpanded, toggled } from './model-state.js'
import type { PreferencesStore } from './preferences.js'
import { styles } from './styles.js'

type Pane = 'root' | 'model' | 'effort'
export type CollapsibleModelSelectProps = Omit<ModelSelectInjected, 'directory'> &
  { directory: ObservableSnapshot<ModelDirectoryState> } &
  { locked: boolean; preferences: PreferencesStore } &
  PropsLocale<'model'>

interface EffortChoice {
  key: string
  effort: string | undefined
  label: string
  description?: string
}

interface ToastState {
  seq: number
  text: string
}

const MENU_ITEM_SELECTOR = '[role="menuitem"],[role="menuitemradio"]'

export function CollapsibleModelSelect({
  locked,
  available,
  directory,
  load,
  select,
  preferences,
  t,
}: CollapsibleModelSelectProps) {
  const state = useSyncExternalStore(
    (notify) => directory.subscribe(notify),
    () => directory.getSnapshot(),
  )
  const preferenceSnapshot = useSyncExternalStore(
    preferences.subscribe,
    preferences.getSnapshot,
  )
  const preference = preferenceSnapshot.value
  const [open, setOpen] = useState(false)
  const [pane, setPane] = useState<Pane>('root')
  const [expanded, setExpanded] = useState<Set<string>>(() => new Set())
  const [toast, setToast] = useState<ToastState | null>(null)
  const lastActionRef = useRef<'load' | 'select'>('load')
  const toastSeq = useRef(0)
  const groupTouchedRef = useRef(false)
  const rootRef = useRef<HTMLDivElement>(null)
  const menuRef = useRef<HTMLDivElement>(null)
  const triggerRef = useRef<HTMLButtonElement>(null)
  const id = useId()

  const choices = useMemo(() => choicesOf(state.groups), [state.groups])
  const currentChoice = currentChoiceOf(choices, state.current)
  const currentProviderId = currentChoice?.group.id
  const reasoning = currentChoice?.model.reasoning
  const effectiveEffort = state.current?.reasoningEffort ?? reasoning?.defaultEffort
  const effortLabel =
    reasoning === undefined
      ? undefined
      : effectiveEffort === undefined
        ? t('effort.providerDefault')
        : (reasoning.efforts.find((level) => level.id === effectiveEffort)?.name ?? effectiveEffort)
  const effortChoices = useMemo<EffortChoice[]>(
    () =>
      reasoning === undefined
        ? []
        : [
            ...(reasoning.defaultEffort === undefined
              ? [
                  {
                    key: 'provider-default',
                    effort: undefined,
                    label: t('effort.providerDefault'),
                  },
                ]
              : []),
            ...reasoning.efforts.map((effort) => ({
              key: `effort:${effort.id}`,
              effort: effort.id,
              label: effort.name,
              ...(effort.description === undefined ? {} : { description: effort.description }),
            })),
          ],
    [reasoning, t],
  )
  const busy = state.status === 'selecting'

  const reload = () => {
    lastActionRef.current = 'load'
    load()
  }

  useEffect(() => {
    if (!available) return
    lastActionRef.current = 'load'
    load()
  }, [available, load])

  useEffect(() => {
    if (!open) return
    const closeOutside = (event: MouseEvent) => {
      if (event.target instanceof Node && !rootRef.current?.contains(event.target)) {
        setOpen(false)
        setPane('root')
      }
    }
    document.addEventListener('mousedown', closeOutside)
    return () => document.removeEventListener('mousedown', closeOutside)
  }, [open])

  useEffect(() => {
    if (pane !== 'model' || groupTouchedRef.current) return
    setExpanded(defaultExpanded(currentChoice, state.groups, preference.providerDisclosure))
  }, [pane, currentChoice, state.groups, preference.providerDisclosure])

  if (!available) return null

  const menuItems = (): HTMLElement[] => {
    if (menuRef.current === null) return []
    return Array.from(menuRef.current.querySelectorAll<HTMLElement>(MENU_ITEM_SELECTOR)).filter(
      (item) =>
        !item.matches(':disabled') &&
        item.closest('[hidden],[inert],[aria-hidden="true"],[data-expanded="false"]') === null,
    )
  }

  const focusBoundary = (boundary: 'first' | 'last') => {
    queueMicrotask(() => {
      const items = menuItems()
      items[boundary === 'first' ? 0 : items.length - 1]?.focus()
    })
  }

  const close = (restoreFocus = false) => {
    setOpen(false)
    setPane('root')
    if (restoreFocus) queueMicrotask(() => triggerRef.current?.focus())
  }

  const show = () => {
    setPane('root')
    setOpen(true)
    reload()
  }

  const moveFocus = (direction: -1 | 1) => {
    const items = menuItems()
    if (items.length === 0) return
    const active = items.findIndex((item) => item === document.activeElement)
    const next = active === -1 ? (direction === 1 ? 0 : items.length - 1) : (active + direction + items.length) % items.length
    items[next]?.focus()
  }

  const onRootKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    if (event.key === 'Escape' && open) {
      event.preventDefault()
      if (pane === 'root') close(true)
      else {
        setPane('root')
        focusBoundary('first')
      }
      return
    }
    if (!open) return
    if (event.key === 'ArrowDown' || event.key === 'ArrowUp') {
      event.preventDefault()
      moveFocus(event.key === 'ArrowDown' ? 1 : -1)
    } else if (event.key === 'Home' || event.key === 'End') {
      event.preventDefault()
      focusBoundary(event.key === 'Home' ? 'first' : 'last')
    }
  }

  const onBlur = (event: FocusEvent<HTMLDivElement>) => {
    if (event.relatedTarget instanceof Node && rootRef.current?.contains(event.relatedTarget)) return
    close()
  }

  const settleSelection = (accepted: boolean) => {
    if (accepted) {
      close(true)
      return
    }
    const message = directory.getSnapshot().error
    if (message === null) return
    toastSeq.current += 1
    setToast({ seq: toastSeq.current, text: t('error.action', { message }) })
  }

  const choose = (selection: ModelSelection) => {
    if (
      state.current?.provider === selection.provider &&
      state.current.model === selection.model
    ) {
      close(true)
      return
    }
    lastActionRef.current = 'select'
    void select(selection).then(settleSelection)
  }

  const chooseEffort = (effort: string | undefined) => {
    if (state.current === null) return
    if (effectiveEffort === effort) {
      close(true)
      return
    }
    lastActionRef.current = 'select'
    void select({
      provider: state.current.provider,
      model: state.current.model,
      ...(effort === undefined ? {} : { reasoningEffort: effort }),
    }).then(settleSelection)
  }

  const enterModelPane = () => {
    groupTouchedRef.current = false
    setExpanded(defaultExpanded(currentChoice, state.groups, preference.providerDisclosure))
    setPane('model')
    focusBoundary('first')
  }

  const enterEffortPane = () => {
    setPane('effort')
    focusBoundary('first')
  }

  const toggleGroup = (groupId: string) => {
    groupTouchedRef.current = true
    setExpanded((previous) => toggled(previous, groupId, preference.providerDisclosure))
  }

  const modelLabel = currentChoice?.model.name ?? t('trigger.fallback')
  const triggerLabel = effortLabel === undefined ? modelLabel : `${modelLabel} · ${effortLabel}`
  const triggerAria =
    currentChoice === undefined
      ? t('trigger.selectAria')
      : effortLabel === undefined
        ? t('trigger.aria', { model: modelLabel })
        : t('trigger.ariaEffort', { model: modelLabel, effort: effortLabel })

  return (
    <div
      ref={rootRef}
      className={styles.root}
      data-density={preference.density}
      data-motion={preference.motion}
      onKeyDown={onRootKeyDown}
      onBlur={onBlur}
    >
      <button
        ref={triggerRef}
        type="button"
        className={styles.trigger}
        aria-label={triggerAria}
        aria-haspopup="menu"
        aria-expanded={open}
        aria-controls={open ? `${id}-menu` : undefined}
        title={triggerLabel}
        disabled={locked}
        onClick={() => (open ? close() : show())}
        onKeyDown={(event) => {
          if (open || (event.key !== 'ArrowDown' && event.key !== 'ArrowUp')) return
          event.preventDefault()
          event.stopPropagation()
          show()
          focusBoundary(event.key === 'ArrowDown' ? 'first' : 'last')
        }}
      >
        <span className={styles.triggerLabel}>{modelLabel}</span>
        {effortLabel === undefined ? null : (
          <span className={styles.triggerEffort}>{effortLabel}</span>
        )}
        <IconChevronDownOutline14
          className={clsx(styles.chevron, open && styles.chevronOpen)}
        />
      </button>

      {open ? (
        <div
          ref={menuRef}
          id={`${id}-menu`}
          className={styles.menu}
          role="menu"
          aria-label={t('menu.aria')}
          aria-busy={state.status === 'loading' || busy}
        >
          {pane === 'root' ? (
            <>
              <button type="button" role="menuitem" className={styles.cell} onClick={enterModelPane}>
                <span className={styles.cellLabel}>{t('menu.model')}</span>
                <span className={styles.cellValue}>{modelLabel}</span>
                <IconChevronRightOutline14 className={styles.cellChevron} />
              </button>
              {reasoning === undefined ? null : (
                <button type="button" role="menuitem" className={styles.cell} onClick={enterEffortPane}>
                  <span className={styles.cellLabel}>{t('menu.effort')}</span>
                  <span className={styles.cellValue}>{effortLabel}</span>
                  <IconChevronRightOutline14 className={styles.cellChevron} />
                </button>
              )}
            </>
          ) : null}

          {pane === 'model' ? (
            <>
              {state.status === 'loading' ? (
                <div className={styles.status} role="status">
                  {t('status.loading')}
                </div>
              ) : null}
              {state.error !== null && lastActionRef.current === 'load' ? (
                <div className={styles.error} role="alert">
                  <span>{t('error.action', { message: state.error })}</span>
                  <button type="button" role="menuitem" className={styles.retry} onClick={reload}>
                    {t('action.reload')}
                  </button>
                </div>
              ) : null}
              {state.failures.map((failure) => (
                <div className={styles.warning} role="status" key={failure.id}>
                  <span>
                    {t('warning.groupLoad', { name: failure.name, message: failure.message })}
                  </span>
                  <button type="button" role="menuitem" className={styles.retry} onClick={reload}>
                    {t('action.reload')}
                  </button>
                </div>
              ))}
              <div className={clsx(styles.groups, 'scrollable')}>
                {state.groups.map((group, groupIndex) => {
                  const headingId = `${id}-group-${groupIndex}-header`
                  const listId = `${id}-group-${groupIndex}-models`
                  const groupOpen = expanded.has(group.id)
                  return (
                    <div role="presentation" className={styles.group} key={group.id}>
                      <button
                        type="button"
                        role="menuitem"
                        id={headingId}
                        className={styles.groupHeader}
                        aria-label={`${group.name} ${group.models.length}`}
                        aria-expanded={groupOpen}
                        aria-controls={listId}
                        disabled={busy}
                        onClick={() => toggleGroup(group.id)}
                      >
                        <span className={styles.groupTitle}>{group.name}</span>
                        <span className={styles.groupCount}>{group.models.length}</span>
                        <IconChevronDownOutline14
                          className={clsx(styles.chevron, groupOpen && styles.chevronOpen)}
                        />
                      </button>
                      <div
                        ref={(node) => node?.toggleAttribute('inert', !groupOpen)}
                        id={listId}
                        role="group"
                        aria-labelledby={headingId}
                        aria-hidden={!groupOpen}
                        data-expanded={groupOpen}
                        className={styles.groupBody}
                      >
                        <div className={styles.groupBodyInner}>
                          {group.models.map((model, modelIndex) => {
                            const selected =
                              state.current?.provider === group.id && state.current.model === model.id
                            const descriptionId = `${listId}-model-${modelIndex}-description`
                            return (
                              <button
                                type="button"
                                role="menuitemradio"
                                aria-label={model.name}
                                aria-describedby={
                                  model.description === undefined ? undefined : descriptionId
                                }
                                aria-checked={selected}
                                className={clsx(styles.option, selected && styles.selected)}
                                title={
                                  model.description === undefined
                                    ? model.name
                                    : `${model.name} — ${model.description}`
                                }
                                tabIndex={groupOpen ? undefined : -1}
                                disabled={busy}
                                onClick={() => choose({ provider: group.id, model: model.id })}
                                key={`${group.id}/${model.id}`}
                              >
                                <span className={styles.optionCopy}>
                                  <span className={styles.modelName}>{model.name}</span>
                                  {model.description === undefined ? null : (
                                    <span id={descriptionId} className={styles.description}>
                                      {model.description}
                                    </span>
                                  )}
                                </span>
                                <span className={styles.check}>
                                  {selected ? <IconCheckOutline16 /> : null}
                                </span>
                              </button>
                            )
                          })}
                        </div>
                      </div>
                    </div>
                  )
                })}
              </div>
              {state.status === 'ready' && choices.length === 0 ? (
                <div className={styles.empty}>{t('empty.models')}</div>
              ) : null}
            </>
          ) : null}

          {pane === 'effort' ? (
            <>
              {state.error !== null && lastActionRef.current === 'load' ? (
                <div className={styles.error} role="alert">
                  <span>{t('error.action', { message: state.error })}</span>
                  <button type="button" role="menuitem" className={styles.retry} onClick={reload}>
                    {t('action.reload')}
                  </button>
                </div>
              ) : null}
              {effortChoices.length === 0 ? (
                <div className={styles.empty}>{t('empty.efforts')}</div>
              ) : (
                effortChoices.map((level) => (
                  <button
                    type="button"
                    role="menuitemradio"
                    aria-checked={effectiveEffort === level.effort}
                    className={clsx(styles.option, effectiveEffort === level.effort && styles.selected)}
                    disabled={busy}
                    onClick={() => chooseEffort(level.effort)}
                    key={level.key}
                  >
                    <span className={styles.optionCopy}>
                      <span className={styles.modelName}>{level.label}</span>
                      {level.description === undefined ? null : (
                        <span className={styles.description}>{level.description}</span>
                      )}
                    </span>
                    <span className={styles.check}>
                      {effectiveEffort === level.effort ? <IconCheckOutline16 /> : null}
                    </span>
                  </button>
                ))
              )}
            </>
          ) : null}
        </div>
      ) : null}

      {toast === null ? null : (
        <Toast
          key={toast.seq}
          text={toast.text}
          icon={<IconWarningOutline16 />}
          anchor={rootRef.current?.closest<HTMLElement>('[data-composer-card]') ?? null}
          onDone={() => setToast(null)}
        />
      )}
    </div>
  )
}
