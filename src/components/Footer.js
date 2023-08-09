import React from 'react';
import { useTranslation } from 'react-i18next';
import HYLogo from './HYLogo';
import Grid2 from '@mui/material/Unstable_Grid2';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';

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
          <Grid2 xs={12} sm={6} md={5} lg={3}></Grid2>
          <Grid2 xs={12} sm={0} md={1} lg={5}></Grid2>
        </Grid2>
      </Container>
    </Box>
  );
};

export default Footer;
