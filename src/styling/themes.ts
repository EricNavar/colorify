/* eslint-disable quotes */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { createTheme } from '@mui/material/styles';

declare module '@mui/material/styles' {
  export interface Theme {
    paper: Record<string, any>;
    gradientPaper: Record<string, any>;
    background: Record<string, any>;
  }
  // allow configuration using `createTheme`
  interface ThemeOptions {
    paper?: Record<string, any>;
    gradientPaper: Record<string, any>;
    background: Record<string, any>;
  }
}

export const lightTheme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: '#09203f',
    },
    secondary: {
      main: '#4fcff0',
    },
    grey: {
      '800': 'rgba(215,218,225,.8)',
    },
  },
  typography: {
    fontFamily: "Poppins, 'Lato', sans-serif",
  },
  paper: {},
  gradientPaper: {
    backgroundImage:
      'linear-gradient(rgba(66,179,245,1) 0%, rgba(95,44,130,1) 100%)',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    backgroundAttachment: 'fixed',
    color: 'white',
  },
  background: {
    headerColor: '#09203f',
    headerButtonColor: '#d5e4ff',
  },
});
