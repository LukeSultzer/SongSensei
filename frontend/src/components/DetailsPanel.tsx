import { LyricLine } from '@/lib/types';
import VocabRow from './VocabRow';
import KanjiCard from './KanjiCard';

interface Props {
  line: LyricLine;
  lineIndex: number;
  totalLines: number;
  showRomaji: boolean;
}

export default function DetailsPanel({ line, lineIndex, totalLines, showRomaji }: Props) {
  const lineNum = String(lineIndex + 1).padStart(2, '0');

  return (
    <main
      className="flex flex-col gap-0 md:w-1/2 md:overflow-y-auto"
    >
      <div className="px-8 py-8 flex flex-col gap-5" style={{ borderBottom: '1px solid var(--border)' }}>
        {/* LINE indicator */}
        <div className="flex items-center gap-2">
          <span className="text-xs" style={{ color: 'var(--accent)' }}>●</span>
          <span
            className="text-xs font-mono tracking-widest uppercase"
            style={{ color: 'var(--text-muted)' }}
          >
            Line {lineNum} / {totalLines}
          </span>
        </div>

        {/* Sentence */}
        <div className="flex flex-col gap-1">
          <h2
            className="text-4xl font-bold leading-snug"
            style={{ color: 'var(--text)' }}
          >
            {line.japanese}
          </h2>
          {showRomaji && line.romaji && (
            <p
              className="text-sm font-mono"
              style={{ color: 'var(--text-muted)' }}
            >
              {line.romaji}
            </p>
          )}
          {line.english && (
            <p
              className="text-base italic mt-1"
              style={{ color: 'var(--text-secondary)' }}
            >
              {line.english}
            </p>
          )}
        </div>

      </div>

      {/* Vocabulary */}
      <div className="px-8 py-6" style={{ borderBottom: '1px solid var(--border)' }}>
        <div className="flex items-center gap-3 mb-4">
          <span
            className="text-xs font-semibold uppercase tracking-widest"
            style={{ color: 'var(--text-muted)' }}
          >
            Vocabulary
          </span>
          <span
            className="text-xs font-mono"
            style={{ color: 'var(--text-muted)' }}
          >
            {line.vocab.length}
          </span>
        </div>

        {line.vocab.length > 0 ? (
          <div>
            {line.vocab.map((v, i) => (
              <VocabRow key={v.word + v.reading} entry={v} index={i} />
            ))}
          </div>
        ) : (
          <p className="text-sm" style={{ color: 'var(--text-muted)' }}>
            No vocabulary found.
          </p>
        )}
      </div>

      {/* Kanji */}
      <div className="px-8 py-6 pb-12">
        <div className="flex items-center gap-3 mb-4">
          <span
            className="text-xs font-semibold uppercase tracking-widest"
            style={{ color: 'var(--text-muted)' }}
          >
            Kanji
          </span>
          <span
            className="text-xs font-mono"
            style={{ color: 'var(--text-muted)' }}
          >
            {line.kanji.length}
          </span>
        </div>

        {line.kanji.length > 0 ? (
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
            {line.kanji.map((k) => (
              <KanjiCard key={k.kanji} entry={k} />
            ))}
          </div>
        ) : (
          <p className="text-sm" style={{ color: 'var(--text-muted)' }}>
            No kanji found.
          </p>
        )}
      </div>
    </main>
  );
}
