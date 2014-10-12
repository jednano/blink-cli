///<reference path="../node_modules/blink/blink.d.ts"/>
///<reference path="../node_modules/blink/bower_components/dt-vinyl/vinyl.d.ts"/>
import fs = require('fs');
import path = require('path');
var vfs = require('vinyl-fs');

var clc = require('cli-color');
var program = require('gitlike-cli');
import blink = require('blink');


var defaultColor = clc.cyan;

export function execute(args: string[], exit: (exitCode: number) => void): number {

	return program
		.version(require('../node_modules/blink/package.json').version)
		.description('Compile Blink stylesheets to CSS ' + defaultColor('(defaults in color)'))
		.usage('<sources>...')
		.action((args2, options: blink.ConfigurationOptions) => {

			var config = new blink.Configuration(options || {});

			vfs.src(args2.sources)
				.pipe(blink(options))
				.on('error', (err: Error) => {
					if (config.quiet) {
						exit(1);
					}
					if (config.trace) {
						throw err;
					}
					console.log(config.boring ? err.message : clc.red(err.message));
					exit(1);
				})
				.pipe(vfs.dest((file: Vinyl.IFile) => {
					return file.base;
				}))
				.on('end', () => {
					exit(0);
				});
		})

		//// Configuration
		.option('-c, --config <path>', 'Specifly location of config file')
		//.option('--env <target>',      defaultColor('dev') + ', prod')
		.option('-q, --quiet', 'Quiet mode')
		.option('-t, --trace', 'Show a full stacktrace on error')
		//.option('-f, --force', 'Overwrites existing files')
		//.option('--dry-run',   'Tells you what it plans to do')
		.option('--boring', 'Turn off colorized output')

		// Formatting
		.option('-s, --style <style>', defaultColor('nested') + ', expanded, compact, compressed')
		.option('-i, --one-indent <oneIndent>', defaultColor('2s') + ', 4s, 1t')
		.option('-n, --newline <newline>', defaultColor('os') + ', lf, crlf')
		.option('--quote <type>', defaultColor('double') + ', single')

		// BEM support
		.option('-b, --block <format>', 'BEM block format: ' + defaultColor('.%s'))
		.option('-e, --element <format>', 'BEM element format: ' + defaultColor('__%s'))
		.option('-m, --modifier <format>', 'BEM modifier format: ' + defaultColor('--%s'))

		// Legacy browser support
		.option('--chrome <version>', 'Minimum Chrome version supported: ' + defaultColor('0'))
		.option('--firefox <version>', 'Minimum Firefox version supported: ' + defaultColor('0'))
		.option('--ie <version>', 'Minimum IE version supported: ' + defaultColor('0'))
		.option('--opera <version>', 'Minimum Opera version supported: ' + defaultColor('0'))
		.option('--safari <version>', 'Minimum Safari version supported: ' + defaultColor('0'))

		// Legacy mobile browser support
		.option('--android <version>', 'Minimum Android version supported: ' + defaultColor('0'))
		.option('--firefoxMobile <version>', 'Minimum Firefox Mobile version supported: ' + defaultColor('0'))
		.option('--ieMobile <version>', 'Minimum IE Mobile version supported: ' + defaultColor('0'))
		.option('--operaMobile <version>', 'Minimum Opera Mobile version supported: ' + defaultColor('0'))
		.option('--safariMobile <version>', 'Minimum Safari Mobile version supported: ' + defaultColor('0'))

		// Experimental support
		.option('--no-webkit-prefix', 'Disable experimental -webkit- prefix')
		.option('--khtml-prefix', 'Enable experimental -khtml- prefix')
		.option('--no-moz-prefix', 'Disable experimental -moz- prefix')
		.option('--no-ms-prefix', 'Disable experimental -ms- prefix')
		.option('--no-o-prefix', 'Disable experimental -o- prefix')
		.on('help', cmd => {
			cmd.outputIndented('Examples', [
				'$ blink "app/styles/**/*.js"',
				'$ blink ' + '--style expanded --ie 7 "app/styles/**/*.js"'
			]);
		})
		.parse(args);
}
