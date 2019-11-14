import { styled } from 'linaria/react';
import * as React from 'react';

import PrimaryButton from '~/components/common/buttons/PrimaryButton';

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

const Button = styled(PrimaryButton)`
  margin-top: 48px;
`;

type Props = {
  onClick: () => void;
};

const NotStarted: React.FC<Props> = ({ onClick }) => (
  <Container>
    <Section>
      <Title>
        Let&apos;s start
        <br />
        30 Days Plank Challenge
      </Title>
      <Button onClick={onClick}>Start now</Button>
    </Section>
  </Container>
);

export default NotStarted;
