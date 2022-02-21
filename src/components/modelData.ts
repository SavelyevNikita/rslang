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
    console.log('compare');
    const word = await this.getWords(type);
    const totalWords = word.map((itemTotal: Itotalword) => {
      console.log(itemTotal);
      if (this.studedWords) {
        this.studedWords.forEach((itemStuded: string) => {
          console.log(itemStuded);
          // this.complicatedWords.forEach((itemСomplicated: Iword) => {
          //   console.log(itemСomplicated);
            // if (itemTotal.id === itemСomplicated.id) {
            //   itemTotal.isComplicated = true;
            // } else { itemTotal.isComplicated = false; }
            if (itemTotal.id === itemStuded) {
              itemTotal.isStudied = true;
            } else { itemTotal.isStudied = false; }
          // })
        })
      }
      else {
        itemTotal.isStudied = false;
      }
    });
    console.log(totalWords);
    return totalWords;
  };
  addToComplicated(word: Iword) {
    this.complicatedWords.add(word);
  };
  addToStudied(word: Iword) {
    this.studedWords.add(word.id);
    console.log(this.studedWords);
  };
  removeToComplicated(word: Iword) {
    this.complicatedWords.delete(word);
  };

  async getWordsDown(type: number) {
    if (this.page >= 0 && this.page < 30) {
      const words = await this.getWords(type);
      this.page -= 1;
      return await words;
    } else {
      this.page = 29;
      const words = await this.getWords(type);
      this.page -= 1;
      return await words;
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