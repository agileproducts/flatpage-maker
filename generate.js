var fs = require('fs');
var path = require('path');

//var mustache = require('mustache');
var handlebars = require('handlebars');
var xml2js = require('xml2js');
var csvParse = require('csv-parse/sync');


function convertXML(inputfile, template) {
	var xmlfile = fs.readFileSync(path.join(__dirname, inputfile), 'utf8');
    var xmlParser = new xml2js.Parser();
	xmlParser.parseString(xmlfile, function (err, result) {
		if (err) {
			console.log(err);
		} else {
			writeHTML(template, result);
		}
	});
}

function parseCSV(csvData) {
	let data = csvParse.parse(csvData, {
		columns: true
	});
	return data;
}

function parseXML(xmlData) {
	let xmlParser = new xml2js.Parser();
	xmlParser.parseString(xmlData, function (err, result) {
		if (err) {
			console.log(err);
		} else {
			console.log(result); 
		}
	});
}

function generateHTML(template, data) {
	let view = handlebars.compile(template);
	let output = view(data);
	return output;		
}

function makeHTML(inputFile, outputFile, templateFile, parser) {	
	let source = fs.readFileSync(path.join(__dirname, inputFile), 'utf8');
	let template = fs.readFileSync(templateFile, 'utf8');
	let data = parser(source);
	let html = generateHTML(template, data)
	fs.writeFileSync(outputFile, html, 'utf8');
}

var inputFile = process.argv[2];
makeHTML(inputFile, '_output/output.html', 'templates/submissions.hbs', parseCSV)
makeHTML('data.xml', '_output/xml.html', 'templates/template.mst', parseXML) //doesn't work because not synchronous. 






