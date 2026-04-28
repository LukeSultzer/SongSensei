const JLPT_STYLES: Record<string, { bg: string; text: string }> = {
  N5: { bg: '#2d8a50', text: '#fff' },
  N4: { bg: '#3b7fd4', text: '#fff' },
  N3: { bg: '#7c5ccc', text: '#fff' },
  N2: { bg: '#3b96b5', text: '#fff' },
  N1: { bg: '#c04040', text: '#fff' },
};

interface Props {
  level: string | null;
}

export default function JlptBadge({ level }: Props) {
  if (!level) return null;
  const s = JLPT_STYLES[level];
  if (!s) return null;
  return (
    <span
      className="text-xs font-semibold px-2 py-0.5 rounded-sm shrink-0"
      style={{ background: s.bg, color: s.text }}
    >
      {level}
    </span>
  );
}
