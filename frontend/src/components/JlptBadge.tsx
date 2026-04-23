const JLPT_STYLES: Record<string, { bg: string; text: string; border: string }> = {
  N5: { bg: 'rgba(16,185,129,0.1)', text: '#059669', border: 'rgba(16,185,129,0.2)' },
  N4: { bg: 'rgba(14,165,233,0.1)', text: '#0284c7', border: 'rgba(14,165,233,0.2)' },
  N3: { bg: 'rgba(245,158,11,0.1)', text: '#d97706', border: 'rgba(245,158,11,0.2)' },
  N2: { bg: 'rgba(249,115,22,0.1)', text: '#ea580c', border: 'rgba(249,115,22,0.2)' },
  N1: { bg: 'rgba(239,68,68,0.1)', text: '#dc2626', border: 'rgba(239,68,68,0.2)' },
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
      className="text-xs font-semibold px-1.5 py-0.5 rounded-md"
      style={{ background: s.bg, color: s.text, border: `1px solid ${s.border}` }}
    >
      {level}
    </span>
  );
}
