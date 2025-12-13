import { JSX } from 'typedoc'

import type { GithubThemeContext } from '../github-theme-context.js'

export function footer(context: GithubThemeContext) {
  return (
    <footer>
      {context.hook('footer.begin', context)}
      {generatorDisplay(context)}
      {customFooterDisplay(context)}
      {context.hook('footer.end', context)}
    </footer>
  )
}

function generatorDisplay(context: GithubThemeContext) {
  if (context.options.getValue('hideGenerator')) {
    return <></>
  }

  return (
    <p class='tsd-generator'>
      {'Generated using '}
      <a href='https://typedoc.org/' target='_blank'>
        TypeDoc
      </a>
      {' with '}
      <a href='https://github.com/JulianWowra/typedoc-github-theme' target='_blank'>
        typedoc-github-theme
      </a>
    </p>
  )
}

function customFooterDisplay(context: GithubThemeContext) {
  const customFooterHtml = context.options.getValue('customFooterHtml')

  if (!customFooterHtml) {
    return <></>
  }

  if (context.options.getValue('customFooterHtmlDisableWrapper')) {
    return <JSX.Raw html={customFooterHtml} />
  }

  return (
    <p>
      <JSX.Raw html={customFooterHtml} />
    </p>
  )
}
