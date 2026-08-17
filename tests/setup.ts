import '@testing-library/jest-dom/vitest'
import { cleanup } from '@testing-library/react'
import { createElement, type HTMLAttributes } from 'react'
import { afterEach, vi } from 'vitest'

afterEach(() => cleanup())

vi.mock('@deepseek-ai/dsh-client-ui-primitives', () => {
  const makeIcon = (name: string) => (props: HTMLAttributes<SVGElement>) =>
    createElement('svg', { ...props, 'aria-hidden': true, 'data-icon': name })

  return {
    IconCheckOutline16: makeIcon('check'),
    IconChevronDownOutline14: makeIcon('chevron-down'),
    IconChevronRightOutline14: makeIcon('chevron-right'),
    IconWarningOutline16: makeIcon('warning'),
    Toast: ({ text }: { text: string }) =>
      createElement('div', { role: 'status', 'data-testid': 'toast' }, text),
  }
})
