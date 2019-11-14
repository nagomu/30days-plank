import { styled } from 'linaria/react';
import * as React from 'react';

import SignInButton from '~/components/specifics/signIn/SignInButton';
import { AuthActions } from '~/hooks/common/useAuth';

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
