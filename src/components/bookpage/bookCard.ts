import { HOST } from '../../api/server'
export interface IOPtion {
  id: string,
  group: number,
  page: number,
  word: string,
  image: string,
  audio: string,
  audioMeaning: string,
  audioExample: string,
  textMeaning: string,
  textExample: string,
  transcription: string,
  textExampleTranslate: string,
  textMeaningTranslate: string,
  wordTranslate: string
}
export class BookCard {
  node: HTMLElement;
  word: HTMLParagraphElement;
  image: HTMLImageElement;
  audio: HTMLAudioElement;
  textMeaning: HTMLParagraphElement;
  textExample: HTMLParagraphElement;
  transcription: HTMLParagraphElement;
  textExampleTranslate: HTMLParagraphElement;
  textMeaningTranslate: HTMLParagraphElement;
  wordTranslate: HTMLParagraphElement;
  group: HTMLParagraphElement;
  page: HTMLParagraphElement;
  wrapperText: HTMLDivElement;
  wrapper: HTMLDivElement;
  constructor(node: HTMLElement, option: IOPtion) {
    this.node = node;
    this.wrapperText = document.createElement('div');
    this.wrapper = document.createElement('div');
    this.wrapper.setAttribute('class', 'card');
    this.group = document.createElement('p');
    this.page = document.createElement('p');
    this.word = document.createElement('p');
    this.word.textContent=option.word;
    this.image = document.createElement('img');
    this.image.src = `${HOST}/${option.image}`;
    this.audio = document.createElement('audio');
    this.audio.src=`${HOST}/${option.audio}`;
    this.textMeaning = document.createElement('p');
    this.textMeaning.textContent=option.textMeaning;
    this.textExample = document.createElement('p');
    this.textExample.textContent=option.textExample;
    this.transcription = document.createElement('p');
    this.transcription.textContent=option.transcription;
    this.textExampleTranslate = document.createElement('p');
    this.textExampleTranslate.textContent=option.textExampleTranslate;
    this.textMeaningTranslate = document.createElement('p');
    this.textMeaningTranslate.textContent=option.textMeaningTranslate;
    this.wordTranslate = document.createElement('p');
    this.wordTranslate.textContent=option.wordTranslate;

    this.wrapperText.appendChild(this.word);
    this.wrapperText.appendChild(this.transcription);
    this.wrapperText.appendChild(this.wordTranslate);
    this.wrapperText.appendChild(this.textMeaning);
    this.wrapperText.appendChild(this.textMeaningTranslate);
    this.wrapperText.appendChild(this.textExample);
    this.wrapperText.appendChild(this.textExampleTranslate);

    this.wrapper.appendChild(this.image);
    this.wrapper.appendChild(this.wrapperText);
    this.node.appendChild(this.wrapper);
  }
  destroy(){
    
  }
}