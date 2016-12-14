var gulp = require("gulp");
var sass = require("gulp-sass");
var uglify = require("gulp-uglify");
var browser = require("browser-sync");
var plumber = require("gulp-plumber");

gulp.task("server", function() {
    browser({
        server: {
            baseDir: "./docs",
            index  : "index.html"
        }
    });
});
 
gulp.task("sass", function() {
    gulp.src("./source/sass/**/*scss")
        .pipe(plumber())
        .pipe(sass())
        .pipe(gulp.dest("./docs/css"))
        .pipe(browser.reload({stream:true}));
});

gulp.task("js", function() {
    gulp.src(["./source/js/**/*.js"])
        .pipe(plumber())
        .pipe(uglify())
        .pipe(gulp.dest("./docs/js"))
        .pipe(browser.reload({stream:true}));
});

gulp.task("reload", function() {
    browser.reload();
});

gulp.task("default", ['server'], function() {
    gulp.watch("./**/*.html", ["reload"]);
    gulp.watch("./source/js/**/*.js",["js"]);
    gulp.watch("./source/sass/**/*.scss",["sass"]);
});
