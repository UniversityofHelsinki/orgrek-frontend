import React from 'react';
import { useTranslation } from 'react-i18next';
import HYLogo from './HYLogo';
import Grid2 from '@mui/material/Unstable_Grid2';
import Link from '@mui/material/Link';
import Typography from '@mui/material/Typography';
import ExternalLinkIcon from '../components/icons/ExternalLink';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import { visuallyHidden } from '@mui/utils';

const Footer = () => {
  const { t } = useTranslation();
  return (
    <Box component={'footer'} pt={6} pb={6} backgroundColor={'common.black'}>
      <Container>
        <Grid2 container>
          <Grid2 xs={12} sm={2} md={2} lg={1} pt={1} pb={2} pr={1}>
            <Box width={80} height={80}>
              <HYLogo />
            </Box>
          </Grid2>
          <Grid2 xs={12} sm={3} md={3} lg={2}>
            <Typography
              variant={'body1'}
              color={'common.white'}
              fontWeight={'bold'}
              pb={2}
            >
              {t('university_of_helsinki')}
            </Typography>
            <Typography variant={'body1'} color={'common.white'}>
              {t('hy_address_part1')}
              <br />
              {t('hy_address_part2')}
            </Typography>
            <Typography variant={'body1'} color={'common.white'} pt={2}>
              {t('hy_switchboard')}
            </Typography>
          </Grid2>
          <Grid2 xs={12} sm={1} md={1} lg={1} pt={2}></Grid2>
          <Grid2 xs={12} sm={6} md={5} lg={3}>
            <Link
              href={t('hy_contact_info_link')}
              target="_blank"
              rel="noreferrer noopener"
              variant={'navigationLink'}
              color={'common.white'}
              sx={{ textDecoration: 'none' }}
            >
              {t('hy_contact_info')}
              <Box sx={visuallyHidden}>{t('open_in_new_tab')}</Box>
              <ExternalLinkIcon
                sx={{ ml: 0.5 }}
                color={'inherit'}
                fontSize={'inherit'}
              />
            </Link>
            <br />
            <Link
              href={t('hy_accessibility_statement_link')}
              target="_blank"
              rel="noreferrer noopener"
              variant={'navigationLink'}
              color={'common.white'}
              sx={{ textDecoration: 'none' }}
            >
              {t('hy_accessibility_statement')}
              <Box sx={visuallyHidden}>{t('open_in_new_tab')}</Box>
              <ExternalLinkIcon
                sx={{ ml: 0.5 }}
                color={'inherit'}
                fontSize={'inherit'}
              />
            </Link>
          </Grid2>
          <Grid2 xs={12} sm={0} md={1} lg={5}></Grid2>
        </Grid2>
      </Container>
    </Box>
  );
};

export default Footer;
