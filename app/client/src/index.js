import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route, NavLink } from 'react-router-dom';
import './index.css';
import App from './App';
import Gallery from './components/Gallery';
import reportWebVitals from './reportWebVitals';

const root = ReactDOM.createRoot(document.getElementById('root'));

/* 
  Renders the entire react app into a browser router component
  BrowserRouter provides us access to the browser's address bar, which can give us information 
  about the URL parameters or navigate programmatically using the browser's built-in history stack
*/
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <nav>
        <h1>Photo Gallery App</h1>
        {/* <Link to="/">Home</Link> */}
        <NavLink to="/">Gallery</NavLink>
        <NavLink to="about">About</NavLink>
      </nav>
        <Routes>
          {/* <Route path="/" element={<App />} /> */}
          <Route path="/" element={<Gallery />} />
          
          
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
