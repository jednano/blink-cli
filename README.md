# blink-cli

The blink command line interface.

## Usage

```bash
$ npm install -g blink-cli
$ blink --help

  Usage: blink [options] <command>

  Commands:

    compile  Compile Blink stylesheets to CSS (defaults in color)

  Options:

    -h, --help     output help information
    -v, --version  output version information
    
$ blink compile --help

  Compile Blink stylesheets to CSS (defaults in color)

  Usage: compile [options] <sources>...

  Options:

    -h, --help                    output help information
    -c, --config <path>           Specifly location of config file
    -q, --quiet                   Quiet mode
    -t, --trace                   Show a full stacktrace on error
    --boring                      Turn off colorized output
    -s, --style <style>           nested, expanded, compact, compressed
    -i, --one-indent <oneIndent>  2s, 4s, 1t
    -n, --newline <newline>       os, lf, crlf
    --quote <type>                double, single
    -b, --block <format>          BEM block format: .%s
    -e, --element <format>        BEM element format: __%s
    -m, --modifier <format>       BEM modifier format: --%s
    --chrome <version>            Minimum Chrome version supported: 0
    --firefox <version>           Minimum Firefox version supported: 0
    --ie <version>                Minimum IE version supported: 0
    --opera <version>             Minimum Opera version supported: 0
    --no-webkit-prefix            Disable experimental -webkit- prefix
    --khtml-prefix                Enable experimental -khtml- prefix
    --no-moz-prefix               Disable experimental -moz- prefix
    --no-ms-prefix                Disable experimental -ms- prefix
    --no-o-prefix                 Disable experimental -o- prefix

  Examples:

    $ blink compile "app/styles/**/*.js"
    $ blink compile --style expanded --ie 7 "app/styles/**/*.js"
```
