import { BrowserRouter, Routes, Route, NavLink } from 'react-router-dom';
import Home from './components/Home';
import Feed from './components/Feed';
import './App.css';


const App = () => {
  return (
    <BrowserRouter>
      <nav id="nav">
        <h1>Photo Gallery App</h1>
        <NavLink to="/" reloadDocument>Home</NavLink>
        <NavLink to="about">About</NavLink>
      </nav>
      <Routes>
          <Route path="/" element={<Home />}>
            <Route path="author/:authorID" element={<Feed/>} />
            <Route path="tag/:tagName" element={<Feed />} />
          </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
