import { VocabEntry } from '@/lib/types';
import JlptBadge from './JlptBadge';

interface Props {
  entry: VocabEntry;
  index: number;
}

export default function VocabRow({ entry, index }: Props) {
  const num = String(index + 1).padStart(2, '0');

  return (
    <div
      className="flex items-center gap-3 py-3"
      style={{ borderBottom: '1px solid var(--border)' }}
    >
      {/* Row number */}
      <span className="text-xs font-mono w-5 shrink-0 text-right" style={{ color: 'var(--text-muted)' }}>
        {num}
      </span>

      {/* Word */}
      <span className="text-xl font-bold leading-none shrink-0" style={{ color: 'var(--text)' }}>
        {entry.word}
      </span>

      {/* Reading */}
      {entry.reading && (
        <span className="text-sm shrink-0" style={{ color: 'var(--text-muted)' }}>
          {entry.reading}
        </span>
      )}

      {/* Dash + meaning */}
      <span className="text-sm shrink-0" style={{ color: 'var(--text-muted)' }}>—</span>
      <span className="text-sm flex-1" style={{ color: 'var(--text-secondary)' }}>
        {entry.meaning[0]}
      </span>

      <JlptBadge level={entry.jlpt} />

      {/* Add button */}
      <button
        className="w-6 h-6 rounded-full flex items-center justify-center text-xs shrink-0 transition-colors duration-150"
        style={{
          border: '1px solid var(--border)',
          color: 'var(--text-muted)',
          background: 'transparent',
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.borderColor = 'var(--text-muted)';
          e.currentTarget.style.color = 'var(--text)';
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.borderColor = 'var(--border)';
          e.currentTarget.style.color = 'var(--text-muted)';
        }}
      >
        +
      </button>
    </div>
  );
}
