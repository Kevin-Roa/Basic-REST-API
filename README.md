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
1. Clone the repo
2. Run npm install
2. Create a .env file in the main directory and enter your MongoDB url and JWT key
  1. DATABASE_URL = (url)
  2. JWT_KEY = (secret key)
3. Run npm start
4. Create a new user by sending a POST request to localhost:3000/user/signup
  1. send { "email": "(email@email.com)", "password": "(pass)"} as the body
6. Login to the new user by sending a POST request to localhost:3000/user/login
  1. send { "email": "(email@email.com)", "password": "(pass)"} as the body
  2. copy the token it returns
5. Place the auth token in the Authorization section of the request headers with "Bearer " in front
  1. ex: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InRlc3Q1QHRlc3QuY29tIiwidXNlcklkIjoiNWZiZjBkZTljZjBkZjA4NGI3NmFhYjU1IiwiaWF0IjoxNjA2MzU3NTQzLCJleHAiOjE2MDYzNjExNDN9.UzAr1owwDINhSNvaySmUDyD-OVnWpP5o6P93brZyA9I
  2. This token lasts 1hr before needing to login again
6. Now you may make requests to any of the routes
