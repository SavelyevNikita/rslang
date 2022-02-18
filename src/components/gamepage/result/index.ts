import resultsHTML from "./result.html";
import "./index.scss";
import { StartPage } from "./../../startPage/startPage";
import { SprintPage } from "./../sprint";
import { AudiocallPage } from "./../audiocall";
interface Iword {
  audio: string;
  audioExample: string;
  audioMeaning: string;
  group: number;
  id: string;
  image: string;
  textExample: string;
  textExampleTranslate: string;
  textMeaning: string;
  textMeaningTranslate: string;
  transcription: string;
  word: string;
  wordTranslate: string;
  // onHome: () => void;
  // onContinue: () => void;
}
export class ResultPage {
  results: HTMLDivElement;
  rightResults: HTMLDivElement;
  wrongResults: HTMLDivElement;
  rightResultsNum: HTMLDivElement;
  wrongResultsNum: HTMLDivElement;
  buttonHome: HTMLButtonElement;
  buttonContinue: HTMLButtonElement;
  constructor() {
    const results = document.createElement("div");
    results.classList.add("game-result");
    results.innerHTML = resultsHTML;
    this.results = results;
    this.rightResults = results.querySelector(".game-result__container_right");
    this.wrongResults = results.querySelector(".game-result__container_wrong");
    this.rightResultsNum = results.querySelector(".game-result__num_right");
    this.wrongResultsNum = results.querySelector(".game-result__num_wrong");
    this.buttonHome = results.querySelector(".game-result__button_home");
    this.buttonContinue = results.querySelector(
      ".game-result__button_continue"
    );

    // this.buttonHome.onclick = () => {
    //   this.onHome();
    // };
    // this.buttonContinue.onclick = () => {
    //   this.onContinue();
    // };
  }
  // onContinue() {
  //   const startPage = new StartPage(document.body);
  //   let gamePage: any;
  //   if ((this.gamePagestr = "audiocall")) {
  //     gamePage = new AudiocallPage(startPage.myNode);
  //   } else if ((this.gamePagestr = "sprint")) {
  //     gamePage = new SprintPage(startPage.myNode);
  //   }
  //   startPage.destroy();
  //   gamePage.renderCategory();
  // }
  renderResults(gamePage: any) {
    const layout = (item: Iword, container: HTMLDivElement) => {
      const word = document.createElement("div");
      word.classList.add("word");

      const audioButton = document.createElement("button");
      audioButton.classList.add("word__audio");
      const audio = new Audio();
      audioButton.onclick = () => {
        audio.src = `https://react-learnwords-example.herokuapp.com/${item.audio}`;
        audio.play();
      };

      const en = document.createElement("span");
      en.classList.add("word__en");
      en.innerHTML = `${item.word}`;

      const ru = document.createElement("span");
      ru.classList.add("word__ru");
      ru.innerHTML = `${item.wordTranslate}`;

      container.appendChild(word);
      word.appendChild(audioButton);
      word.appendChild(en);
      word.appendChild(ru);
    };
    const rightContainer = document.createElement("div");
    rightContainer.classList.add("result-right__list");
    this.rightResultsNum.innerHTML = `${gamePage.rightList.length}`;
    gamePage.rightList.forEach((item: Iword) => {
      layout(item, rightContainer);
    });
    const wrongContainer = document.createElement("div");
    wrongContainer.classList.add("result-wrong__list");
    this.wrongResultsNum.innerHTML = `${gamePage.wrongList.length}`;
    gamePage.wrongList.forEach((item: Iword) => {
      layout(item, wrongContainer);
    });
    this.rightResults.appendChild(rightContainer);
    this.wrongResults.appendChild(wrongContainer);
  }
}
