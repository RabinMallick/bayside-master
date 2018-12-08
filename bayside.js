function createApplication(config) {
    const http = require('http'),
        fs = require('fs'),
        port = config.port || 3000,
        jsonBody = require("body/json"),
        static = require('node-static'),
        nunjucks = require('nunjucks'),
        self = this;

    // configure nunjucks template engine
    nunjucks.configure(config.templates, { autoescape: true });

    // views
    self.views = {
        page404: function (request, response) {
            response.writeHeader(404, {"Content-Type": "text/html"});  
            response.write("Page Not Found");  
            response.end();
        },
        page500: function (request, response, error) {
            response.writeHeader(500, {"Content-Type": "text/html"});  
            response.write("Server 500: " + error);  
            response.end();
        }
    }

    self.template = function(response, filename, data) {
        response.writeHeader(200, {"Content-Type": "text/html"});
        response.write(nunjucks.render(filename, data));
        response.end();
    }

    // urls 
    self.urls = {};

    // any server requests that post data should be sent here
    self.parseJson = function (request, response, callback) {
        jsonBody(request, response, function (err, body) {
            if (err) {
                console.log("Error with parseJson function " + err);
            }
            
            callback(body);
        });
    }

    // standard json response
    self.returnJson = function (response, json) {
        json = JSON.stringify(json);
        response.writeHeader(200, {"Content-Type": "application/json"}); 
        response.write(json);
        response.end();
    }

    self.requestHandler = (request, response) => {

        const url = self.urls[request.url];

        // If the url exists
        if (url && (!url.method || request.method.toLowerCase() == url.method.toLowerCase())) {
            
            // If url.controller is a string then look for the controller in self.views
            switch(typeof(url.controller)) {

                case "function":
                    return url.controller(request, response);
                
                case "string":
                    const controller= self.views[url.controller];

                    if(controller)
                        return controller(request, response);
                    else
                        console.error("Error: Controller not specified");
                    break;
                default:
                    console.error(`Error: Controller for the url ${request.url} is of the wrong type`);
            }

        }

        // Page not found error
        return self.views.page404(request, response);
    }

    //
    // Create a node-static server instance to serve the './public' folder
    //
    self.staticServer = new static.Server('./');

    const server = http.createServer(function onRequest(request, response) {
        if (request.url.includes("static")) {
            self.staticServer.serve(request, response);
        } else {
            self.requestHandler(request, response);
        }       
    });

    // error handler
    server.listen(port, (err) => {  
        if (err) {
            self.views.page500(request, response, err);
            return console.log('Page Not Found', err)
        }

        console.log(`Server is listening on ${port}`);
    })
}

exports = module.exports = createApplication;