import React from 'react';
import SignInContainer from '../../components/SignInContainer';
import Navigation from '../../components/Navigation';
import Logo from '../../components/Logo';

const SignInScreen = () => {
  return (
    <SignInContainer>
      <Logo />
      <Navigation />
    </SignInContainer>
  );
}

export default SignInScreen;