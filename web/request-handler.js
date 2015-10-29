var path = require('path');
var archive = require('../helpers/archive-helpers');
var fs = require('fs');
var utils = require('./http-helpers');
// require more modules/folders here!


exports.handleRequest = function (req, res) {
  if(req.method === 'GET') {
    // req.url('/', function() { res.on('')});
    if(req.url === '/') {
      fs.readFile('./web/public/index.html', function(err, data){
        if(err) throw err;
        // console.log(data);
        res.writeHead(200, utils.headers);
        res.end(data);
      });
    }
  }
};
