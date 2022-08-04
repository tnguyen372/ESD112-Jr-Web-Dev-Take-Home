// Librry dependencies imported with ES6 module import syntax
import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import morgan from 'morgan';
import axios from 'axios';

// Initialize the express app and port number
const app = express();
const PORT = 3001;

// Create a logger middleware function for color coded response status codes to aid development
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
  Purpose: Grabs 20 recent posts that the Flickr API endpoint provides. It is initially called upon when
  the React frontend first renders
  Parameters: None
  Returns: Flickr feed JSON response data
*/
app.get('/api/getPhotos', (req, res) => {
  // Source: https://www.flickr.com/services/api/response.json.html under Callback Function section (Scroll all the way down to bottom page)
  // Appended additional parameter: 'nojsoncallback' set to a value of 1 because original API URL returned a function wrapper: 'jsonFlickrFeed'
  // Raw JSON is desired to send to the client, so parameter 'nojsoncallback' and a value of 1 removes 'jsonFlickrFeed' function wrapper
  const FLICKR_URL = `https://www.flickr.com/services/feeds/photos_public.gne?format=json&nojsoncallback=1&tagmode=any`;
  // Get the JSON data from Flickr to send over to client
  axios.get(FLICKR_URL)
    .then((response) => {
      // Send over the array of Flickr photo objects contained in the items property to the client
      res.send(response.data.items);
    })
    .catch((error) => {
      console.log(error);
    });
});

/*
  Purpose: Grabs up to 20 Flickr photo posts from a specific author
  Parameters: None
  Returns: Flickr feed JSON response data belonging to a specific author
*/
app.get('/api/author/:id', async function(req, res) {
  // Get the author id to filter the photo feed by author
  const authorID = req.params.id;

  // Append the author ID as a query parameter value to the Flickr API call
  const FLICKR_URL = `https://www.flickr.com/services/feeds/photos_public.gne?format=json&nojsoncallback=1&id=${authorID}&tagmode=any`;

  // Get the JSON data from Flickr to send over to client
  axios.get(FLICKR_URL)
  .then((response) => {
    // Send over the array of Flickr photo objects contained in the items property to the client
    res.send(response.data.items);
  })
  .catch((error) => {
    console.log(error);
  });
});

/*
  Purpose: Grabs up to 20 Flickr photo posts from a specific tag
  Parameters: None
  Returns: Flickr feed JSON response data belonging to a specific tag
*/
app.get('/api/tag/:tag', async function(req, res) {
  // Get the tag to filter the photo feed by tag
  const tag = req.params.tag;

  // Append the tag as a query parameter value to the Flickr API call
  const FLICKR_URL = `https://www.flickr.com/services/feeds/photos_public.gne?format=json&nojsoncallback=1&tags=${tag}&tagmode=any`;

  // Get the JSON data from Flickr to send over to client
  axios.get(FLICKR_URL)
  .then((response) => {
    // Send over the array of Flickr photo objects contained in the items property to the client
    res.send(response.data.items);
  })
  .catch((error) => {
    console.log(error);
  });
});

/*
  Purpose: Root route defining the home page
  Parameters: None
  Returns: A hello world message
*/
app.get('/', (req, res) => {
  res.send('Hello world!');
});

// Specify express app to listen on port 3001
app.listen(PORT, () => console.log(`Express server listening on port ${PORT}!`));