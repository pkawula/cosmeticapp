import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
    *, *::after, *::before {
        box-sizing: border-box;
        font-family: inherit;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
    }

    html {
        font: 300 62.5% "Poppins", sans-serif;
    }

    body {
        font-size: 1.8rem;
        margin: 0;
        padding: 0;
        background-color: ${({ theme }) => theme.light};
        overflow-x: hidden;
    }

`;

export default GlobalStyle;
