from jamdict import Jamdict
from analyze import isKanaOnly

_jam = Jamdict()


def getKanjiData(kanji_list):
    if not kanji_list:
        return {}
    results = {}
    for kanji in kanji_list:
        try:
            lookup = _jam.lookup(kanji)
            if not lookup.chars:
                continue
            char = lookup.chars[0]
            on_readings, kun_readings, meanings = [], [], []
            for rmg in char.rm_groups:
                on_readings  += [r.value for r in rmg.readings if r.r_type == 'ja_on']
                kun_readings += [r.value for r in rmg.readings if r.r_type == 'ja_kun']
                meanings     += [m.value for m in rmg.meanings if m.m_lang == '']
            results[kanji] = {
                "kanji": kanji,
                "onyomi": on_readings,
                "kunyomi": kun_readings,
                "meaning": ", ".join(meanings),
                "jlpt": f"N{char.jlpt}" if char.jlpt else None,
                "strokes": char.stroke_count,
            }
        except Exception:
            continue
    return results


def _best_entry(entries, word):
    """Pick the entry where word is the primary form, not just an alternate reading."""
    # Best: word is the first (primary) kana form
    for entry in entries:
        if entry.kana_forms and entry.kana_forms[0].text == word:
            return entry
    # Good: word matches a kanji form
    for entry in entries:
        if any(kf.text == word for kf in entry.kanji_forms):
            return entry
    # Fallback: word appears anywhere in kana forms
    for entry in entries:
        if any(kf.text == word for kf in entry.kana_forms):
            return entry
    return entries[0]


def getVocabData(vocab_list):
    if not vocab_list:
        return {}
    results = {}
    for word in vocab_list:
        try:
            lookup = _jam.lookup(word)
            if not lookup.entries:
                continue
            entry = _best_entry(lookup.entries, word)
            display_word = word if isKanaOnly(word) else (
                entry.kanji_forms[0].text if entry.kanji_forms else word
            )
            reading  = entry.kana_forms[0].text if entry.kana_forms else ''
            meanings = [g.text for g in entry.senses[0].gloss][:2] if entry.senses else []
            results[word] = {
                "word": display_word,
                "reading": reading,
                "meaning": meanings,
                "jlpt": None,
                "is_common": False,
            }
        except Exception:
            continue
    return results
