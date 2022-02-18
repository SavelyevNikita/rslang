import { StartPage } from "./startPage/startPage";
import { CategoryPage } from "./bookPage/categoryPage";
import { SprintPage } from "./gamepage/sprint";
import { AudiocallPage } from "./gamepage/audiocall";
import { StatisticPage } from "./statisticPage/statisticPage";
import { DataModel } from "./modelData";
import { BookPage } from "./bookpage/bookPage";
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
    console.log(this.isAutorised);
    const startPage = new StartPage(document.body);
    startPage.autorization.onUser = (user) => {
      if (user) {
        startPage.destroy();
        this.startpageCycle(true);
      } else {
        startPage.destroy();
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
      console.log(this.dataModel.complicatedWords.length);
      const categoryPage = new CategoryPage(startPage.startPageNode, this.dataModel.complicatedWords.length);
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
        console.log('is empty...')
        this.bookPageCycle(startPage.startPageNode, 6, this.isAutorised);
      }
    }
    startPage.onSprint = () => {
      startPage.destroy();
      const sprintPage = new SprintPage(startPage.startPageNode);
      sprintPage.renderCategory();
      sprintPage.startPage = startPage      
    };

    startPage.onAudiocall = () => {
      startPage.destroy();
      const audiocallPage = new AudiocallPage(startPage.myNode);
      audiocallPage.renderCategory();
      audiocallPage.startPage = startPage
    };

    startPage.onStatistic = () => {
      startPage.destroy();
      const statisticPage = new StatisticPage(startPage.startPageNode);
      statisticPage.render('Statistic Page');
    }
  };

  private bookPageCycle(node: HTMLElement, type: number, isAutorised: boolean) {
    const bookPage = new BookPage(node);
    bookPage.render('Book page');
    bookPage.onNext = async () => {
      bookPage.destroyCards();
      const words = await this.dataModel.getWordsUp(type);
      words.map((item: Iword) => {
        const bookCard = new BookCard(bookPage.cards, item, isAutorised);
        bookCard.onFavorite = () => {
          console.log(item);
          console.log('add to favorite..');
        }
        bookCard.onComplicated = () => {
          this.dataModel.addTocomplicated(item);
          console.log('add to complicated..')
          console.log(this.dataModel.complicatedWords.length);
        }
      });
    }
    bookPage.onPrev = async () => {
      bookPage.destroyCards();
      const words = await this.dataModel.getWordsDown(type);
      words.map((item: Iword) => {
        const bookCard = new BookCard(bookPage.cards, item, isAutorised);
        bookCard.onFavorite = () => {
          console.log(item);
          console.log('add to favorite..');
        }
        bookCard.onComplicated = () => {
          this.dataModel.addTocomplicated(item);
          console.log('add to complicated..')
          console.log(this.dataModel.complicatedWords.length);
        }
      });
    };
    bookPage.onNext();
  }
}