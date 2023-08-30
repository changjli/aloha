// sass source, css destination 
const { src, dest, watch, series } = require('gulp');

// compiler 
const sass = require('gulp-sass')(require('sass'));

// convert sass to css 
function buildStyles() {
    return src('src/scss/**/*.scss')
        .pipe(sass())
        .pipe(dest('src/css'));
}

// ootmatis jalan kalo sass berubah kaya hot reload 
function watchTask() {
    // invoke function if file change 
    watch(['src/scss/**/*.scss'], buildStyles);
}

// urutan functionya diinvoke 
exports.default = series(buildStyles, watchTask); 