import { Capacitor } from '@capacitor/core';

export const isNativeApp = (): boolean => {
  try {
    return Capacitor.isNativePlatform();
  } catch {
    return false;
  }
};

export const getPlatformName = (): string => {
  try {
    const platform = Capacitor.getPlatform();
    if (platform === 'android') return 'Android App';
    if (platform === 'ios') return 'iOS App';
    return 'Web Browser';
  } catch {
    return 'Web Browser';
  }
};

export const triggerHaptic = () => {
  if (typeof window !== 'undefined' && 'vibrate' in navigator) {
    try {
      navigator.vibrate(25);
    } catch {
      // ignore
    }
  }
};
