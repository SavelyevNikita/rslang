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
      const words=this.getWords();
      this.page += 1;
      return words;
    } else { this.page = 0; 
      const words=this.getWords();
      this.page += 1;
      return words;
}
  }
  getWordsDown() {
    if (this.page >= 0 && this.page < 30) {
      const words=this.getWords();
      this.page -= 1;
      return words;
    } else { this.page = 29; 
      const words=this.getWords();
      this.page -= 1;
      return words;
}
  }
  async getWords() {
    const myApi = await api.getWords(this.type, this.page);
    // await console.log(myApi);
    // const myWord = await myApi.map((item: Iword) => item);
    // await console.log(myWord);
    // return await myWord;
    return await myApi;
  }
}