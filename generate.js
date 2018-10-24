var fs = require('fs');
var yaml = require('js-yaml');
var mustache = require('mustache');
var xml2js = require('xml2js');

var config = yaml.safeLoad(fs.readFileSync('config.yml', 'utf8'));

function writeHTML(template, data) {
	var output = mustache.render(template, data);
	fs.writeFileSync(config.output, output, 'utf8');		
}

var template = fs.readFileSync(config.template, 'utf8');

var xmlfile = fs.readFileSync('data.xml', 'utf8');
var xmlParser = new xml2js.Parser();

xmlParser.parseString(xmlfile, function (err, result) {
	if (err) {
		console.log(err);
	} else {
		writeHTML(template, result);
	}
});

/*xmldata.parseXmlfile(xmlfile, writeHTML);*/




