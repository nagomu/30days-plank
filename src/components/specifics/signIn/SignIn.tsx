import styled from '@emotion/styled';
import * as React from 'react';

import SignInButton from '~/components/specifics/signIn/SignInButton';
import { AuthActions } from '~/store/auth';

const Container = styled.div`
  display: flex;
  align-items: flex-start;
  justify-content: center;
  padding: 16px;
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