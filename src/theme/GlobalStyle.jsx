import { createGlobalStyle } from 'styled-components'
import { medias } from './MediaQueries'

const GlobalStyle = createGlobalStyle`
  * {
    box-sizing: border-box;
  }

  body {
    min-height: 100vh;
    margin: unset;
    background: ${p => p.theme.color.backgroundDark};
    color: ${p => p.theme.color.text};
  }

  main {
    width: 100%;
    max-width: 1440px;
    min-height: calc(100vh - 60px);
    max-height: 1360px;
    margin: 0 auto;
    padding: 0 15px;
    display: flex;
    justify-content: center;
    align-items: center;
    position: relative;
  }

  h1, h2 {
    margin: 0;
  }

  button {
    background: unset;
    border: unset;
    padding: unset;
    cursor: pointer;
    transition: color .1s, background-color .1s, box-shadow .1s;
  }

  input {
    border: unset;
  }

  a {
    text-decoration: unset;
    transition: color .1s, background-color .1s, box-shadow .1s;
  }

  i {
    margin-right: 10px;
  }

  @media ${medias.mobileL} {
    main {
      min-height: calc(100vh - 104px);
      padding: 10px 15px 0;
      flex-direction: column;
    }
  }
`

export default GlobalStyle