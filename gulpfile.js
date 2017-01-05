var gulp = require("gulp");
var fs = require("fs");
var ejs = require("gulp-ejs");
var sass = require("gulp-sass");
var uglify = require("gulp-uglify");
var browser = require("browser-sync");
var plumber = require("gulp-plumber");

gulp.task("server", function() {
    browser({
        server: {
            baseDir: "./docs",
            startPath: '/ParmoSense/',
            routes : {
                '/ParmoSense': 'docs'
            }
        }
    });
});

gulp.task("ejs", function() {
    var json = JSON.parse(fs.readFileSync("./source/html/variables.json"));
    gulp.src(["./source/html/**/*.ejs", "!./source/html/template/*.ejs"], { base: "./source/html" })
        .pipe(plumber())
        .pipe(ejs(json, {"ext": ".html"}))
        .pipe(gulp.dest("./docs"))
        .pipe(browser.reload({stream:true}));
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

gulp.task("default", ["server"], function() {
    gulp.watch("./source/html/**/*.ejs", ["ejs"]);
    gulp.watch("./source/js/**/*.js",["js"]);
    gulp.watch("./source/sass/**/*.scss",["sass"]);
});
