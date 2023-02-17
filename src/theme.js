import { createTheme } from '@mui/material';

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
  },
  secondary: undefined,
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
    main: hyPalette.additional.orange,
  },
  info: {
    main: hyPalette.additional.skyBlue,
  },
  success: {
    main: hyPalette.additional.greenLight,
    dark: hyPalette.additional.greenDark,
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
  overline: undefined,
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
    lineHeight: 1.375,
    letterSpacing: -0.1,
    color: hyPalette.grayscale.white,
    '&:hover': {
      textDecoration: 'underline',
      color: hyPalette.grayscale.white,
    },
  },
  bold_body1: {
    fontWeight: 700,
  },
};

const theme = createTheme({
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
  },
});

export default theme;
