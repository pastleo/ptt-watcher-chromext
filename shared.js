export const PPT_URL = 'https://www.ptt.cc/bbs/mobilesales/index.html';
export const CHECK_ALARM_NAME = 'check'
export const CONTENT_STORAGE_KEY = 'content';

export const getLastContent = () => new Promise(resolve => {
  chrome.storage.local.get([CONTENT_STORAGE_KEY], result => {
    resolve(result[CONTENT_STORAGE_KEY])
  })
});

export const fetchPtt = async () => {
  const request = await fetch(PPT_URL);
  const responseText = await request.text();
  const responseDoc = (new DOMParser()).parseFromString(responseText, 'text/html');

  const content = responseDoc.querySelectorAll('.title').item(0).textContent;

  await new Promise(
    r => chrome.storage.local.set({ [CONTENT_STORAGE_KEY]: content }, r)
  );
  return content;
}

export const fetchPttAndNotify = async () => {
  const lastContent = await getLastContent();
  const content = await fetchPtt();

  if (lastContent !== content) {
    chrome.notifications.create('reminder', {
      type: 'basic',
      iconUrl: 'icon.png',
      title: 'ptt mobilesales first post:',
      message: content,
    });
  }
}

export const openPage = () => {
  chrome.tabs.create({ url: PPT_URL });
}
