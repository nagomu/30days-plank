import styled from '@emotion/styled';
import * as React from 'react';
import { useLocation } from 'react-router-dom';

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

const NotFound: React.FC = () => {
  const { pathname } = useLocation();
  return (
    <Container>
      <Section>
        <Heading>
          <b>404.</b> That&#39;s an error
        </Heading>
        <Message>
          The requested URL {pathname} was not found on this server.
          <br />
          That&#39;s all we know 🙇‍
        </Message>
      </Section>
    </Container>
  );
};

export default NotFound;
