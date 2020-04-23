# [Node/Express CSV PARSER App]

This app basically parses a CSV data and validate each type of data (name,stars and uri) 
and returns it in two output formats:
1) DataTables
2) JSON 

# Getting started

To get the Node server running locally:

- Clone this repo
- `npm install` to install all required dependencies
- `DEBUG=csvparser:* nodemon ./bin/www` to start the local server
- NAVIGATE to localhost:3000 to start using the app

## Dependencies

- [expressjs](https://github.com/expressjs/express) - The server for handling and routing HTTP requests
- [csv](https://github.com/adaltas/node-csv)   - This is used for parsing the CSV.
- [pug](https://github.com/pugjs/pug)   - Pug is being used for the views
- [is-url](https://github.com/segmentio/is-url)    - it is used for validating the url format 

## Application Structure

- `app.js` - The entry point to our application. This file defines our express server. It also requires the routes.
- `routes/` - This folder contains the route definitions for our API.
- `controllers` - This folder contains the functions for the endpoints.
- `public` - Contains the Jquery, Bootstrap files 
- `public/javascript/index.js` - Contains logic for the Screen Loader and handling data for DataTables
- `csvTesting.csv` - this is the unit test file for the csv parser 
