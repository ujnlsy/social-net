var http = require("http");
var fs = require('fs');
var path = require('path');
var mime = require('mime');

function send404(response){
  response.writeHead(404,{'content-type':'text/plain'});
  response.write('Error 404:resource not found.');
  response.end();
}

function sendFile(response,filePath,fileContents){
  response.writeHead(
    200,
    {'content-type':mime.lookup(path.basename(filePath))}
    );
  response.end(fileContents);
}

function serveStatic(response,absPath){
  fs.exists(absPath,function(exists){
    if(exists){
      fs.readFile(absPath,function(err,data){
        if(err){
          send404(response);
        }else{
          sendFile(response,absPath,data);
        }
      });
    }else{
      send404(response);
    }
  });
}

function onRequest(request, response){
  var filePath = false;
  if(request.url == '/'){
    filePath = 'src/view/index.html';
  }else{
    filePath = 'src/view'+request.url;
  }

  var absPath = './' + filePath;
  serveStatic(response,absPath);
}

http.createServer(onRequest).listen(8888,function(){
  console.log('Server listening on port 8888.');
});