##Client for your REST API
###Getting Started
Install dependencies, make a db directory for mongo, and startup the backend server
```
npm install
mkdir jimVermillion/db
mongod --dbpath=./jimVermillion/db --smallfiles
node jimVermillion/server.js
```
Then start the front-end server 
```
node jimVermillionFE/server.js
```
and visit the client in your browser: `localhost:5000`

###To Submit this Assignment

- fork this repository
- write all of your code in a folder containing your name
- push to your repository
- submit a pull request to this repository
- submit a link to your PR in canvas

###Description
Write an Angular client for the two-resource REST API that you built with Node and Express.

###Rubric

Proper use of $scope: 2 pts

Proper use of $http: 2 pts

Proper REST requests: 2 pts

CRUD methods: 4 pts
