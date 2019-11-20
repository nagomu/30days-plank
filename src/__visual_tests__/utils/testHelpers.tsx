import fs from 'fs';
import { toMatchImageSnapshot } from 'jest-image-snapshot';
import path from 'path';
import puppeteer from 'puppeteer';
import * as React from 'react';
import { renderToString } from 'react-dom/server';
import { MemoryRouter } from 'react-router-dom';

jest.setTimeout(10000);

expect.extend({ toMatchImageSnapshot });

const launch = async (): Promise<puppeteer.Browser> =>
  await puppeteer.launch({
    defaultViewport: {
      width: 320,
      height: 480,
      isMobile: true,
      hasTouch: true,
    },
  });

const incognito = async (): Promise<puppeteer.BrowserContext> => {
  const browser = await launch();
  return await browser.createIncognitoBrowserContext();
};

export const newPage = async (): Promise<puppeteer.Page> => {
  const context = await incognito();
  return await context.newPage();
};

export const injectAppToHtml = (component: React.ReactNode): string => {
  const cssPath = path.resolve(__dirname, '../../', 'index.css');
  const css = fs.readFileSync(cssPath).toString();
  const svgPath = path.resolve(__dirname, '../../', 'assets', 'sprite.svg');
  const svg = fs.readFileSync(svgPath).toString();
  const templatePath = path.resolve(__dirname, '../../', 'index.html');

  const html = renderToString(<MemoryRouter>{component}</MemoryRouter>);

  let template = fs.readFileSync(templatePath).toString();

  template = template.replace('<%= htmlWebpackPlugin.options.css %>', css);
  template = template.replace('<%= htmlWebpackPlugin.options.svg %>', svg);

  return template.replace(
    '<div id="root"></div>',
    `<div id="root">${html}</div>`,
  );
};
