assignment_building_the_express_router
======================================

Build the core features of the Express router

## Maddie Rajavasireddy

### Assignment description:   
1. Hello Express Router: implement an Express module that creates an app object and enables it to:    
     Register GET routes with associated callbacks with app.get()   
     Start up a server with app.listen()    
2. Parsing Path Patterns: set up a path parser to take a given path pattern (e.g. /foo/:bar) and parse it into an object usable by the router.        
    For each given pattern, your router needs:    
        - A way to match a URL path to the pattern    
        - A way to extract parameters from the URL    
        - A way to give those parameter values the names from the pattern (e.g. the pattern /foo/:bar would match /foo/1 and yield { bar: 1 } as the params)    
3. Parametrized Routing: set up the router to allow parameterized routing for GET requests.    
    Use your path pattern parser to parse a given pattern passed to app.get    
    Save the result so that when your server receives a request it can check if it matches that pattern    
        - Check both the method and URL of the request object (i.e. req.method and req.url)    
    When a request is received by the server, use the saved regex and parameter names to check if that request URL matches the pattern    
        - The app may have many different patterns so you'll have to iterate over them and use the first one that matches   
    When you find a pattern that matches:    
        - Extract the named parameters from the URL and attach them to the req object as req.params (req.params should be an object where each key is the parameter name and the value is the value from the request URL)     
        - Invoke the callback that was passed with it when you called app.get(pathPattern, callback)    
    Be sure to pass that callback the req and res objects    
    Verify that you can invoke the callbacks given to the following routes and extract their named parameters with the correct values:    
        - /foo/:bar/    
        - /foo/:bar/fiz/:baz    
4. Enabling POST requests:    
    Now enable app.post to register callbacks for the paths it is passed    
        - This should register a route with the router with an associated callback the same way app.get was  implemented     
    Verify you can send a POST request to your app and the correct callback is invoked    
5. Parsing POST Data:    
    Enable the application to parse POST data into an object        
    Attach the parsed object onto the req as req.body      
    Verify that one can submit shallow POST data (e.g. foo=bar) and it results in the correct object being created at req.body   
        - Note don't attempt to parse nested POST data here (e.g. foo[bar]=fiz)
You can send a POST request to your server via the command-line with curl like this: $ curl -d "foo=bar" http://localhost:3000  6. Enabling RESTful HTTP Methods:   
    Enable the app object to support the following methods:    
        - app.put    
        - app.patch    
        - app.delete    
    These should all register a route with the router with an associated callback the same way app.get was implemented    
    Verify that one can submit a request to the server using each of these HTTP methods
