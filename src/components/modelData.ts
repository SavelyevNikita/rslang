import { api, HOST } from '../api/server'

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
  complicatedWords: Set<Iword>;
  studedWords: Set<Iword>;
  constructor() {
    this.type = null;
    this.page = 0;
    this.complicatedWords = new Set();
    this.studedWords = new Set();
  }
  getWordsUp(type: number) {
    if (this.page >= 0 && this.page < 30) {
      const words = this.getWords(type);
      this.page += 1;
      return words;
    } else {
      this.page = 0;
      const words = this.getWords(type);
      this.page += 1;
      return words;
    }
  }
  addTocomplicated(word: Iword) {
    this.complicatedWords.add(word);
    console.log(this.complicatedWords);
    console.log(this.complicatedWords.size)    
  }
  addToStudied(word: Iword) {
    this.studedWords.add(word);
    console.log(this.studedWords);
  }

  getWordsDown(type: number) {
    if (this.page >= 0 && this.page < 30) {
      const words = this.getWords(type);
      this.page -= 1;
      return words;
    } else {
      this.page = 29;
      const words = this.getWords(type);
      this.page -= 1;
      return words;
    }
  }
  async getWords(type: number) {
    this.type = type;
    console.log(this.type);
    localStorage.setItem('lvl', `${this.type}`);
    localStorage.setItem('page', `${this.page}`);
    const myApi = await api.getWords(this.type, this.page);
    return await myApi;
  }
}