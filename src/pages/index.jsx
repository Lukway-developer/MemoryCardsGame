import React from 'react'
import Seo from '../components/Seo/Seo'
import MainCard from '../components/MainCard/MainCard'
import Title from '../components/Text/Title'
import MenuButtonContainer from '../components/Menu/MenuButtonContainer'
import Layout from '../components/Layout/Layout'

const Index = () => {
  return (
    <>
      <Seo
        description="Memory Card Game"
        title="Home"
        lang="es"
      />

      <Layout>
        <MainCard>
          <Title>Memory Game</Title>
          <MenuButtonContainer/>
        </MainCard>
      </Layout>
    </>
  )
}

export default Index
