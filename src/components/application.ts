import { StartPage } from './startPage/startPage';
import { CategoryPage } from './bookPage/categoryPage';
import { GamePage } from './gamePage/gamePage';
import { StatisticPage } from './statisticPage/statisticPage';
import { DataModel, Iword } from './modelData';
import { BookPage } from './bookpage/bookPage';
import { BookCard } from './bookpage/bookCard';

export class Application {
  dataModel: DataModel;
  constructor() {
    this.startpageCycle();
  }
  private startpageCycle() {
    const startPage = new StartPage(document.body);
    startPage.renderWholePage();
    startPage.onMain = () => {
      startPage.destroy();
      startPage.render();
    }
    startPage.onBook = () => {
      startPage.destroy();
      const categoryPage = new CategoryPage(startPage.startPageNode);
      categoryPage.onSection1 = () => {
        const bookPage = new BookPage(startPage.startPageNode);
        bookPage.render('Book page');
        this.dataModel = new DataModel(0);
        bookPage.onNext = async () => {
          const words = await this.dataModel.getWordsUp();
          console.log(bookPage.cards);
          words.map((item: Iword) => {
            console.log(item);
            const bookCard = new BookCard(bookPage.cards,item);
          });
        }
        bookPage.onPrev = async () => {
          const words = await this.dataModel.getWordsDown();
          words.map((item: Iword) => {
            console.log(item);
            const bookCard = new BookCard(startPage.startPageNode,item);
          });
        }
      }
      categoryPage.onSection2 = () => {
        const bookPage = new BookPage(startPage.startPageNode);
        bookPage.render('Book page');
        this.dataModel = new DataModel(1);
        bookPage.onNext = async () => {
          const words = await this.dataModel.getWordsUp();
          words.map((item: Iword) => console.log(item));
        }
        bookPage.onPrev = async () => {
          const words = await this.dataModel.getWordsDown();
          words.map((item: Iword) => console.log(item));
        }
      }
      categoryPage.onSection3 = () => {
        const bookPage = new BookPage(startPage.startPageNode);
        bookPage.render('Book page');
        this.dataModel = new DataModel(2);
        bookPage.onNext = async () => {
          const words = await this.dataModel.getWordsUp();
          words.map((item: Iword) => console.log(item));
        }
        bookPage.onPrev = async () => {
          const words = await this.dataModel.getWordsDown();
          words.map((item: Iword) => console.log(item));
        }
      }
      categoryPage.onSection4 = () => {
        const bookPage = new BookPage(startPage.startPageNode);
        bookPage.render('Book page');
        this.dataModel = new DataModel(5);
        bookPage.onNext = async () => {
          const words = await this.dataModel.getWordsUp();
          words.map((item: Iword) => console.log(item));
        }
        bookPage.onPrev = async () => {
          const words = await this.dataModel.getWordsDown();
          words.map((item: Iword) => console.log(item));
        }
      }
      categoryPage.onSection5 = () => {
        const bookPage = new BookPage(startPage.startPageNode);
        bookPage.render('Book page');
        this.dataModel = new DataModel(4);
        bookPage.onNext = async () => {
          const words = await this.dataModel.getWordsUp();
          words.map((item: Iword) => console.log(item));
        }
        bookPage.onPrev = async () => {
          const words = await this.dataModel.getWordsDown();
          words.map((item: Iword) => console.log(item));
        }
      }
      categoryPage.onSection6 = () => {
        const bookPage = new BookPage(startPage.startPageNode);
        bookPage.render('Book page');
        this.dataModel = new DataModel(5);
        bookPage.onNext = async () => {
          const words = await this.dataModel.getWordsUp();
          words.map((item: Iword) => console.log(item));
        }
        bookPage.onPrev = async () => {
          const words = await this.dataModel.getWordsDown();
          words.map((item: Iword) => console.log(item));
        }
      }
      categoryPage.onSection7 = () => {
        const bookPage = new BookPage(startPage.startPageNode);
        bookPage.render('Book page');
        this.dataModel = new DataModel(6);
        bookPage.onNext = async () => {
          const words = await this.dataModel.getWordsUp();
          words.map((item: Iword) => console.log(item));
        }
        bookPage.onPrev = async () => {
          const words = await this.dataModel.getWordsDown();
          words.map((item: Iword) => console.log(item));
        }
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

}