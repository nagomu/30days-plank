import styled from '@emotion/styled';
import * as React from 'react';

import postError from '~/utils/firestore/postError';

const Container = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  grid-template-rows: 1fr;
  align-items: center;
  justify-content: center;
  width: 100%;
`;

const Section = styled.section`
  padding: 64px 24px;
`;

const Heading = styled.h1`
  margin: 0;
  padding: 0;
  font-size: 24px;
  font-weight: 400;
`;

const Message = styled.p`
  margin: 1em 0;
  font-size: 14px;
`;

type Props = {
  children: React.ReactNode;
};

type State = {
  error: Error | null;
};

class ErrorBoundary extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      error: null,
    };
  }

  public componentDidCatch(e: Error | null): void {
    const error = e || new Error('Something went wrong');
    this.setState({ error });
    postError(error);
  }

  public render(): React.ReactNode {
    if (!this.state.error) return this.props.children;

    return (
      <Container>
        <Section>
          <Heading>
            <b>500.</b> That&#39;s an error
          </Heading>
          <Message>
            Something went wrong ... 🙇‍
            <br />
            Please try again later 🙇‍
          </Message>
        </Section>
      </Container>
    );
  }
}

export default ErrorBoundary;
