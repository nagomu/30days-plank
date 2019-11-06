import styled from '@emotion/styled';
import * as React from 'react';

const Container = styled.div`
  position: absolute;
  z-index: 1;
  bottom: 0;
  left: 0;
  width: 100%;
  padding: 8px 24px;
  background-color: rgba(255, 255, 255, 0.8);
  font-size: 14px;
  text-align: right;

  a {
    display: inline-block;
    margin-left: 1em;
    color: #1e88e5;
  }

  img {
    display: inline-block;
    width: 1.2em;
    vertical-align: middle;
  }
`;

const Footer: React.FC = () => (
  <Container>
    <a href="/terms">Terms</a>
    <a href="/terms#privacy">Privacy Policy</a>
    <a href="https://github.com/nagomu/30days-plank">
      <img src="/static/images/logo-github.png" alt="GitHub" />
    </a>
  </Container>
);

export default Footer;
