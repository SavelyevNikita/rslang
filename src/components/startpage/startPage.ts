import "./style_startpage.scss";
import { AutorizationPopUp } from "./../authorization/index";
import docHTML from "./index.html";
export class StartPage {
  div: HTMLDivElement;
  mainButton: HTMLDivElement;
  bookButton: HTMLDivElement;
  gameButton: HTMLDivElement;
  statisticButton: HTMLDivElement;
  sprintButton: HTMLDivElement;
  audiocallButton: HTMLDivElement;
  signInButton: HTMLButtonElement;
  signInWrapper: HTMLDivElement;
  main: HTMLElement;
  startPageNode: HTMLDivElement;
  node: HTMLElement;

  onMain: () => void;
  onBook: () => void;
  onGame: () => void;
  onStatistic: () => void;
  onSign: () => void;
  autorization: AutorizationPopUp;

  constructor(node: HTMLElement) {
    this.node = node;
    const doc = document.createElement("div");
    doc.setAttribute("class", "body");
    doc.innerHTML = docHTML;
    this.div = doc;
    this.startPageNode = doc.querySelector(".main");
    this.main = doc.querySelector(".home");
    this.mainButton = doc.querySelector(".nav__link_main");
    this.bookButton = doc.querySelector(".nav__link_book");
    this.gameButton = doc.querySelector(".nav__link_game");
    this.sprintButton = doc.querySelector(".game-list__item_sprint");
    this.audiocallButton = doc.querySelector(".game-list__item_audiocall");
    this.statisticButton = doc.querySelector(".nav__link_statistics");
    this.signInButton = doc.querySelector(".signin");
    this.signInWrapper = doc.querySelector(".signin-wrapper");
    this.autorization = new AutorizationPopUp();
    this.mainButton.onclick = () => {
      console.log(this);
      this.onMain();
    };
    this.bookButton.onclick = () => {
      console.log(this);
      this.onBook();
    };
    this.gameButton.onclick = () => {
      this.onGame();
    };
    this.statisticButton.onclick = () => {
      this.onStatistic();
    };
    this.signInButton.onclick = () => {
      this.autorization.render(this.signInWrapper);
      setTimeout(() => {
        document.addEventListener("click", this.autorization.removeForm);
      }, 300);
    };
  }
  render() {
    this.startPageNode.appendChild(this.main);
  }
  renderWholePage() {
    this.node.appendChild(this.div);
  }
  destroy() {
    this.startPageNode.innerHTML = "";
  }
  destroyWhole() {
    this.node.remove();
  }
}
