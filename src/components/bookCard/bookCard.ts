// "id": "5e9f5ee35eb9e72bc21af4b2",
// "group": 0,
// "page": 0,
// "word": "wine",
// "image": "files/01_0020.jpg",
// "audio": "files/01_0020.mp3",
// "audioMeaning": "files/01_0020_meaning.mp3",
// "audioExample": "files/01_0020_example.mp3",
// "textMeaning": "<i>Wine</i> is an alcoholic drink made from grapes.",
// "textExample": "The store carried both red and white <b>wine</b>.",
// "transcription": "[wain]",
// "textExampleTranslate": "В магазине было красное и белое вино",
// "textMeaningTranslate": "Вино - это алкогольный напиток из винограда",
// "wordTranslate": "вино"
interface IOPtion {
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
  wrapper: HTMLDivElement;
  constructor(node: HTMLElement, option: IOPtion) {
    this.node = node;
    this.wrapper = document.createElement('div');
    this.group = document.createElement('p');
    this.page = document.createElement('p');
    this.word = document.createElement('p');
    this.image = document.createElement('img');
    this.image.src = option.image;
    this.audio = document.createElement('audio');
    this.audio.src=option.audio;
    this.textMeaning = document.createElement('p');
    this.textExample = document.createElement('p');
    this.transcription = document.createElement('p');
    this.textExampleTranslate = document.createElement('p');
    this.textMeaningTranslate = document.createElement('p');
    this.wordTranslate = document.createElement('p');

    this.wrapper.appendChild(this.word);
    this.wrapper.appendChild(this.transcription);
    this.wrapper.appendChild(this.wordTranslate);
    this.wrapper.appendChild(this.textMeaning);
    this.wrapper.appendChild(this.textMeaningTranslate);
    this.wrapper.appendChild(this.textExample);
    this.wrapper.appendChild(this.textExampleTranslate);

    this.node.appendChild(this.image);
    this.node.appendChild(this.wrapper);


    // this.node.appendChild();
  }
}