使用[gulp.spritesmith](https://github.com/twolfson/gulp.spritesmith)拼接精灵图的小demo

### 使用方法

1. npm install
2. gulp sprite
3. 打开built文件夹就能看到生成的图片和样式

如果需要修改模板，更改css.template.mustache即可。

``` javascript
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
```
