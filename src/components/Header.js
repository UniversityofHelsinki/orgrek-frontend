import React from 'react';
import { useTranslation } from 'react-i18next';
import { Nav, Navbar, Container, NavDropdown } from 'react-bootstrap';
import HyLogo from './HYLogo';
import { connect } from 'react-redux';
import styled from 'styled-components';
import { NavLink } from 'react-router-dom';
import { isAdmin } from '../actions/userAction';

const Div = styled.div`
  max-height: 60px;
  min-height: 60px;
`;

const Header = (props) => {
  const { t, i18n } = useTranslation();
  return (
    <div>
      <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
        <Container fluid>
          <HyLogo />
          <Navbar.Brand>{t('organisational_registry')}</Navbar.Brand>
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className="me-auto">
              <NavDropdown
                title={t('text_language_header')}
                id="collasible-nav-dropdown"
              >
                <NavDropdown.Item onClick={() => i18n.changeLanguage('fi')}>
                  {t('finnish')}
                </NavDropdown.Item>
                <NavDropdown.Item onClick={() => i18n.changeLanguage('sv')}>
                  {t('swedish')}
                </NavDropdown.Item>
                <NavDropdown.Item onClick={() => i18n.changeLanguage('en')}>
                  {t('english')}
                </NavDropdown.Item>
                <NavDropdown.Item onClick={() => i18n.changeLanguage('ia')}>
                  {t('text_key')}
                </NavDropdown.Item>
              </NavDropdown>
              <NavLink className="nav-link" to="/">
                {' '}
                {t('organisation')}{' '}
              </NavLink>
              {isAdmin(props.user) ? (
                <NavLink className="nav-link" to="/texts">
                  {' '}
                  {t('texts')}{' '}
                </NavLink>
              ) : null}
              {isAdmin(props.user) ? (
                <NavLink className="nav-link" to="/hierarchyfilters">
                  {' '}
                  {t('hierarchy_filters')}{' '}
                </NavLink>
              ) : null}
            </Nav>
            <Nav>
              <Nav.Link eventKey="disabled" disabled>
                {props.user ? t('logged_in') + ' ' + props.user.eppn : ''}
              </Nav.Link>
              <Nav.Link href="/Shibboleth.sso/Logout">{t('logout')}</Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </div>
  );
};

const mapStateToProps = (state) => ({
  user: state.ur.user,
});

export default connect(mapStateToProps, null)(Header);
