import { cpSync } from 'fs'
import { dirname, resolve } from 'path'
import { fileURLToPath } from 'url'

// eslint-disable-next-line
import { DefaultTheme, RendererEvent, JSX } from 'typedoc'

import { RhineaiThemeContext } from './rhineai-theme-context.js'

import type { PageEvent, Reflection, Renderer } from 'typedoc'

export class RhineaiTheme extends DefaultTheme {
  constructor(renderer: Renderer) {
    super(renderer)

    // copy the complete assets
    renderer.on(RendererEvent.END, (event) => {
      const from = resolve(dirname(fileURLToPath(import.meta.url)), '../src/assets/')
      const to = resolve(event.outputDirectory, './assets/')

      cpSync(from, to, { recursive: true })

      const publicFrom = resolve(dirname(fileURLToPath(import.meta.url)), '../src/public/')
      const publicTo = resolve(event.outputDirectory, './')

      cpSync(publicFrom, publicTo, { recursive: true })
    })

    // link the css file
    renderer.hooks.on('head.end', (event) => (
      <>
        <link rel='stylesheet' href={event.relativeURL('assets/rhineai-style.css')} />
      </>
    ))

    // set theme
    renderer.application.on('bootstrapEnd', () => {
      if (!this.application.options.isSet('lightHighlightTheme')) {
        this.application.options.setValue('lightHighlightTheme', 'github-light-default')
      }

      if (!this.application.options.isSet('darkHighlightTheme')) {
        this.application.options.setValue('darkHighlightTheme', 'github-dark-default')
      }
    })
  }

  getRenderContext(pageEvent: PageEvent<Reflection>) {
    return new RhineaiThemeContext(this.router, this, pageEvent, this.application.options)
  }
}
