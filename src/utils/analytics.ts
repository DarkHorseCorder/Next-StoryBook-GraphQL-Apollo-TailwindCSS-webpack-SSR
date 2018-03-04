import * as DeviceInfo from 'react-device-detect';
import { IAnalyticsDeviceData } from '../types/analytics';
import { getCurrentUser } from './auth';
declare const window: any;

function getDeviceData(): IAnalyticsDeviceData {
  return {
    osName: DeviceInfo.osName,
    osVersion: DeviceInfo.osVersion,
    browserName: DeviceInfo.browserName,
    browserVersion: DeviceInfo.browserVersion,
    deviceType: DeviceInfo.deviceType,
    appVersion: window.navigator.appVersion,
    userAgent: window.navigator.userAgent,
    language: window.navigator.language,
  };
}

function getUrlData(): any {
  return {
    url: window.location.href,
    pathname: window.location.pathname,
    form: '',
    language: window.navigator.language,
    referrer: document.referrer,
  };
}

export const trackEvent = (
  event: any,
  eventData = {},
  additionalData = {}
): void => {
  if (typeof window === 'undefined') {
    return;
  }

  const { id, name } = getCurrentUser();

  try {
    window['analytics'].track(event, {
      device: getDeviceData(),
      pageUrl: getUrlData(),
      currentUser: { id, name },
      eventData,
      ...additionalData,
    });
  } catch (ex) {}
};
