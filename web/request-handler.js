var path = require('path');
var archive = require('../helpers/archive-helpers');
// require more modules/folders here!
var utils = require('./http-helpers');
var urlParser = require('url');


var actions = {
  'GET': function(req, res) {

    var parts = urlParser.parse(req.url);
    var urlPath = parts.pathname === '/' ? '/index.html' : parts.pathname;
    utils.serveAssets(res, urlPath, function() {
      archive.isUrlInList(urlPath.slice(1), function(found) {
        if (found) {
          utils.sendRedirect(res, '/loading.html');
        } else {
          utils.send404(res);
        }
      });
    });
  },
  'POST': function(req, res) {


    utils.collectData(req, function(data) {
      var url = data.split('=')[1];
      archive.isUrlInList(url, function(found) {
        if (found) {
          archive.isUrlArchived(url, function(exists) {
            if (exists) {
              utils.sendRedirect(res, '/'+url);
            } else {
              utils.sendRedirect(res, '/loading.html'); 
            }
          });
        } else {
          archive.addUrlToList(url, function() {
            utils.sendRedirect(res, '/loading.html');
          });
        }
      });
    });
  }
};

exports.handleRequest = function (req, res) {
  var handler = actions[req.method];

  if (handler) {
    handler(req, res);
  } else {
    helpers.send404(response);
  }
};

