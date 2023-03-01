import React from 'react';
import { useTranslation } from 'react-i18next';
import Grid from '@mui/material/Unstable_Grid2';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import LanguageSelect from './LanguageSelect';
import Container from '@mui/material/Container';
import { visuallyHidden } from '@mui/utils';
import ExternalLinkIcon from './icons/ExternalLink';
import Link from '@mui/material/Link';
import AccountCircle from '@mui/icons-material/AccountCircle';
import useCurrentUser from '../hooks/useCurrentUser';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import NavLink from './NavLink';
import IfAdmin from './auth/IfAdmin';

const Header = () => {
  const { t } = useTranslation();
  const user = useCurrentUser();
  return (
    <Box component="header" pt={2} pb={0.5}>
      <Container>
        <Box>
          <Grid container>
            <Grid md={2} xs={12}>
              <Link
                href={t('hy_contact_info_link')}
                target="_blank"
                rel="noreferrer noopener"
                variant={'overline'}
                color={'text.secondary'}
                sx={{
                  textDecoration: 'none',
                  ':hover': { textDecoration: 'none', color: 'grey.700' },
                }}
              >
                {t('university_of_helsinki')}
                <Box sx={visuallyHidden}>{t('open_in_new_tab')}</Box>
                <ExternalLinkIcon
                  sx={{ ml: 0.5 }}
                  color={'inherit'}
                  fontSize={'inherit'}
                />
              </Link>
            </Grid>
            <Grid md={7} mdOffset={3} xs={12}>
              <Stack
                direction="row"
                alignItems="center"
                gap={1}
                justifyContent="flex-end"
              >
                <AccountCircle color={'action'} />
                <Typography variant={'body1'} component="span">
                  {user.displayName}
                </Typography>
                <Button href="/Shibboleth.sso/Logout" variant={'text'}>
                  {t('logout')}
                </Button>
                <LanguageSelect />
              </Stack>
            </Grid>
          </Grid>
        </Box>
        <Box sx={{ my: 5 }}>
          <Typography component="h1" variant="h2" textTransform="uppercase">
            {t('organisational_registry')}
          </Typography>
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
        <Container sx={{ height: '62px' }}>
          <NavLink text={t('organisation')} to={'/'} />
          <IfAdmin>
            <NavLink text={t('texts')} to={'/texts'} />
            <NavLink text={t('hierarchy_filters')} to={'/hierarchyfilters'} />
          </IfAdmin>
        </Container>
      </Box>
    </Box>
  );
};

export default Header;
