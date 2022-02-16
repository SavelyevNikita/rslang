import categoryHtml from "./category.html";
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
  constructor(node: HTMLElement) {
    this.node = node;
    this.category = document.createElement("div");
    this.category.classList.add("category");
    this.category.innerHTML = categoryHtml;
  }

  chooseLvl() {
    const arrLvlButton = document.querySelectorAll(".category__item");
    arrLvlButton.forEach((button: HTMLButtonElement) => {
      button.onclick = () => {
        localStorage.setItem("lvl", `${button.dataset.lvl}`);
      };
    });
  }

  renderCategory() {
    this.node.appendChild(this.category);
    this.chooseLvl();
  }

  destroyCard() {
    this.node.innerHTML = "";
  }
  destroy() {
    this.node.innerHTML = "";
  }
}
