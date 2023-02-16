import React from 'react';
import { useTranslation } from 'react-i18next';
import { styled } from '@mui/material/styles';
import HyLogo from './HYLogo';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Grid2 from '@mui/material/Unstable_Grid2';
import OpenInNew from '@mui/icons-material/OpenInNew';

// const P = styled.p`
//   margin-left: 10px;
// `;

const Link = styled('a')(({ theme }) => ({
  color: theme.palette.common.white,
  fontWeight: 'bold',
  // fontSize: '10px',
  '&:hover': {
    textDecoration: 'underline',
  },
}));

const Foot = styled('footer')(({ theme }) => ({
  backgroundColor: theme.palette.common.black,
}));

const BoldText = styled('b')(({ theme }) => ({
  color: theme.palette.common.white,
}));

const Text = styled('p')(({ theme }) => ({
  color: theme.palette.common.white,
}));

// const Item = styled(Card)(({ theme }) => ({
//   backgroundColor: theme.palette.common.black,
//   textColor: theme.palette.common.white,
// }));

const FooterV2 = () => {
  const { t } = useTranslation();
  return (
    <div>
      <Foot>
        <Grid2 container spacing={2}>
          <Grid2 xs={1}></Grid2>
          <Grid2 xs={1}>
            <HyLogo />
          </Grid2>
          <Grid2 xs={2}>
            <div>
              <BoldText>
                {t('university_of_helsinki')}
                <br />
              </BoldText>
              <Text>
                {t('hy_address_part1')}
                <br />
                {t('hy_address_part2')}
              </Text>
              <Text> {t('hy_switchboard')}</Text>
              <Text>{t('maintenance_info')}</Text>
            </div>
          </Grid2>
          <Grid2 xs={4}>
            <p>
              <Link
                href={t('hy_contact_info_link')}
                target="_blank"
                rel="noreferrer noopener"
              >
                {t('hy_contact_info')}
                <span className="screen-reader-only">
                  {t('open_in_new_tab')}
                </span>
              </Link>
            </p>
            <p>
              <Link
                href={t('hy_terms_of_use_link')}
                target="_blank"
                rel="noreferrer noopener"
              >
                {t('hy_terms_of_use')}
                <span className="screen-reader-only">
                  {t('open_in_new_tab')}
                </span>
              </Link>
            </p>
            <p>
              <Link
                href={t('hy_organisation_instructions_link')}
                target="_blank"
                rel="noreferrer noopener"
              >
                {t('hy_organisation_instructions')}
                <span className="screen-reader-only">
                  {t('open_in_new_tab')}
                </span>
              </Link>
            </p>
            <p>
              <Link href="" target="_blank" rel="noreferrer noopener">
                {t('hy_accessibility_statement')}
                <span className="screen-reader-only">
                  {t('open_in_new_tab')}
                </span>
              </Link>
            </p>
          </Grid2>
          <Grid2 xs={4}></Grid2>
        </Grid2>
      </Foot>
    </div>
  );
};

export default FooterV2;
