import React, { useState } from 'react';
import { RefreshCw, Lock, Unlock, Copy, Check, Sparkles, Code2, Eye } from 'lucide-react';

interface PaletteColor {
  hex: string;
  locked: boolean;
}

export const PaletteCraft: React.FC = () => {
  const [colors, setColors] = useState<PaletteColor[]>([
    { hex: '#0EA5E9', locked: false }, // sky blue
    { hex: '#6366F1', locked: false }, // indigo
    { hex: '#EC4899', locked: false }, // pink
    { hex: '#F59E0B', locked: false }, // amber
    { hex: '#10B981', locked: false }, // emerald
  ]);
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);
  const [showCode, setShowCode] = useState(false);

  const generateRandomHex = () => {
    const letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  };

  const handleRegenerate = () => {
    setColors(prev =>
      prev.map(c => (c.locked ? c : { ...c, hex: generateRandomHex() }))
    );
  };

  const toggleLock = (index: number) => {
    setColors(prev =>
      prev.map((c, i) => (i === index ? { ...c, locked: !c.locked } : c))
    );
  };

  const copyToClipboard = (hex: string, index: number) => {
    navigator.clipboard.writeText(hex);
    setCopiedIndex(index);
    setTimeout(() => setCopiedIndex(null), 1800);
  };

  const getLuminance = (hex: string) => {
    const rgb = parseInt(hex.slice(1), 16);
    const r = (rgb >> 16) & 0xff;
    const g = (rgb >> 8) & 0xff;
    const b = (rgb >> 0) & 0xff;
    return (0.299 * r + 0.587 * g + 0.114 * b) / 255;
  };

  const getContrastRatio = (hex1: string, hex2: string) => {
    const lum1 = getLuminance(hex1);
    const lum2 = getLuminance(hex2);
    const brightest = Math.max(lum1, lum2);
    const darkest = Math.min(lum1, lum2);
    return ((brightest + 0.05) / (darkest + 0.05)).toFixed(2);
  };

  return (
    <div className="space-y-6">
      {/* Header bar */}
      <div className="flex flex-wrap items-center justify-between gap-4 p-4 rounded-xl bg-slate-900/80 border border-slate-800">
        <div>
          <h3 className="text-lg font-semibold text-white flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-cyan-400" />
            PaletteCraft Pro
          </h3>
          <p className="text-xs text-slate-400">
            Generate cohesive color palettes, lock favored tones, check WCAG accessibility contrast.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setShowCode(!showCode)}
            className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-lg border border-slate-700 bg-slate-800/80 hover:bg-slate-700 text-slate-300 transition-colors"
          >
            {showCode ? <Eye className="w-3.5 h-3.5" /> : <Code2 className="w-3.5 h-3.5" />}
            {showCode ? 'View Demo' : 'View Code'}
          </button>
          <button
            onClick={handleRegenerate}
            className="flex items-center gap-1.5 px-4 py-1.5 text-xs font-semibold rounded-lg bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white shadow-lg shadow-cyan-500/20 active:scale-95 transition-all"
          >
            <RefreshCw className="w-3.5 h-3.5" />
            Randomize (Space)
          </button>
        </div>
      </div>

      {showCode ? (
        <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 font-mono text-xs overflow-x-auto text-slate-300">
          <pre>{`// PaletteCraft contrast & generator logic
export const getLuminance = (hex: string) => {
  const rgb = parseInt(hex.slice(1), 16);
  const r = (rgb >> 16) & 0xff;
  const g = (rgb >> 8) & 0xff;
  const b = (rgb >> 0) & 0xff;
  return (0.299 * r + 0.587 * g + 0.114 * b) / 255;
};

export const getContrastRatio = (hex1: string, hex2: string) => {
  const lum1 = getLuminance(hex1);
  const lum2 = getLuminance(hex2);
  const brightest = Math.max(lum1, lum2);
  const darkest = Math.min(lum1, lum2);
  return ((brightest + 0.05) / (darkest + 0.05)).toFixed(2);
};`}</pre>
        </div>
      ) : (
        <>
          {/* Color strip */}
          <div className="grid grid-cols-1 sm:grid-cols-5 gap-3">
            {colors.map((color, index) => {
              const isLight = getLuminance(color.hex) > 0.5;
              const textColor = isLight ? '#0f172a' : '#ffffff';

              return (
                <div
                  key={index}
                  className="group relative flex flex-col justify-between h-48 sm:h-64 rounded-2xl p-4 shadow-xl transition-all duration-300 hover:scale-[1.02] border border-white/10"
                  style={{ backgroundColor: color.hex }}
                >
                  {/* Top action: Lock button */}
                  <div className="flex justify-end">
                    <button
                      onClick={() => toggleLock(index)}
                      title={color.locked ? 'Unlock color' : 'Lock color'}
                      className="p-2 rounded-full backdrop-blur-md transition-all"
                      style={{
                        backgroundColor: isLight ? 'rgba(0,0,0,0.1)' : 'rgba(255,255,255,0.2)',
                        color: textColor,
                      }}
                    >
                      {color.locked ? (
                        <Lock className="w-4 h-4" />
                      ) : (
                        <Unlock className="w-4 h-4 opacity-50 group-hover:opacity-100" />
                      )}
                    </button>
                  </div>

                  {/* Bottom info: Hex & Copy */}
                  <div className="space-y-2">
                    <div
                      className="font-mono font-bold text-sm tracking-wider"
                      style={{ color: textColor }}
                    >
                      {color.hex}
                    </div>

                    <button
                      onClick={() => copyToClipboard(color.hex, index)}
                      className="w-full py-1.5 px-3 rounded-lg flex items-center justify-center gap-1.5 text-xs font-semibold backdrop-blur-md transition-all active:scale-95"
                      style={{
                        backgroundColor: isLight ? 'rgba(0,0,0,0.15)' : 'rgba(255,255,255,0.25)',
                        color: textColor,
                      }}
                    >
                      {copiedIndex === index ? (
                        <>
                          <Check className="w-3.5 h-3.5 text-emerald-400" />
                          <span>Copied!</span>
                        </>
                      ) : (
                        <>
                          <Copy className="w-3.5 h-3.5" />
                          <span>Copy HEX</span>
                        </>
                      )}
                    </button>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Accessibility Contrast Matrix */}
          <div className="p-4 rounded-xl bg-slate-900/60 border border-slate-800">
            <h4 className="text-xs font-semibold uppercase tracking-wider text-slate-400 mb-3">
              WCAG Accessibility Contrast against White & Black
            </h4>
            <div className="grid grid-cols-2 sm:grid-cols-5 gap-3 text-xs">
              {colors.map((c, i) => {
                const ratioWhite = Number(getContrastRatio(c.hex, '#FFFFFF'));
                const ratioBlack = Number(getContrastRatio(c.hex, '#000000'));
                return (
                  <div key={i} className="p-2.5 rounded-lg bg-slate-950/70 border border-slate-800/80">
                    <div className="flex items-center gap-2 mb-1.5">
                      <span className="w-3 h-3 rounded-full" style={{ backgroundColor: c.hex }} />
                      <span className="font-mono text-slate-200">{c.hex}</span>
                    </div>
                    <div className="flex justify-between text-[11px] text-slate-400">
                      <span>vs White:</span>
                      <span className={ratioWhite >= 4.5 ? 'text-emerald-400 font-semibold' : 'text-slate-400'}>
                        {ratioWhite}:1 {ratioWhite >= 4.5 ? '✓ AA' : ''}
                      </span>
                    </div>
                    <div className="flex justify-between text-[11px] text-slate-400">
                      <span>vs Black:</span>
                      <span className={ratioBlack >= 4.5 ? 'text-emerald-400 font-semibold' : 'text-slate-400'}>
                        {ratioBlack}:1 {ratioBlack >= 4.5 ? '✓ AA' : ''}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </>
      )}
    </div>
  );
};
