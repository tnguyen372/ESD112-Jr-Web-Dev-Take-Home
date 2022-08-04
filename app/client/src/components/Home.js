import Feed from './Feed';

const Home = () => {
  

  // Renders the entire Home component here
  return (
    <div className="container">
      <h1>Welcome to the photo gallery. Enjoy your stay!</h1>
      <main>
        <Feed />
      </main>
    </div>
  );
};

// Allow this component to be imported anywhere to be reused by exporting it
export default Home;