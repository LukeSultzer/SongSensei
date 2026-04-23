'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { MOCK_LYRICS } from '@/lib/mockData';
import LyricsPanel from '@/components/LyricsPanel';
import DetailsPanel from '@/components/DetailsPanel';

export default function Results() {
  const router = useRouter();
  const [selectedId, setSelectedId] = useState(0);
  const [showRomaji, setShowRomaji] = useState(false);

  // Swap MOCK_LYRICS for real API data here when integrating the backend
  const lines = MOCK_LYRICS;
  const selected = lines.find((l) => l.id === selectedId) ?? lines[0];

  return (
    <div className="flex flex-col md:h-screen" style={{ background: 'var(--bg)' }}>
      {/* Header */}
      <header
        className="flex items-center gap-4 px-6 py-3 shrink-0"
        style={{ background: 'var(--surface)', borderBottom: '1px solid var(--border)' }}
      >
        <button
          onClick={() => router.push('/')}
          className="text-sm font-medium px-3 py-1.5 rounded-lg transition-all duration-150"
          style={{ color: 'var(--text-secondary)' }}
          onMouseEnter={(e) => {
            e.currentTarget.style.color = 'var(--text)';
            e.currentTarget.style.background = 'var(--border)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.color = 'var(--text-secondary)';
            e.currentTarget.style.background = 'transparent';
          }}
        >
          ← Back
        </button>
        <span className="font-bold text-base" style={{ color: 'var(--espresso)' }}>
          SongSensei
        </span>
        <span className="text-sm" style={{ color: 'var(--caramel)' }}>曲の先生</span>

        <div className="flex-1" />

        {/* Romaji toggle */}
        <button
          onClick={() => setShowRomaji((v) => !v)}
          className="text-sm font-medium px-3 py-1.5 rounded-lg transition-all duration-150"
          style={{
            background: showRomaji ? 'var(--espresso)' : 'transparent',
            color: showRomaji ? '#fdf8f3' : 'var(--text-secondary)',
            border: `1px solid ${showRomaji ? 'var(--espresso)' : 'var(--border)'}`,
          }}
          onMouseEnter={(e) => {
            if (!showRomaji) {
              e.currentTarget.style.borderColor = 'var(--border-hover)';
              e.currentTarget.style.color = 'var(--text)';
            }
          }}
          onMouseLeave={(e) => {
            if (!showRomaji) {
              e.currentTarget.style.borderColor = 'var(--border)';
              e.currentTarget.style.color = 'var(--text-secondary)';
            }
          }}
        >
          Romaji
        </button>
      </header>

      {/* Two-panel layout */}
      <div className="flex flex-col md:flex-row flex-1 md:overflow-hidden">
        <LyricsPanel
          lines={lines}
          selectedId={selectedId}
          onSelect={setSelectedId}
          showRomaji={showRomaji}
        />
        <DetailsPanel line={selected} showRomaji={showRomaji} />
      </div>
    </div>
  );
}
