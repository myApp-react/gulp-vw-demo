var gulp = require("gulp"),
    postcss = require('gulp-postcss'),
    sass = require('gulp-sass'),
    shortColor = require('postcss-short-color'),
    autoprefixer = require('autoprefixer'),
    cssnext = require('postcss-cssnext'),
    shortcss = require('postcss-short'),
    pxtoviewport = require('postcss-px-to-viewport'),
    minifycss = require("gulp-minify-css"),//css压缩
    cleanCSS = require('gulp-clean-css'),//css压缩
    rename = require("gulp-rename"),//文件更名
    htmlmin = require('gulp-htmlmin'),//html压缩
    pngcrush = require('imagemin-pngcrush'),
    imagemin = require('gulp-imagemin'),//图片压缩
    notify = require('gulp-notify'),//提示信息
    uglify = require("gulp-uglify"),//js压缩
    jshint = require('gulp-jshint'),
    babel = require('gulp-babel'),
    plumber = require('gulp-plumber');//gulp错误处理,watch模式下开发+vscode的自动保存简直就是灾难  for(... 还没写完就挂了


//压缩html
gulp.task('html',function(){
    var options = {
        collapseWhitespace: false,//清除空格，压缩html
        collapseBooleanAttributes: true,//省略布尔属性的值
        removeComments: true,//清除html中注释的部分
        removeEmptyAttributes: false,//清除所有的空属性
        removeScriptTypeAttributes: true,//清除所有script标签中的type="text/javascript"属性
        removeStyleLinkTypeAttributes: true,//清楚所有Link标签上的type属性
        minifyJS: false,//压缩html中的javascript代码
        minifyCSS: true//压缩html中的css代码
    };

    gulp.src('./src/html/**/*')
        .pipe(plumber())
        .pipe(htmlmin(options))
        .pipe(gulp.dest('./dist/html'))
    // .pipe(notify({ message: 'html task ok' }));
});

// 压缩图片
gulp.task('images', function() {
    return gulp.src('./src/images/**/*.*')
        .pipe(plumber())
        .pipe(imagemin({
            progressive: true, //Boolean类型 默认:false 无损压缩图片
            optimizationLevel: 5, //number类型 默认:3 取值范围:0-7(优化等级)
            interlced: true, //Boolean类型 默认false 隔行扫描gif进行渲染
            multipass: true //Boolean类型 默认false 多次优化svg直到完全优化
        }))
        .pipe(gulp.dest('./dist/images'))
        // .pipe(notify({ message: 'img task ok' }));
});
// 检查js
gulp.task('lint', function() {
    return gulp.src('./src/js/**.js')
        .pipe(plumber())
        .pipe(jshint())
        .pipe(jshint.reporter('default'))
        // .pipe(notify({ message: 'lint task ok' }));
});

// 合并、压缩js文件
gulp.task('js', function() {
    return gulp.src('./src/js/**/*.js')
        .pipe(plumber())
        .pipe(babel())
        // .pipe(uglify())
        .pipe(gulp.dest('./dist/js'))
        // .pipe(notify({ message: 'js task ok' }));
});

//css任务
gulp.task("css", function() {
    var processors = [
        require('postcss-short-color'),
        shortcss,
        cssnext, //包含 autoprefixer
        require('postcss-write-svg')({
            utf8: false
        }),
        require('postcss-aspect-ratio-mini'),
        pxtoviewport({
            viewportWidth: 750, //视窗的宽度，对应的是设计稿的宽度 一般是 750px
            // viewportHeight: 1334, // 视窗的高度，根据750设备的宽度来指定，一般指定1334，也可以不配置
            unitPrecision: 5, //指定`px`转换为视窗单位值的小数位数（很多时候无法整除）
            viewportUnit: 'vw',// 指定需要转换成的视窗单位，建议使用vw
            selectorBlackList: ['.ignore', '.hairlines'],// 指定不转换为视窗单位的类，可以自定义，可以无限添加,建议定义一至两个通用的类名
            minPixelValue: 1, //小于或等于`1px`不转换为视窗单位，你也可以设置为你想要的值
            mediaQuery: false //允许在媒体查询中转换`px`
        }),
        // require('postcss-aspect-ratio-mini'),
        // require('postcss-viewport-units'),
    ]
    gulp.src("./src/css/*.scss")
        .pipe(plumber())
        .pipe(sass())//编译sass
        .pipe(postcss(processors))
        .pipe(rename(function (path) {
            // path.basename += '.min'
            path.extname = ".css";
        }))
        .pipe(cleanCSS({
            compatibility: 'ie8',
            keepSpecialComments: '*' // //保留所有特殊前缀
        }))//压缩css
        // .pipe(rev())
        .pipe(gulp.dest("./dist/css"))
        // .pipe(gulp.dest("./src/css"))
        // .pipe(notify({ message: 'scss task ok' }));
});


/**
 * series 按照顺序执行
 * paralle 可以并行计算
 * */
//默认任务
gulp.task("default", ["css", "js", "html", "images"], function() {
    //监听sass变化
    gulp.watch("./src/css/*.scss", ["css"]);
    //监听lint\js变化
    gulp.watch('./src/js/**.js', ['js']);
    //监听imgs变化
    gulp.watch('./src/images/**/*', ['images']);
    gulp.watch("./src/html/**/*.html", ["html"]);
});