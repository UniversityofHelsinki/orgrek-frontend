import React from 'react';
import { useTranslation } from 'react-i18next';
import { styled } from '@mui/material/styles';
import Logo from '../images/hy-logo.svg';
import HYLogo from './HYLogo';
import Grid2 from '@mui/material/Unstable_Grid2';
import Link from '@mui/material/Link';
import Typography from '@mui/material/Typography';
import ExternalLinkIcon from '../components/icons/ExternalLink';
import Box from '@mui/material/Box';

const Linkki = styled(Link)(({ theme }) => ({
  backgroundColor: theme.palette.common.black,
  textColor: theme.palette.common.white,
}));

const FooterV2 = () => {
  const { t } = useTranslation();
  return (
    <Grid2
      container
      component={'footer'}
      pt={5}
      pb={5}
      backgroundColor={'common.black'}
    >
      <Grid2 xs={12} sm={1}></Grid2>
      <Grid2 xs={6} sm={1}>
        <img src={Logo} alt="{t('hy_logo')}" width={'65%'} />
        {/*<Box width={50} height={50}>*/}
        {/*  <HYLogo />*/}
        {/*</Box>*/}
      </Grid2>
      <Grid2 xs={6} sm={2}>
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
      <Grid2 xs={6} sm={1}></Grid2>
      <Grid2 xs={6} sm={2}>
        <Link
          href={t('hy_contact_info_link')}
          target="_blank"
          rel="noreferrer noopener"
          variant={'navigationLink'}
          color={'common.white'}
        >
          {t('hy_contact_info')}{' '}
          <span className="screen-reader-only">{t('open_in_new_tab')}</span>
          <ExternalLinkIcon color={'inherit'} fontSize={'inherit'} />
        </Link>
        <br />
        <Link
          href={t('hy_terms_of_use_link')}
          target="_blank"
          rel="noreferrer noopener"
          variant={'navigationLink'}
          color={'common.white'}
          sx={{ textDecoration: 'none' }}
        >
          {t('hy_terms_of_use')}{' '}
          <span className="screen-reader-only">{t('open_in_new_tab')}</span>
          <ExternalLinkIcon color={'inherit'} fontSize={'inherit'} />
        </Link>
        <br />
        <Link
          href={t('hy_organisation_instructions_link')}
          target="_blank"
          rel="noreferrer noopener"
          variant={'navigationLink'}
          color={'common.white'}
        >
          {t('hy_organisation_instructions')}{' '}
          <span className="screen-reader-only">{t('open_in_new_tab')}</span>
          <ExternalLinkIcon color={'inherit'} fontSize={'inherit'} />
        </Link>
        <br />
        <Link
          href=""
          target="_blank"
          rel="noreferrer noopener"
          variant={'navigationLink'}
          color={'common.white'}
        >
          {t('hy_accessibility_statement')}{' '}
          <span className="screen-reader-only">{t('open_in_new_tab')}</span>
          <ExternalLinkIcon color={'inherit'} fontSize={'inherit'} />
        </Link>
      </Grid2>
      <Grid2 xs={6} sm={5}></Grid2>
    </Grid2>
  );
};

export default FooterV2;
