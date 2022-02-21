import { OldStatistics } from "./oldstatistic";
import statisticsHTML from "./index.html";
import "./index.scss";
export class StatisticPage {
  wrapper: HTMLDivElement;
  node: HTMLElement;
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
    this.learned = wrapper.querySelector(".statistics__learned");
    this.right = wrapper.querySelector(".statistics__learned");

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
    const myApi = new OldStatistics();
    await myApi.getStatistics();

    this.learned.innerHTML = `${myApi.learnedWordsNumber}`;
    this.right.innerHTML = `${Math.floor(
      (myApi.allRightAnswers * 100) / myApi.allRaunds
    )}`;
    this.auright.innerHTML = `${Math.floor(
      (myApi.RightAnswersAudiocall * 100) / myApi.allRaundsAudiocall
    )}`;
    this.spright.innerHTML = `${Math.floor(
      (myApi.RightAnswersSprint * 100) / myApi.allRaundsSprint
    )}`;
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
