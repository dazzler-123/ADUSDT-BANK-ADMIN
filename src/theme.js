// src/theme.js
import { createTheme } from '@mui/material/styles';

const theme = createTheme({
    palette: {
        primary: {
            main: '#6c2b8f', // Purple (sidebar, buttons)
        },
        secondary: {
            main: '#ffffff', // White (content background)
        },
        background: {
            default: '#ffffff', // Light background
            paper: '#fff',
        },
        text: {
            primary: '#222',
            secondary: '#6c2b8f',
        },
    },
    shape: {
        borderRadius: 4,
    },
    components: {
        MuiButton: {
            styleOverrides: {
                root: {
                    textTransform: 'none',
                    fontWeight: 600,
                },
            },
        },
        MuiDrawer: {
            styleOverrides: {
                paper: {
                    backgroundColor: '#6c2b8f',
                    color: '#fff',
                },
            },
        },
        MuiListItemIcon: {
            styleOverrides: {
                root: {
                    color: '#fff',
                },
            },
        },
    },
});

export default theme;