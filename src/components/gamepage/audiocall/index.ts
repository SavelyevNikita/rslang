import { api } from "./../../../api/server";
import categoryHtml from "./../category.html";
import { ResultPage } from "./../result";
import { OldStatistics } from "./../../statisticpage/oldstatistic";
import cardHTML from "./index.html";
import "./index.scss";
import {
  correctAnswerAudio,
  wrongAnswerAudio,
  endRaundAudio,
} from "./../../../assets/audio/index";
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
  allWordsAtRound: Iword[];
  startPage: any;
  audioCorrect: HTMLAudioElement;
  audioWrong: HTMLAudioElement;
  audioEndRaund: HTMLAudioElement;
  correctAnswersInRow: number;
  biggestCorrectAnswersInRow: number;
  onStudiedAudiocall: (item: Iword) => void;
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
    this.allWordsAtRound = [];
    this.randPage = Math.floor(Math.random() * 29);
    this.wordIndex = 0;
    this.randNumList = [
      0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19,
    ].sort(function () {
      return Math.random() - 0.5;
    });

    const audioCorrect = new Audio();
    this.audioCorrect = audioCorrect;
    this.audioCorrect.src = correctAnswerAudio;
    const audioWrong = new Audio();
    this.audioWrong = audioWrong;
    this.audioWrong.src = wrongAnswerAudio;
    const audioEndRaund = new Audio();
    this.audioEndRaund = audioEndRaund;
    this.audioEndRaund.src = endRaundAudio;
    this.correctAnswersInRow = 0;
    this.biggestCorrectAnswersInRow = 0;
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
        button.innerHTML = `${
          this.allWords[this.randNumList[this.wordIndex]].wordTranslate
        }`;
      } else {
        const wrongRand = Math.floor(Math.random() * 19);
        button.innerHTML = `${this.allWrongWords[wrongRand].wordTranslate}`;
      }
      button.onclick = () => {
        if (button.classList.contains("audiocall__version_right")) {
          this.ifCurrect();
        } else {
          this.ifWrong();
        }
        this.renderGame();
        this.wordIndex++;
      };
    });
  }
  ifCurrect() {
    this.audioCorrect.play();
    this.rightList.push(this.allWords[this.randNumList[this.wordIndex]]);
    this.onStudiedAudiocall(this.allWords[this.randNumList[this.wordIndex]]);
    this.correctAnswersInRow++;
    if (this.biggestCorrectAnswersInRow < this.correctAnswersInRow) {
      this.biggestCorrectAnswersInRow = this.correctAnswersInRow;
    }
  }
  ifWrong() {
    this.audioWrong.play();
    this.wrongList.push(this.allWords[this.randNumList[this.wordIndex]]);
    this.correctAnswersInRow = 0;
  }
  async renderGame() {
    this.destroy();
    const lvl = +localStorage.getItem("lvl");
    const page = +localStorage.getItem("page");
    if (!page) {
      const myApi: any = await api.getWords(lvl, this.randPage);
      this.allWords = myApi.map((item: Iword) => item);
    }
    if (page && lvl) {
      const myApi: any = await api.getWords(lvl, page);
      this.allWords = myApi.map((item: Iword) => item);
    }
    const randPage = Math.floor(Math.random() * 29);
    const myApi: any = await api.getWords(lvl, randPage);
    this.allWrongWords = myApi.map((item: Iword) => item);

    if (this.wordIndex === this.randNumList.length) {
      this.openResults();
    } else {
      this.chooseRightAnswer();
      this.audio.src = `https://react-learnwords-example.herokuapp.com/${this.allWords[this.randNumList[this.wordIndex]].audio
        }`;
      this.audio.play();
      this.node.appendChild(this.game);
      this.points.innerHTML = `${this.rightList.length}`;
    }
  }

  async putStatistics() {
    const oldStatistics = new OldStatistics();
    await oldStatistics.getStatistics();

    let newWordsAudiocall = oldStatistics.newWordsAudiocall;
    this.allWordsAtRound.forEach((item: Iword) => {
      if (!newWordsAudiocall.includes(item.id)) {
        newWordsAudiocall.push(item.id);
      }
    });

    const allRaundsAudiocall =
      oldStatistics.allRaundsAudiocall + this.allWordsAtRound.length;
    const RightAnswersAudiocall =
      oldStatistics.RightAnswersAudiocall + this.rightList.length;
    let correctAnswerInRow;
    if (
      oldStatistics.correctAnswerInRowInAudiocall <
      this.biggestCorrectAnswersInRow
    ) {
      correctAnswerInRow = this.biggestCorrectAnswersInRow;
    }

    let newWords = oldStatistics.newWords;
    this.allWordsAtRound.forEach((word: Iword) => {
      const mentionedWordIndex = oldStatistics.newWords.findIndex(
        (item) => { item.wordId = word.id }
      );
      if (mentionedWordIndex === -1) {
        let right;
        if (this.rightList.find((item) => item === word)) {
          right = 1;
        } else {
          right = 0;
        }
        newWords.push({
          rightAnswers: right,
          used: 1,
          wordId: word.id,
        });
      } else {
        let right;
        if (this.rightList.find((item) => item === word)) {
          right = oldStatistics.newWords[mentionedWordIndex].rightAnswers + 1;
        } else {
          right = oldStatistics.newWords[mentionedWordIndex].rightAnswers;
        }
        newWords.splice(mentionedWordIndex, 1, {
          rightAnswers: right,
          used: oldStatistics.newWords[mentionedWordIndex].used + 1,
          wordId: oldStatistics.newWords[mentionedWordIndex].wordId,
        });
      }
    });

    const allRaunds = oldStatistics.allRaunds + this.allWordsAtRound.length;
    const allRightAnswers =
      oldStatistics.allRightAnswers + this.rightList.length;

    let learnedWords = oldStatistics.learnedWords;
    this.allWordsAtRound.forEach((item: Iword) => {
      if (!learnedWords.includes(item.id)) {
        learnedWords.push(item.id);
      }
    });

    const statistic = {
      learnedWords: oldStatistics.learnedWordsNumber,
      optional: {
        newWordsAudiocall: JSON.stringify(oldStatistics.newWordsAudiocall),
        allRaundsAudiocall: allRaundsAudiocall,
        RightAnswersAudiocall: RightAnswersAudiocall,
        correctAnswerInRowInAudiocall: correctAnswerInRow,

        newWordsSprint: JSON.stringify(oldStatistics.newWordsSprint),
        allRaundsSprint: oldStatistics.allRaundsSprint,
        RightAnswersSprint: oldStatistics.RightAnswersSprint,
        correctAnswerInRowInSprint: oldStatistics.correctAnswerInRowInSprint,

        newWords: JSON.stringify(newWords),
        allRaunds: allRaunds,
        allRightAnswers: allRightAnswers,
        learnedWords: JSON.stringify(learnedWords),
      },
    };
    await api.putStatistics(statistic);
  }

  openResults() {
    this.destroy();
    this.audioEndRaund.play();
    this.allWordsAtRound = this.allWordsAtRound.concat(
      this.rightList,
      this.wrongList
    );
    const resultPage = new ResultPage();
    resultPage.renderResults(this);
    resultPage.onHome = () => {
      this.destroy();
      this.startPage.render();
    };
    resultPage.onContinue = () => {
      this.startPage.onAudiocall();
    };
    this.node.appendChild(resultPage.results);
    this.putStatistics();
  }
  destroy() {
    this.node.innerHTML = "";
  }
}
