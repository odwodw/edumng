module.exports = function (grunt) {
	grunt.registerTask('prod', [
		'compileAssets',
		'concat',
		'uglify:dist',
		'cssmin:dist',
		'sails-linker:prodJs',
		'sails-linker:prodStyles',
		'sails-linker:devTpl',
		'sails-linker:prodJsJade',
		'sails-linker:prodStylesJade',
		'sails-linker:devTplJade'
	]);
};
