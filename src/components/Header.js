import React from 'react';
import { useTranslation } from 'react-i18next';
import { Nav, Navbar, Container, NavDropdown } from 'react-bootstrap';
import HyLogo from './HYLogo';


const Header = () => {
    const { t, i18n } = useTranslation();
    return (
        <div>
            <Navbar fixed="top" collapseOnSelect expand="lg" bg="dark" variant="dark">
                <Container fluid>
                    <HyLogo />
                    <Navbar.Brand href="#home">Organisaatiorekisteri</Navbar.Brand>
                    <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                    <Navbar.Collapse id="responsive-navbar-nav">
                        <Nav className="me-auto">
                            <NavDropdown title="Kieli" id="collasible-nav-dropdown">
                                <NavDropdown.Item>Suomeksi</NavDropdown.Item>
                                <NavDropdown.Item>In English</NavDropdown.Item>
                                <NavDropdown.Item>På Svenska</NavDropdown.Item>
                            </NavDropdown>
                        </Nav>
                        <Nav>
                            <Nav.Link>Logged In : </Nav.Link>
                            <Nav.Link>
                                Logout
                            </Nav.Link>
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        </div>
    );
};

export default Header;
