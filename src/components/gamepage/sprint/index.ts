import { api } from "./../../../api/server";
import categoryHtml from "./../category.html";
import { ResultPage } from "./../result";
import cardHTML from "./sprint.html";
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
export class SprintPage {
  node: HTMLElement;
  category: HTMLDivElement;
  results: HTMLDivElement;
  game: HTMLDivElement;
  time: HTMLDivElement;
  points: HTMLDivElement;
  wordEnglish: HTMLDivElement;
  wordRussian: HTMLDivElement;
  wrongButton: HTMLButtonElement;
  rightButton: HTMLButtonElement;
  startPage: any;
  page: number;
  wrongList: Iword[];
  rightList: Iword[];
  rightRand: number;
  answerRand: boolean;
  allWords: Iword[];
  randNumList: number[];
  counterOfRandNum: number;
  timerId: any;
  constructor(node: HTMLElement) {
    this.node = node;
    this.category = document.createElement("div");
    this.category.classList.add("category");
    this.category.innerHTML = categoryHtml;
    this.category.querySelector(".category__tittle").innerHTML = "Спринт";
    this.category.querySelector(".category__text").innerHTML = `Спринт 
    поможет вам тренировать умение быстро переводить с английского на
    русский. Попробуйте угадать как можно больше слов за 30 секунд. Выберите
    уровень сложности и начинайте играть!`;

    const game = document.createElement("div");
    game.classList.add("sprint");
    game.innerHTML = cardHTML;
    this.game = game;
    this.wordEnglish = game.querySelector(".sprint__english");
    this.wordRussian = game.querySelector(".sprint__russian");
    this.wrongButton = game.querySelector(".sprint__button_wrong");
    this.rightButton = game.querySelector(".sprint__button_right");
    this.time = game.querySelector(".sprint__time");
    this.points = game.querySelector(".sprint__result");
    this.page = 0;
    this.rightList = [];
    this.wrongList = [];
    this.randNumList = [
      0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19,
    ].sort(function () {
      return Math.random() - 0.5;
    });
    this.counterOfRandNum = 0;
    this.wrongButton.onclick = () => {
      this.onWrongButton();
    };
    this.rightButton.onclick = () => {
      this.onRightButton();
    };
  }
  onRightButton() {
    if (this.answerRand) {
      this.rightList.push(this.allWords[this.rightRand]);
    } else {
      this.wrongList.push(this.allWords[this.rightRand]);
    }
    this.renderGame();
  }
  onWrongButton() {
    if (!this.answerRand) {
      this.rightList.push(this.allWords[this.rightRand]);
    } else {
      this.wrongList.push(this.allWords[this.rightRand]);
    }
    this.renderGame();
  }

  chooseLvl() {
    const arrLvlButton = document.querySelectorAll(".category__item");
    arrLvlButton.forEach((button: HTMLButtonElement) => {
      button.onclick = () => {
        localStorage.setItem("lvl", `${button.dataset.lvl}`);
        this.renderGame();
        this.timer();
      };
    });
  }

  renderCategory() {
    this.node.appendChild(this.category);
    this.chooseLvl();
  }

  async renderGame() {
    this.destroyCard();

    const lvl = +localStorage.getItem("lvl");
    const page = +localStorage.getItem("page");
    this.answerRand = !!Math.floor(Math.random() * 2);
    this.rightRand = this.randNumList[this.counterOfRandNum];
    let wrongRand = Math.floor(Math.random() * 20);

    if (!page) {
      const myApi: any = await api.getWords(lvl, this.page);
      this.allWords = myApi.map((item: Iword) => item);
    }
    if (page && lvl) {
      const myApi: any = await api.getWords(lvl, page);
      this.allWords = myApi.map((item: Iword) => item);
    }
    this.wordEnglish.innerHTML = `${this.allWords[this.rightRand].word}`;

    if (this.answerRand) {
      this.wordRussian.innerHTML = `${
        this.allWords[this.rightRand].wordTranslate
      }`;
    } else {
      this.wordRussian.innerHTML = `${this.allWords[wrongRand].wordTranslate}`;
    }

    this.node.appendChild(this.game);
    this.points.innerHTML = `${this.rightList.length}`;

    this.counterOfRandNum++;
    if (this.counterOfRandNum === this.randNumList.length) {
      this.page++;
      this.counterOfRandNum = 0;
    }
  }

  timer() {
    let seconds: number = 30;
    const showTimer: () => void = () => {
      seconds--;
      this.time.innerHTML = `${seconds}`.padStart(2, "0");
      if (seconds <= 0) {
        this.destroy();
        clearTimeout(this.timerId);
        this.openResults();
      }
    };
    this.timerId = setInterval(showTimer, 1000);
  }
  openResults() {
    this.destroy();
    const resultPage = new ResultPage();
    resultPage.renderResults(this);
    resultPage.onHome = () => {
      this.destroyCard();
      this.startPage.render();
    };
    resultPage.onContinue = () => {
      this.startPage.onSprint()
    };
    this.node.appendChild(resultPage.results);
  }
  destroyCard() {
    this.node.innerHTML = "";
  }
  destroy() {
    clearTimeout(this.timerId);
    this.node.innerHTML = "";
  }
}
