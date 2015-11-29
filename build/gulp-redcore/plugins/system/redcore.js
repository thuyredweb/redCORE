var gulp = require('gulp');
var fs   = require('fs');

// Third part extension using redCORE / redCORE build folder
try {
	var config = require(process.cwd() + '/gulp-config.json');
}
// redCORE repo relative
catch(err) {
	var config = require('../../../../build/gulp-config.json');
}

// Dependencies
var browserSync = require('browser-sync');
var del         = require('del');

var baseTask  = 'plugins.system.redcore';

var subextensionPath = './redCORE/extensions/plugins/system/redcore';
var directPath       = '../extensions/plugins/system/redcore';

var extPath   = fs.existsSync(subextensionPath) ? subextensionPath : directPath;

// Clean
gulp.task('clean:' + baseTask, function() {
	return del(config.wwwDir + '/plugins/system/redcore', {force : true});
});

// Copy
gulp.task('copy:' + baseTask, ['clean:' + baseTask], function() {
	return gulp.src( extPath + '/**')
		.pipe(gulp.dest(config.wwwDir + '/plugins/system/redcore'));
});

// Watch
gulp.task('watch:' + baseTask,
	[
		'watch:' + baseTask + ':plugin'
	],
	function() {
});

// Watch: plugin
gulp.task('watch:' + baseTask + ':plugin', function() {
	gulp.watch(extPath + '/**/*',
		{ interval: config.watchInterval },
		['copy:' + baseTask, browserSync.reload]);
});
