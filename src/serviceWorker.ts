import config from '~/config';

const isServiceWorkerEnable =
  config.NODE_ENV === 'production' || config.SERVICE_WORKER === 'enable';

if (isServiceWorkerEnable && 'serviceWorker' in window.navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/sw.js');
  });
}
