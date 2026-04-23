export interface VocabEntry {
  word: string;
  reading: string;
  meaning: string[];
  jlpt: string | null;
  is_common: boolean;
}

export interface KanjiEntry {
  kanji: string;
  onyomi: string[];
  kunyomi: string[];
  meaning: string;
  jlpt: string | null;
}

export interface LyricLine {
  id: number;
  japanese: string;
  romaji: string;
  english: string;
  vocab: VocabEntry[];
  kanji: KanjiEntry[];
}
