import './style_startpage.scss'
export class StartPage {
  header: HTMLDivElement;
  mainButton: HTMLDivElement;
  bookButton: HTMLDivElement;
  gameButton: HTMLDivElement;
  statisticButton: HTMLDivElement;
  footer: HTMLDivElement;
  rsLogo: HTMLDivElement;
  links: HTMLDivElement;
  year: HTMLParagraphElement;
  main: HTMLDivElement;
  onMain: () => void;
  onBook: () => void;
  onGame: () => void;
  onStatistic: () => void;
  myNode: HTMLDivElement;
  node: HTMLElement;
  head: HTMLParagraphElement;
  constructor(node: HTMLElement) {
    this.node = node;
    this.header = document.createElement('div');
    this.header.setAttribute('class', 'header');
    this.mainButton = document.createElement('div');
    this.mainButton.setAttribute('class', 'main-button');

    this.head = document.createElement('p');
    this.main = document.createElement('div');
    this.main.setAttribute('class', 'main');
    this.myNode = this.main;

    this.footer = document.createElement('div');
    this.footer.setAttribute('class', 'footer');
    this.rsLogo = document.createElement('div');
    this.links = document.createElement('div');
    this.year = document.createElement('p');


    this.bookButton = document.createElement('div');
    this.bookButton.setAttribute('class', 'book-button');
    this.gameButton = document.createElement('div');
    this.gameButton.setAttribute('class', 'game-button');
    this.statisticButton = document.createElement('div');
    this.statisticButton.setAttribute('class', 'statistic-button');

    this.mainButton.onclick = () => {
      this.onMain();
    }
    this.bookButton.onclick = () => {
      this.onBook();
    }
    this.gameButton.onclick = () => {
      this.onGame();
    }
    this.statisticButton.onclick = () => {
      this.onStatistic();
    }
  };
  render(nameOfPage: string) {
    this.head.textContent=`${nameOfPage}`;
    this.main.appendChild(this.head);
    // this.node.appendChild(this.main);
  }
  renderWholePage() {
    this.mainButton.textContent = 'Главная';
    this.header.appendChild(this.mainButton);
    this.bookButton.textContent = 'Электронный учебник';
    this.header.appendChild(this.bookButton);
    this.gameButton.textContent = 'Мини-игры';
    this.header.appendChild(this.gameButton);
    this.statisticButton.textContent = 'Статистика';
    this.header.appendChild(this.statisticButton);

    this.footer.appendChild(this.rsLogo);
    this.footer.appendChild(this.links);
    this.footer.appendChild(this.year);

    this.node.appendChild(this.header);
    this.node.appendChild(this.main);
    this.node.appendChild(this.footer);
  };
  destroy() {
    this.main.innerHTML = '';
  };
  destroyWhole() {
    this.node.remove();
  };
}