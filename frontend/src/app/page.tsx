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
          <h1 className="text-5xl font-bold tracking-tight" style={{ color: 'var(--espresso)' }}>
            SongSensei
          </h1>
          <p className="text-lg font-light" style={{ color: 'var(--caramel)' }}>
            曲の先生
          </p>
          <p className="text-sm" style={{ color: 'var(--text-muted)' }}>
            Paste Japanese song lyrics to analyze vocabulary and kanji
          </p>
        </div>

        {/* Textarea */}
        <div className="flex flex-col gap-2">
          <textarea
            value={lyrics}
            onChange={(e) => setLyrics(e.target.value)}
            placeholder={'君の笑顔が忘れられなくて\nまた会いたいと思ってる\n\nPaste your lyrics here...'}
            rows={11}
            spellCheck={false}
            className="w-full rounded-2xl p-5 text-base resize-none outline-none transition-all duration-200 leading-relaxed"
            style={{
              background: 'var(--card)',
              border: '1px solid var(--border)',
              color: 'var(--text)',
              fontFamily: 'inherit',
              caretColor: 'var(--caramel)',
            }}
            onFocus={(e) => {
              e.currentTarget.style.borderColor = 'var(--caramel)';
              e.currentTarget.style.boxShadow = '0 0 0 3px rgba(184,124,76,0.1)';
            }}
            onBlur={(e) => {
              e.currentTarget.style.borderColor = 'var(--border)';
              e.currentTarget.style.boxShadow = 'none';
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
          className="w-full py-4 rounded-2xl font-semibold text-base transition-all duration-200"
          style={{
            background: lyrics.trim() ? 'var(--espresso)' : 'var(--border)',
            color: lyrics.trim() ? '#fdf8f3' : 'var(--text-muted)',
            cursor: lyrics.trim() ? 'pointer' : 'not-allowed',
          }}
          onMouseEnter={(e) => {
            if (!lyrics.trim()) return;
            e.currentTarget.style.background = 'var(--espresso-light)';
            e.currentTarget.style.transform = 'translateY(-1px)';
            e.currentTarget.style.boxShadow = '0 6px 20px rgba(44,26,14,0.2)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background = lyrics.trim() ? 'var(--espresso)' : 'var(--border)';
            e.currentTarget.style.transform = '';
            e.currentTarget.style.boxShadow = '';
          }}
        >
          Analyze Lyrics →
        </button>
      </div>
    </main>
  );
}
