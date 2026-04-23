import { LyricLine } from '@/lib/types';
import VocabRow from './VocabRow';
import KanjiCard from './KanjiCard';

interface Props {
  line: LyricLine;
  showRomaji: boolean;
}

function SectionHeader({ label, count }: { label: string; count: number }) {
  return (
    <p className="text-xs font-semibold uppercase tracking-widest" style={{ color: 'var(--text-muted)' }}>
      {label} ({count})
    </p>
  );
}

export default function DetailsPanel({ line, showRomaji }: Props) {
  return (
    <main
      className="flex flex-col gap-6 p-6 md:w-1/2 md:overflow-y-auto"
      style={{ borderLeft: '1px solid var(--border)' }}
    >
      <h2 className="font-bold text-base" style={{ color: 'var(--espresso)' }}>
        Line Details
      </h2>

      {/* Sentence card */}
      <div
        className="rounded-2xl p-5 flex flex-col gap-1"
        style={{ background: 'var(--card)', border: '1px solid var(--border)' }}
      >
        <p className="text-2xl font-medium leading-snug" style={{ color: 'var(--espresso)' }}>
          {line.japanese}
        </p>
        {showRomaji && (
          <p className="text-sm italic" style={{ color: 'var(--text-muted)' }}>
            {line.romaji}
          </p>
        )}
        <p className="text-base mt-1" style={{ color: 'var(--text-secondary)' }}>
          {line.english}
        </p>
      </div>

      {/* Vocabulary */}
      <div className="flex flex-col gap-3">
        <SectionHeader label="Vocabulary" count={line.vocab.length} />
        {line.vocab.length > 0 ? (
          <div className="flex flex-col gap-2">
            {line.vocab.map((v) => (
              <VocabRow key={v.word + v.reading} entry={v} showRomaji={showRomaji} />
            ))}
          </div>
        ) : (
          <p className="text-sm" style={{ color: 'var(--text-muted)' }}>
            No vocabulary found.
          </p>
        )}
      </div>

      {/* Kanji */}
      <div className="flex flex-col gap-3 pb-8">
        <SectionHeader label="Kanji" count={line.kanji.length} />
        {line.kanji.length > 0 ? (
          <div className="grid grid-cols-3 sm:grid-cols-4 lg:grid-cols-5 gap-3">
            {line.kanji.map((k) => (
              <KanjiCard key={k.kanji} entry={k} showRomaji={showRomaji} />
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
