#REST API

Beers and Brewers

To Use:
-clone github file
-npm install
-node server.js

#Authentication

How to Use Authentication:

To access end w authentication:
superagent localhost:3000/api/democrats post '{"name":"testDem"}' -H "token:gibberish"

- use token to auth route
- -H saves to header

To signin:
superagent localhost:3000/api/signin -u username:password

To signup:
superagent localhost:3000/api/signup post '{"email":"test@gmail.com", "password":"foobar12345"}'
