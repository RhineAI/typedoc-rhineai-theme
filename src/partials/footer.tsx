import { JSX } from 'typedoc'

import type { RhineaiThemeContext } from '../rhineai-theme-context.js'

export function footer(context: RhineaiThemeContext): JSX.Element {
  return (
    <footer>
      {context.hook('footer.begin', context)}
      {context.hook('footer.end', context)}
    </footer>
  )
}
