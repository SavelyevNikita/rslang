import './style_startpage.scss'
export class StartPage {
  header: HTMLDivElement;
  mainButton: HTMLDivElement;
  bookButton: HTMLDivElement;
  gameButton: HTMLDivElement;
  statisticButton: HTMLDivElement;
  onHead: () => void;
  constructor() {
    this.header = document.createElement('div');
    this.header.setAttribute('class', 'wrapperButton');    
    this.mainButton = document.createElement('div');
    this.mainButton.setAttribute('class', 'main-button');
    this.mainButton.onclick = () => {
      this.onHead();
      this.destroy();
    }
    this.bookButton = document.createElement('div');
    this.bookButton.setAttribute('class', 'book-button');
    this.gameButton = document.createElement('div');
    this.gameButton.setAttribute('class', 'game-button');
    this.statisticButton = document.createElement('div');
    this.statisticButton.setAttribute('class', 'statistic-button');
    console.log('StartPage');
  };
  render(node: HTMLElement) {
    this.mainButton.textContent = 'Главная';
    this.header.appendChild(this.mainButton);
    this.bookButton.textContent = 'Электронный учебник';
    this.header.appendChild(this.bookButton);
    this.gameButton.textContent = 'Мини-игры';
    this.header.appendChild(this.gameButton);
    this.statisticButton.textContent = 'Статистика';
    this.header.appendChild(this.statisticButton);
    node.appendChild(this.header);
  }
  destroy(){
    this.header.remove();
  }

}