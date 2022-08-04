// Library dependencies and component imports
import { BrowserRouter, Routes, Route, NavLink } from 'react-router-dom';
import Home from './components/Home';
import About from './components/About';
import Feed from './components/Feed';
import NotFound from './components/NotFound';
import './css/App.css';

// Beginning of entire app starts here
const App = () => {
  return (
    /* 
      Renders the entire react app into a browser router component
      BrowserRouter provides us access to the browser's address bar, which can give us information 
      about the URL parameters or navigate programmatically using the browser's built-in history stack
    */
    <BrowserRouter>
      <nav className="nav">
        <h1>Photo Gallery App</h1>
        { 
        /* 
          The 'reloadDocument' prop in the NavLink component skips client side routing 
          to give it the effect of <a href>. Source: https://reactrouter.com/docs/en/v6/components/link
        */
        }
        <NavLink to="/" reloadDocument>Home</NavLink>
        <NavLink to="/about" reloadDocument>About</NavLink>
      </nav>
      { /* Define the routes and components to render at the paths specified. Nested routes inherit the parent path */ }
      <Routes>
          <Route path="/" element={<Home />}>
          { /* The 2 nested routes have a path of '/author/:authorID' and '/tag/:tag' respectively */ }
            <Route path="author/:authorID" element={<Feed/>} />
            <Route path="tag/:tag" element={<Feed />} />
          </Route>
          <Route path="about" element={<About />} />
          <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
