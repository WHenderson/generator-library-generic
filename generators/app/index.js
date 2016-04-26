var generators = require('yeoman-generator');

module.exports = generators.Base.extend({
    constructor: function () {
        generators.Base.apply(this, arguments);
    },
    dummyMethod: function () {
        console.log('dummyMethod');
    }
});
