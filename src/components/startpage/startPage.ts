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
    // console.log(this.startPageNode);
    this.mainButton.onclick = () => {
      this.onMain();
    };
    this.bookButton.onclick = () => {
      this.onBook();
    };
    this.gameButton.onclick = () => {
      this.onGame();
    };
    this.statisticButton.onclick = () => {
      this.onStatistic();
    };
    this.signInButton.onclick = () => {
      const autorizationPopUp = new AutorizationPopUp();
      autorizationPopUp.render(this.signInWrapper);
      setTimeout(() => {
        document.addEventListener("click", autorizationPopUp.removeForm);
      }, 300);
    };
  }
  render() {
    this.startPageNode.appendChild(this.main);
  }
  renderWholePage() {
    console.log("this.node", this.node);
    this.node.appendChild(this.div);
  }
  destroy() {
    this.startPageNode.innerHTML = "";
    // this.myNode.remove();
  }
  destroyWhole() {
    this.node.remove();
  }
}
