import { Link } from 'react-router-dom';
import './App.css';

const App = () => {
  return (
    <div>
      <nav>
        <Link to="gallery">Gallery</Link>
        <Link to="about">About</Link>
      </nav>
      <h1>Hello World</h1>
    </div>
  );
}

export default App;
