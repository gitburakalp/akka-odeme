var gulp = require("gulp"),
  concat = require("gulp-concat"),
  uglify = require("gulp-terser"),
  sass = require("gulp-sass"),
  rename = require("gulp-rename"),
  prefix = require("gulp-autoprefixer"),
  browserSync = require("browser-sync").create(),
  size = require("gulp-size"),
  plumber = require("gulp-plumber"),
  sourcemaps = require("gulp-sourcemaps"),
  purgecss = require("gulp-purgecss");

var Roots = {
  jsRoot: "./src/js",
  jsConcatsRoot: "./src/js/concatFiles",
  jsConcatsDistRoot: "./src/js/concatFiles/minified",
};

var jsFiles = [];

var src = "./src/";
var sassOptions = {
    outputStyle: "compressed",
  },
  prefixerOptions = {
    browsers: ["last 2 versions"],
  };

gulp.task("purgecss", () => {
  return gulp
    .src(src + "css/main.min.css")
    .pipe(
      purgecss({
        content: ["./src/**/*.html"],
        whitelistPatterns: [/slider/, /slide/, /swiper/],
      })
    )
    .pipe(gulp.dest(src + "css/min/"));
});

gulp.task("browser-sync", function (done) {
  browserSync.init({
    server: {
      baseDir: src,
    },
  });

  done();
});

gulp.task("scripts", function () {
  return gulp
    .src(jsFiles)
    .pipe(sourcemaps.init())
    .pipe(concat("scripts.js"))
    .pipe(gulp.dest(Roots.jsConcatsDistRoot))
    .pipe(uglify())
    .pipe(rename("scripts.min.js"))
    .pipe(sourcemaps.write("../sources"))
    .pipe(gulp.dest(Roots.jsConcatsDistRoot));
});

gulp.task("sass", function () {
  return gulp
    .src(src + "scss/main.scss")
    .pipe(plumber())
    .pipe(sourcemaps.init())
    .pipe(sass(sassOptions))
    .pipe(
      size({
        gzip: true,
        showFiles: true,
      })
    )
    .pipe(prefix(prefixerOptions))
    .pipe(rename("main.css"))
    .pipe(browserSync.stream())
    .pipe(
      rename({
        suffix: ".min",
      })
    )
    .pipe(sourcemaps.write("../sources"))
    .pipe(gulp.dest(src + "css"))
    .pipe(browserSync.stream());
});

gulp.task("html", function () {
  return gulp.src(src + "**/*.html").pipe(browserSync.stream());
});

gulp.task("watch", function () {
  gulp.watch(src + "scss/**/*.scss", gulp.series("sass"));
  gulp.watch(src + "js/*.js", gulp.series("html"));
  gulp.watch(src + "**/*.html", gulp.series("html"));
});

gulp.task("default", gulp.series("browser-sync", "html", "sass", "watch"));
