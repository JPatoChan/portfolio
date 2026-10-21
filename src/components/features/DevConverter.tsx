import React, { useState } from 'react';
import { Calculator, ArrowRightLeft, Clock, HardDrive, DollarSign, Copy, Check, Code2, Eye } from 'lucide-react';

export const DevConverter: React.FC = () => {
  const [subTab, setSubTab] = useState<'px-rem' | 'bytes' | 'timestamp' | 'currency'>('px-rem');
  const [copiedKey, setCopiedKey] = useState<string | null>(null);
  const [showCode, setShowCode] = useState(false);

  // PX to REM
  const [pxValue, setPxValue] = useState<number>(24);
  const [baseFontSize, setBaseFontSize] = useState<number>(16);

  // Bytes converter
  const [byteInput, setByteInput] = useState<number>(1048576); // 1 MB

  // Timestamp converter
  const [timestampInput, setTimestampInput] = useState<number>(Math.floor(Date.now() / 1000));

  // Currency
  const [currencyUSD, setCurrencyUSD] = useState<number>(100);

  const copyVal = (text: string, key: string) => {
    navigator.clipboard.writeText(text);
    setCopiedKey(key);
    setTimeout(() => setCopiedKey(null), 1800);
  };

  const remValue = (pxValue / baseFontSize).toFixed(4).replace(/\.?0+$/, '');
  const emValue = remValue;

  return (
    <div className="space-y-4">
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-3 p-4 rounded-xl bg-slate-900/80 border border-slate-800">
        <div>
          <h3 className="text-lg font-semibold text-white flex items-center gap-2">
            <Calculator className="w-5 h-5 text-cyan-400" />
            DevConverter Suite
          </h3>
          <p className="text-xs text-slate-400">
            Rapid calculation tools for UI engineers, system developers, and data architects.
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
          <pre>{`// DevConverter conversions
export const pxToRem = (px: number, base: number = 16) => \`\${(px / base).toFixed(4)}rem\`;
export const formatBytes = (bytes: number) => {
  if (bytes === 0) return '0 B';
  const k = 1024;
  const sizes = ['B', 'KB', 'MB', 'GB', 'TB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
};`}</pre>
        </div>
      ) : (
        <>
          {/* Sub Navigation pills */}
          <div className="flex flex-wrap gap-2 p-1.5 rounded-xl bg-slate-900 border border-slate-800">
            <button
              onClick={() => setSubTab('px-rem')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                subTab === 'px-rem'
                  ? 'bg-cyan-500 text-white shadow'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800'
              }`}
            >
              <ArrowRightLeft className="w-3.5 h-3.5" />
              PX ⟷ REM / EM
            </button>
            <button
              onClick={() => setSubTab('bytes')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                subTab === 'bytes'
                  ? 'bg-cyan-500 text-white shadow'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800'
              }`}
            >
              <HardDrive className="w-3.5 h-3.5" />
              Data & Bytes
            </button>
            <button
              onClick={() => setSubTab('timestamp')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                subTab === 'timestamp'
                  ? 'bg-cyan-500 text-white shadow'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800'
              }`}
            >
              <Clock className="w-3.5 h-3.5" />
              Unix Timestamp
            </button>
            <button
              onClick={() => setSubTab('currency')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                subTab === 'currency'
                  ? 'bg-cyan-500 text-white shadow'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800'
              }`}
            >
              <DollarSign className="w-3.5 h-3.5" />
              Currency Rates
            </button>
          </div>

          {/* SubTab Content */}
          <div className="p-5 rounded-2xl bg-slate-900/60 border border-slate-800 min-h-[260px] flex flex-col justify-center">
            {subTab === 'px-rem' && (
              <div className="space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-medium text-slate-400 mb-1">
                      Pixels (PX) Value
                    </label>
                    <input
                      type="number"
                      value={pxValue}
                      onChange={e => setPxValue(Number(e.target.value))}
                      className="w-full px-3 py-2 rounded-lg bg-slate-950 border border-slate-800 text-slate-100 font-mono text-sm focus:border-cyan-500 focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-slate-400 mb-1">
                      Root Font Size (Default 16px)
                    </label>
                    <input
                      type="number"
                      value={baseFontSize}
                      onChange={e => setBaseFontSize(Number(e.target.value) || 16)}
                      className="w-full px-3 py-2 rounded-lg bg-slate-950 border border-slate-800 text-slate-100 font-mono text-sm focus:border-cyan-500 focus:outline-none"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <div className="p-4 rounded-xl bg-slate-950/80 border border-slate-800 flex items-center justify-between">
                    <div>
                      <span className="text-[10px] text-slate-500 uppercase tracking-wider block">REM</span>
                      <span className="text-xl font-bold font-mono text-cyan-400">{remValue} rem</span>
                    </div>
                    <button
                      onClick={() => copyVal(`${remValue}rem`, 'rem')}
                      className="p-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 transition-colors"
                    >
                      {copiedKey === 'rem' ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
                    </button>
                  </div>

                  <div className="p-4 rounded-xl bg-slate-950/80 border border-slate-800 flex items-center justify-between">
                    <div>
                      <span className="text-[10px] text-slate-500 uppercase tracking-wider block">EM</span>
                      <span className="text-xl font-bold font-mono text-indigo-400">{emValue} em</span>
                    </div>
                    <button
                      onClick={() => copyVal(`${emValue}em`, 'em')}
                      className="p-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 transition-colors"
                    >
                      {copiedKey === 'em' ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
                    </button>
                  </div>

                  <div className="p-4 rounded-xl bg-slate-950/80 border border-slate-800 flex items-center justify-between">
                    <div>
                      <span className="text-[10px] text-slate-500 uppercase tracking-wider block">Tailwind class</span>
                      <span className="text-sm font-bold font-mono text-emerald-400">
                        {pxValue === 16 ? 'p-4 (1rem)' : `[${pxValue}px]`}
                      </span>
                    </div>
                    <button
                      onClick={() => copyVal(`[${pxValue}px]`, 'tw')}
                      className="p-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 transition-colors"
                    >
                      {copiedKey === 'tw' ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
                    </button>
                  </div>
                </div>
              </div>
            )}

            {subTab === 'bytes' && (
              <div className="space-y-4">
                <div>
                  <label className="block text-xs font-medium text-slate-400 mb-1">
                    Raw Bytes (e.g. 1048576)
                  </label>
                  <input
                    type="number"
                    value={byteInput}
                    onChange={e => setByteInput(Number(e.target.value))}
                    className="w-full px-3 py-2 rounded-lg bg-slate-950 border border-slate-800 text-slate-100 font-mono text-sm focus:border-cyan-500 focus:outline-none"
                  />
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-center">
                  <div className="p-3 rounded-xl bg-slate-950 border border-slate-800">
                    <span className="text-[10px] text-slate-500 uppercase block">Kilobytes (KB)</span>
                    <span className="font-mono text-sm font-semibold text-slate-200">
                      {(byteInput / 1024).toFixed(2)} KB
                    </span>
                  </div>
                  <div className="p-3 rounded-xl bg-slate-950 border border-slate-800">
                    <span className="text-[10px] text-slate-500 uppercase block">Megabytes (MB)</span>
                    <span className="font-mono text-sm font-semibold text-cyan-400">
                      {(byteInput / (1024 * 1024)).toFixed(3)} MB
                    </span>
                  </div>
                  <div className="p-3 rounded-xl bg-slate-950 border border-slate-800">
                    <span className="text-[10px] text-slate-500 uppercase block">Gigabytes (GB)</span>
                    <span className="font-mono text-sm font-semibold text-indigo-400">
                      {(byteInput / (1024 * 1024 * 1024)).toFixed(4)} GB
                    </span>
                  </div>
                  <div className="p-3 rounded-xl bg-slate-950 border border-slate-800">
                    <span className="text-[10px] text-slate-500 uppercase block">Terabytes (TB)</span>
                    <span className="font-mono text-sm font-semibold text-pink-400">
                      {(byteInput / (1024 * 1024 * 1024 * 1024)).toFixed(6)} TB
                    </span>
                  </div>
                </div>
              </div>
            )}

            {subTab === 'timestamp' && (
              <div className="space-y-4">
                <div className="flex gap-2">
                  <div className="flex-1">
                    <label className="block text-xs font-medium text-slate-400 mb-1">
                      Unix Timestamp (Seconds)
                    </label>
                    <input
                      type="number"
                      value={timestampInput}
                      onChange={e => setTimestampInput(Number(e.target.value))}
                      className="w-full px-3 py-2 rounded-lg bg-slate-950 border border-slate-800 text-slate-100 font-mono text-sm focus:border-cyan-500 focus:outline-none"
                    />
                  </div>
                  <button
                    onClick={() => setTimestampInput(Math.floor(Date.now() / 1000))}
                    className="self-end px-3 py-2 text-xs font-medium rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 h-[38px]"
                  >
                    Set to Now
                  </button>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800">
                    <span className="text-[10px] text-slate-500 uppercase block">Local Time Format</span>
                    <span className="font-mono text-xs font-semibold text-cyan-300">
                      {new Date(timestampInput * 1000).toLocaleString()}
                    </span>
                  </div>
                  <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800">
                    <span className="text-[10px] text-slate-500 uppercase block">UTC / ISO 8601 Format</span>
                    <span className="font-mono text-xs font-semibold text-indigo-300">
                      {new Date(timestampInput * 1000).toISOString()}
                    </span>
                  </div>
                </div>
              </div>
            )}

            {subTab === 'currency' && (
              <div className="space-y-4">
                <div>
                  <label className="block text-xs font-medium text-slate-400 mb-1">
                    Amount in USD ($)
                  </label>
                  <input
                    type="number"
                    value={currencyUSD}
                    onChange={e => setCurrencyUSD(Number(e.target.value))}
                    className="w-full px-3 py-2 rounded-lg bg-slate-950 border border-slate-800 text-slate-100 font-mono text-sm focus:border-cyan-500 focus:outline-none"
                  />
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-center">
                  <div className="p-3 rounded-xl bg-slate-950 border border-slate-800">
                    <span className="text-[10px] text-slate-500 uppercase block">EUR (€)</span>
                    <span className="font-mono text-sm font-semibold text-slate-200">
                      €{(currencyUSD * 0.92).toFixed(2)}
                    </span>
                  </div>
                  <div className="p-3 rounded-xl bg-slate-950 border border-slate-800">
                    <span className="text-[10px] text-slate-500 uppercase block">GBP (£)</span>
                    <span className="font-mono text-sm font-semibold text-cyan-400">
                      £{(currencyUSD * 0.79).toFixed(2)}
                    </span>
                  </div>
                  <div className="p-3 rounded-xl bg-slate-950 border border-slate-800">
                    <span className="text-[10px] text-slate-500 uppercase block">JPY (¥)</span>
                    <span className="font-mono text-sm font-semibold text-indigo-400">
                      ¥{(currencyUSD * 155.4).toFixed(0)}
                    </span>
                  </div>
                  <div className="p-3 rounded-xl bg-slate-950 border border-slate-800">
                    <span className="text-[10px] text-slate-500 uppercase block">CAD ($)</span>
                    <span className="font-mono text-sm font-semibold text-emerald-400">
                      ${(currencyUSD * 1.36).toFixed(2)}
                    </span>
                  </div>
                </div>
              </div>
            )}
          </div>
        </>
      )}
    </div>
  );
};
