import { StartPage } from './startPage/startPage';
import { CategoryPage } from './bookPage/categoryPage';
import { GamePage } from './gamePage/gamePage';
import { StatisticPage } from './statisticPage/statisticPage';
import { DataModel, Iword } from './modelData';
import { BookPage } from './bookpage/bookPage';
import { BookCard } from './bookpage/bookCard';
import { AutorizationPopUp } from './authorization/index';

export class Application {
  dataModel: DataModel;
  constructor() {
    this.startpageCycle(false);
    this.dataModel = new DataModel();
  }
  private startpageCycle(isAutorised: boolean) {
    const startPage = new StartPage(document.body);
    startPage.autorization.onUser = (user) => {
      console.log(user);
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
      console.log(this);
      startPage.destroy();
      startPage.render();
    }
    startPage.onBook = () => {
      console.log(this);
      startPage.destroy();
      const categoryPage = new CategoryPage(startPage.startPageNode, isAutorised);
      categoryPage.onSection1 = () => {
        this.bookPageCycle(startPage.startPageNode, 0);
      }
      categoryPage.onSection2 = () => {
        this.bookPageCycle(startPage.startPageNode, 1);
      }
      categoryPage.onSection3 = () => {
        this.bookPageCycle(startPage.startPageNode, 2);
      }
      categoryPage.onSection4 = () => {
        this.bookPageCycle(startPage.startPageNode, 3);
      }
      categoryPage.onSection5 = () => {
        this.bookPageCycle(startPage.startPageNode, 4);
      }
      categoryPage.onSection6 = () => {
        this.bookPageCycle(startPage.startPageNode, 5);
      }
      categoryPage.onSection7 = () => {
        console.log('is empty...')
        this.bookPageCycle(startPage.startPageNode, 6);
      }
    }
    startPage.onGame = () => {
      startPage.destroy();
      const gamePage = new GamePage(startPage.startPageNode);
      gamePage.render('Game page');
    }
    startPage.onStatistic = () => {
      startPage.destroy();
      const statisticPage = new StatisticPage(startPage.startPageNode);
      statisticPage.render('Statistic Page');
    }
  };

  private bookPageCycle(node: HTMLElement, type: number) {
    const bookPage = new BookPage(node);
    bookPage.render('Book page');
    bookPage.onNext = async () => {
      bookPage.destroyCards();
      const words = await this.dataModel.getWordsUp(type);
      words.map((item: Iword) => {
        const bookCard = new BookCard(bookPage.cards, item);
        bookCard.onFavorite = () => {
          console.log(item);
          console.log('add to favorite..');
        }
        bookCard.onComplicated = () => {
          console.log('add to complicated..')
          this.dataModel.complicatedWords.push(item);
          console.log(this.dataModel.complicatedWords.length);
        }
      });
    }
    bookPage.onPrev = async () => {
      bookPage.destroyCards();
      const words = await this.dataModel.getWordsDown(type);
      words.map((item: Iword) => {
        const bookCard = new BookCard(bookPage.cards, item);
        bookCard.onFavorite = () => {
          console.log(item);
          console.log('add to favorite..');
        }
        bookCard.onComplicated = () => {
          console.log('add to complicated..')
          this.dataModel.complicatedWords.push(item);
          console.log(this.dataModel.complicatedWords.length);
        }
      });
    };
    bookPage.onNext();
  }
}