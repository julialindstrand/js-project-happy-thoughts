import { createGlobalStyle } from "styled-components"

export const GlobalStyle = createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
  }

  body {
    display: flex;
    flex-direction: column;
    margin: auto;
    width: 70%;
    max-width: 500px;
    padding: 30px;
}
`