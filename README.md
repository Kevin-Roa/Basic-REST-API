# **Nodejs RESTful API**

## Description

> A RESTful web API built on Nodejs using a tutorial by Academind. Allows for GET, PUT, POST, PATCH, and DELETE requests to specific routes and saves the data on a MongoDB database.

## What I Learned

- The basics of making a RESTful API in Nodejs
  - Structure of API
  - Process of making new routes, models, etc...
  - Useage of express
  - Basic error handling
  - File upload/download
- User signup/login system
  - Password encryption using bcrypt
  - Token based authentication using jwt
- Using MongoDB
  - Logic required for using a database
  - Process of connecting database to the API
  - Usage of mongoose

## How to Use
- Clone the repo
- Run npm install
- Create a .env file in the main directory and enter your MongoDB url and JWT key
  - DATABASE_URL = (url)
  - JWT_KEY = (secret key)
- Run npm start
- Create a new user by sending a POST request to localhost:3000/user/signup
  - send { "email": "(email@email.com)", "password": "(pass)"} as the body
- Login to the new user by sending a POST request to localhost:3000/user/login
  - send { "email": "(email@email.com)", "password": "(pass)"} as the body
  - copy the token it returns
- Place the auth token in the Authorization section of the request headers with "Bearer " in front
  - ex: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InRlc3Q1QHR...
  - This token lasts 1hr before needing to login again
- Now you may make requests to any of the routes
