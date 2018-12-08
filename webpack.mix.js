let mix = require('laravel-mix')

mix.setPublicPath('dist')
   .js('resources/js/tool.js', 'js')
   .sass('resources/sass/tool.scss', 'css')
   .copy('./node_modules/vue-multiselect/dist/vue-multiselect.min.css', 'css')
   // .copy("node_modules/vue-multiselect/dist/vue-multiselect.min.css", "css")
   .sourceMaps()
   .version()

