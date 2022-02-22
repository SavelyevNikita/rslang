import './style_bookpage.scss'
export class BookPage {
  head: HTMLParagraphElement;
  wrapper: HTMLDivElement;
  node: HTMLElement;
  next: HTMLButtonElement;
  prev: HTMLButtonElement;
  onNext: () => void;
  onPrev: () => void;
  cards: HTMLDivElement;
  onshow: () => Promise<void>;
  constructor(node: HTMLElement) {
    this.node = node;
    this.wrapper = document.createElement('div');
    this.wrapper.classList.add('book-page__wrapper');
    this.cards = document.createElement('div');
    this.cards.classList.add('cards');
    this.head = document.createElement('p');
    this.next = document.createElement('button');
    this.next.textContent = 'Вперед';
    this.next.classList.add('forward');
    this.prev = document.createElement('button');
    this.prev.textContent = 'Назад';
    this.prev.classList.add('back');
  };
  render(nameOfPage: string) {
    // this.head.textContent = (`${nameOfPage}`);
    // this.wrapper.appendChild(this.head);
    this.wrapper.appendChild(this.prev);
    this.wrapper.appendChild(this.next);
    this.node.appendChild(this.wrapper);
    this.node.appendChild(this.cards);
    this.event();
  }
  event() {
    this.next.onclick = () => {
      this.onNext();
    }
    this.prev.onclick = () => {
      this.onPrev();
    }
  }
  destroyCards() {
    this.cards.innerHTML = '';
  }
}