import { css } from '@emotion/core';

const globalStyles = css(`
*,
*::before,
*::after {
  box-sizing: border-box;
}

img {
  display: block;
  max-width: 100%;
}

html {
  background-color: #fff;
  color: #212121;
  font-family: Roboto, sans-serif, 'Apple Color Emoji', 'Segoe UI Emoji', 'Segoe UI Symbol';
  font-size: 16px;
  line-height: 1.15;
  -webkit-text-size-adjust: 100%;
}

body {
  width: 100%;
  min-height: 100vh;
  margin: 0;
  line-height: 1.5;
  text-rendering: optimizeSpeed;
  scroll-behavior: smooth;
}

html,
body {
  position: relative;
}
`);

export default globalStyles;
