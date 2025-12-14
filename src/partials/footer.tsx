import { JSX } from 'typedoc'

import type { GithubThemeContext } from '../github-theme-context.js'

export function footer(context: GithubThemeContext): JSX.Element {
  return (
    <footer>
      {context.hook('footer.begin', context)}
      {context.hook('footer.end', context)}
    </footer>
  )
}
