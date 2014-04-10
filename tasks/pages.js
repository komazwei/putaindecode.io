var gulp = require("gulp")
  , plumber = require("gulp-plumber")
  , jade = require("gulp-jade")
  , exports = require("./cache/exports")
  , lang = require("./cache/lang")
  , paths = require("./paths")
  , path = require("path")
  , jadeExtenstionRE = /\.jade$/

module.exports = function(){
  var options = {
        pretty: true,
        basedir : path.resolve(__dirname, "../"),
        locals : {
          pages : exports.value,
          lang : lang.value
        }
      }
    , stream = gulp.src(paths.sources.pages)

  stream.on("data", function(file){
    options.locals.page = path.relative(
      path.resolve(paths.sources.pagesRoot), file.path
    ).replace(jadeExtenstionRE, "")
  })

  return stream
    .pipe(plumber())
    .pipe(jade(options))
    .pipe(gulp.dest(paths.dist.pages))
}
