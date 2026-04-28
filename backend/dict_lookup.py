import time
import requests
from concurrent.futures import ThreadPoolExecutor
from analyze import isKanaOnly

TIMEOUT = 10
MAX_WORKERS = 8
MAX_RETRIES = 2


def _fetch_kanji(kanji):
    for attempt in range(MAX_RETRIES + 1):
        try:
            res = requests.get(f"https://kanjiapi.dev/v1/kanji/{kanji}", timeout=TIMEOUT)
            if res.status_code == 200:
                data = res.json()
                return {
                    "kanji": kanji,
                    "onyomi": data.get("on_readings", []),
                    "kunyomi": data.get("kun_readings", []),
                    "meaning": ", ".join(data.get("meanings", [])),
                    "jlpt": f"N{data['jlpt']}" if data.get("jlpt") else None,
                    "strokes": data.get("stroke_count"),
                }
            if res.status_code == 429:
                time.sleep(0.5 * (attempt + 1))
        except requests.exceptions.RequestException:
            if attempt < MAX_RETRIES:
                time.sleep(0.5)
    return None


def _fetch_vocab(word):
    for attempt in range(MAX_RETRIES + 1):
        try:
            res = requests.get(
                "https://jisho.org/api/v1/search/words",
                params={"keyword": word},
                timeout=TIMEOUT,
            )
            if res.status_code == 200:
                data = res.json().get("data", [])
                if not data:
                    return None
                entry = data[0]
                japanese = entry["japanese"][0]
                meanings = entry["senses"][0].get("english_definitions", [])[:2]
                display_word = word if isKanaOnly(word) else japanese.get("word", word)
                jlpt_raw = (entry.get("jlpt") or [None])[0]
                jlpt = jlpt_raw.replace("jlpt-", "").upper() if jlpt_raw else None
                return {
                    "word": display_word,
                    "reading": japanese.get("reading", ""),
                    "meaning": meanings,
                    "jlpt": jlpt,
                    "is_common": entry.get("is_common", False),
                }
            if res.status_code == 429:
                time.sleep(0.5 * (attempt + 1))
        except requests.exceptions.RequestException:
            if attempt < MAX_RETRIES:
                time.sleep(0.5)
    return None


def getKanjiData(kanji_list):
    if not kanji_list:
        return {}
    with ThreadPoolExecutor(max_workers=MAX_WORKERS) as ex:
        results = list(ex.map(_fetch_kanji, kanji_list))
    return {k: r for k, r in zip(kanji_list, results) if r is not None}


def getVocabData(vocab_list):
    if not vocab_list:
        return {}
    with ThreadPoolExecutor(max_workers=MAX_WORKERS) as ex:
        results = list(ex.map(_fetch_vocab, vocab_list))
    return {w: r for w, r in zip(vocab_list, results) if r is not None}
