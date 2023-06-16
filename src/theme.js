import { createTheme } from '@mui/material';
import { fiFI } from '@mui/x-data-grid';
import EyeSlashIcon from './components/icons/EyeSlash';
import SlimHamburgerMenuIcon from './components/icons/SlimHamburgerMenu';
import SearchIcon from './components/icons/Search';
import LoadingOverlay from './components/LoadingOverlay';

/**
 * HY Design System colors
 *
 * This variable should not be referred in components directly, use the standard MUI palette instead which is
 * customized to match these colors.
 *
 * See: https://wiki.helsinki.fi/pages/viewpage.action?pageId=334495865
 */
const hyPalette = {
  brand: {
    light: '#107eab',
    mediumLight: '#0479a5',
    medium: '#0e688b',
    mediumDark: '#005379',
    dark: '#003146',
    nearlyBlack: '#000222',
  },
  grayscale: {
    white: '#ffffff',
    light: '#f8f8f8',
    mediumLight: '#f5f5f5',
    medium: '#d2d2d2',
    mediumDark: '#979797',
    dark: '#555555',
    black: '#000000',
  },
  additional: {
    greenDark: '#004600',
    greenLight: '#96ba3c',
    orange: '#d14600',
    purpleDark: '#420039',
    redDark: '#a31621',
    redLight: '#e5053a',
    skyBlue: '#48c5f8',
    soft: '#b1e7ff', // See 'A new way to use colours' spec
    yellow: '#f9a21a',
  },
};

/**
 * The standard MUI palette adapted to match with the HY colors.
 *
 * These colors can be referred in components by useTheme hook or styled function.
 *
 * See: https://mui.com/material-ui/customization/palette/
 */
const palette = {
  common: {
    black: hyPalette.grayscale.black,
    white: hyPalette.grayscale.white,
  },
  primary: {
    main: hyPalette.brand.light,
    dark: hyPalette.brand.mediumDark,
    nearlyBlack: hyPalette.brand.nearlyBlack,
  },
  secondary: {
    main: hyPalette.brand.light,
    dark: hyPalette.brand.mediumDark,
  },
  grey: {
    50: hyPalette.grayscale.light,
    100: hyPalette.grayscale.mediumLight,
    200: '#eeeeee',
    300: hyPalette.grayscale.medium,
    400: '#bdbdbd',
    500: hyPalette.grayscale.mediumDark,
    600: '#757575',
    700: hyPalette.grayscale.dark,
    800: '#424242',
    900: '#212121',
    A100: '#f5f5f5',
    A200: '#eeeeee',
    A400: '#bdbdbd',
    A700: '#616161',
  },
  divider: 'rgba(0, 0, 0, 0.12)',
  error: {
    main: hyPalette.additional.redLight,
    dark: hyPalette.additional.redDark,
  },
  warning: {
    main: hyPalette.additional.yellow,
  },
  info: {
    main: hyPalette.additional.soft,
  },
};

const openSans = "'Open Sans', sans-serif";

/**
 * Adapt typography to HY Design System.
 *
 * Use any of these variants in components with MUI Typography component.
 *
 * Disable unused default Material variants and define a few custom HY variants.
 *
 * MUI createTheme function sets font family only for the default variants,
 * so define them here consistently for all custom variants too.
 *
 * See: https://mui.com/material-ui/customization/typography/
 */
const typography = {
  fontFamily: openSans,
  fontWeightLight: undefined,
  fontWeightRegular: 400,
  fontWeightMedium: 600,
  fontWeightBold: 700,
  h1: {
    fontFamily: openSans,
    fontSize: 41,
    fontWeight: 700,
    lineHeight: 1.22,
    letterSpacing: 0,
    textTransform: 'uppercase',
    color: hyPalette.brand.nearlyBlack,
  },
  h2: {
    fontFamily: openSans,
    fontSize: 27,
    fontWeight: 700,
    lineHeight: 1.22,
    letterSpacing: -0.1,
    color: hyPalette.brand.nearlyBlack,
  },
  h3: {
    fontFamily: openSans,
    fontSize: 23,
    fontWeight: 700,
    lineHeight: 1.3,
    letterSpacing: -0.3,
    color: hyPalette.brand.nearlyBlack,
  },
  h4: {
    fontFamily: openSans,
    fontSize: 20,
    fontWeight: 700,
    lineHeight: 1.25,
    letterSpacing: -0.2,
    color: hyPalette.brand.nearlyBlack,
  },
  h5: {
    fontFamily: openSans,
    fontSize: 16,
    fontWeight: 700,
    lineHeight: 1.375,
    letterSpacing: 0,
    color: hyPalette.brand.nearlyBlack,
  },
  h6: {
    fontFamily: openSans,
    fontSize: 14,
    fontWeight: 700,
    lineHeight: 1.357,
    letterSpacing: 0.1,
    color: hyPalette.brand.nearlyBlack,
  },
  subtitle1: undefined,
  subtitle2: undefined,
  body1: {
    fontFamily: openSans,
    fontSize: 16,
    fontWeight: 400,
    lineHeight: 1.375,
    letterSpacing: -0.53,
  },
  body2: undefined,
  button: {
    fontFamily: openSans,
    fontSize: 14,
    fontWeight: 700,
    letterSpacing: 0.2,
    textTransform: 'none',
  },
  // HYDS tiny text not defined here because it is equal to MUI caption
  caption: {
    fontFamily: openSans,
    fontSize: 11,
    fontWeight: 400,
    lineHeight: 1.36,
    letterSpacing: 0,
  },
  overline: {
    fontFamily: openSans,
    fontColour: hyPalette.grayscale.mediumDark,
    fontSize: 11,
    fontWeight: 400,
    lineHeight: 1.36,
    letterSpacing: 0,
    textTransform: 'uppercase',
  },
  label: {
    fontFamily: openSans,
    fontSize: 12,
    fontWeight: 700,
    letterSpacing: -0.6,
    textTransform: 'uppercase',
  },
  ingress: {
    fontFamily: openSans,
    fontSize: 17,
    fontWeight: 400,
    lineHeight: 1.53,
    letterSpacing: -0.13,
  },
  accordionTitle: {
    fontFamily: openSans,
    fontSize: 18,
    fontWeight: 700,
    lineHeight: 1.375,
    letterSpacing: -0.45,
    color: hyPalette.brand.nearlyBlack,
  },
  tableHead: {
    fontFamily: openSans,
    fontSize: 16,
    fontWeight: 700,
    letterSpacing: 0,
    color: hyPalette.grayscale.dark,
  },
  tableBody: {
    fontFamily: openSans,
    fontSize: 16,
    fontWeight: 400,
    letterSpacing: 0,
    color: hyPalette.grayscale.dark,
  },
  navigationLink: {
    fontFamily: openSans,
    fontSize: 12,
    fontWeight: 700,
    lineHeight: 2,
    letterSpacing: -0.1,
    color: hyPalette.grayscale.white,
    textDecoration: 'none',
    '&:hover': {
      color: hyPalette.grayscale.white,
      textDecoration: 'underline',
    },
  },
  mainNavigation: {
    fontSize: 14,
    letterSpacing: -0.7,
    fontWeight: 700,
    textTransform: 'uppercase',
    color: hyPalette.brand.nearlyBlack,
  },
};

const theme = createTheme(
  {
    palette,
    typography,
    shape: {
      borderRadius: 0,
    },
    components: {
      MuiButton: {
        styleOverrides: {
          outlined: {
            borderWidth: 3,
            borderColor: hyPalette.brand.light,
            ':hover': {
              borderWidth: 3,
              borderColor: hyPalette.brand.mediumDark,
              color: hyPalette.brand.mediumDark,
            },
            ':disabled': {
              borderWidth: 3,
            },
          },
        },
      },
      MuiTooltip: {
        styleOverrides: {
          tooltip: {
            ...typography.caption,
          },
        },
      },
      MuiTableCell: {
        styleOverrides: {
          root: {
            borderWidth: 1,
            borderStyle: 'solid',
            borderColor: palette.divider,
          },
          head: {
            backgroundColor: palette.grey[50],
            ...typography.tableHead,
          },
          body: {
            ...typography.tableBody,
          },
        },
      },
      MuiContainer: {
        defaultProps: {
          maxWidth: 'xl',
        },
      },
      MuiChip: {
        styleOverrides: {
          root: {
            borderRadius: 0,
            marginX: 8,
            marginY: 6,
          },
          deleteIcon: { color: palette.grey[700], fontSize: 18 },
        },
      },
      MuiDataGrid: {
        defaultProps: {
          slots: {
            columnMenuHideIcon: EyeSlashIcon,
            columnMenuIcon: SlimHamburgerMenuIcon,
            moreActionsIcon: SlimHamburgerMenuIcon,
            quickFilterIcon: SearchIcon,
            loadingOverlay: LoadingOverlay,
          },
          hideFooterSelectedRowCount: true,
        },
        styleOverrides: {
          columnHeaders: {
            borderTopStyle: 'solid',
            borderTopWidth: 1,
            borderTopColor: palette.divider,
          },
          columnHeader: {
            backgroundColor: palette.grey[50],
          },
          columnHeaderTitle: {
            ...typography.tableHead,
          },
          cellContent: {
            ...typography.tableBody,
          },
        },
      },
      MuiSwitch: {
        defaultProps: {
          disableRipple: true,
        },
        styleOverrides: {
          root: {
            '& .Mui-checked': {
              '.MuiSwitch-thumb': {
                transform: 'translateX(-4px)',
              },
              '+ .MuiSwitch-track': {
                backgroundImage: `url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" height="8" width="8" viewBox="0 0 1000 1000"><path fill="${encodeURIComponent(
                  palette.common.white
                )}" d="M923,165l-75-62-25-19-20,26-468,558-138-168-20-23-25,20-75,58-25,22,19,26,239,287,22,33,26-33,571-680,19-23z"/></svg>')`,
                opacity: '1 !important',
                backgroundColor: `${palette.primary.main}`,
                backgroundRepeat: 'no-repeat',
                backgroundPosition: '25% 50%',
                border: `2px solid ${palette.primary.nearlyBlack}`,
              },
            },
            '& .Mui-disabled': {
              '+ .MuiSwitch-track': {
                backgroundColor: '#8a8a8a !important',
                border: '1px solid #6a6a6a',
              },
              '.MuiSwitch-thumb': {
                border: '1px solid #8a8a8a',
              },
            },
            '& .MuiSwitch-switchBase': {
              ':hover': {
                backgroundColor: 'initial !important',
              },
            },
            '&:hover': {
              ' .MuiSwitch-track': {
                backgroundColor: '#dfdfdf',
              },
              ' .Mui-checked + .MuiSwitch-track': {
                backgroundColor: '#0e719a',
              },
            },
          },
          sizeSmall: {
            padding: 4,
            '& .MuiSwitch-thumb': {
              marginTop: 3,
              transform: 'translateX(-2px)',
              width: 12,
              height: 12,
            },
          },
          thumb: {
            boxShadow: 'none',
            width: 12,
            height: 12,
            backgroundColor: palette.common.white,
            border: `2px solid ${palette.primary.main}`,
            marginLeft: '6px',
            marginTop: '6px',
          },
          track: {
            opacity: 1,
            borderRadius: 11,
            width: 34,
            height: 18,
            backgroundColor: '#f8f8f8',
            border: `2px solid ${palette.primary.main}`,
          },
        },
      },
    },
    breakpoints: {
      values: {
        xs: 0,
        sm: 600,
        md: 900,
        lg: 1200,
        xl: 1700,
      },
    },
  },
  fiFI // Provides translations for DataGrid
);

export default theme;
