import requests
from analyze import isKanaOnly


def getKanjiData(kanji_list):
    results = []

    for kanji in kanji_list:
        url = f"https://kanjiapi.dev/v1/kanji/{kanji}"
        res = requests.get(url)
        if res.status_code != 200:
            print(f"Error fetching {kanji}")
            continue
        data = res.json()

        jlpt = f"N{data.get('jlpt')}" if data.get("jlpt") else None
        results.append(
            {
                "kanji": kanji,
                "grade": data.get("grade"),
                "jlpt": jlpt,
                "meanings": ", ".join(data.get("meanings", [])),
                "kunyomi": ", ".join(data.get("kun_readings", [])),
                "onyomi": ", ".join(data.get("on_readings", [])),
                "stroke_count": data.get("stroke_count"),
                "notes": data.get("notes", []),
                "frequency": data.get("freq_mainichi_shinbun")

            }
        )

    return results

def getVocabData(vocab_list):
    results = []

    for word in vocab_list:
        url = "https://jisho.org/api/v1/search/words"
        res = requests.get(url, params={"keyword": word})
        if res.status_code != 200:
            print(f"Error fetching {word}")
            continue

        data = res.json().get("data", [])
        if not data:
            print(f"No results for {word}")
            continue

        entry = data[0]
        japanese = entry["japanese"][0]
        senses = entry["senses"]

        meanings = senses[0].get("english_definitions", [])[:2]

        display_word = word if isKanaOnly(word) else japanese.get("word", word)

        jlpt_raw = (entry.get("jlpt") or [None])[0] 
        jlpt = jlpt_raw.replace("jlpt-", "").upper() if jlpt_raw else None

        results.append({
            "word": display_word,
            "reading": japanese.get("reading", ""),
            "meaning": meanings,
            "jlpt": jlpt,
            "is_common": entry.get("is_common", False)
        })

    return results

