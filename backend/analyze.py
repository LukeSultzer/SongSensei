from fugashi import Tagger


tagger = Tagger()

pos = ["名詞", "動詞", "形容詞", "副詞", "代名詞", "形状詞", "連体詞", "感動詞"]

kanaPref = ["ありがとう", "ください", "すみません", "かわいい", "すごい", "おいしい", "うれしい", "きれい", "つまらない", "おもしろい",  "こわい,", "やっぱり", "それ", "この", "これ", "あれ", "いつ", "また", "まで", "ただ"]

blacklisted = ["廃棄"]

lemmaOverrides = {
    "急度": "きっと",
    "何時": "いつ",
    "只": "ただ",
}

surfaceOverrides = {
    "矢張り": "やっぱり",
    "矢っ張り": "やっぱり",
    "其れ": "それ",
    "何時": "いつ",
    "只": "ただ",
}

def hasKanji(word):
    return any('一' <= ch <= '龥' for ch in word)

def isKanaOnly(text):
    return all('ぁ' <= ch <= 'ん' or 'ァ' <= ch <= 'ヶ' for ch in text)

def isVocab(word):
    if word.feature.pos1 == "接尾辞" and word.feature.pos2 == "名詞的":
        return True
    if word.feature.pos1 in pos and word.feature.pos2 != "非自立可能":
        if isBlackListed(word):
            return False
        return True
    return False

def isBlackListed(word):
    if isKanaOnly(word.surface) and word.feature.lemma != word.surface and word.feature.lemma in blacklisted:
        return True
    return False


def findVocabKanji(text):
    kanji = []
    vocab = []
    seen = set()
    tokens = list(tagger(text))
    i = 0

    while i < len(tokens):
        word = tokens[i]
        surface = word.surface
        skipKanji = False

        if isVocab(word):
            if not isKanaOnly(surface) and surface in surfaceOverrides:
                surface = surfaceOverrides.get(surface, surface)
                lemma = surface
                skipKanji = True
            else:
                lemma = (word.feature.lemma or surface).split('-')[0]

            if lemma in lemmaOverrides and isKanaOnly(surface):
                lemma = lemmaOverrides[lemma]

            if lemma.endswith("ずる"):
                lemma = lemma[:-2] + "じる"

            reading = word.feature.kana or ""

            if word.feature.pos1 in ["動詞", "形容詞", "形状詞"]:
                key = lemma
            else:
                key = (lemma, reading, surface)

            if key not in seen:
                seen.add(key)
                if word.surface in kanaPref:
                    vocab.append(word.surface)
                else:
                    vocab.append(lemma)

        if not skipKanji and hasKanji(surface):
            for char in surface:
                if '一' <= char <= '龥' and char not in kanji:
                    kanji.append(char)

        i += 1

    return kanji, vocab