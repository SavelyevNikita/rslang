export class CategoryPage {
  wrapper: HTMLDivElement;
  node: HTMLElement;
  section_1: HTMLDivElement;
  section_2: HTMLDivElement;
  section_3: HTMLDivElement;
  section_4: HTMLDivElement;
  section_5: HTMLDivElement;
  section_6: HTMLDivElement;
  section_7: HTMLDivElement;
  // bookPage: BookPage;
  onSection1: () => void;
  onSection2: () => void;
  onSection3: () => void;
  onSection4: () => void;
  onSection5: () => void;
  onSection6: () => void;
  onSection7: () => void;
  constructor(node: HTMLElement) {
    this.node = node;
    this.wrapper = document.createElement('div');
    this.wrapper.setAttribute('class', 'wrapper');
    this.section_1 = document.createElement('div');
    this.section_1.setAttribute('class', 'section-1');
    this.section_2 = document.createElement('div');
    this.section_2.setAttribute('class', 'section-1');
    this.section_3 = document.createElement('div');
    this.section_3.setAttribute('class', 'section-1');
    this.section_4 = document.createElement('div');
    this.section_4.setAttribute('class', 'section-1');
    this.section_5 = document.createElement('div');
    this.section_5.setAttribute('class', 'section-1');
    this.section_6 = document.createElement('div');
    this.section_6.setAttribute('class', 'section-1');
    this.section_7 = document.createElement('div');
    this.section_7.setAttribute('class', 'section-1');
    this.wrapper.appendChild(this.section_1);
    this.wrapper.appendChild(this.section_2);
    this.wrapper.appendChild(this.section_3);
    this.wrapper.appendChild(this.section_4);
    this.wrapper.appendChild(this.section_5);
    this.wrapper.appendChild(this.section_6);
    this.wrapper.appendChild(this.section_7);
    this.node.appendChild(this.wrapper);
    this.events();

  };
  events() {
    this.section_1.onclick = () => {
      this.onSection1();
      this.destroy();
    }
    this.section_2.onclick = () => {
      this.onSection2();
      this.destroy();
    }
    this.section_3.onclick = () => {
      this.onSection3();
      this.destroy();
    }
    this.section_4.onclick = () => {
      this.onSection4();
      this.destroy();
    }
    this.section_5.onclick = () => {
      this.onSection5();
      this.destroy();
    }
    this.section_6.onclick = () => {
      this.onSection6();
      this.destroy();
    }
    this.section_7.onclick = () => {
      this.onSection7();
      this.destroy();
    }
  }
  destroy() {
    this.wrapper.remove();
  };
}