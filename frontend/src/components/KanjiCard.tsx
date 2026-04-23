import { KanjiEntry } from '@/lib/types';
import JlptBadge from './JlptBadge';

interface Props {
  entry: KanjiEntry;
  showRomaji: boolean;
}

export default function KanjiCard({ entry, showRomaji }: Props) {
  return (
    <div
      className="flex flex-col items-center gap-2 p-4 rounded-xl text-center transition-colors duration-150"
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
      <span className="text-4xl font-bold leading-none" style={{ color: 'var(--espresso)' }}>
        {entry.kanji}
      </span>
      <p className="text-xs font-medium leading-snug" style={{ color: 'var(--text-secondary)' }}>
        {entry.meaning}
      </p>
      {showRomaji && (
        <div className="flex flex-col gap-0.5 w-full">
          {entry.onyomi.length > 0 && entry.onyomi[0] !== '' && (
            <p className="text-xs" style={{ color: 'var(--text-muted)' }}>
              <span>ON: </span>
              {entry.onyomi.join('、')}
            </p>
          )}
          {entry.kunyomi.length > 0 && (
            <p className="text-xs" style={{ color: 'var(--text-muted)' }}>
              <span>KUN: </span>
              {entry.kunyomi.join('、')}
            </p>
          )}
        </div>
      )}
      {entry.jlpt && (
        <div className="mt-auto">
          <JlptBadge level={entry.jlpt} />
        </div>
      )}
    </div>
  );
}
