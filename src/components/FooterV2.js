import React from 'react';
import { useTranslation } from 'react-i18next';
import { styled } from '@mui/material/styles';
import Logo from '../images/hy-logo.svg';
import Box from '@mui/material/Box';
import Grid2 from '@mui/material/Unstable_Grid2';
import Link from '@mui/material/Link';
import OpenInNew from '@mui/icons-material/OpenInNew';
import Typography from '@mui/material/Typography';

const Grid = styled(Grid2)(({ theme }) => ({
  backgroundColor: theme.palette.common.black,
  textColor: theme.palette.common.white,
}));

// const Linkki = styled(Link)(({ theme }) => ({
//   color: theme.palette.common.white,
//   fontWeight: 'bold',
//   fontSize: '12px',
//   textDecoration: 'none',
//   lineHeight: 2,
//   ':hover': {
//     textDecoration: 'underline',
//     color: theme.palette.common.white,
//   },
// }));

const Foot = styled('footer')(({ theme }) => ({
  // backgroundColor: theme.palette.common.black,
}));

const BoldText = styled('p')(({ theme }) => ({
  color: theme.palette.common.white,
  fontWeight: 'bold',
}));

const Text = styled('p')(({ theme }) => ({
  color: theme.palette.common.white,
}));

const OpenInNewTabIcon = styled(OpenInNew)(({ theme }) => ({
  fontSize: '1em',
  color: theme.palette.common.white,
}));

// const Item = styled(Card)(({ theme }) => ({
//   backgroundColor: theme.palette.common.black,
//   textColor: theme.palette.common.white,
// }));

const FooterV2 = () => {
  const { t } = useTranslation();
  return (
    <Foot>
      <Grid2
        container
        height={'200px'}
        paddingTop={'40px'}
        backgroundColor={'#000'}
      >
        <Grid2 xs={1}></Grid2>
        <Grid2 xs={1}>
          <img src={Logo} alt="{t('hy_logo')}" width={'65%'} />
        </Grid2>
        <Grid2 xs={2}>
          <Box>
            <Typography variant={'bold_body1'} color={'#FFF'}>
              {t('university_of_helsinki')}
            </Typography>
            <br /> <br />
            <Typography variant={'body1'} color={'#FFF'}>
              {t('hy_address_part1')}
              <br />
              {t('hy_address_part2')}
            </Typography>
            <br />
            <Typography variant={'body1'} color={'#FFF'}>
              {t('hy_switchboard')}
            </Typography>
          </Box>
        </Grid2>
        <Grid2 xs={1}></Grid2>
        <Grid2 xs={3}>
          <Box>
            <Link
              href={t('hy_contact_info_link')}
              target="_blank"
              rel="noreferrer noopener"
              variant={'navigationLink'}
              color={'#FFF'}
            >
              {t('hy_contact_info')}
              <span className="screen-reader-only">{t('open_in_new_tab')}</span>
            </Link>{' '}
            <OpenInNewTabIcon />
            <br />
            <Link
              href={t('hy_terms_of_use_link')}
              target="_blank"
              rel="noreferrer noopener"
              variant={'navigationLink'}
              color={'#FFF'}
            >
              {t('hy_terms_of_use')}
              <span className="screen-reader-only">{t('open_in_new_tab')}</span>
            </Link>{' '}
            <OpenInNewTabIcon />
            <br />
            <Link
              href={t('hy_organisation_instructions_link')}
              target="_blank"
              rel="noreferrer noopener"
              variant={'navigationLink'}
              color={'#FFF'}
            >
              {t('hy_organisation_instructions')}
              <span className="screen-reader-only">{t('open_in_new_tab')}</span>
            </Link>{' '}
            <OpenInNewTabIcon />
            <br />
            <Link
              href=""
              target="_blank"
              rel="noreferrer noopener"
              variant={'navigationLink'}
              color={'#FFF'}
            >
              {t('hy_accessibility_statement')}
              <span className="screen-reader-only">{t('open_in_new_tab')}</span>
            </Link>{' '}
            <OpenInNewTabIcon />
          </Box>
        </Grid2>
        <Grid2 xs={4}></Grid2>
      </Grid2>
    </Foot>
  );
};

export default FooterV2;
