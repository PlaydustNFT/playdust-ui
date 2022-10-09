import { CheckBoxSharp, SquareOutlined } from '@mui/icons-material';
import { CssBaseline, Paper } from '@mui/material';
import {
  createTheme,
  ThemeProvider as MuiThemeProvider,
} from '@mui/material/styles';
import React, { PropsWithChildren } from 'react';

const greyBackground = '#F6F6F6';
const border = '1px solid #e2e2e2';

const baseTheme = createTheme({
  typography: {
    fontFamily: ['Poppins', 'sans-serif'].join(','),
    button: {
      textTransform: 'none',
    },
  },
  palette: {
    primary: {
      main: '#404040',
    },
    text: {
      primary: '#141414',
    },
    background: {
      default: '#FEFEFE',
    },
  },
  shape: {
    borderRadius: 0,
  },
});

const themeOverrides = createTheme({
  components: {
    MuiButtonBase: {
      defaultProps: {
        disableRipple: true,
      },
    },
    MuiButton: {
      defaultProps: {
        size: 'small',
      },
    },
    MuiCard: {
      defaultProps: {
        elevation: 0,
      },
      styleOverrides: {
        root: {
          backgroundColor: greyBackground,
        },
      },
    },
    MuiTable: {
      styleOverrides: {
        root: {
          backgroundColor: greyBackground,
        },
      },
    },
    MuiTableCell: {
      styleOverrides: {
        root: {
          whiteSpace: 'nowrap',
        },
      },
    },
    MuiPaper: {
      defaultProps: {
        elevation: 0,
      },
    },
    MuiLink: {
      defaultProps: {
        underline: 'hover',
        color: '#284866',
      },
    },
    MuiInputLabel: {
      styleOverrides: {
        root: {
          top: 6,
        },
      },
    },
    MuiSelect: {
      defaultProps: {
        label: '',
        size: 'small',
        sx: {
          marginTop: '20px',
          '& legend': {
            display: 'none',
          },
        },
      },
      styleOverrides: {
        select: {
          backgroundColor: baseTheme.palette.background.default,
          marginTop: -4,
        },
      },
    },
    MuiSwitch: {
      styleOverrides: {
        root: {
          width: 30,
          height: 16,
          padding: 0,
          margin: '13px 12px',
          display: 'flex',
          '& .MuiSwitch-switchBase': {
            padding: 2,
            '&.Mui-checked': {
              transform: 'translateX(14px)',
              '& + .MuiSwitch-track': {
                opacity: 1,
                backgroundColor: baseTheme.palette.primary.main,
              },
            },
          },
          '& .MuiSwitch-thumb': {
            color: baseTheme.palette.background.default,
            width: 12,
            height: 12,
            borderRadius: 6,
          },
          '& .MuiSwitch-track': {
            borderRadius: 16 / 2,
            opacity: 1,
            backgroundColor: 'rgba(0,0,0,.25)',
            boxSizing: 'border-box',
          },
        },
      },
    },
    MuiCheckbox: {
      defaultProps: {
        icon: <SquareOutlined />,
        checkedIcon: <CheckBoxSharp />,
      },
    },
    MuiTextField: {
      defaultProps: {
        InputLabelProps: { shrink: true },
      },
      styleOverrides: {
        root: ({ ownerState }) => {
          if (ownerState.label !== undefined) {
            return {
              paddingTop: 20,
              '& input': {
                marginTop: -4,
              },
              '& legend': {
                display: 'none',
              },
            };
          }
        },
      },
    },
    MuiAutocomplete: {
      defaultProps: {
        PaperComponent: (props) => <Paper {...props} elevation={1} />,
      },
    },
    MuiChip: {
      styleOverrides: {
        root: {
          borderRadius: 8,
        },
      },
      defaultProps: {
        size: 'small',
      },
    },
    MuiAccordion: {
      defaultProps: {
        disableGutters: true,
      },
      styleOverrides: {
        root: ({ ownerState }) =>
          ownerState.itemID === 'trading-module'
            ? {
                '.MuiAccordionSummary-root': {
                  cursor: 'default !important',
                  padding: 0,
                },
                '.MuiAccordionDetails-root': {
                  padding: 0,
                },
              }
            : {
                border,
                borderBottom: 0,
                '.MuiAccordionSummary-root': {
                  background: greyBackground,
                  borderBottom: border,
                  minHeight: 'unset',
                  '.MuiAccordionSummary-content': {
                    margin: '8px 0',
                  },
                },
                '.MuiAccordionDetails-root': {
                  padding: ownerState.className?.includes('disable-padding')
                    ? 0
                    : 16,
                  borderBottom: border,
                },
                '&:before': {
                  opacity: 0,
                },
              },
      },
    },
    MuiTableRow: {
      styleOverrides: {
        root: ({ ownerState }) => ({
          cursor: ownerState.onClick ? 'pointer' : 'default',
          '&:last-child td, &:last-child:not(:only-of-type) th': { border: 0 },
        }),
      },
    },
  },
});

const theme = createTheme(themeOverrides, baseTheme);

function ThemeProvider({ children }: PropsWithChildren<object>) {
  return (
    <MuiThemeProvider theme={theme}>
      <CssBaseline>{children}</CssBaseline>
    </MuiThemeProvider>
  );
}

export default ThemeProvider;
