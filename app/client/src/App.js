import { BrowserRouter, Routes, Route, NavLink } from 'react-router-dom';
import Home from './components/Home';
import './App.css';

const App = () => {
  return (
    <BrowserRouter>
      <nav>
        <h1>Photo Gallery App</h1>
        <NavLink to="/">Home</NavLink>
        <NavLink to="about">About</NavLink>
      </nav>
      <Routes>
          <Route path="/" element={<Home />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
