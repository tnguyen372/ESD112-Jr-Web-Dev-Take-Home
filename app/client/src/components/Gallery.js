import { useState, useEffect } from 'react';
import axios from 'axios';
import '../index.css';

const Gallery = () => {
  // State handlers
  let [photos, setPhotos] = useState([]);
  
  function getPhotos() {
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
      })
      .catch ((error) => {
        console.log(`Error status: ${error.status}`);
      });
  }

  function displayPhotos() {
    return photos.map((photo, item) => {
      return (
        <div className="photos" key={item}>
          <img src={photo.media.m} />
          <div className="photo-content">
            <h2>Description: {photo.description}</h2>
          </div>
          <div className="photo-content">
            <h4>Author: {photo.author}</h4>
          </div>
          <div className="photo-content">
            <h4>Tags: {photo.tags}</h4>
          </div>
        </div>
      )
    })
  }

  // When gallery component first mounts and is initially rendered, runs a callback function
  // on all the functions contained within it
  useEffect(() => {
    // Get all photos when the gallery component is initially rendered
    // This will generate a side effect that depends on the results array
    getPhotos();

    /* 
      Render the gallery page whenever any dependency value changes. 
      Without a dependency array, this component will infinitely loop
      In this case, an empty dependency array guarantees the getPhotos
      function runs only once. Any values inside the dependency array 
      allows control over when the component re-renders
    */
  }, []);

  return (
    <div className="container">
      <h1>Welcome to the photo gallery! Enjoy your stay!</h1>
      <main>
        <div className="photo-container">
          {displayPhotos()}
        </div>
      </main>
    </div>
    
  );
};


export default Gallery;