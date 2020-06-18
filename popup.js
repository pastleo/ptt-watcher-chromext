import {
  CHECK_ALARM_NAME, CONTENT_STORAGE_KEY,
  getLastContent, fetchPtt, openPage
} from './shared.js';

window.addEventListener('DOMContentLoaded', () => {
  let alarm;

  const statusSpan = document.getElementById('status');
  const toggleBtn = document.getElementById('toggle');
  const contentLink = document.getElementById('content');

  const refreshToggleBtn = async () => {
    alarm = await new Promise(r => chrome.alarms.get(CHECK_ALARM_NAME, r));
    toggleBtn.textContent = alarm ? 'Turn off' : 'Turn on'
    statusSpan.textContent = alarm ? 'Checks every 1 minutes...' : 'Disabled'
  }

  const refreshContentLink = async () => {
    contentLink.textContent = await getLastContent();
  }

  toggleBtn.addEventListener('click', () => {
    if (alarm) {
      chrome.alarms.clear(CHECK_ALARM_NAME);
    } else {
      chrome.alarms.create(CHECK_ALARM_NAME, { periodInMinutes: 1 })
    }

    refreshToggleBtn()
  });

  contentLink.addEventListener('click', openPage);

  document.getElementById('fetch').addEventListener('click', async () => {
    contentLink.textContent = '';
    await fetchPtt();
    refreshContentLink();
  });

  refreshToggleBtn();
  refreshContentLink();
});

