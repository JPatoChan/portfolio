import React from 'react';

export default function WalkingSprite() {
  return (
    <div
      className="fixed bottom-0 z-50 pointer-events-none"
      style={{
        width: '64px',
        height: '64px',
        animation: 'move-across-moonwalk 24s linear infinite',
      }}
    >
      {/* Sprite facing RIGHT (Moonwalking LEFT) */}
      <div
        className="absolute inset-0"
        style={{
          backgroundImage: 'url(/sprite_transparent.png)',
          backgroundSize: '400% 400%',
          imageRendering: 'pixelated',
          animation: 'walk-face-right 0.8s step-end infinite, show-when-moving-left 24s step-end infinite'
        }}
      />
      {/* Sprite facing LEFT (Moonwalking RIGHT) */}
      <div
        className="absolute inset-0"
        style={{
          backgroundImage: 'url(/sprite_transparent.png)',
          backgroundSize: '400% 400%',
          imageRendering: 'pixelated',
          animation: 'walk-face-left 0.8s step-end infinite, show-when-moving-right 24s step-end infinite'
        }}
      />
      <style>{`
        /* Row 3 (66.66%) is facing Right */
        @keyframes walk-face-right {
          0% { background-position: 0% 66.6666%; }
          25% { background-position: 33.3333% 66.6666%; }
          50% { background-position: 66.6666% 66.6666%; }
          75% { background-position: 100% 66.6666%; }
          100% { background-position: 0% 66.6666%; }
        }
        /* Row 4 (100%) is facing Left */
        @keyframes walk-face-left {
          0% { background-position: 0% 100%; }
          25% { background-position: 33.3333% 100%; }
          50% { background-position: 66.6666% 100%; }
          75% { background-position: 100% 100%; }
          100% { background-position: 0% 100%; }
        }

        @keyframes move-across-moonwalk {
          /* 0 to 50%: Move Left */
          0% { transform: translateX(100vw); }
          49.99% { transform: translateX(-100px); }
          /* 50 to 100%: Move Right */
          50% { transform: translateX(-100px); }
          99.99% { transform: translateX(100vw); }
          100% { transform: translateX(100vw); }
        }

        @keyframes show-when-moving-left {
          0%, 49.99% { opacity: 1; }
          50%, 100% { opacity: 0; }
        }
        @keyframes show-when-moving-right {
          0%, 49.99% { opacity: 0; }
          50%, 100% { opacity: 1; }
        }
      `}</style>
    </div>
  );
}