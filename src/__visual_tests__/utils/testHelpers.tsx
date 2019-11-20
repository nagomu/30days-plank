import fs from 'fs';
import { toMatchImageSnapshot } from 'jest-image-snapshot';
import path from 'path';
import puppeteer from 'puppeteer';
import * as React from 'react';
import { renderToString } from 'react-dom/server';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router-dom';

import { mockStore } from '~/utils/testHelpers';

jest.setTimeout(60000);

expect.extend({ toMatchImageSnapshot });

export const launch = async (): Promise<puppeteer.Browser> =>
  await puppeteer.launch({
    defaultViewport: {
      width: 320,
      height: 480,
      isMobile: true,
      hasTouch: true,
    },
    timeout: 50000,
  });

export const injectAppToHtml = (
  component: React.ReactNode,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  store?: any,
): string => {
  const cssPath = path.resolve(__dirname, '../../', 'index.css');
  let css = fs.readFileSync(cssPath).toString();
  css = `
  ${css}
  *,
  *::after,
  *::before {
    transition-delay: 0s !important;
    transition-duration: 0s !important;
    animation-delay: -0.0001s !important;
    animation-duration: 0s !important;
    animation-play-state: paused !important;
    caret-color: transparent !important;
  }
  html {
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }
  `;
  const svgPath = path.resolve(__dirname, '../../', 'assets', 'sprite.svg');
  const svg = fs.readFileSync(svgPath).toString();
  const templatePath = path.resolve(__dirname, '../../', 'index.html');

  const html = renderToString(
    <Provider store={store || mockStore()}>
      <MemoryRouter>{component}</MemoryRouter>
    </Provider>,
  );

  let template = fs.readFileSync(templatePath).toString();

  template = template.replace('<%= htmlWebpackPlugin.options.css %>', css);
  template = template.replace('<%= htmlWebpackPlugin.options.svg %>', svg);

  return template.replace(
    '<div id="root"></div>',
    `<div id="root">${html}</div>`,
  );
};
