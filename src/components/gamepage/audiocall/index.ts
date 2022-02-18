import { api } from "./../../../api/server";
import categoryHtml from "./../category.html";
import { ResultPage } from "./../result";
import cardHTML from "./index.html";
import "./index.scss";
interface Iword {
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
export class AudiocallPage {
  node: HTMLElement;
  category: HTMLDivElement;
  game: HTMLDivElement;
  audioButton: HTMLButtonElement;
  audio: any;
  points: HTMLDivElement;
  arrAnswerButton: any;
  answerRight: number;
  wordIndex: number;
  randPage: number;
  randNumList: number[];
  allWords: Iword[];
  allWrongWords: Iword[];
  wrongList: Iword[];
  rightList: Iword[];
  rightAnswer: Iword;
  startPage: any;
  constructor(node: HTMLElement) {
    this.node = node;
    this.category = document.createElement("div");
    this.category.classList.add("category");
    this.category.innerHTML = categoryHtml;
    this.category.querySelector(".category__tittle").innerHTML = "Аудиовызов";
    this.category.querySelector(".category__text").innerHTML = `Аудиовызов - 
    это игра для развития восприятия английской речи. Выберите перевод 
    услышанного слова из четырёх вариантов.`;

    const game = document.createElement("div");
    game.classList.add("audiocall");
    game.innerHTML = cardHTML;
    this.game = game;
    this.audioButton = game.querySelector(".audiocall__button");
    this.audio = new Audio();
    this.audioButton.onclick = () => {
      this.audio.play();
    };
    this.points = game.querySelector(".audiocall__result");
    this.arrAnswerButton = game.querySelectorAll(".audiocall__version");

    this.rightList = [];
    this.wrongList = [];
    this.randPage = Math.floor(Math.random() * 29);
    this.wordIndex = 0;
    this.randNumList = [
      0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19,
    ].sort(function () {
      return Math.random() - 0.5;
    });
  }
  chooseLvl() {
    const arrLvlButton = document.querySelectorAll(".category__item");
    arrLvlButton.forEach((button: HTMLButtonElement) => {
      button.onclick = () => {
        localStorage.setItem("lvl", `${button.dataset.lvl}`);
        this.renderGame();
      };
    });
  }

  renderCategory() {
    this.node.appendChild(this.category);
    this.chooseLvl();
  }

  chooseRightAnswer() {
    this.answerRight = Math.floor(Math.random() * 4);
    this.arrAnswerButton.forEach((button: HTMLButtonElement, index: number) => {
      if (button.classList.contains("audiocall__version_right")) {
        button.classList.remove("audiocall__version_right");
        button.innerHTML = ``;
      }
      if (index === this.answerRight) {
        button.classList.add("audiocall__version_right");
        button.innerHTML = `${this.rightAnswer.word}`;
      } else {
        const wrongRand = Math.floor(Math.random() * 19);
        button.innerHTML = `${this.allWrongWords[wrongRand].word}`;
      }
      button.onclick = () => {
        if (button.classList.contains("audiocall__version_right")) {
          this.rightList.push(this.rightAnswer);
        } else {
          this.wrongList.push(this.rightAnswer);
        }
        this.renderGame();
        this.wordIndex++;
      };
    });
  }

  async renderGame() {
    this.destroy();
    const lvl = +localStorage.getItem("lvl");
    const page = +localStorage.getItem("page");
    if (!page) {
      const myApi: any = await api.getWords(lvl, this.randPage);
      this.allWords = myApi.map((item: Iword) => item);
      this.rightAnswer = this.allWords[this.randNumList[this.wordIndex]];
    }
    if (page && lvl) {
      const myApi: any = await api.getWords(lvl, page);
      this.allWords = myApi.map((item: Iword) => item);
    }
    const randPage = Math.floor(Math.random() * 29)
    const myApi: any = await api.getWords(lvl, randPage);
    this.allWrongWords = myApi.map((item: Iword) => item);

    if (this.wordIndex === this.randNumList.length) {
      this.openResults();
    } else {
      this.chooseRightAnswer();
      this.audio.src = `https://react-learnwords-example.herokuapp.com/${this.rightAnswer.audio}`;
      this.audio.play();
      this.node.appendChild(this.game);
      this.points.innerHTML = `${this.rightList.length}`;
    }
  }
  openResults() {
    this.destroy();
    const resultPage = new ResultPage();
    resultPage.renderResults(this);
    resultPage.onHome = () => {
      this.destroy();
      this.startPage.render();
    };
    resultPage.onContinue = () => {
      this.startPage.onAudiocall()
    };
    this.node.appendChild(resultPage.results);
  }
  destroy() {
    this.node.innerHTML = "";
  }
}
