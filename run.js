var fs = require('fs');
var yaml = require('js-yaml');
var mustache = require('mustache');

var config = yaml.safeLoad(fs.readFileSync('config.yml', 'utf8'));

var template = fs.readFileSync(config.template, 'utf8');
var parsedTemplate = mustache.parse(template);

var data = {
  title : "Emma",
  author : "Jane Austen"
};

var output = mustache.render(template, data);

fs.writeFileSync(config.output, output, 'utf8');