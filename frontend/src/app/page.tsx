'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function Home() {
  const [lyrics, setLyrics] = useState('');
  const router = useRouter();

  const handleAnalyze = () => {
    if (!lyrics.trim()) return;
    localStorage.setItem('songsensei_lyrics', lyrics);
    router.push('/results');
  };

  return (
    <main
      className="min-h-screen flex flex-col items-center justify-center p-6"
      style={{ background: 'var(--bg)' }}
    >
      <div className="w-full max-w-xl flex flex-col gap-8">
        {/* Header */}
        <div className="text-center flex flex-col gap-1.5">
          <h1 className="text-5xl font-bold tracking-tight" style={{ color: 'var(--text)' }}>
            SongSensei
          </h1>
          <p className="text-base" style={{ color: 'var(--text-muted)' }}>
            曲の先生
          </p>
          <p className="text-sm mt-1" style={{ color: 'var(--text-muted)' }}>
            Paste Japanese lyrics to analyze vocabulary and kanji
          </p>
        </div>

        {/* Textarea */}
        <div className="flex flex-col gap-2">
          <textarea
            value={lyrics}
            onChange={(e) => setLyrics(e.target.value)}
            placeholder={'公園の落ち葉が舞って\n飛び方を教えてくれている\n\nPaste your lyrics here...'}
            rows={11}
            spellCheck={false}
            className="w-full rounded-lg p-5 text-base resize-none outline-none transition-all duration-200 leading-relaxed"
            style={{
              background: 'var(--card)',
              border: '1px solid var(--border)',
              color: 'var(--text)',
              fontFamily: 'inherit',
              caretColor: 'var(--accent)',
            }}
            onFocus={(e) => {
              e.currentTarget.style.borderColor = 'var(--border-hover)';
            }}
            onBlur={(e) => {
              e.currentTarget.style.borderColor = 'var(--border)';
            }}
          />
          <div className="flex justify-end pr-1">
            <span className="text-xs" style={{ color: 'var(--text-muted)' }}>
              {lyrics.length > 0 ? `${lyrics.length} characters` : ''}
            </span>
          </div>
        </div>

        {/* Analyze button */}
        <button
          onClick={handleAnalyze}
          disabled={!lyrics.trim()}
          className="w-full py-3.5 rounded-lg font-semibold text-sm transition-all duration-150"
          style={{
            background: lyrics.trim() ? 'var(--text)' : 'var(--card)',
            color: lyrics.trim() ? 'var(--bg)' : 'var(--text-muted)',
            border: `1px solid ${lyrics.trim() ? 'var(--text)' : 'var(--border)'}`,
            cursor: lyrics.trim() ? 'pointer' : 'not-allowed',
          }}
        >
          Analyze Lyrics →
        </button>
      </div>
    </main>
  );
}
