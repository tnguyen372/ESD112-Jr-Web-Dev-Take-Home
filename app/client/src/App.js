import { BrowserRouter, Routes, Route, NavLink } from 'react-router-dom';
import Home from './components/Home';
import Feed from './components/Feed';
import NotFound from './components/NotFound';
import './App.css';


const App = () => {
  return (
    <BrowserRouter>
      <nav id="nav">
        <h1>Photo Gallery App</h1>
        { 
        /* 
          The 'reloadDocument' prop in the NavLink component skips client side routing 
          to give it the effect of <a href>. Source: https://reactrouter.com/docs/en/v6/components/link
        */
        }
        <NavLink to="/" reloadDocument>Home</NavLink>
        <NavLink to="about">About</NavLink>
      </nav>
      { /* Define the routes and components to render at the paths specified. Nested routes inherit the parent path */ }
      <Routes>
          <Route path="/" element={<Home />}>
          { /* The 2 nested routes have a path of '/author/:authorID' and '/tag/:tag' respectively */ }
            <Route path="author/:authorID" element={<Feed/>} />
            <Route path="tag/:tag" element={<Feed />} />
          </Route>
          <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
