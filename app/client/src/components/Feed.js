import { useState, useEffect, Fragment } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import '../css/index.css';
// Source: https://www.npmjs.com/package/html-react-parser
import parse from 'html-react-parser';

const Feed = () => {
  // State handler variables to track state of photo feed, author, author ID, or tag
  // Updates the photo feed accordingly
  let [photos, setPhotos] = useState([]);
  const [author, setAuthor] = useState('');
  const [authorID, setAuthorID] = useState('');
  const [tag, setTag] = useState('');
  const MAX_NUM_POSTS = 20;
  /* 
    Purpose: Upon this component mounting and initially rendering, call the 
    getPhotos API endpoint to grab a photo feed from the Flickr public photos feed
    Parameters: None
    Returns: A Flickr photo feed via an array of item objects 
  */
  const getPhotos = () => {
    // Call the getPhotos endpoint to get all the photos stored in the Flickr public photo feed
    axios.get('/api/getPhotos')
      .then ((response) => {
        // If status wasn't ok, then alert of error before trying to update state
        if (response.status !== 200) {
          throw new Error(`HTTP error encountered: Status code is ${response.status}`);
        };
        // Create a copy of the JSON response data sent from server, specifically the items array which contains photo objects
        photos = [...response.data];
        // Populate the photos array with the copy of the Flickr photo objects
        setPhotos(photos);
      })  // Catch any errors when calling the getPhotos endpoint
      .catch ((error) => {
        console.log(`Error status: ${error.status}`);
      });
  };
  /* 
    Purpose: Call the author filter API endpoint to show a Flickr photo feed of a specific author
    Parameters: None
    Returns: A specific author's Flickr photo feed
  */
  const getAuthorPhotos = () => {
    // Call the getPhotos endpoint to get all the photos stored in the Flickr public photo feed
    axios.get(`/api/author/${authorID}`)
      .then ((response) => {
        // If status wasn't ok, then alert of error before trying to update state
        if (response.status !== 200) {
          throw new Error(`HTTP error encountered: Status code is ${response.status}`);
        };
        // Create a copy of the JSON response data sent from server, specifically the items array which contains photo objects
        photos = [...response.data];
        // Populate the photos array with the copy of the Flickr photo objects
        setPhotos(photos);
      })  // Catch any errors when calling the getPhotos endpoint
      .catch ((error) => {
        console.log(`Error status: ${error.status}`);
      });
  };
  /* 
    Purpose: Call the tag filter API endpoint to show a Flickr photo feed of a specific tag
    Parameters: None
    Returns: A specific tag's Flickr photo feed
  */
  const getTagPhotos = () => {
    // Call the getPhotos endpoint to get all the photos stored in the Flickr public photo feed
    axios.get(`/api/tag/${tag}`)
      .then ((response) => {
        // If status wasn't ok, then alert of error before trying to update state
        if (response.status !== 200) {
          throw new Error(`HTTP error encountered: Status code is ${response.status}`);
        };
        // Create a copy of the JSON response data sent from server, specifically the items array which contains photo objects
        photos = [...response.data];
        // Populate the photos array with the copy of the Flickr photo objects
        setPhotos(photos);
      })  // Catch any errors when calling the getPhotos endpoint
      .catch ((error) => {
        console.log(`Error status: ${error.status}`);
      });
  };
  /* 
    Purpose: Event handler function to set the author state
    Parameters: Button click event containing the author the user clicked on and author ID
    Returns: Nothing
  */
  const handleAuthor = (event, id) => {
    // Set the author/authorID clicked by the user then reset the tag state
    setAuthor(event.target.value);
    setAuthorID(id);
    setTag('');
  };

  /* 
    Purpose: Parses the author property in the photos object and returns the author's name
    Parameters: The photo object's author property string value and author_id property string ID
    Returns: The author's username as a button link containing the author ID to filter posts if clicked
  */
  const getAuthorInfo = (author, id) => {
    // Create a regular expression to parse the author
    const regex = /[("")]+/;
    /* 
      The author property string is formatted as: "nobody@flickr.com (\"{username}\")"
      Split each token into an array elem -> ["", "nobody@flickr.com", "{username}", ""]
      Then filter the array so that empty strings are removed -> ["nobody@flickr.com", "{username}"]
    */
    const parsedAuthorString = author.split(regex).filter((token) => { return token });
    // Get the author's name from the parsed author array
    const authorName = parsedAuthorString[1];
    // Return the author's name as a clickable button to display on frontend
    return (
      <Link to={`/author/${id}`}>
        <button className="author" value={authorName} onClick={(event) => {handleAuthor(event, id)}}>
          {authorName}
        </button>
      </Link>
    );
  };

  /* 
    Purpose: Event handler function to set the tag state
    Parameters: Button click event containing the tag the user clicked on
    Returns: Nothing
  */
  const handleTag = (event) => {
    // Set the tag clicked by the user then reset the author/authorID state
    setTag(event.target.value);
    setAuthor('');
    setAuthorID('');
  };

  /* 
    Purpose: Parses the tags property in the photos object into separate tags and returns a list of button links
    Parameters: Tags property string value
    Returns: A list of tag button links that redirect user to a gallery of posts containing only those tags if clicked
  */
  const splitTags = (tagString) => {
    // Store each individual tag into an array by splitting the original tag string, using space as a separator
    const tags = tagString.split(' ');
    // Return a list of tag button links
    return tags.map((tag, index) => {
      // Returns a clickable tag button link wrapped inside its own div. 
      return (
      <div className="tags" key={index}>
        <Link to={`/tag/${tag}`}>
          <button className="button" value={tag} onClick={handleTag}>{tag}</button>
        </Link>
      </div>
      );
    });
  };

  /* 
    Purpose: Extracts all relevant data of interest in each photo object 
    returned by the Flickr API endpoint to format it nicely on the frontend
    Parameters: Array of photo objects stored in the photos state variable
    Returns: A list of photo cards containing the photo, description, author,
    and tags, if any
  */
  const displayPhotos = photos.map((photo, item) => {
    /* 
      Parse the nested HTML elems stored in the photo description property into JSX.
      Exclude the image element nested inside the photo description to avoid duplicate images.
      Replaces the excluded img element with a React fragment.
      Sources: https://www.npmjs.com/package/html-react-parser under the 'replace and remove element'
      section and https://reactjs.org/docs/fragments.html.
    */
    const description = parse(photo.description, {
      // Use the img src attribute to match with the photo post media image and exclude it
      // from rendering by replacing it with a fragment 
      replace: ({ attribs }) => attribs && attribs.src === photo.media.m && <Fragment></Fragment>
    });
    
    // Parse the author property string value to extract only the username
    const author = getAuthorInfo(photo.author, photo.author_id);
    
    // Initialize tag variable to empty string then reassign it a value of 'None' or a tag list
    
    // If photo post contains no tags, explicityly state to user there are no tags
    // if (photo.tags === '') {
    //   tags = 'None';
    // }
    // // Otherwise split the entire tag string into separate tag button links to click on  
    // else {
    //   tags = splitTags(photo.tags);
    // }
    // Return a list of photo cards that contain the photo, description, author, and applicable tags  
    return (
      <div className="photo-card" key={item}>
        {/* Image */}
        <div className="photo-content">
          <img src={photo.media.m} alt=""/>
        </div>
        {/* Photo post description */}
        <div className="photo-content">
          <h2>Description:</h2>
          <br />
            {description}
        </div>
        {/* Photo post author */}
        <div className="photo-content">
          <h2>Author: {author}</h2>
        </div>
        {/* Photo post tags */}
        <div className="photo-content">
          <h3>Tags:</h3>
          <div className="tag-container">
            {photo.tags === '' ? null : splitTags(photo.tags)}
          </div>
        </div>
      </div>
    )
  });
  
  // When home component first mounts and is initially rendered, runs a callback function
  // on all the functions contained within it
  useEffect(() => {
    // Get all photos when the home component is initially rendered
    // This will generate a side effect that depends on the results array
    // Base case: Author and Tag state is not set
    if (authorID === '' && tag === '') {
      getPhotos();
    }
    // Case: Author state was set
    else if (authorID !== '' && tag === '') {
      getAuthorPhotos();
    }
    // Case: Tag state was set  
    else {
      getTagPhotos();
    }
    /* 
      Re-Render the feed whenever any dependency value changes. Any state
      changes to author ID or tag controls when the Feed component re-renders.
      Without a dependency array, this component will infinitely loop.
      An empty dependency array guarantees any above callback function
      function runs only once on the first render. 
    */
  }, [authorID, tag]);

  // Returns a photo feed based on whether an author or tag was selected
  return(
    <div>
      { /* Display a message indicating there is no filter set */ }
      { author === '' && tag === '' ? <h1>Showing {MAX_NUM_POSTS} recent posts retrieved from Flickr!</h1> : null }
      { /* Display a message indicating there is a author filter set */ }
      { author !== '' ? <h1>Showing up to {MAX_NUM_POSTS} Flickr posts from {author}!</h1> : null }
      { /* Display a message indicating there is a tag filter set */ }
      { tag !== '' ? <h1>Showing up to {MAX_NUM_POSTS} Flickr posts containing the "{tag}" tag! </h1>: null }
      { /* Display a grid feed of photo posts containing all relevant data */ }
      <div className="photo-container">
        {displayPhotos}
      </div>
    </div>
  );
};

export default Feed;