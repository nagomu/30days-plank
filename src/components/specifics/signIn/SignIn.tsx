import AddToHomeScreen from 'a2hs.js';
import styled from '@emotion/styled';
import * as React from 'react';

import SignInButton from '~/components/specifics/signIn/SignInButton';
import { AuthActions } from '~/store/auth';

if (!!navigator.platform && /iPad|iPhone|iPod/.test(navigator.platform)) {
  AddToHomeScreen({
    brandName: '30d',
    logoImage:
      '<svg role="img" style="width:48px;height:48px;margin-bottom:-8px;color:#1e88e5"><use xlink:href="#logo" /></svg>',
    htmlContent:
      'Install <strong>30d</strong> on your iOS device: tap share and <strong>Add to Home Screen</strong>',
    fontFamily: 'Roboto, sans-serif',
    backgroundColor: '#eee',
    padding: '4px 8px',
  });
}

const Container = styled.div`
  display: flex;
  position: relative;
  align-items: flex-start;
  justify-content: center;
  min-height: 100%;
  padding: 16px;

  &::before {
    content: '';
    display: block;
    position: absolute;
    top: 208px;
    left: 50%;
    width: 80%;
    height: 100%;
    transform: translateX(-50%);
    background-image: url(/static/images/mock.png);
    background-repeat: no-repeat;
    background-position: 0 0;
    background-size: 100%;

    @media (min-width: 680px) {
      top: 247px;
    }
  }
`;

const Section = styled.section`
  display: block;
  width: 100%;
  max-width: 320px;
`;

const Title = styled.h2`
  margin: 0;
  font-family: 'Roboto Condensed', sans-serif;
  font-size: 22px;
  font-weight: 700;
  white-space: nowrap;

  @media all and (min-width: 350px) {
    font-size: 24px;
  }

  @media all and (min-width: 680px) {
    font-size: 32px;
  }
`;

type Props = Pick<AuthActions, 'onSignIn'>;

const SignIn: React.FC<Props> = ({ onSignIn }) => (
  <Container>
    <Section>
      <Title>
        Let&apos;s start
        <br />
        30 Days Plank Challenge
      </Title>
      <SignInButton onClick={onSignIn} />
    </Section>
  </Container>
);

export default SignIn;
