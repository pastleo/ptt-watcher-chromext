const pttUrl = 'https://www.ptt.cc/bbs/mobilesales/index.html';

const fetchPttAndNotify = async () => {
  const request = await fetch(pttUrl);
  const responseText = await request.text();
  const responseDoc = (new DOMParser()).parseFromString(responseText, 'text/html');
  
  chrome.notifications.create('reminder', {
    type: 'basic',
    iconUrl: 'icon.png',
    title: 'ptt mobilesales first post:',
    message: responseDoc.querySelectorAll('.title').item(0).textContent
  });
}

chrome.runtime.onInstalled.addListener(() => {
  chrome.alarms.create('checks', { periodInMinutes: 1 })
  fetchPttAndNotify();
});
chrome.alarms.onAlarm.addListener(async alarm => {
  console.log("Got an alarm!", alarm);
  fetchPttAndNotify();
});

chrome.notifications.onClicked.addListener(() => {
  chrome.tabs.create({ url: pttUrl });
})
