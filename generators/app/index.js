var generators = require('yeoman-generator');
var _ = require('lodash');
var util = require('util');

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

        this.composeWith('library-generic:packaging');
    }
});
