/** @jsx jsx */
import { css, Global, jsx } from '@emotion/core';

import { UseAuth } from '~/hooks/common/useAuth';

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

type Props = UseAuth;

const App: React.FC<Props> = props => {
  const { user, isLoading, onSignIn, onSignOut } = props;
  const title = isLoading
    ? 'Loading...'
    : user
    ? `Hello! ${user.name}`
    : 'Authentication required';

  return (
    <div>
      <Global styles={css(globalStyles)} />
      <h1>{title}</h1>
      {!isLoading && (
        <p>
          {user ? (
            <button type="button" onClick={onSignOut}>
              Sign out
            </button>
          ) : (
            <button type="button" onClick={onSignIn}>
              Sign in with GitHub
            </button>
          )}
        </p>
      )}
    </div>
  );
};

export default App;
