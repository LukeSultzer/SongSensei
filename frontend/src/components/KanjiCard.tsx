import { KanjiEntry } from '@/lib/types';
import JlptBadge from './JlptBadge';

interface Props {
  entry: KanjiEntry;
  showRomaji: boolean;
}

export default function KanjiCard({ entry, showRomaji }: Props) {
  return (
    <div
      className="flex flex-col p-5 rounded-lg"
      style={{ background: 'var(--card)', border: '1px solid var(--border)' }}
    >
      {/* Large kanji */}
      <p
        className="text-8xl font-bold text-center leading-none py-4"
        style={{ color: 'var(--text)' }}
      >
        {entry.kanji}
      </p>

      {/* Meaning */}
      <p
        className="text-xs text-center mt-2"
        style={{ color: 'var(--text-secondary)' }}
      >
        {entry.meaning}
      </p>

      {/* Readings */}
      {showRomaji && (
        <div className="mt-3 flex flex-col gap-0.5">
          {entry.onyomi.length > 0 && entry.onyomi[0] !== '' && (
            <p className="text-xs" style={{ color: 'var(--text-muted)' }}>
              <span className="font-medium" style={{ color: 'var(--text-secondary)' }}>On</span>
              {'  '}{entry.onyomi.join('、')}
            </p>
          )}
          {entry.kunyomi.length > 0 && (
            <p className="text-xs" style={{ color: 'var(--text-muted)' }}>
              <span className="font-medium" style={{ color: 'var(--text-secondary)' }}>Kun</span>
              {'  '}{entry.kunyomi.join('、')}
            </p>
          )}
        </div>
      )}

      {/* Footer */}
      <div className="flex items-center justify-end mt-4">
        <JlptBadge level={entry.jlpt} />
      </div>
    </div>
  );
}
