var generators = require('yeoman-generator');
var _ = require('lodash');

module.exports = generators.Base.extend({
    constructor: function () {
        generators.Base.apply(this, arguments);

    },
    initializing: function () {
        this.composeWith('npm-init', {
            options: {
                'skip-test': true,
                'skip-license': true,
                'version': '0.0.0',
                'main': 'dist/index.js',
                'license': 'Apache-2.0'
            }
        }, {
            local: require.resolve('generator-npm-init')
        });

        this.composeWith('license', {

        }, {
            local: require.resolve('generator-license')
        });
    },
    writingPackaging: function () {
        const pkg = this.fs.readJSON(this.destinationPath('package.json'));

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
});
