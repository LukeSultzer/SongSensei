from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import List
from analyze import findVocabKanji
from dict_lookup import getVocabData, getKanjiData

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3002"],
    allow_methods=["*"],
    allow_headers=["*"],
)

class LyricsRequest(BaseModel):
    lines: List[str]

@app.post("/analyze")
def analyze_lyrics(req: LyricsRequest):
    # Tokenize each line (sequential — tagger is not thread-safe)
    line_data = []
    for line in req.lines:
        if not line.strip():
            continue
        kanji_list, vocab_list = findVocabKanji(line)
        line_data.append((line, kanji_list, vocab_list))

    # Deduplicate across all lines before hitting external APIs
    unique_vocab = list(dict.fromkeys(w for _, _, vocab in line_data for w in vocab))
    unique_kanji = list(dict.fromkeys(k for _, kanji, _ in line_data for k in kanji))

    # Fetch each unique word/kanji exactly once
    vocab_map = getVocabData(unique_vocab)
    kanji_map = getKanjiData(unique_kanji)

    # Map results back to each line
    results = []
    for line, kanji_list, vocab_list in line_data:
        results.append({
            "japanese": line,
            "vocab": [vocab_map[w] for w in vocab_list if w in vocab_map],
            "kanji": [kanji_map[k] for k in kanji_list if k in kanji_map],
        })
    return {"lines": results}

@app.get("/")
def root():
    return {"status": "ok"}
