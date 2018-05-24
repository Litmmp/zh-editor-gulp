const gulp = require('gulp');
const rollup = require('rollup');
const rename = require('gulp-rename');
const uglify = require('gulp-uglify');
const gutil = require('gulp-util');

gulp.task('script', async function() {

  const bundle = await rollup.rollup({
    input: './src/js/index.js',
    plugins: [
      //rollupTypescript()
    ]
  });

  await bundle.write({
    file: './dist/js/zh-editor.js',
    format: 'umd',
    name: 'zh-editor',
    sourcemap: true
  });

  gulp.src('./dist/js/zh-editor.js')
    // 这会输出一个未压缩过的版本
    //.pipe(gulp.dest(target))
    // 这会输出一个压缩过的并且重命名未 foo.min.js 的文件
    .pipe(uglify()).on('error',function(err){ gutil.log(gutil.colors.red('[Error]'), err.toString()); })
    .pipe(rename({ extname: '.min.js' }))
    .pipe(gulp.dest('./dist/js/'));

});

// 默认任务配置
gulp.task('default', ['script']);
