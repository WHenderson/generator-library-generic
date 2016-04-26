var generators = require('yeoman-generator');
var _ = require('lodash');

module.exports = generators.Base.extend({
    constructor: function () {
        generators.Base.apply(this, arguments);

    },
    writing: function () {
        try {
            const pkg = this.fs.readJSON(this.destinationPath('package.json'));
            console.log('pkg:', JSON.stringify(pkg, null, 2));

            _.merge(pkg, {
                'files': [
                    'dist'
                ],
                'scripts': {
                    'preversion': 'npm-git-library-version preversion',
                    'version': 'npm-git-library-version version',
                    'postversion': 'npm-git-library-version postversion',
                    'build': 'gulp chained-1-build',
                    'test': 'gulp',
                    'coveralls': 'coveralls --verbose < coverage/lcov.info'
                },
                'main': 'dist/index.js'
            });

            this.fs.writeJSON(this.destinationPath('package.json'), pkg);

            this.fs.write(this.destinationPath('src/index.js'), '');
        }
        catch (ex) {
            console.log(ex);
            console.log(ex.stack);
        }
    }
});

