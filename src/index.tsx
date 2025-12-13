import type { Application } from 'typedoc';
import { GithubTheme } from './github-theme.js';

/**
 * Called by TypeDoc when loading this theme as a plugin
 */
export function load(app: Application) {
	app.renderer.defineTheme('typedoc-github-theme', GithubTheme);

	app.on('bootstrapEnd', () => {
		if (app.options.isSet('theme') && app.options.getValue('theme') !== 'typedoc-github-theme') {
			return app.logger.warn(
				`The theme 'typedoc-github-theme' is not used because another theme (${app.options.getValue('theme')}) was specified!`
			);
		}

		app.options.setValue('theme', 'typedoc-github-theme');
	});
}
