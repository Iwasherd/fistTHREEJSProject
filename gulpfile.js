
const gulp = require('gulp');
const pug = require('gulp-pug');
const sass = require('gulp-sass');
const rename = require('gulp-rename');
const sourcemaps = require('gulp-sourcemaps');
const browserSync = require('browser-sync').create();
const autoprefixer = require('gulp-autoprefixer');
// const imagemin = require('gulp-imagemin');
const plumber = require('gulp-plumber');
//svg sprite
//const svgSprite = require("gulp-svg-sprites");
//const cheerio = require('gulp-cheerio');
var spritesmith = require("gulp.spritesmith");
var layout = require("layout");

const paths = {
    root: './build',
    templates: {
        pages: 'src/templates/*.pug',
        src: 'src/templates/*.pug',
        dest: 'build/'
    },
    styles: {
        src: 'src/css/*.scss',
        dest: 'build/'
    },
    // minifyimage: {
    //     src: 'src/images/*.*',
    //     dest: 'build/styles/images'
    // },
    // sprites: {
    //     src: 'src/images/icons/*.svg',
    //     dest: 'build/styles/images/icons'
    // },
    // fonts: {
    //     src: 'src/fonts/*.*',
    //     dest: 'build/styles/fonts'
    // },
    js: {
        src: 'src/js/*.js',
        dest: 'build/',
    },
    // photo: {
    //     src: 'src/images/photo/*.*',
    //     dest: 'build/styles/images/photo'
    // }
}
//pug 
function templates() {
    return gulp.src(paths.templates.pages)
        .pipe(plumber())
        .pipe(pug({ pretty: true }))
        .pipe(gulp.dest(paths.root));
}
// scss
function styles() {
    return gulp.src(paths.styles.src)
        .pipe(plumber())
        .pipe(sourcemaps.init())
        .pipe(sass({
            outputStyle: 'compressed',
            //normalize css
            includePaths: require('node-normalize-scss').includePaths
        }))
        .pipe(sourcemaps.write())
        .pipe(rename({ suffix: '.min' }))
        .pipe(gulp.dest(paths.styles.dest))
        // .pipe(autoprefixer({
        //     browsers: ['last 16 versions'],
        //     cascade: false
        // }))
        .pipe(gulp.dest(paths.styles.dest))
}
// watcher
function watch() {
    gulp.watch(paths.styles.src, styles);
    gulp.watch(paths.templates.src, templates);
    gulp.watch(paths.js.src, js);
    // gulp.watch(paths.minifyimage.src, minifyimage);
    // gulp.watch(paths.photo.src, photo);
}
// local serv + livereload
function server() {
    browserSync.init({
        server: paths.root
    });
    browserSync.watch(paths.root + '/**/*.*', browserSync.reload);
}
//autoprefixer 
// function prefixer() {
//     return gulp.src('build/styles/css/app.min.css ')
//         .pipe(plumber())
//         .pipe(autoprefixer({
//             browsers: ['last 2 versions'],
//             cascade: false
//         }))
//         .pipe(gulp.dest(paths.styles.dest))
// }
// image min
// function minifyimage() {
//     return gulp.src(paths.minifyimage.src)
//         .pipe(plumber())
//         .pipe(imagemin())
//         .pipe(gulp.dest(paths.minifyimage.dest))
// }
//make svg sprite
/*
function sprite() {
    return gulp.src(paths.sprites.src)
            .pipe(plumber())
            // удадяем атрибуты
            .pipe(cheerio({
                run: function ($) {
                    $('[fill]').removeAttr('fill');
                    $('[stroke]').removeAttr('stroke');
                    $('[style]').removeAttr('style');
                    },
                    // на windows не работает
                  //  parserOptions: { xmlMode: true }
                }))
        // собираем svg спрайт
            .pipe(svgSprite({
                mode: "symbols",
                    selector: "icon-%f",
                    svg: {
                symbols: "sprite.svg"
                    },
                  //  preview: false
                    }
                ))
            .pipe(gulp.dest(paths.sprites.dest));
}
*/
// fonts transfer 
// function fonts() {
//     return gulp.src(paths.fonts.src)
//         .pipe(gulp.dest(paths.fonts.dest))
// }
//js transfer
function js() {
    return gulp.src(paths.js.src)
        .pipe(gulp.dest(paths.js.dest))
}
// function pngSprite() {
//   return gulp
//     .src("sniper_move_cam_270/*.png")
//     .pipe(spritesmith({
//         imgName: "sprite.png",
//         cssName: "sprite.css",
//         algorithm: "left-right",
//         width: '100',
//         height: '87'
//       }))
//     .pipe(gulp.dest("build/"));
// }
// photo transfer
// function photo() {
//     return gulp.src(paths.photo.src)
//         .pipe(gulp.dest(paths.photo.dest))
// }
exports.templates = templates;
exports.styles = styles;
// exports.prefixer = prefixer;
//exports.minifyimage = minifyimage;
//exports.sprite = sprite;
//exports.fonts = fonts;
exports.js = js;
//exports.photo = photo;
// exports.pngSprite = pngSprite;

gulp.task(
  "default",
  gulp.series(
    gulp.parallel(styles, templates, js),
    gulp.parallel(watch, server)
  )
);
