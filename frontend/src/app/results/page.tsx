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
  const lineIndex = lines.findIndex((l) => l.id === selectedId);
  const selected = lines[lineIndex] ?? lines[0];

  return (
    <div className="flex flex-col md:h-screen" style={{ background: 'var(--bg)' }}>
      {/* Header */}
      <header
        className="flex items-center gap-4 px-6 py-3 shrink-0"
        style={{ borderBottom: '1px solid var(--border)', background: 'var(--bg)' }}
      >
        <button
          onClick={() => router.push('/')}
          className="text-sm font-medium px-3 py-1.5 rounded transition-colors duration-150"
          style={{ color: 'var(--text-muted)' }}
          onMouseEnter={(e) => {
            e.currentTarget.style.color = 'var(--text)';
            e.currentTarget.style.background = 'var(--card)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.color = 'var(--text-muted)';
            e.currentTarget.style.background = 'transparent';
          }}
        >
          ← Back
        </button>

        <span className="font-bold text-base" style={{ color: 'var(--text)' }}>
          SongSensei
        </span>

        <div className="flex-1" />

        {/* Romaji toggle */}
        <button
          onClick={() => setShowRomaji((v) => !v)}
          className="text-sm px-3 py-1.5 rounded transition-colors duration-150"
          style={{
            background: showRomaji ? 'var(--text)' : 'transparent',
            color: showRomaji ? 'var(--bg)' : 'var(--text-muted)',
            border: `1px solid ${showRomaji ? 'var(--text)' : 'var(--border)'}`,
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
        />
        <DetailsPanel
          line={selected}
          lineIndex={lineIndex}
          totalLines={lines.length}
          showRomaji={showRomaji}
        />
      </div>
    </div>
  );
}
