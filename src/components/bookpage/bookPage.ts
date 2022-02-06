import './style_bookpage.scss'
export class BookPage {
  head: HTMLParagraphElement;
  wrapper: HTMLDivElement;
  node: HTMLElement;
  constructor(node: HTMLElement) {
    this.node = node;
    this.wrapper = document.createElement('div');
    this.head = document.createElement('p');
  };
  render(nameOfPage: string) {
    this.head.textContent = (`${nameOfPage}`);
    this.wrapper.appendChild(this.head);
    this.node.appendChild(this.wrapper);
  }
}