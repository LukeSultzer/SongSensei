from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from analyze import findVocabKanji
from dict_lookup import getVocabData, getKanjiData

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],
    allow_methods=["*"],
    allow_headers=["*"],
)
class LyricsRequest(BaseModel):
    text: str

@app.post("/analyze")
def analyze_lyrics(req: LyricsRequest):
    kanji_list, vocab_list = findVocabKanji(req.text)
    

    return {
        "vocab": getVocabData(vocab_list),
        "kanji": getKanjiData(kanji_list)
    }

@app.get("/")
def root():
    return {"status": "ok"}

