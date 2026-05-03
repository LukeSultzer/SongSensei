from fastapi import FastAPI, Query
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import List
from fugashi import Tagger
from analyze import findVocabKanji, isVocab, hasKanji
from dict_lookup import getVocabData, getKanjiData

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],
    allow_methods=["*"],
    allow_headers=["*"],
)

_debug_tagger = Tagger()

class LyricsRequest(BaseModel):
    lines: List[str]

@app.post("/analyze")
def analyze_lyrics(req: LyricsRequest):
    line_data = []
    for line in req.lines:
        if not line.strip():
            continue
        kanji_list, vocab_list = findVocabKanji(line)
        line_data.append((line, kanji_list, vocab_list))

    unique_vocab = list(dict.fromkeys(w for _, _, vocab in line_data for w in vocab))
    unique_kanji = list(dict.fromkeys(k for _, kanji, _ in line_data for k in kanji))

    vocab_map = getVocabData(unique_vocab)
    kanji_map = getKanjiData(unique_kanji)

    results = []
    for line, kanji_list, vocab_list in line_data:
        results.append({
            "japanese": line,
            "vocab": [vocab_map[w] for w in vocab_list if w in vocab_map],
            "kanji": [kanji_map[k] for k in kanji_list if k in kanji_map],
        })
    return {"lines": results}


@app.get("/debug/tokenize")
def debug_tokenize(text: str = Query(...)):
    """
    Returns every token fugashi produces for the given text, with all
    features and whether it would be kept as vocab or kanji.
    Use this to audit what the tagger sees before any lookups run.
    """
    tokens = []
    for word in _debug_tagger(text):
        f = word.feature
        tokens.append({
            "surface": word.surface,
            "lemma": f.lemma,
            "reading": f.kana,
            "pos1": f.pos1,
            "pos2": f.pos2,
            "pos3": f.pos3,
            "conjugation_type": f.cType,
            "conjugation_form": f.cForm,
            "included_as_vocab": isVocab(word),
            "included_as_kanji": hasKanji(word.surface),
        })
    return {"text": text, "token_count": len(tokens), "tokens": tokens}


@app.get("/debug/vocab")
def debug_vocab(text: str = Query(...)):
    """
    Runs the full pipeline for vocab only: tokenize → extract lemmas → jisho lookup.
    Returns both the raw lemma list from the tokenizer and the final lookup results
    so you can see exactly what was sent to jisho and what came back.
    """
    _, vocab_list = findVocabKanji(text)
    vocab_map = getVocabData(vocab_list)
    missed = [w for w in vocab_list if w not in vocab_map]
    return {
        "text": text,
        "extracted_lemmas": vocab_list,
        "lookup_results": vocab_map,
        "missed": missed,
    }


@app.get("/debug/kanji")
def debug_kanji(text: str = Query(...)):
    """
    Runs the full pipeline for kanji only: tokenize → extract characters → kanjiapi lookup.
    Returns both the raw kanji list and the final lookup results.
    """
    kanji_list, _ = findVocabKanji(text)
    kanji_map = getKanjiData(kanji_list)
    missed = [k for k in kanji_list if k not in kanji_map]
    return {
        "text": text,
        "extracted_kanji": kanji_list,
        "lookup_results": kanji_map,
        "missed": missed,
    }


@app.get("/")
def root():
    return {"status": "ok"}
