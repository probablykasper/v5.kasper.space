const devServerPort = 1234
const openBrowserWhenDevServerStarts = false

const buildSrc = 'src/**/*'
const buildDest = 'build'
const buildDestFiles = 'build/**/*'

const deploy = 'docs'

require('clarify') // hides nodecore from stack trace
const gulp = require('gulp')
const del = require('del')

async function bundle (options) {
  del.sync(buildDest)
  const Bundler = require('parcel-bundler')
  const bundler = new Bundler(buildSrc, {
    outDir: buildDest,
    target: 'browser',
    cache: true, // turn off if pug.config.js is used
    logLevel: 3, // 3 = log everything, 2 = log warnings & errors, 1 = log errors
    hmr: false,
    sourceMaps: true,
    minify: false, // needs to be false for sourcemaps to work
    watch: options.watch,
  })
  // this line fixes json files being turned into js files. Get the file from the taskler repo
  // bundler.addAssetType('.json', require.resolve('./JSONAsset.js'))
  return bundler.bundle()
}
gulp.task('bundle', () => {
  return bundle({ watch: false })
})
gulp.task('bundle:watch', () => {
  return new Promise(() => {
    bundle({ watch: true })
  })
})

gulp.task('server', () => {
  const browserSync = require('browser-sync').create()
  return browserSync.init({
    server: {
      baseDir: buildDest
    },
    ghostMode: false, // disables interactions syncing between tabs, like clicks
    port: devServerPort,
    files: './src',
    open: openBrowserWhenDevServerStarts
  })
})

gulp.task('default', gulp.parallel('bundle:watch', 'server'))

gulp.task('deploy', async () => {
  await bundle({ watch: false })
  del.sync(deploy)
  return gulp.src(buildDestFiles)
    .pipe(gulp.dest(deploy))
})
