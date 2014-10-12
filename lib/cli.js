var vfs = require('vinyl-fs');

var clc = require('cli-color');
var program = require('gitlike-cli');
var blink = require('blink');

var defaultColor = clc.cyan;

function execute(args, exit) {
    return program.version(require('../node_modules/blink/package.json').version).description('Compile Blink stylesheets to CSS ' + defaultColor('(defaults in color)')).usage('<sources>...').action(function (args2, options) {
        var config = new blink.Configuration(options || {});

        vfs.src(args2.sources).pipe(blink(options)).on('error', function (err) {
            if (config.quiet) {
                exit(1);
            }
            if (config.trace) {
                throw err;
            }
            console.log(config.boring ? err.message : clc.red(err.message));
            exit(1);
        }).pipe(vfs.dest(function (file) {
            return file.base;
        })).on('end', function () {
            exit(0);
        });
    }).option('-c, --config <path>', 'Specifly location of config file').option('-q, --quiet', 'Quiet mode').option('-t, --trace', 'Show a full stacktrace on error').option('--boring', 'Turn off colorized output').option('-s, --style <style>', defaultColor('nested') + ', expanded, compact, compressed').option('-i, --one-indent <oneIndent>', defaultColor('2s') + ', 4s, 1t').option('-n, --newline <newline>', defaultColor('os') + ', lf, crlf').option('--quote <type>', defaultColor('double') + ', single').option('-b, --block <format>', 'BEM block format: ' + defaultColor('.%s')).option('-e, --element <format>', 'BEM element format: ' + defaultColor('__%s')).option('-m, --modifier <format>', 'BEM modifier format: ' + defaultColor('--%s')).option('--chrome <version>', 'Minimum Chrome version supported: ' + defaultColor('0')).option('--firefox <version>', 'Minimum Firefox version supported: ' + defaultColor('0')).option('--ie <version>', 'Minimum IE version supported: ' + defaultColor('0')).option('--opera <version>', 'Minimum Opera version supported: ' + defaultColor('0')).option('--safari <version>', 'Minimum Safari version supported: ' + defaultColor('0')).option('--android <version>', 'Minimum Android version supported: ' + defaultColor('0')).option('--firefoxMobile <version>', 'Minimum Firefox Mobile version supported: ' + defaultColor('0')).option('--ieMobile <version>', 'Minimum IE Mobile version supported: ' + defaultColor('0')).option('--operaMobile <version>', 'Minimum Opera Mobile version supported: ' + defaultColor('0')).option('--safariMobile <version>', 'Minimum Safari Mobile version supported: ' + defaultColor('0')).option('--no-webkit-prefix', 'Disable experimental -webkit- prefix').option('--khtml-prefix', 'Enable experimental -khtml- prefix').option('--no-moz-prefix', 'Disable experimental -moz- prefix').option('--no-ms-prefix', 'Disable experimental -ms- prefix').option('--no-o-prefix', 'Disable experimental -o- prefix').on('help', function (cmd) {
        cmd.outputIndented('Examples', [
            '$ blink "app/styles/**/*.js"',
            '$ blink ' + '--style expanded --ie 7 "app/styles/**/*.js"'
        ]);
    }).parse(args);
}
exports.execute = execute;
