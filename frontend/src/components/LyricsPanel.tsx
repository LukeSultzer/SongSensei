import { LyricLine } from '@/lib/types';

interface Props {
  lines: LyricLine[];
  selectedId: number;
  onSelect: (id: number) => void;
}

export default function LyricsPanel({ lines, selectedId, onSelect }: Props) {
  return (
    <aside
      className="flex flex-col gap-4 p-6 md:w-1/2 md:overflow-y-auto"
      style={{ borderBottom: '1px solid var(--border)' }}
    >
      <div className="flex items-baseline gap-2">
        <h2 className="font-bold text-base" style={{ color: 'var(--espresso)' }}>
          Original Lyrics
        </h2>
        <span className="text-sm" style={{ color: 'var(--text-muted)' }}>
          (click a line)
        </span>
      </div>

      <div
        className="rounded-2xl overflow-hidden"
        style={{ border: '1px solid var(--border)', background: 'var(--card)' }}
      >
        {lines.map((line, i) => {
          const isSelected = line.id === selectedId;
          return (
            <button
              key={line.id}
              onClick={() => onSelect(line.id)}
              className="w-full text-left px-5 py-3 transition-colors duration-100"
              style={{
                background: isSelected ? 'var(--espresso)' : 'transparent',
                color: isSelected ? '#fdf8f3' : 'var(--text)',
                borderBottom: i < lines.length - 1 ? '1px solid var(--border)' : 'none',
                display: 'block',
              }}
              onMouseEnter={(e) => {
                if (!isSelected) e.currentTarget.style.background = 'var(--card-hover)';
              }}
              onMouseLeave={(e) => {
                if (!isSelected) e.currentTarget.style.background = 'transparent';
              }}
            >
              <span className="text-sm leading-relaxed">{line.japanese}</span>
            </button>
          );
        })}
      </div>
    </aside>
  );
}
