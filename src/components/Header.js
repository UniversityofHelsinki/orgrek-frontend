import React from 'react';
import { useTranslation } from 'react-i18next';
import { connect } from 'react-redux';
import Grid from '@mui/material/Unstable_Grid2';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import LanguageSelect from './LanguageSelect';
import Container from '@mui/material/Container';

const Header = (props) => {
  const { t, i18n } = useTranslation();
  return (
    <Box component="header" pt={2}>
      <Container>
        <Box>
          <Grid container>
            <Grid lg={2} xs={12}>
              <Typography variant="overline">Helsingin Yliopisto</Typography>
            </Grid>
            <Grid lg={3} lgOffset={6} xs={12}>
              afafs
            </Grid>
            <Grid lg={1} xs={12}>
              <LanguageSelect />
            </Grid>
          </Grid>
        </Box>
        <Box sx={{ my: 5 }}>
          <Typography variant="h1">{t('organisational_registry')}</Typography>
        </Box>
      </Container>
      <Box
        component="nav"
        sx={{
          backgroundColor: 'grey.50',
          borderTop: 1,
          borderBottom: 1,
          borderColor: 'divider',
        }}
      >
        sdfsdfs
      </Box>
      {/*<Navbar collapseOnSelect expand="lg">
            <Navbar.Toggle aria-controls="responsive-navbar-nav" />
            <Navbar.Collapse id="responsive-navbar-nav">
              <Nav className="me-auto">
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
        </Navbar>*/}
    </Box>
  );
};

const mapStateToProps = (state) => ({
  user: state.ur.user,
});

export default connect(mapStateToProps, null)(Header);
