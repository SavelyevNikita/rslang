import { api } from '../api/server'

export interface Iword {
  audio: string;
  audioExample: string;
  audioMeaning: string;
  group: number;
  id: string;
  image: string;
  page: number;
  textExample: string;
  textExampleTranslate: string;
  textMeaning: string;
  textMeaningTranslate: string;
  transcription: string;
  word: string;
  wordTranslate: string;
}

export class DataModel {
  type: number;
  page: number;
  constructor(type: number) {
    this.type = type;
    this.page = 0;
    console.log(this.type);
  }
  getWordsUp() {
    if (this.page >= 0 && this.page < 30) {
      this.getWords();
      this.page += 1;
    } else { this.page = 0; }
  }
  getWordsDown() {
    if (this.page >= 0 && this.page < 30) {
      this.getWords();
      this.page -= 1;
    } else { this.page = 29; }
  }
  private async getWords() {
    const myApi = await api.getWords(this.type, this.page);
    const myWord = myApi.map((item: Iword) => item);
    console.log(myWord);

  }
}