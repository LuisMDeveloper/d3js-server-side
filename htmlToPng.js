/**
 * Created by icarus on 23/01/15.
 */
var page = require('webpage').create();
var fs = require('fs');
var system = require('system');

var fileName =  system.args[1];
console.log(fileName);
var fileContent = fs.read('./'+fileName+'.html');
console.log('read data:', fileContent);

page.onLoadFinished = function() {
  console.log('::rendering');
  page.render(fileName+'.png');
  phantom.exit();
};

var content = '';
page.content = fileContent;
