import styled from '@emotion/styled';
import * as React from 'react';

import Icon from '~/components/common/icons/Icon';

const Section = styled.section`
  display: block;
  width: 100%;
  padding: 24px;

  h1 {
    margin: 0;
    padding: 0;
    color: #1e88e5;
    font-size: 24px;
    font-weight: 700;
  }

  h2 {
    margin: 0;
    padding: 2em 0 0;
    color: #1e88e5;
    font-size: 20px;
    font-weight: 700;
  }

  a {
    color: #1e88e5;
  }
`;

const Header = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  padding: 8px 16px;
  border-bottom: 1px solid #e0e0e0;
`;

const Logo = styled.a`
  display: block;
  width: 32px;
  height: 32px;
  color: #1e88e5;
  font-size: 32px;
  text-decoration: none;
`;

const Terms: React.FC = () => (
  <>
    <Header>
      <Logo href="/">
        <Icon name="logo" />
      </Logo>
    </Header>
    <Section>
      <h1>Terms of application</h1>
      <p>
        You may use 30 days plank challenge (30d) but 30d is basically personal
        application. As such, 30d may change from time to time. We may stop
        providing 30d to you.
      </p>
      <p>
        We may revise these Terms from time to time. The changes will not be
        retroactive, and the most current version of the Terms will govern our
        relationship with you.
      </p>
      <h2 id="privacy">Privacy policy</h2>
      <p>
        When you use 30d, we receive some personal information from you like the
        type of device you’re using and your IP address. They are usually used
        to fix application errors but may be used for advertising in the future.
      </p>
      <p>
        We use <a href="https://firebase.google.com/">Firebase</a> for
        application hosting and authentication. Please check the official
        website for the service.
      </p>
      <p>
        If you have questions about this policy, how we collect or process your
        personal data, or anything else related to our privacy practices, we
        want to hear from you. You can{' '}
        <a href="https://github.com/nagomu">contact us</a> at any time. We will
        respond to them as much as possible.
      </p>
    </Section>
  </>
);

export default Terms;
