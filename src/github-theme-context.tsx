import { DefaultThemeRenderContext } from 'typedoc'

import { footer } from './partials/footer.js'

export class GithubThemeContext extends DefaultThemeRenderContext {
  override footer = () => footer(this)
}
