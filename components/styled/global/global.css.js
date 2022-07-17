import { createGlobalStyle } from "styled-components";

export default createGlobalStyle`
    :root {
        --theme-color: #f91680;
        --faded-theme-color: #f916803c;
    }
    
    * {
        box-sizing: border-box;
    }
    
    body {
        margin: 0;
        background-color: black;
        font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto',
        'Oxygen', 'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans',
        'Helvetica Neue', sans-serif;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
        font-size: 15px;
    }
    
    code {
        font-family: source-code-pro, Menlo, Monaco, Consolas, 'Courier New',
        monospace;
    }
    
    button {
        border: none;
        background: none;
        cursor: pointer;
        text-align: left;
    }
    
    button:disabled {
        cursor: not-allowed;
    }

    p {
        font-size: 15px;
    }
    
    h1,
    h2,
    h3,
    h4,
    h5,
    h6,
    p {
        margin: 0;
    }
    
    input,
    textarea {
        font-family: inherit;
    }
    
    span {
        display: block;
    }
    
    a {
        text-decoration: none;
    }
`;