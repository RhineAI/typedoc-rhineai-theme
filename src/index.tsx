import { RhineaiTheme } from './rhineai-theme.js'

import type { Application } from 'typedoc'

/**
 * Called by TypeDoc when loading this theme as a plugin
 */
export function load(app: Application) {
  app.renderer.defineTheme('typedoc-rhineai-theme', RhineaiTheme)

  app.on('bootstrapEnd', () => {
    if (app.options.isSet('theme') && app.options.getValue('theme') !== 'typedoc-rhineai-theme') {
      return app.logger.warn(
        `The theme 'typedoc-rhineai-theme' is not used because another theme (${app.options.getValue('theme')}) was specified!`,
      )
    }

    app.options.setValue('theme', 'typedoc-rhineai-theme')
  })
}
