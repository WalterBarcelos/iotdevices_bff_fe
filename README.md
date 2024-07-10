# BFF and FE Devices Microservice 
Senior Software Developer Technical Assessment PART II. 

This project is composed by:
- [BE  -> Spring Boot](https://github.com/WalterBarcelos/iotdevices_be) (Must be up and running before trying BFF and FE)
- BFF and FE -> NestJS app and ReactJS app respectively (this)

## Table of Contents

- [Installation](#installation)
- [Usage](#usage)
- [Flow](#Flow)

## Installation

Make sure you have Docker running. Download to your project directory, go to your root project dir and run:
```
docker-compose build
docker-compose up
```

It will download and start all the necessary services to run this project, which are:
- BFF NestJS app
- FE ReactJS app

## Usage

You should have the following urls available:

- FE application: `http://localhost:82`
- BFF application: `http://localhost:3000`

The following endpoint should work correctly by using any http client:

##### Public URL
- POST   `http://localhost:82/login` Login using username `testuser`and password `password`

## Flow

![Alt text](/diagram.jpeg)

1. User Login in FE (ReactJS):

The user enters their credentials (username `testuser` and password `password`) in a login form.
The credentials are sent to Keycloak to perform authentication.
Upon successful authentication, Keycloak returns a JWT token to the frontend.

2. Using JWT Token in FE:

The frontend (ReactJS) stores the JWT token (in localStorage).
The frontend uses this JWT token to make authenticated requests to the BFF (Backend For Frontend) NestJS application.

3. Handling JWT Token in BFF (NestJS):

The BFF receives the JWT token from the frontend in the authorization header of each request.
The BFF validates the JWT token to ensure it is valid.
After validation, the BFF uses the same JWT token to make requests to the Spring Boot backend API.

4. BE (Spring Boot) Checks Permissions:

The Spring Boot backend receives the request with the JWT token from the BFF.
The Spring Boot backend checks the token against Keycloak to validate the user’s role and permissions.
Based on the permissions, the Spring Boot backend processes the request and returns the appropriate response. In this simple example, we only check if the user is valid as we have no permissions defined.

5. BFF Processes Response and Serves via GraphQL:

The BFF processes the response from the Spring Boot backend.
The BFF uses GraphQL to serve the processed data to the frontend.

6. FE Displays Data to User:

The frontend (ReactJS) receives the data via GraphQL from the BFF.
The data is displayed to the user.