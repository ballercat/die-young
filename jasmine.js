var Jasmine = require('jasmine');
var jasmine = new Jasmine();

jasmine.loadConfig({
	spec_dir: 'src',
	spec_files: [
		'**/*[sS]pec.js'
	],
	helpers: [
		'helpers/**/*.js'
	]
});

jasmine.execute();
