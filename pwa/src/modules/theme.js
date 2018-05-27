import { createMuiTheme } from 'material-ui/styles';

const theme = createMuiTheme({
    palette: {
        primary: {
            light: '#8bf6ff',
            main: '#4fc3f7',
            dark: '#0093c4',
            contrastText: '#000000',
        },
        secondary: {
            light: '#ffffa8',
            main: '#fff176',
            dark: '#cabf45',
            contrastText: '#000000',
        },
    },
});

export default theme;