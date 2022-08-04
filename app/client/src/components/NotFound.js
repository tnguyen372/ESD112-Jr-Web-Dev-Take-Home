import { Link } from 'react-router-dom';

const NotFound = () => {
  return(
    <div className="container">
      <h1>Undefined route! It's dangerous to be alone!</h1>
      <Link to="/"><button>Head back to safety</button></Link>
    </div>
  )
};

export default NotFound;