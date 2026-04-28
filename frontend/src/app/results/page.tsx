'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { LyricLine } from '@/lib/types';
import LyricsPanel from '@/components/LyricsPanel';
import DetailsPanel from '@/components/DetailsPanel';

const API_URL = process.env.NEXT_PUBLIC_API_URL ?? 'http://localhost:8000';

export default function Results() {
  const router = useRouter();
  const [selectedId, setSelectedId] = useState(0);
  const [showRomaji, setShowRomaji] = useState(false);
  const [lines, setLines] = useState<LyricLine[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const raw = localStorage.getItem('songsensei_lyrics') ?? '';
    const inputLines = raw.split('\n').filter((l) => l.trim());

    if (!inputLines.length) {
      router.push('/');
      return;
    }

    fetch(`${API_URL}/analyze`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ lines: inputLines }),
    })
      .then((res) => {
        if (!res.ok) throw new Error(`Server error ${res.status}`);
        return res.json();
      })
      .then((data) => {
        const mapped: LyricLine[] = data.lines.map(
          (l: Omit<LyricLine, 'id'>, i: number) => ({ ...l, id: i })
        );
        setLines(mapped);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, [router]);

  const lineIndex = lines.findIndex((l) => l.id === selectedId);
  const selected = lines[lineIndex] ?? lines[0];

  if (loading) {
    return (
      <div
        className="min-h-screen flex items-center justify-center"
        style={{ background: 'var(--bg)' }}
      >
        <p className="text-sm" style={{ color: 'var(--text-muted)' }}>
          Analyzing lyrics…
        </p>
      </div>
    );
  }

  if (error) {
    return (
      <div
        className="min-h-screen flex flex-col items-center justify-center gap-4"
        style={{ background: 'var(--bg)' }}
      >
        <p className="text-sm" style={{ color: 'var(--accent)' }}>
          {error}
        </p>
        <button
          onClick={() => router.push('/')}
          className="text-sm"
          style={{ color: 'var(--text-muted)' }}
        >
          ← Back
        </button>
      </div>
    );
  }

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
        {selected && (
          <DetailsPanel
            line={selected}
            lineIndex={lineIndex}
            totalLines={lines.length}
            showRomaji={showRomaji}
          />
        )}
      </div>
    </div>
  );
}
