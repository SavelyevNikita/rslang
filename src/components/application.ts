import { StartPage } from './startPage/startPage';
import { BookPage } from './bookPage/bookPage';
import { GamePage } from './gamePage/gamePage';
import { StatisticPage } from './statisticPage/statisticPage';
import { api } from '../api/server'
export class Application {
  constructor() {
    this.startpageCycle();
  }
  private  startpageCycle() {
    const startPage = new StartPage(document.body);
    startPage.renderWholePage();
    startPage.onMain = () => {
      startPage.destroy();
      startPage.render('Start page');
    }
     startPage.onBook = async () => {
      startPage.destroy();
      const bookPage = new BookPage(startPage.myNode);
      bookPage.render('Book page');
      const myApi = await api.getWords(0, 0);
      // const myApi = await api.getWords(0, 0).then(data=>console.log(data));
      console.log(myApi);
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