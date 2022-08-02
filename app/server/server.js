// Librry dependencies imported with ES6 module import syntax
import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import morgan from 'morgan';
import axios from 'axios';

// Initialize the express app and port number
const app = express();
const PORT = 3001;

// Create a logger middleware function for color coded response status codes
const logger = morgan('dev');
app.use(logger);

app.use(bodyParser.json());

// Define the CORS policy so that API requests to Flickr will not be blocked by CORS
// This CORS configuration uses default config except localhost port 3000 is specified to allow requests from React client
app.use(cors({
  "origin": 'http://localhost:3000',
  "methods": "GET, HEAD, PUT, PATCH, POST, DELETE",
  "preflightContinue": false,
  "optionsSuccessStatus": 204
}));

/*
  Purpose: Grabs all the photos that the Flickr API endpoint provides. It is initially called upon when
  the React frontend first renders
  Input: None
  Output: Flickr Feed JSON response data
  Error Messages: None
  Author: Thomas Nguyen
*/
app.get('/api/getPhotos', (req, res) => {
  
  // Appended additional parameter: 'nojsoncallback' set to value of 1 because original API URL returned a function wrapper: jsonFlickrFeed
  // Raw JSON is desired to send to the client, so parameter 'nojsoncallback' and a value of 1 removes jsonFlickrFeed function wrapper
  axios.get('https://www.flickr.com/services/feeds/photos_public.gne?format=json&nojsoncallback=1')
    .then((response) => {
      // Send over the array of Flickr photo objects contained in the items property to the client
      res.send(response.data.items);
    })
    .catch((error) => {
      console.log(error);
    });
    
});

app.get('/', (req, res) => {
  res.send('Hello world!');
});

// Specify express app to listen on port 3001
app.listen(PORT, () => console.log(`Express server listening on port ${PORT}!`));