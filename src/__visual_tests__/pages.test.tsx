import puppeteer from 'puppeteer';
import * as React from 'react';

import Archives from '~/components/specifics/archive/Archives';
import { workoutFactory } from '~/factories/workoutFactory';
import { generateTitle, timestamp } from '~/utils';

import { injectAppToHtml, launch } from './utils/testHelpers';

const ts = timestamp(new Date());

const MOCK_LENGTH = 10;
const props = {
  archives: [...Array(MOCK_LENGTH).keys()].map(i => ({
    id: `${i + 1}`,
    challenge: `c${i + 1}`,
    title: `${generateTitle(
      workoutFactory(new Date(Date.UTC(2019, MOCK_LENGTH - i, 1, 0, 0, 0))),
    )}`,
    rate: i === 0 ? 10 : 100,
    createdAt: ts,
    updatedAt: ts,
  })),
  isLoading: false,
};

describe('Visual regression test', () => {
  let browser: puppeteer.Browser;
  let page: puppeteer.Page;

  beforeAll(async () => {
    browser = await launch();
    const context = await browser.createIncognitoBrowserContext();
    page = await context.newPage();
  });

  afterAll(async done => {
    await page.close();
    await browser.close();
    done();
  });

  describe('/archives', () => {
    it('renders correctly', async () => {
      await page.setContent(injectAppToHtml(<Archives {...props} />));
      await page.waitForSelector('#root');

      const screenshot = await page.screenshot({ fullPage: true });
      expect(screenshot).toMatchImageSnapshot({
        customSnapshotIdentifier: 'archives',
      });
    });

    it('renders correctly if archives are empty', async () => {
      const _props = {
        ...props,
        archives: [],
      };
      await page.setContent(injectAppToHtml(<Archives {..._props} />));
      await page.waitForSelector('#root');

      const screenshot = await page.screenshot({ fullPage: true });
      expect(screenshot).toMatchImageSnapshot({
        customSnapshotIdentifier: 'archives-empty',
      });
    });
  });
});
