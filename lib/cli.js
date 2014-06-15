///<reference path="../node_modules/blink/blink.d.ts"/>
var fs = require('fs');

var clc = require('cli-color');
var program = require('gitlike-cli');
var blink = require('blink');

var defaultColor = clc.cyan;

function execute(args, callback) {
    return program.version(require('../node_modules/blink/package.json').version).command('compile <sources>...').description('Compile Blink stylesheets to CSS ' + defaultColor('(defaults in color)')).action(function (args2, options) {
        var sources = args2.sources;
        var count = sources.length;
        blink.compile(options, args2.sources, function (err, config, result) {
            function logError(err2) {
                if (!err2 || config.quiet) {
                    return;
                }
                if (config.trace) {
                    throw err2;
                }
                var message = err2.message;
                if (result.src) {
                    message = result.src + ': ' + message;
                }
                if (!config.boring) {
                    message = clc.red(message);
                }
                console.log(message);
            }

            function writeFile() {
                fs.writeFile(result.dest, result.contents, function (err2) {
                    logError(err2);
                    if (--count === 0) {
                        callback(0);
                    }
                });
            }

            logError(err);

            if (err || !result) {
                return;
            }

            if (!result.dest) {
                console.log(result.contents || '');
                return;
            }

            if (config.force) {
                writeFile();
            } else {
                fs.exists(result.dest, function (exists) {
                    if (!exists) {
                        writeFile();
                    }
                });
            }
        });
    }).option('-c, --config <path>', 'Specifly location of config file').option('-q, --quiet', 'Quiet mode').option('-t, --trace', 'Show a full stacktrace on error').option('-f, --force', 'Overwrites existing files').option('--boring', 'Turn off colorized output').option('-s, --style <style>', defaultColor('nested') + ', expanded, compact, compressed').option('-i, --one-indent <oneIndent>', defaultColor('2s') + ', 4s, 1t').option('-n, --newline <newline>', defaultColor('os') + ', lf, crlf').option('--quote <type>', defaultColor('double') + ', single').option('-b, --block <format>', 'BEM block format: ' + defaultColor('.%s')).option('-e, --element <format>', 'BEM element format: ' + defaultColor('__%s')).option('-m, --modifier <format>', 'BEM modifier format: ' + defaultColor('--%s')).option('--chrome <version>', 'Minimum Chrome version supported: ' + defaultColor('0')).option('--firefox <version>', 'Minimum Firefox version supported: ' + defaultColor('0')).option('--ie <version>', 'Minimum IE version supported: ' + defaultColor('0')).option('--opera <version>', 'Minimum Opera version supported: ' + defaultColor('0')).option('--no-webkit-prefix', 'Disable experimental -webkit- prefix').option('--khtml-prefix', 'Enable experimental -khtml- prefix').option('--no-moz-prefix', 'Disable experimental -moz- prefix').option('--no-ms-prefix', 'Disable experimental -ms- prefix').option('--no-o-prefix', 'Disable experimental -o- prefix').on('help', function (cmd) {
        cmd.outputIndented('Examples', [
            '$ blink compile "app/styles/**/*.js"',
            '$ blink compile ' + '--style expanded --ie 7 "app/styles/**/*.js"'
        ]);
    }).parent.parse(args);
}
exports.execute = execute;
