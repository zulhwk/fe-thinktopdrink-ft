import {createTheme, colors, responsiveFontSizes} from '@mui/material';

let theme = createTheme({
  palette: {
    background: {
      default: colors.common.white,
      paper: colors.common.white,
    },
    primary: {
      main: '#00479B',
    },
    secondary: {
      main: '#ffffff',
    },
    danger: {
      main: '#e74c3c'
    },
    text: {
      primary: colors.blueGrey[900],
      secondary: colors.blueGrey[600],
    },
  },
  components: {
    MuiDrawer: {
      styleOverrides: {
        paper: {
          background: "#00479B",
          color: 'white',
          "& .MuiListItemIcon-root": {
            color: "inherit",
            minWidth: '35px'
          }
        }
      }
    },
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 15,
        },
      },
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          '& .MuiOutlinedInput-root': {
            '& fieldset': {
              borderRadius: 15,
            },
          },
        },
      },
    },
    MuiAvatar: {
      styleOverrides: {
        root: {
          backgroundColor: '#00479B',
        },
      },
    },
    MuiCheckbox: {
      styleOverrides: {
        root: {
          borderRadius: 10,
        },
      },
    },
    MuiDialog: {
      styleOverrides: {
        paper: {
          borderRadius: 15,
        },
      },
    },
    MuiTab: {
      styleOverrides: {
        root: {
          borderBottom: '1px solid #E2E5E8',
        },
      },
    },
  },
  typography: {
    fontFamily: ['Roboto', 'sans-serif'].join(','),
    button: {
      textTransform: 'capitalize',
      // fontSize: '18px',
    },
  },
});
theme = responsiveFontSizes(theme);
export default theme;