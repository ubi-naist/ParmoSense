// gulp v4.0.2

const gulp        = require("gulp"),
      fs          = require("fs"),
      ejs         = require("gulp-ejs"),
      data        = require("gulp-data"),
      rename      = require("gulp-rename"),
      sass        = require("gulp-sass"),
      uglify      = require("gulp-uglify"),
      cleanCSS    = require("gulp-clean-css"),
      plumber     = require("gulp-plumber"),
      browser     = require("browser-sync")
      mmq         = require("gulp-merge-media-queries");

const cleanCSS_1stSettings = 
  { // ref: https://outcloud.blogspot.com/2018/09/Minify-CSS-by-CleanCSS-MergeMediaQuery.html
    level: {
      1: {
        roundingPrecision : 3
      },
      2: {
        removeDuplicateFontRules: true,
        removeDuplicateMediaBlocks: true,
        removeDuplicateRules: true,
        mergeSemantically: true,
        removeUnusedAtRules: true,
        restructureRules: true
      }
    }
  };

const cleanCSS_2ndSettings =
  {
    level: {
      1: {
        all: false,
        removeWhitespace: true
      }
    }
  };

gulp.task("server", function(done) {
    browser.init({
        server: {
            baseDir: "./docs",
            startPath: '/',
            routes : {
                '/': 'docs'
            }
        }
    });
    done();
});

gulp.task("ejs", function() {
  var json = JSON.parse(fs.readFileSync("./source/html/variables.json"));
  return gulp.src(["./source/html/**/*.ejs", "!./source/html/template/*.ejs"], { base: "./source/html" })
        .pipe(plumber())
        .pipe(data(file => {
          return {
            'filename': file.path
          }
        }))
        .pipe(ejs(json))
        .pipe(rename({extname:'.html'}))
        .pipe(gulp.dest("./docs"));
});

gulp.task("sass", function() {
  return gulp.src("./source/sass/**/*scss")
    .pipe(plumber())
    .pipe(sass())
    .pipe(cleanCSS(cleanCSS_1stSettings))
    .pipe(mmq())
    .pipe(cleanCSS(cleanCSS_2ndSettings))
    .pipe(gulp.dest("./docs/css/"));
});

gulp.task("js", function() {
  return gulp.src("./source/js/**/*.js")
    .pipe(uglify())
    .pipe(gulp.dest("./docs/js/"));
});

// watch
gulp.task("watch", (done) => {
  gulp.watch("./source/html/**/*.ejs",  gulp.series("ejs"));
  gulp.watch("./source/js/**/*.js",     gulp.series("js"));
  gulp.watch("./source/sass/**/*.scss", gulp.series("sass"));
  done();
});

// scripts tasks
gulp.task('default', gulp.series('watch', 'server'));
