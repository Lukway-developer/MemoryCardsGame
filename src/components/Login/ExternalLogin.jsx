import React from 'react'
import styled, { css } from 'styled-components'
import {
  getAuth,
  signInWithPopup,
  GoogleAuthProvider,
  FacebookAuthProvider,
  TwitterAuthProvider
} from 'firebase/auth'
import GoogleLogo from '../../images/logo/google_logo.svg'
import FacebookLogo from '../../images/logo/facebook_logo.svg'
import TwitterLogo from '../../images/logo/twitter_logo.svg'
import { saveEmail } from '../../utils/database'
import { medias } from '../../theme/MediaQueries'

const StyledExternalLoginContainer = styled.div`
  width: 100%;
  height: 50px;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  column-gap: 10px;
`

const StyledExternalButton = styled.button`
  width: 100%;
  height: 50px;
  border: 2px solid ${p => p.theme.color.text};
  border-radius: 10px;
  display: flex;
  justify-content: center;
  align-items: center;
  &:hover{
    box-shadow: ${p => p.theme.shadow.button};
  }

  img {
    height: 30px;
  }

  ${p => p.google && css`
    background: ${p => p.theme.color.google};
    &:hover {
      background: ${p => p.theme.color.googleDark};
    }
  `}

  ${p => p.facebook&& css`
    background: ${p => p.theme.color.facebook};
    &:hover {
      background: ${p => p.theme.color.facebookDark};
    }
  `}

  ${p => p.twitter && css`
    background: ${p => p.theme.color.twitter};
    &:hover {
      background: ${p => p.theme.color.twitterDark};
    }

    img {
      transform: scale(.75);
    }
  `}

  @media ${medias.mobileL} {
    height: 45px;
  }
`

const handleGoogleLogin = async () => {
  const auth = getAuth()
  const provider = new GoogleAuthProvider()

  try {
    const result = await signInWithPopup(auth, provider)

    // ? This gives you a Google Access Token. You can use it to access the Google API.
    // const credential = GoogleAuthProvider.credentialFromResult(result);
    // const token = credential.accessToken

    const user = result.user
    const email = user.email
    const uid = user.uid

    saveEmail(email, uid)
  } catch (error) {
    console.log(error.code)
  }
}

const handleFacebookLogin = async () => {
  const auth = getAuth()
  const provider = new FacebookAuthProvider()

  try {
    const result = await signInWithPopup(auth, provider)

    // ? This gives you a Facebook Access Token. You can use it to access the Facebook API.
    // const credential = FacebookAuthProvider.credentialFromResult(result)
    // const accessToken = credential.accessToken

    const user = result.user
    const email = user.email
    const uid = user.uid

    saveEmail(email, uid)
  } catch (error) {
    console.log(error.code)
  }
}

const handleTwitterLogin = async () => {
  const auth = getAuth()
  const provider = new TwitterAuthProvider()

  try {
    const result = await signInWithPopup(auth, provider)

    // ? You can use these server side with your app's credentials to access the Twitter API.
    // const credential = TwitterAuthProvider.credentialFromResult(result)
    // const token = credential.accessToken
    // const secret = credential.secret

    console.log(result.user)
    const user = result.user
    const email = user.email
    const uid = user.uid

    saveEmail(email, uid)
  } catch (error) {
    console.log(error.code)
  }
}

const ExternalLogin = () => {
  return (
    <StyledExternalLoginContainer>
      <StyledExternalButton google onClick={handleGoogleLogin}>
        <img src={GoogleLogo} alt="Google Login"/>
      </StyledExternalButton>

      <StyledExternalButton facebook onClick={handleFacebookLogin}>
        <img src={FacebookLogo} alt="Facebook Login"/>
      </StyledExternalButton>

      <StyledExternalButton twitter onClick={handleTwitterLogin}>
        <img src={TwitterLogo} alt="Twitter Login"/>
      </StyledExternalButton>
    </StyledExternalLoginContainer>
  )
}

export default ExternalLogin