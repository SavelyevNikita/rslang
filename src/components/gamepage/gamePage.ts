import './style_gamepage.scss'
export class GamePage {
  head: HTMLParagraphElement;
  wrapper: HTMLDivElement;
  node: HTMLElement;
  constructor(node: HTMLElement) {
    this.node = node;
    this.wrapper = document.createElement('div');
    this.head = document.createElement('p');
    this.wrapper.appendChild(this.head);
  };
  render(nameOfPage: string) {
    this.head.textContent = (`${nameOfPage}`);
    this.node.appendChild(this.wrapper);
  }
}