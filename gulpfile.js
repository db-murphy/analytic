'use strict';
const gulp      = require('gulp');
const src       = process.cwd() + '/public/src';
const build     = process.cwd() + '/public/build';
const assets    = process.cwd() + '/public/dist';
const lib       = process.cwd() + '/public/lib';
const shell     = require('shelljs');
const minifyCss = require('gulp-minify-css');
const uglify    = require('gulp-uglify');
const color     = require('colorful');
const version   = require('./package.json').version;
const sourcemaps= require('gulp-sourcemaps');
const sass      = require('gulp-sass');
const sftp      = require('gulp-sftp');
const base64    = require('gulp-base64');

// 发布版本
gulp.task('dist', () => {
    // 生成版本代码
    var dist_version = (version) => {
        gulp.src(build + '/**/*.map')
            .pipe(gulp.dest(assets + '/' + version))
            .on('end', () => {
                gulp.src(build + '/css/*.css')
                    .pipe(gulp.dest(assets + '/' + version + '/css'))
                    .on('end', () => {
                        gulp.src(build + '/javascripts/**/*.js')
                            .pipe(gulp.dest(assets + '/' + version + '/javascripts'))
                            .on('end', () => {
                                gulp.src(build + '/images/**/*')
                                    .pipe(gulp.dest(assets + '/' + version + '/images'))
                                    .on('end', () => {
                                        console.log(color.green('\n    √ 发布版本: '+ version + '\n'));
                                    });
                            })
                    });
            });
    }

    if(shell.ls(assets).indexOf(version) != -1) {
        // 版本已存在
        setTimeout(() => {
            process.stdout.write(color.green(version +' 版本已存在, 是否替换?(y/n):'));
            process.stdin.resume();
            process.stdin.setEncoding('utf8');
            process.stdin.on('data', (data) => {
                var new_data = data.replace(/\n/g, '');

                if(new_data == 'y') {
                    // 覆盖
                    dist_version(version);
                }

                // 终止进程
                process.stdin.pause();
            });
        }, 500);
        
    }else{
        // 发布新版本
        dist_version(version);
    }
});

var loadMap   = true;
gulp.task('sass', function() {
    gulp.src('./public/src/scss/pages/*.scss')
        .pipe(sourcemaps.init())
        .pipe(sass())
        .pipe(base64({
            baseDir: src + '/images',
            extensions: ['svg', 'png', /\.jpg#datauri$/i],
            maxImageSize: 8 * 1024,
            debug: true
        }))
        .pipe(minifyCss())
        .pipe(sourcemaps.write('../maps', {
            addComment: loadMap
        }))
        .pipe(gulp.dest('./public/build/css/'));

    gulp.src('./public/src/images/**/*')
        .pipe(gulp.dest('./public/build/images'));
});

// 部署代码到测试服务器
gulp.task('deploy', () => {
    gulp.src(assets + '/' + version + '/**/*')
        .pipe(sftp({
            host: '192.168.192.60',
            remotePath: '/var/www/html/shangou/redm/m-new/public/dist/' + version,
            user: 'root',
            pass: 'globalwide',
            callback: () => {
                setTimeout(() => {
                    console.log(color.green('\n    √ 部署完毕: '+ version + '\n'));
                }, 500);
            }
        }));
})

gulp.task('deploy_lib', () => {
    gulp.src(lib + '/**/*')
        .pipe(sftp({
            host: '192.168.192.60',
            remotePath: '/var/www/html/shangou/redm/m-new/public/lib/',
            user: 'root',
            pass: 'globalwide',
            callback: () => {
                setTimeout(() => {
                    console.log(color.green('\n    √ 部署完毕: lib\n'));
                }, 500);
            }
        }));
})

// 监听css文件变化
gulp.task('watch_sass', function() {
    gulp.watch('./public/src/scss/**/*.scss', ['sass']);
});

// 默认任务
gulp.task('default', ['sass']);

// 监听文件变化
gulp.task('watch', ['default', 'watch_sass']);
