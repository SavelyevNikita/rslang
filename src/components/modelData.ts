import { Api, HOST } from '../api/server'

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
  complicatedWords: Iword[];
  api: Api;
  constructor() {
    this.type = null;
    this.page = 0;
    this.complicatedWords = [];
    this.api = new Api();
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
    const myApi = await this.api.getWords(this.type, this.page);
    return await myApi;
  }
}