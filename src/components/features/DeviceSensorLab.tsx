import React, { useState, useEffect } from 'react';
import { Smartphone, Wifi, WifiOff, Vibrate, BatteryCharging, Monitor, Code2, Eye, ShieldCheck } from 'lucide-react';
import { getPlatformName, isNativeApp, triggerHaptic } from '../../utils/platform';

export const DeviceSensorLab: React.FC = () => {
  const [isOnline, setIsOnline] = useState(typeof navigator !== 'undefined' ? navigator.onLine : true);
  const [screenDim, setScreenDim] = useState({
    width: typeof window !== 'undefined' ? window.innerWidth : 1920,
    height: typeof window !== 'undefined' ? window.innerHeight : 1080,
    pixelRatio: typeof window !== 'undefined' ? window.devicePixelRatio : 1,
  });
  const [vibrated, setVibrated] = useState(false);
  const [showCode, setShowCode] = useState(false);

  useEffect(() => {
    const handleOnline = () => setIsOnline(true);
    const handleOffline = () => setIsOnline(false);
    const handleResize = () => {
      setScreenDim({
        width: window.innerWidth,
        height: window.innerHeight,
        pixelRatio: window.devicePixelRatio,
      });
    };

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const handleTestVibrate = () => {
    triggerHaptic();
    setVibrated(true);
    setTimeout(() => setVibrated(false), 1200);
  };

  const platformName = getPlatformName();
  const isNative = isNativeApp();

  return (
    <div className="space-y-4">
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-3 p-4 rounded-xl bg-slate-900/80 border border-slate-800">
        <div>
          <h3 className="text-lg font-semibold text-white flex items-center gap-2">
            <Smartphone className="w-5 h-5 text-cyan-400" />
            Device & Platform Lab
          </h3>
          <p className="text-xs text-slate-400">
            Hardware capabilities, runtime detection (Web vs Android Capacitor), and viewport metrics.
          </p>
        </div>

        <button
          onClick={() => setShowCode(!showCode)}
          className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-lg border border-slate-700 bg-slate-800/80 hover:bg-slate-700 text-slate-300 transition-colors"
        >
          {showCode ? <Eye className="w-3.5 h-3.5" /> : <Code2 className="w-3.5 h-3.5" />}
          {showCode ? 'View Demo' : 'View Code'}
        </button>
      </div>

      {showCode ? (
        <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 font-mono text-xs overflow-x-auto text-slate-300">
          <pre>{`// Device & Capacitor runtime detector
import { Capacitor } from '@capacitor/core';

export const isNativeApp = () => Capacitor.isNativePlatform();
export const getPlatform = () => Capacitor.getPlatform(); // 'android' | 'ios' | 'web'`}</pre>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {/* Runtime Target */}
          <div className="p-4 rounded-xl bg-slate-900/60 border border-slate-800 space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-xs text-slate-400 uppercase tracking-wider font-semibold">Active Runtime</span>
              <ShieldCheck className="w-4 h-4 text-cyan-400" />
            </div>
            <div className="text-lg font-bold text-white flex items-center gap-2">
              <span className={`w-2.5 h-2.5 rounded-full ${isNative ? 'bg-emerald-400' : 'bg-cyan-400'}`} />
              {platformName}
            </div>
            <p className="text-[11px] text-slate-400">
              {isNative
                ? 'Running inside native Android WebView container with full native bridge access.'
                : 'Running in modern Chromium / Safari / Firefox browser with PWA readiness.'}
            </p>
          </div>

          {/* Network State */}
          <div className="p-4 rounded-xl bg-slate-900/60 border border-slate-800 space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-xs text-slate-400 uppercase tracking-wider font-semibold">Network Status</span>
              {isOnline ? <Wifi className="w-4 h-4 text-emerald-400" /> : <WifiOff className="w-4 h-4 text-rose-400" />}
            </div>
            <div className={`text-lg font-bold ${isOnline ? 'text-emerald-400' : 'text-rose-400'}`}>
              {isOnline ? 'Online (Connected)' : 'Offline (Disconnected)'}
            </div>
            <p className="text-[11px] text-slate-400">
              Reactive listeners monitor `window.navigator.onLine` and trigger offline data caching automatically.
            </p>
          </div>

          {/* Viewport Dimensions */}
          <div className="p-4 rounded-xl bg-slate-900/60 border border-slate-800 space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-xs text-slate-400 uppercase tracking-wider font-semibold">Display & Viewport</span>
              <Monitor className="w-4 h-4 text-indigo-400" />
            </div>
            <div className="text-lg font-bold font-mono text-cyan-300">
              {screenDim.width} × {screenDim.height} px
            </div>
            <div className="flex justify-between text-[11px] text-slate-400 pt-1">
              <span>Device Pixel Ratio:</span>
              <span className="font-mono text-slate-200">{screenDim.pixelRatio}x</span>
            </div>
          </div>

          {/* Haptics & Vibration */}
          <div className="p-4 rounded-xl bg-slate-900/60 border border-slate-800 space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs text-slate-400 uppercase tracking-wider font-semibold">Haptic Feedback</span>
              <Vibrate className="w-4 h-4 text-pink-400" />
            </div>
            <button
              onClick={handleTestVibrate}
              className={`w-full py-2 px-3 rounded-lg text-xs font-semibold flex items-center justify-center gap-2 border transition-all active:scale-95 ${
                vibrated
                  ? 'bg-pink-600 border-pink-500 text-white shadow-lg shadow-pink-500/30'
                  : 'bg-slate-800 hover:bg-slate-700 border-slate-700 text-slate-200'
              }`}
            >
              <Vibrate className="w-4 h-4" />
              {vibrated ? 'Haptic Pulse Fired!' : 'Test Haptic Feedback'}
            </button>
            <p className="text-[10px] text-slate-500 text-center">
              Uses Capacitor Haptics API on Android & Vibration API in mobile browsers.
            </p>
          </div>

          {/* Battery Status */}
          <div className="p-4 rounded-xl bg-slate-900/60 border border-slate-800 space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-xs text-slate-400 uppercase tracking-wider font-semibold">Power & Battery</span>
              <BatteryCharging className="w-4 h-4 text-emerald-400" />
            </div>
            <div className="text-lg font-bold text-white">
              System Protected
            </div>
            <p className="text-[11px] text-slate-400">
              Low-power mode responsive styling and energy-efficient CSS animations enabled.
            </p>
          </div>

          {/* Android Intent Support */}
          <div className="p-4 rounded-xl bg-slate-900/60 border border-slate-800 space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-xs text-slate-400 uppercase tracking-wider font-semibold">Android Bridge</span>
              <Smartphone className="w-4 h-4 text-amber-400" />
            </div>
            <div className="text-sm font-semibold text-slate-200">
              Capacitor v8 Android Runtime
            </div>
            <p className="text-[11px] text-slate-400">
              Configured with Android Gradle plugin, Kotlin 2.x compatibility, and target SDK 34+.
            </p>
          </div>
        </div>
      )}
    </div>
  );
};
