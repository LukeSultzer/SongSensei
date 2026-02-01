import requests
from bs4 import BeautifulSoup
from analyze import isKanaOnly

def isKanji(char: str) -> bool:
    """Return True if the given character is a Kanji."""
    if not char:
        return False
    return all('\u4e00' <= c <= '\u9faf' for c in char)

def getKanjiData(kanji_list):
    results = []

    for kanji in kanji_list:
        url = f"https://jisho.org/search/{kanji}%20%23kanji"
        res = requests.get(url)
        if res.status_code != 200:
            print(f"Error fetching {kanji}")
            continue

        soup = BeautifulSoup(res.text, "html.parser")

        meaning_elem = soup.select_one(".kanji-details__main-meanings")
        meaning = meaning_elem.text.strip() if meaning_elem else "Meaning not found"

       
        onyomi = []
        for a in soup.select("dl.on_yomi dd a"):
            text = a.get_text(strip=True)
            if text and not isKanji(text): 
                onyomi.append(text)

        kunyomi = []
        for a in soup.select("dl.kun_yomi dd a"):
            text = a.get_text(strip=True)
            if text:
                kunyomi.append(text)

        jlpt_elem = soup.select_one(".jlpt")
        jlpt = jlpt_elem.text.strip().upper() if jlpt_elem else None
        if jlpt and jlpt.startswith("JLPT "):
            jlpt = jlpt.replace("JLPT ", "")

        results.append({
            "kanji": kanji,
            "onyomi": onyomi,
            "kunyomi": kunyomi,
            "meaning": meaning,
            "jlpt": jlpt
        })

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

        
        meanings = []
        for s in senses:
            meanings.extend(s.get("english_definitions"))
        meanings = meanings[:1]

        if isKanaOnly(word):
            word
        else:
            japanese.get("word", word)

        results.append({
            "word": word,
            "reading": japanese.get("reading", ""),
            "meaning": meanings,
            "jlpt": (entry.get("jlpt") or [None])[0],
            "is_common": entry.get("is_common", False)
        })

    return results
    