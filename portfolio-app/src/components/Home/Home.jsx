import './Home.css';
import profileImg from '../../assets/pic 2.jpg';

function Home() {
  return (
    <header id="header" className="header">
      <div className="hero">
        <div className="hero-content">
          <div className="name">
            <h1>Hi, I'm <span>Mahlet</span></h1>
            <h2>A Front-End Web Developer</h2>
            <p>
              I'm Mahlet Chanyalew, a Front-End Website Developer based in
              Dessie, Ethiopia. I specialize in creating admirable and amazing
              websites with modern design principles.
            </p>
            <div className="link">
              <a href="#contacts">Contact me</a>
            </div>
          </div>
          <div className="hero-image">
            <img src={profileImg} alt="Mahlet Profile" />
          </div>
        </div>
      </div>
    </header>
  );
}

export default Home;
