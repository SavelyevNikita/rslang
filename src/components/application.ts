import { StartPage } from './startPage/startPage';
import { BookPage } from './bookPage/bookPage';
import { GamePage } from './gamePage/gamePage';
import { StatisticPage } from './statisticPage/statisticPage';
export class Application {
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
      const bookPage = new BookPage(startPage.myNode);
      bookPage.render('Book page');
    }
    startPage.onGame = () => {
      startPage.destroy();
      const gamePage = new GamePage(startPage.myNode);
      gamePage.render('Game page');
    }
    startPage.onStatistic = () => {
      startPage.destroy();
      const statisticPage = new StatisticPage(startPage.myNode);
      statisticPage.render('Statistic Page');
    }
  };

}