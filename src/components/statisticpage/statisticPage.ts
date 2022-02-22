import { OldStatistics } from "./oldstatistic";
import statisticsHTML from "./index.html";
import "./index.scss";
export class StatisticPage {
  wrapper: HTMLDivElement;
  node: HTMLElement;
  name: HTMLSpanElement;
  learned: HTMLDivElement;
  right: HTMLDivElement;
  aunew: HTMLSpanElement;
  auright: HTMLSpanElement;
  auinRow: HTMLSpanElement;
  spnew: HTMLSpanElement;
  spright: HTMLSpanElement;
  spinRow: HTMLSpanElement;
  constructor(node: HTMLElement) {
    this.node = node;
    const wrapper = document.createElement("div");
    wrapper.classList.add("statistics");
    wrapper.innerHTML = statisticsHTML;
    this.name = wrapper.querySelector(".statistics__name");
    this.learned = wrapper.querySelector(".statistics__learned");
    this.right = wrapper.querySelector(".statistics__right");

    this.aunew = wrapper.querySelector(".statistics-game__audiocall_new");
    this.auright = wrapper.querySelector(".statistics-game__audiocall_right");
    this.auinRow = wrapper.querySelector(".statistics-game__audiocall_inRow");

    this.spnew = wrapper.querySelector(".statistics-game__sprint_new");
    this.spright = wrapper.querySelector(".statistics-game__sprint_right");
    this.spinRow = wrapper.querySelector(".statistics-game__sprint_inRow");
    this.wrapper = wrapper;
  }
  async render() {
    this.destroy();
    this.name.innerHTML = JSON.parse(localStorage.getItem("user")).name;
    const myApi = new OldStatistics();
    await myApi.getStatistics();
    console.log('myApi', myApi)
    if (myApi.learnedWordsNumber) {
      this.learned.innerHTML = `${myApi.learnedWordsNumber}`;
    } else this.learned.innerHTML = "0";
    if (myApi.allRaunds) {
      this.right.innerHTML = `${Math.floor(
        (myApi.allRightAnswers * 100) / myApi.allRaunds
      )}`;
    } else this.right.innerHTML = "0";
    if (myApi.allRaundsAudiocall) {
      this.auright.innerHTML = `${Math.floor(
        (myApi.RightAnswersAudiocall * 100) / myApi.allRaundsAudiocall
      )}`;
    } else this.auright.innerHTML = "0";

    if (myApi.allRaundsSprint) {
      this.spright.innerHTML = `${Math.floor(
        (myApi.RightAnswersSprint * 100) / myApi.allRaundsSprint
      )}`;
    } else this.spright.innerHTML = "0";
    this.spinRow.innerHTML = `${myApi.correctAnswerInRowInSprint}`;
    this.spnew.innerHTML = `${myApi.newWordsSprint.length}`;
    this.auinRow.innerHTML = `${myApi.correctAnswerInRowInAudiocall}`;
    this.aunew.innerHTML = `${myApi.newWordsAudiocall.length}`;

    this.node.appendChild(this.wrapper);
  }
  destroy() {
    this.node.innerHTML = "";
  }
}
