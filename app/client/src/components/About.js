// This component provides a quick description of the project and the tech
// used to create it
const About = () => {
  return(
    <div className="container">
      <h1>ESD 112 Junior Web Dev Activity</h1>
      <br />
      <div className="project-info">
        <h2>Requirements:</h2>
          <ol>
            <li>Use the Flickr image API endpoint to displays a page of images corresponding to the tags or author selected.</li>
            <li>Display the description, author, and tags below each image.</li>
            <li>Make each author and tag clickable. When clicked, update the gallery to only show images belonging to the specific author or tag clicked.</li>
          </ol>
      </div>
      <div className="project-info">
        <h2>Tech Stack:</h2>
          <ul>
            <li>Frontend: React, CSS, Axios</li>
            <li>Backend: Node.js, Express.js</li>
            <li>Testing Libraries: Jest, React Testing Library</li>
          </ul>
      </div>
      <div className="project-info">
        <h2>Instructions to Run:</h2>
        <ol>
          <li>Open up 2 terminals.</li>
          <li>In 1 terminal cd to app/client and in the other terminal, cd to app/server.</li>
          <li>Run 'npm i' or 'npm install' to install all project dependencies for frontend and backend.</li>
          <li>In the app/server directory, run 'npm run dev' to start up the express server.</li>
          <li>In the app/client directory, run 'npm start' to start up the client.</li>
          <li>Play around and click on authors and tags to change the photo feed.</li>
        </ol>
      </div>
      <div className="project-info">
        <h2>Extras</h2>
        <ul>
          <li>Documentation of my approach:
            <a href="https://docs.google.com/document/d/1PTLstupRVe5WwW8U4-bcjKEaK-PqE-UJ21hZGa002fk/edit?usp=sharing"> Google Doc</a>
          </li>
          <li>My Trello Kanban board to prioritize tasks:
            <a href="https://trello.com/invite/b/jV0wSItE/98dcebdfc6825f78748e6bbe8ba9023c/esd-112-junior-web-dev-activity"> Trello Board</a>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default About;