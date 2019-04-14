const http = require('http');
const url = require('url');
const stringDecoder = require('string_decoder').StringDecoder;
const carHandlers = require('../api/cars');
const parseJsonObj = require('../api/helper').parseJsonObj;


// all the server logic:http and https
let unifiedServer = (req, res)=>{
    // get the url and parse it
    let parsedUrl = url.parse(req.url, true);

    // get the path
    let path = parsedUrl.pathname;
    let trimmedPath = path.replace(/^\/+|\/+$/g,'');
    // send the response

    // get http method
    let method = req.method.toLowerCase();

    // get the query string as obj
    let queryParam = parsedUrl.query;

    // get the headers are obj
    let headers = req.headers;

    // get the payload
    let decoder = new stringDecoder('utf-8');
    let buffer = '';
    req.on('data', (data)=>{
        buffer+=decoder.write(data);
    });
    req.on('end',()=>{
        buffer+=decoder.end();
        // log the request path
        console.log(`Request received on ${trimmedPath} with method ${method} and query `, queryParam);
        let requestData = {path,trimmedPath,method,queryParam,headers,payload:parseJsonObj(buffer)};
        carHandlers.cars(requestData, req, res);
        console.log("Response should be done now");
    });
}

// the server shoudl respond to all the requests with a string
// start the http server and have it listen to port
let httpServer = {
    server: http.createServer((req, res)=>{
        unifiedServer(req, res);
    }),
    startServer: function(){
        this.server.listen(5000, ()=>{
            console.log('The server is listening on port 5000');
        }).on('error', (e)=>console.log("Error when http server listening", e))
    },
    stopServer: function(){
        this.server.close()
        .on("close", ()=>console.log("Http server closed"))
        .on("error", (e)=>console.log("Error when stopping server", e));
    } 
}

httpServer.startServer();
module.exports = httpServer;