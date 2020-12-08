let mix = require('laravel-mix')

mix
    .setPublicPath('dist')
    .js('resources/js/tool.js', 'js')
    .js('resources/js/governor.js', 'js')
    .sass('resources/sass/tool.scss', 'css')
    .copy('./node_modules/vue-multiselect/dist/vue-multiselect.min.css', 'css')
    .version()
;
