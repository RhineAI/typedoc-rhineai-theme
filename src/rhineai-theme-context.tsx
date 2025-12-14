import { DefaultThemeRenderContext } from 'typedoc'

import { footer } from './partials/footer.js'

export class RhineaiThemeContext extends DefaultThemeRenderContext {
  override footer = () => footer(this)
}
