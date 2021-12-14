import React from 'react'
import PropTypes from 'prop-types'
import { ThemeProvider } from 'styled-components'
import GlobalStyle from './GlobalStyle'

const themes = {
  light: {
    color: {
      text: '#1A1A40',
      purpleDark: '#8d268d',
      purple: '#B030B0',
      violetDark: '#4d1a66',
      violet: '#602080',
      cyanDark: '#0AA27A',
      cyan: '#0CCA98',
      white: '#000000',
      background: '#E5E5E5',
      backgroundDark: '#D8D8D8',
      backgroundLight: '#F8F8F8',
      backgroundShadow: '#1A1A40A6',
      lukway: '#017B1F',
      lukwayDark: '#016219',
      error: '#CA2525',
      errorDark: '#BD1111',
      facebook: '#1778F2',
      facebookDark: '#1260C2',
      twitter: '#1DA1F2',
      twitterDark: '#0395B5',
      google: '#FFFFFF',
      googleDark: '#EEEEEE',
      github: '#333333',
      linkedin: '#0077b5',
      instagram: '#DD2A7B'
    },
    font: {
      h1: 'bold 36px "Montserrat", sans-serif',
      h2: 'bold 26px "Montserrat Alternates", sans-serif',
      h3: '600 18px "Montserrat Alternates", sans-serif',
      text1: '600 16px "Montserrat Alternates", sans-serif',
      text2: '600 14px "Montserrat Alternates", sans-serif',
      number: '600 24px "Roboto", monospace'
    },
    shadow: {
      button: '0px 3px 5px rgba(0, 0, 0, 0.3)',
      card: '0px 5px 20px rgba(0, 0, 0, 0.3);'
    }
  },
  dark: {
    color: {
      white: '#000000'
    }
  }
}

const Theme = ({ children, theme }) => (
  <ThemeProvider theme={themes[theme]}>
    <GlobalStyle/>
    { children }
  </ThemeProvider>
)

Theme.propTypes = {
  children: PropTypes.node,
  theme: PropTypes.string
}

export default Theme