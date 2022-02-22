import { StartPage } from "./startPage/startPage";
import { CategoryPage } from "./bookPage/categoryPage";
import { SprintPage } from "./gamepage/sprint";
import { AudiocallPage } from "./gamepage/audiocall";
import { StatisticPage } from "./statisticpage/statisticPage";
import { DataModel, Iword, Itotalword } from "./modelData";
import { BookPage } from "./bookpage/bookPage";
import { BookCard } from "./bookpage/bookCard";
import { AutorizationPopUp } from './authorization/index';

export class Application {
  dataModel: DataModel;
  isAutorised: boolean;
  constructor() {
    this.startpageCycle(false);
    this.dataModel = new DataModel();

  }
  private startpageCycle(isAutorised: boolean) {
    this.isAutorised = isAutorised;
    const startPage = new StartPage(document.body);
    startPage.autorization.onUser = (user) => {
      if (user) {
        startPage.destroyWhole();
        this.startpageCycle(true);
      } else {
        startPage.destroyWhole();
        this.startpageCycle(false);
      }
    };
    startPage.renderWholePage();
    startPage.onMain = () => {
      startPage.destroy();
      startPage.render();
    };
    startPage.onBook = () => {
      startPage.destroy();
      const categoryPage = new CategoryPage(startPage.startPageNode, this.dataModel.complicatedWords.size);
      categoryPage.onSection1 = () => {
        this.bookPageCycle(startPage.startPageNode, 0, this.isAutorised);
      }
      categoryPage.onSection2 = () => {
        this.bookPageCycle(startPage.startPageNode, 1, this.isAutorised);
      }
      categoryPage.onSection3 = () => {
        this.bookPageCycle(startPage.startPageNode, 2, this.isAutorised);
      }
      categoryPage.onSection4 = () => {
        this.bookPageCycle(startPage.startPageNode, 3, this.isAutorised);
      }
      categoryPage.onSection5 = () => {
        this.bookPageCycle(startPage.startPageNode, 4, this.isAutorised);
      }
      categoryPage.onSection6 = () => {
        this.bookPageCycle(startPage.startPageNode, 5, this.isAutorised);
      }
      categoryPage.onSection7 = () => {
        this.bookPageCycleSeven(startPage.startPageNode, 6, this.isAutorised);
      }
    }
    startPage.onSprint = () => {
      startPage.destroy();
      const sprintPage = new SprintPage(startPage.startPageNode);
      sprintPage.renderCategory();
      sprintPage.startPage = startPage;
      sprintPage.onStudiedSprint = (item: Iword) => {
        this.dataModel.addToStudied(item);
      };
    };

    startPage.onAudiocall = () => {
      startPage.destroy();
      const audiocallPage = new AudiocallPage(startPage.startPageNode);
      audiocallPage.renderCategory();
      audiocallPage.startPage = startPage;
      audiocallPage.onStudiedAudiocall=(item: Iword)=>{
        this.dataModel.addToStudied(item);
      }
    };

    startPage.onStatistic = () => {
      startPage.destroy();
      const statisticPage = new StatisticPage(startPage.startPageNode);
      statisticPage.render();
    }
  };

  private bookPageCycle(node: HTMLElement, type: number, isAutorised: boolean) {
    const bookPage = new BookPage(node);
    bookPage.render('Book page');
    bookPage.onNext = async () => {
      bookPage.destroyCards();
      const words = await this.dataModel.getWordsUp(type);
      words.forEach(async (item: Itotalword) => {
        // const bookCard = new BookCard(bookPage.cards, item, isAutorised, 'add', isComplicated, isStudied);
        const bookCard = await new BookCard(bookPage.cards, item, isAutorised, 'add');
        bookCard.onStudied = () => {
          this.dataModel.addToStudied(item);
        };
        bookCard.onComplicated = () => {
          this.dataModel.addToComplicated(item);
        };
      });
    };
    bookPage.onPrev = async () => {
      bookPage.destroyCards();
      const words = await this.dataModel.getWordsDown(type);
      words.forEach(async (item: Itotalword) => {
        const bookCard = await new BookCard(bookPage.cards, item, isAutorised, 'add');
        bookCard.onStudied = () => {
          this.dataModel.addToStudied(item);
        };
        bookCard.onComplicated = () => {
          this.dataModel.addToComplicated(item);
        };
      });
    };
    bookPage.onNext();
  }
  private bookPageCycleSeven(node: HTMLElement, type: number, isAutorised: boolean) {
    const bookPage = new BookPage(node);
    bookPage.render('Book page');
    bookPage.onshow = async () => {
      bookPage.destroyCards();
      const words = this.dataModel.complicatedWords;
      words.forEach((item: Itotalword) => {
        const bookCard = new BookCard(bookPage.cards, item, isAutorised, 'remove');
        bookCard.onRemoveComplicated = () => {
          this.dataModel.removeToComplicated(item);
          bookCard.destroy();
        };
      });
    }
    bookPage.onshow();
  }
}