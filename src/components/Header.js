import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import logo from '../assets/star_wars_logo.png'

function Header() {
    return (
        <Navbar className="bg-body-tertiary">
        <Container>
          <Navbar.Brand href="/react-star-wars">
            <img
              src={ logo }
              width="200"
              className="d-inline-block align-top"
              alt="Star Wars logo"
            />
          </Navbar.Brand>
        </Container>
      </Navbar>
    );
};

export default Header;