import { Roboto } from '@next/font/google';
import { createTheme } from '@mui/material/styles';
import { red } from '@mui/material/colors';

export const roboto = Roboto({
    weight: ['300', '400', '500', '700'],
    subsets: ['latin'],
    display: 'swap',
    fallback: ['Helvetica', 'Arial', 'sans-serif'],
});

// Create a theme instance.
const theme = createTheme({
    palette: {
        background: {
            default: '#0f111a',
            paper: '#0f111a',
            primary: '#0f111a',
            secondary: '#090b10',
        },
        border: {
            default: "#000",
            secondary: '#aaa',
        },
        text: {
            primary: '#ffffff',
            secondary: '#ffffffb3',
        },
        primary: {
            main: '#0a1929',
        },
        secondary: {
            main: '#0a1929',
        },
        error: {
            main: red.A400,
        },
    },
    typography: {
        fontFamily: roboto.style.fontFamily,
    },
});

export default theme;
