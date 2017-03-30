const http = require('http');
const url = require('url');
const pathParser = require('../lib/pathParser');

function express() {
  app = {};

  app.routes = {};

  app.methods = ['get', 'post', 'put', 'patch', 'delete'];

  app.methods.forEach(function(method) {
    app.routes[method] = {};
    app[method] = function(ourPath, callback) {
      app.routes[method][ourPath] = callback;
    };
  });

  app.listen = function(port, host) {
    var server = http.createServer(app.handle);
    server.listen(port, host, () => {
      console.log(`Listening on ${host}:${port} ...`);
    });
  };

  app.getParams = function(method, reqPath) {
    var params;
    for (ourPath in app.routes[method]) {
      params = pathParser.returnParams(ourPath, reqPath);
      if (params) break;
    }
    return params;
  };

  app.matchRegex = function(method, reqPath) {
    var match;
    var regExPaths = Object.keys(app.routes[method]).filter( function(key) {
      app.routes[method][key] instanceof RegExp;
    });

    console.log(app.routes);
    console.log(regExPaths);

    //regex for foobar
    return match;
  };

//   obj = { get: 'meow', post: 'oh' };
// { get: 'meow', post: 'oh' }
// > Object.keys(obj).filter( key => obj[key] === 'oh' );
// [ 'post' ]

  app.handle = function(req, res) {
    var reqMethod = req.method.toLowerCase();
    var reqPath = url.parse(req.url).pathname;


    var match = app.matchRegex(reqMethod, reqPath);

    var params = app.getParams(reqMethod, reqPath);

    var p = new Promise(function(resolve) {
      (reqMethod != 'get') ? _modifyData(reqMethod, req, resolve) : resolve();
    });

    p.then(function() {
      if (app.routes[reqMethod][reqPath] || params || match) {
        if (params) {
          req.params = params;
          app.routes[reqMethod][params.path](req, res);
        }
        else if (match) {

        }
        else {
          app.routes[reqMethod][reqPath](req, res);
        }
      } else {
        res.statusCode = 404;
        res.end('404 Not Found');
      }
    })
    .catch(function(e) {
      console.log(e);
    });
  };

  return app;
}

function _modifyData(reqMethod, req, done) {
  switch (reqMethod) {
    case 'post':
      // curl -H "Content-Type: application/json" -d '{ "foo": "bar" }' http://localhost:3000
      postData(req, done);
      break;
    case 'put':
      //curl -X PUT -d arg=val -d arg2=val2 localhost:3000
      putData(req, done);
      break;
    case 'patch':
      // curl --request PATCH http://localhost:3000/users/43
      patchData(req, done);
      break;
      // curl --request DELETE http://localhost:3000/users/43
    case 'delete':
      deleteData(req, done);
  }
}

function postData(req, done) {
  var body = '';
  req.on('data', function(data) {
    body += data;
  });
  req.on('end', function() {
    if (req.headers['content-type'] === 'application/json') {
      body = JSON.parse(body);
      body = JSON.stringify(body, null, 2);
    }
    req.body = body;
    done();
  });
}

function putData(req, done) {
  done();
}

function patchData(req, done) {
  done();
}

function deleteData(req, done) {
  done();
}

module.exports = express;
