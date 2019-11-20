import puppeteer from 'puppeteer';
import * as React from 'react';

import ArchivedChallenge from '~/components/specifics/archive/ArchivedChallenge';
import Archives from '~/components/specifics/archive/Archives';
import Dashboard from '~/components/specifics/dashboard/Dashboard';
import SignIn from '~/components/specifics/signIn/SignIn';
import Workout from '~/components/specifics/workout/Workout';
import { workoutFactory } from '~/factories/workoutFactory';
import { Timer } from '~/types';
import { generateTitle, timestamp } from '~/utils';
import { mockStore } from '~/utils/testHelpers';

import { injectAppToHtml, launch } from './utils/testHelpers';

const today = new Date(Date.UTC(2019, 9, 1, 0, 0, 0));
const ts = timestamp(today);

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

  describe('/', () => {
    const props = {
      onSignIn: jest.fn(),
    };

    it('renders correctly', async () => {
      await page.setContent(injectAppToHtml(<SignIn {...props} />));
      await page.waitForSelector('#root');

      const screenshot = await page.screenshot({ fullPage: true });
      expect(screenshot).toMatchImageSnapshot({
        customSnapshotIdentifier: 'sign-in',
      });
    });
  });

  describe('/dashboard', () => {
    const props = {
      challenge: {
        id: 'id',
        isActive: false,
        workouts: workoutFactory(today),
        createdAt: ts,
        updatedAt: ts,
      },
      isLoading: false,
      onAddChallenge: jest.fn(),
    };

    const store = mockStore({ challenge: props.challenge });

    it('renders correctly', async () => {
      await page.setContent(injectAppToHtml(<Dashboard {...props} />, store));
      await page.waitForSelector('#root');

      const screenshot = await page.screenshot({ fullPage: true });
      expect(screenshot).toMatchImageSnapshot({
        customSnapshotIdentifier: 'dashboard',
      });
    });

    // TODO:
    //   Add expired
    //   Add StartButton
    //   Add Not started yet
  });

  describe('/challenges/:challengeId/workouts/:id', () => {
    const props = {
      isLoading: false,
      onReset: jest.fn(),
      onStart: jest.fn(),
      onTogglePause: jest.fn(),
      pathname: '/',
      progress: 20,
      status: Timer.standby,
      workout: {
        id: '1',
        isCompleted: false,
        isRest: false,
        menu: 20,
        date: ts,
        title: 'Day 1',
      },
    };

    it('renders correctly', async () => {
      await page.setContent(injectAppToHtml(<Workout {...props} />));
      await page.waitForSelector('#root');

      const screenshot = await page.screenshot({ fullPage: true });
      expect(screenshot).toMatchImageSnapshot({
        customSnapshotIdentifier: 'workout',
      });
    });
  });

  describe('/archives', () => {
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

  describe('/archives/:challengeId', () => {
    const props = {
      challengeId: 'id',
      title: 'title',
      challenge: {
        id: 'id',
        isActive: false,
        workouts: workoutFactory(today),
        createdAt: ts,
        updatedAt: ts,
      },
      isLoading: false,
    };

    it('renders correctly', async () => {
      await page.setContent(injectAppToHtml(<ArchivedChallenge {...props} />));
      await page.waitForSelector('#root');

      const screenshot = await page.screenshot({ fullPage: true });
      expect(screenshot).toMatchImageSnapshot({
        customSnapshotIdentifier: 'archived-challenge',
      });
    });

    it('renders correctly if challenge does not exist', async () => {
      const _props = {
        ...props,
        challenge: undefined,
      };
      await page.setContent(injectAppToHtml(<ArchivedChallenge {..._props} />));
      await page.waitForSelector('#root');

      const screenshot = await page.screenshot({ fullPage: true });
      expect(screenshot).toMatchImageSnapshot({
        customSnapshotIdentifier: 'archived-challenge-not-found',
      });
    });
  });
});
