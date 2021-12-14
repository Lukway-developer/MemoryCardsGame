import React from 'react'
import Helmet from 'react-helmet'
import Favicon from '../../images/logo/favicon.svg'
// import { useStaticQuery, graphql } from "gatsby"

const Seo = ({ description, lang, title }) => {
  // const { site } = useStaticQuery(
  //   graphql`
  //     query {
  //       site {
  //         siteMetadata {
  //           title
  //           description
  //         }
  //       }
  //     }
  //   `
  // )

  // const metaDescription = description || site.siteMetadata.description

  return (
    <Helmet>
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content="Memory Game - Lukway - Lucas Ojeda De Sousa" />
      <link rel="shortcut icon" href={Favicon} type="image/x-icon" />

      <meta property="og:title" content={title}/>
      <meta property="og:description" content={description}/>
      <meta property="og:type" content="website"/>
      <meta property="og:locale" content="es_ES"/>
      <meta property="og:site_name" content="Memory Cards Game"/>

      <meta name="twitter:title" content={title}/>
      <meta name="twitter:description" content={description}/>
      <meta name="twitter:creator" content="Lukway - Lucas Ojeda De Sousa"/>
      <meta name="twitter:card" content="summary"/>

      <meta httpEquiv="X-UA-Compatible" content="ie=edge" />
      <meta httpEquiv="X-UA-Compatible" content="IE=7" />
      <meta httpEquiv="Content-Type" content="text/html;charset=UTF-8" />

      <meta httpEquiv="Content-Language" content={lang}/>

      {/* Google Fonts */}
      <link rel="preconnect" href="https://fonts.gstatic.com" />
      {/* Font Awesome */}
      <link href="https://fonts.googleapis.com/css2?family=Montserrat+Alternates:wght@500;700&family=Roboto+Mono:wght@600&family=Roboto:wght@700&display=swap" rel="stylesheet" />
      <script src="https://kit.fontawesome.com/324d384509.js" crossOrigin="anonymous"/>
    </Helmet>
  )
}

export default Seo