import { HOST } from '../../api/server';
import { Itotalword } from '../modelData';

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
  playButton: HTMLButtonElement;
  onPlay: () => void;
  studiedButton: HTMLButtonElement;
  complicatedButton: HTMLButtonElement;
  wrapperButton: HTMLDivElement;
  onStudied: () => void;
  onComplicated: () => void;
  removeComplicatedButton: HTMLButtonElement;
  onRemoveComplicated: () => void;
  wrapperOption: HTMLDivElement;
  isStudied: HTMLParagraphElement;
  isСomplicated: HTMLParagraphElement;
  rightAnswer: HTMLParagraphElement;
  used: HTMLParagraphElement;
  constructor(node: HTMLElement, option: Itotalword, isAutorised: boolean, type: string) {
    this.node = node;
    this.wrapperText = document.createElement('div');
    this.wrapperText.classList.add('wrapper-text');
    this.wrapperOption = document.createElement('div');
    this.wrapperOption.classList.add('wrapper-option');
    this.wrapperButton = document.createElement('div');
    this.wrapper = document.createElement('div');
    this.wrapper.classList.add('card');
    this.group = document.createElement('p');
    this.page = document.createElement('p');
    this.word = document.createElement('p');
    this.word.classList.add('word');
    this.word.innerHTML = option.word;
    this.image = document.createElement('img');
    this.image.classList.add('pic');
    this.image.alt = option.word;
    this.image.src = `${HOST}/${option.image}`;
    this.audio = document.createElement('audio');
    this.audio.src = `${HOST}/${option.audio}`;
    this.textMeaning = document.createElement('p');
    this.textMeaning.innerHTML = option.textMeaning;
    this.textExample = document.createElement('p');
    this.textExample.innerHTML = option.textExample;
    this.transcription = document.createElement('p');
    this.transcription.innerHTML = option.transcription;
    this.textExampleTranslate = document.createElement('p');
    this.textExampleTranslate.innerHTML = option.textExampleTranslate;
    this.textMeaningTranslate = document.createElement('p');
    this.textMeaningTranslate.innerHTML = option.textMeaningTranslate;
    this.wordTranslate = document.createElement('p');
    this.wordTranslate.innerHTML = option.wordTranslate;
    this.isStudied = document.createElement('p');
    this.isСomplicated = document.createElement('p');
    this.rightAnswer = document.createElement('p');
    this.used = document.createElement('p');

    this.wrapperOption.appendChild(this.isStudied);
    this.wrapperOption.appendChild(this.isСomplicated);
    this.wrapperOption.appendChild(this.rightAnswer);
    this.wrapperOption.appendChild(this.used);

    if (option.isStudied) {
      this.isStudied.textContent = 'Изученное';
    } else {
      this.isStudied.textContent = 'Не изученное';
    };

    if (option.isComplicated) {
      this.isСomplicated.textContent = 'Сложное';
      this.wrapper.classList.add('complicated');
    } else {
      this.isСomplicated.textContent = 'Нормальное';
      this.wrapper.classList.remove('complicated');
    };

    this.used.textContent = `Использовано: ${option.used}`;
    this.rightAnswer.textContent = `Правильных ответов: ${option.rightAnswer}`;

    this.wrapperText.appendChild(this.word);
    this.wrapperText.appendChild(this.transcription);
    this.wrapperText.appendChild(this.wordTranslate);
    this.wrapperText.appendChild(this.textMeaning);
    this.wrapperText.appendChild(this.textMeaningTranslate);
    this.wrapperText.appendChild(this.textExample);
    this.wrapperText.appendChild(this.textExampleTranslate);

    this.playButton = document.createElement('button');
    this.playButton.classList.add('play-button');
    this.playButton.title = 'Play';
    this.studiedButton = document.createElement('button');
    this.studiedButton.classList.add('favorite-button');
    this.studiedButton.title = 'To studied word';
    this.complicatedButton = document.createElement('button');
    this.complicatedButton.classList.add('add-complicated-button');
    this.complicatedButton.title = 'To complicated word';
    this.removeComplicatedButton = document.createElement('button');
    this.removeComplicatedButton.classList.add('remove-complicated-button');
    this.removeComplicatedButton.title = 'Remove complicated word';

    if (type === 'add') {
      this.complicatedButton.classList.remove('hidden-type');
      this.removeComplicatedButton.classList.add('hidden-type');
    } else {
      this.complicatedButton.classList.add('hidden-type');
      this.removeComplicatedButton.classList.remove('hidden-type');
    };

    this.wrapperButton.appendChild(this.playButton);
    this.wrapperButton.appendChild(this.studiedButton);
    this.wrapperButton.appendChild(this.complicatedButton);
    this.wrapperButton.appendChild(this.removeComplicatedButton);

    this.wrapper.appendChild(this.image);
    this.wrapper.appendChild(this.wrapperText);
    this.wrapper.appendChild(this.wrapperOption);
    this.wrapper.appendChild(this.wrapperButton);
    this.node.appendChild(this.wrapper);
    this.events(option);
    if (isAutorised) {
      this.studiedButton.classList.remove('hidden');
      this.complicatedButton.classList.remove('hidden');
    } else {
      this.studiedButton.classList.add('hidden');
      this.complicatedButton.classList.add('hidden');
    };
    if (option.isStudied) {

    } else {

    };
  };
  events(option: Itotalword) {
    this.playButton.onclick = () => {
      this.audio.play();
      this.audio.onended = () => {
        // this.audio.oncanplay
        this.audio.src = `${HOST}/${option.audioExample}`;
        this.audio.play();
        this.audio.onended = () => {
          this.audio.src = `${HOST}/${option.audioMeaning}`;
          this.audio.play();
          this.audio.onended = () => {
            this.audio.pause();
          };
        };
      };
    };
    this.studiedButton.onclick = () => {
      this.isStudied.textContent = 'Изученное';
      this.onStudied();
    };
    this.complicatedButton.onclick = () => {
      this.onComplicated();
      this.isСomplicated.textContent = 'Сложное';
      this.wrapper.classList.add('complicated');
    };
    this.removeComplicatedButton.onclick = () => {
      this.onRemoveComplicated();
      this.isСomplicated.textContent = 'Нормальное';
      this.wrapper.classList.remove('complicated');
    };
  };
  destroy() {
    this.wrapper.remove();
  };
};