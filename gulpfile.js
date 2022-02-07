const gulp = require("gulp");
const inlinesource = require("gulp-inline-source");
const replace = require("gulp-replace");
const del = require("del");

gulp.task("inline", () => {
  return gulp
    .src("./build/*.html")
    .pipe(replace('.js"></script>', '.js" inline></script>'))
    .pipe(
      inlinesource({
        compress: false,
        ignore: ["png"],
      })
    )
    .pipe(gulp.dest("./build"));
});

gulp.task("clean", function () {
  return del("build/static/js/*.js", { force: true });
});
