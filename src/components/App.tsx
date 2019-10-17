/** @jsx jsx */
import { css, Global, jsx } from '@emotion/core';

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

const App: React.FC = () => (
  <div>
    <Global styles={css(globalStyles)} />
    Hello
  </div>
);

export default App;
