
import json

from analyze import findVocabKanji
from dict_lookup import getVocabData, getKanjiData


def analyzeLyrics(text: str):
    """Analyze lyrics and return structured vocab + kanji data."""
    kanji_list, vocab_list = findVocabKanji(text)

    print(f"Found {len(vocab_list)} vocab words and {len(kanji_list)} kanji")

    vocab_data = getVocabData(vocab_list)
    kanji_data = getKanjiData(kanji_list)

    return {
        "vocab": vocab_data,
        "kanji": kanji_data
    }


text = """君の周りに浮かんだものに触れて
あぁ 何を作れるだろう"""

result = analyzeLyrics(text)

print("\n--- VOCAB RESULTS ---")
for v in result["vocab"]:
    print(f"{v['word']} ({v['reading']}) — {v['meaning']} | JLPT: {v['jlpt']}")

print("\n--- KANJI RESULTS ---")
for k in result["kanji"]:
    print(f"{k['kanji']} — Onyomi: {', '.join(k['onyomi'])} | Kunyomi: {', '.join(k['kunyomi'])} | {k['meaning']}")

print(kanji_data)


from fastapi import FastAPI
from pydantic import BaseModel
from analyze import findVocabKanji
from dict_lookup import getVocabData, getKanjiData

app = FastAPI()

class LyricsRequest(BaseModel):
    text: str

    