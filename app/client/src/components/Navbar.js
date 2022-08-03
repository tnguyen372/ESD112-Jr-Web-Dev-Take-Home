import '../css/nav.css';

export default function Navbar() {
  return(
    <div>
      <nav className="nav">
        <a href="/" className="photo-gallery">Photo Gallery</a>
        <a href="/about">About</a>
      </nav>
    </div>
  )
}