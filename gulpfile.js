/*
* @Author: HelKyle
* @Date:   2015-12-09 10:54:27
* @Last modified by:   zhouxiaokai
* @Last modified time: 2016-07-29T10:36:06+08:00
*/

'use strict';

var gulp = require('gulp');
var spritesmith = require('gulp.spritesmith');
var cache = require('gulp-cache');
var runSequence = require('run-sequence');
var imagemin = require('gulp-imagemin');
var del = require('del');
var replace = require('gulp-replace');
var replaceTask = require('gulp-replace-task');


var configs = {

	//$$$$$$$$$$$修改精灵图片位置
	spritesSource: './src/sprite/*.*',
	spritesMithConfig: {
		//Retina图，必须保证图片是原来的两倍大，所有图片都需要有2x的大小
		// retinaSrcFilter: './src/image/sprite/*@2x.png',

		// cssOpts: {
			//$$$$$$$$$$$修改变量名
			// varName: 'spriteSrc',
		// },
		//$$$$$$$$$$$输出结果
		imgName: 'sprite.png',
	    cssName: 'sprite.css',
	    cssFormat: 'css',
	    cssTemplate: 'css.template.mustache',

	    // top-down	left-right	diagonal	alt-diagonal	binary-tree
	    algorithm: 'left-right',
	    padding: 6,
			// retinaImgName: 'spritesheet-2x.png',
		cssVarMap: function(sprite) {
			// sprite.name = 'icon-' + sprite.name
	    },
	},
	spritesOutputPath: './built/'
}


//根据图片生成精灵图和css
gulp.task('sprite', function(callback) {
	runSequence(
		'sprite:del',
		'sprite:build',
		'sprite:images',
		callback
	)

});
gulp.task('sprite:del', function(callback) {
	cache.clearAll(callback);
	del(configs.spritesOutputPath);
});
gulp.task('sprite:build', function() {
	var spriteData = gulp.src(configs.spritesSource) // source path of the sprite images
        .pipe(spritesmith(
            configs.spritesMithConfig
        ));
    spriteData.img.pipe(gulp.dest(configs.spritesOutputPath)); // output path for the sprite
    spriteData.css.pipe(gulp.dest(configs.spritesOutputPath)); // output path for the CSS
})

gulp.task('sprite:images', function() {
  return gulp.src(configs.spritesOutputPath + '/**/*.+(png|jpg|jpeg|gif|svg)')
  // Caching images that ran through imagemin
  .pipe(cache(imagemin({
		optimizationLevel: 3,
		progressive: true,
		interlaced: true
	})))
  .pipe(gulp.dest(configs.spritesOutputPath))
});
