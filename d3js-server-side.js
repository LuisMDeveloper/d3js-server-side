/**
 * Created by icarus on 23/01/15.
 */
var jsdom = require("jsdom");
var fs = require('fs');
var path = require('path');
var childProcess = require('child_process');
var phantomjs = require('phantomjs');
var binPath = phantomjs.path;
var d3 = fs.readFileSync(__dirname +"/d3.min.js", "utf-8");

module.exports = {
  render : function (callback) {
    jsdom.env({
      html: "<html><head><style>body { background-color: #ffffff; } .axis line, .axis path { fill: none; stroke: #000; shape-rendering: crispEdges }</style></head><body></body></html>",
      src: [d3],
      features: {
        FetchExternalResources: ["script", "css"],
        ProcessExternalResources: true
      },
      done: function (errors, window) {
        callback(errors, window);
      }
    });
  },
  save : function (filename, window) {
    fs.writeFile(filename+'.html', window.d3.select("html").html(), function (err) {
      if (err) throw err;

      var childArgs = [
        path.join(__dirname, 'htmlToPng.js'),
        ''+filename
      ];

      childProcess.execFile(binPath, childArgs, function(err, stdout, stderr) {
        if (err) throw err;
      });
    });
  }
};
