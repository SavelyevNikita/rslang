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

export interface Itotalword {
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
  isComplicated: boolean;
  isStudied: boolean;
  rightAnswer: number;
  used: number;
}

export class DataModel {
  type: number;
  page: number;
  complicatedWords: Set<Iword>;
  studedWords: Set<string>;
  constructor() {
    this.type = null;
    this.page = 0;
    this.complicatedWords = new Set();
    this.studedWords = new Set();
  }
  async getWordsUp(type: number) {
    if (this.page >= 0 && this.page < 30) {
      const words = await this.compare(type);
      this.page += 1;
      return await words;
    } else {
      this.page = 0;
      const words = await this.compare(type);
      this.page += 1;
      return await words;
    };
  };
  async compare(type: number) {
    const totalWords: Itotalword[] = [];
    const word = await this.getWords(type);
    word.forEach((itemTotal: Itotalword) => {
      itemTotal.isStudied = false;
      itemTotal.isComplicated = false;
      if (this.studedWords) {
        this.studedWords.forEach((itemStuded: string) => {
          if (itemTotal.id === itemStuded) {
            itemTotal.isStudied = true;
            return;
          }
        });
      };
      if (this.complicatedWords) {
        this.complicatedWords.forEach((itemСomplicated: Iword) => {
          if (itemTotal.id === itemСomplicated.id) {
            itemTotal.isComplicated = true;
            return;
          }
        })
      };
      totalWords.push(itemTotal);
    });
    return totalWords;
  }
  addToComplicated(word: Iword) {
    this.complicatedWords.add(word);
  };
  addToStudied(word: Iword) {
    this.studedWords.add(word.id);
  };
  removeToComplicated(word: Iword) {
    this.complicatedWords.delete(word);
  };

  async getWordsDown(type: number) {
    if (this.page >= 0 && this.page < 30) {
      const words = await this.compare(type);
      this.page -= 1;
      return await words;
    } else {
      this.page = 29;
      const words = await this.compare(type);
      this.page -= 1;
      return await words;
    }
  }
  async getWords(type: number) {
    this.type = type;
    localStorage.setItem('lvl', `${this.type}`);
    localStorage.setItem('page', `${this.page}`);
    const myApi = await api.getWords(this.type, this.page);
    return await myApi;
  }
}