import { CHECK_ALARM_NAME, fetchPtt, fetchPttAndNotify, openPage } from './shared.js';

chrome.runtime.onInstalled.addListener(() => {
  chrome.alarms.create(CHECK_ALARM_NAME, { periodInMinutes: 1 })
  fetchPtt();
});

chrome.alarms.onAlarm.addListener(async alarm => {
  console.log("Got an alarm!", alarm);
  fetchPttAndNotify();
});

chrome.notifications.onClicked.addListener(openPage);
