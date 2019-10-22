/** @jsx jsx */
import { css, Global, jsx } from '@emotion/core';
import * as React from 'react';
import { BrowserRouter, Switch, Redirect, Route } from 'react-router-dom';

import { useAuth } from '~/hooks/common/useAuth';
import Dashboard from '~/containers/specifics/dashboard/Dashboard';
import Login from '~/containers/specifics/login/Login';

const globalStyles = `
  * {
    box-sizing: border-box;
  }

  html {
    background-color: #fff;
    color: #212121;
    font-family: 'Noto Sans CJK JP', -apple-system, BlinkMacSystemFont, Verdana, Meiryo, 'MS PGothic', sans-serif, Apple Color Emoji, Segoe UI Emoji, Segoe UI Symbol;
    font-size: 16px;
    line-height: 1.15;
    -webkit-text-size-adjust: 100%;
  }

  body {
    margin: 0;
  }

  html,
  body {
    position: relative;
    width: 100%;
    height: 100%;
    overflow: hidden;
  }
`;

const Routes: React.FC = () => {
  const { user } = useAuth();

  return (
    <BrowserRouter>
      <Global styles={css(globalStyles)} />
      {!!user ? (
        <Switch>
          <Route path="/dashboard" component={Dashboard} />
          <Redirect from="/" to="/dashboard" />
        </Switch>
      ) : (
        <Switch>
          <Route exact path="/" component={Login} />
          <Redirect to="/" />
        </Switch>
      )}
    </BrowserRouter>
  );
};

export default Routes;
