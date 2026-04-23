import { VocabEntry } from '@/lib/types';
import JlptBadge from './JlptBadge';

interface Props {
  entry: VocabEntry;
  showRomaji: boolean;
}

export default function VocabRow({ entry, showRomaji }: Props) {
  return (
    <div
      className="flex items-center gap-3 px-4 py-3 rounded-xl transition-colors duration-150"
      style={{ background: 'var(--card)', border: '1px solid var(--border)' }}
      onMouseEnter={(e) => {
        e.currentTarget.style.borderColor = 'var(--border-hover)';
        e.currentTarget.style.background = 'var(--card-hover)';
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.borderColor = 'var(--border)';
        e.currentTarget.style.background = 'var(--card)';
      }}
    >
      <span
        className="text-lg font-bold leading-none"
        style={{ color: 'var(--text)', minWidth: '3rem' }}
      >
        {entry.word}
      </span>
      {showRomaji && (
        <span className="text-sm" style={{ color: 'var(--text-muted)' }}>
          {entry.reading}
        </span>
      )}
      <div className="flex-1" />
      <span className="text-sm" style={{ color: 'var(--text-secondary)' }}>
        {entry.meaning[0]}
      </span>
      <JlptBadge level={entry.jlpt} />
    </div>
  );
}
