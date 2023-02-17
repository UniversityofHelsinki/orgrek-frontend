import React from 'react';
import { useTranslation } from 'react-i18next';
import { styled } from '@mui/material/styles';
import Logo from '../images/hy-logo.svg';
import HYLogo from './HYLogo';
import Box from '@mui/material/Box';
import Grid2 from '@mui/material/Unstable_Grid2';
import Link from '@mui/material/Link';
import Typography from '@mui/material/Typography';
import ExternalLinkIcon from '../components/icons/ExternalLink';

const TypoBold = styled(Typography)(({ theme }) => ({
  backgroundColor: theme.palette.common.black,
  textColor: theme.palette.common.white,
}));

const FooterV2 = () => {
  const { t } = useTranslation();
  return (
    <footer>
      <Grid2
        container
        height={'200px'}
        paddingTop={'30px'}
        backgroundColor={'#000'}
      >
        <Grid2 xs={1}></Grid2>
        <Grid2 xs={1}>
          <img src={Logo} alt="{t('hy_logo')}" width={'65%'} />
          {/*<HYLogo fontSize={'inherit'} />*/}
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
              color={'#FFF'}
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
              color={'#FFF'}
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
              color={'#FFF'}
            >
              {t('hy_accessibility_statement')}{' '}
              <span className="screen-reader-only">{t('open_in_new_tab')}</span>
              <ExternalLinkIcon color={'inherit'} fontSize={'inherit'} />
            </Link>
          </Box>
        </Grid2>
        <Grid2 xs={4}></Grid2>
      </Grid2>
    </footer>
  );
};

export default FooterV2;
