import './style_bookpage.scss'
export class BookPage {
  head: HTMLParagraphElement;
  wrapper: HTMLDivElement;
  constructor(nameOfPage) {
    this.wrapper=document.createElement('div');
    this.head=document.createElement('p');
    this.head.textContent=(`${nameOfPage}`);
  };
  render(node:HTMLElement){
    this.wrapper.appendChild(this.head);    
    node.appendChild(this.wrapper);
  }
}