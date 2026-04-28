import { LyricLine } from '@/lib/types';

interface Props {
  lines: LyricLine[];
  selectedId: number;
  onSelect: (id: number) => void;
}

export default function LyricsPanel({ lines, selectedId, onSelect }: Props) {
  return (
    <aside
      className="flex flex-col md:w-1/2 md:overflow-y-auto"
      style={{ borderRight: '1px solid var(--border)', borderBottom: '1px solid var(--border)' }}
    >
      {lines.map((line, i) => {
        const isSelected = line.id === selectedId;
        const num = String(i + 1).padStart(2, '0');

        return (
          <button
            key={line.id}
            onClick={() => onSelect(line.id)}
            className="w-full text-left px-8 py-2 transition-colors duration-100"
            style={{ background: 'transparent' }}
          >
            {/* Line number */}
            <div className="flex items-center gap-1.5 mb-0.5">
              {isSelected && (
                <span className="text-xs" style={{ color: 'var(--accent)' }}>→</span>
              )}
              <span
                className="text-xs font-mono"
                style={{ color: isSelected ? 'var(--accent)' : 'var(--text-muted)' }}
              >
                {num}
              </span>
            </div>

            {/* Japanese */}
            <p className="text-xl leading-snug" style={{ fontWeight: isSelected ? 600 : 400 }}>
              <span
                style={{
                  color: 'var(--text)',
                  borderBottom: isSelected ? '1px solid var(--text)' : 'none',
                  paddingBottom: isSelected ? '1px' : '0',
                }}
              >
                {line.japanese}
              </span>
            </p>

            {/* English */}
            <p className="text-sm mt-0.5" style={{ color: 'var(--text-muted)' }}>
              {line.english}
            </p>
          </button>
        );
      })}
    </aside>
  );
}
