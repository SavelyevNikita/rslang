import { StartPage } from "./startPage/startPage";
import { CategoryPage } from "./bookPage/categoryPage";
import { SprintPage } from "./gamepage/sprint";
import { AudiocallPage } from "./gamepage/audiocall";
// import { ResultPage } from "./gamepage/result";
import { StatisticPage } from "./statisticPage/statisticPage";
import { DataModel } from "./modelData";
import { BookPage } from "./bookpage/bookPage";

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
    };
    startPage.onBook = () => {
      startPage.destroy();
      const categoryPage = new CategoryPage(startPage.myNode);
      categoryPage.onSection1 = () => {
        const bookPage = new BookPage(startPage.myNode);
        bookPage.render("Book page");
        this.dataModel = new DataModel(0);
        bookPage.onNext = () => {
          this.dataModel.getWordsUp();
        };
        bookPage.onPrev = () => {
          this.dataModel.getWordsDown();
        };
      };
      categoryPage.onSection2 = () => {
        const bookPage = new BookPage(startPage.myNode);
        bookPage.render("Book page");
        this.dataModel = new DataModel(1);
        bookPage.onNext = () => {
          this.dataModel.getWordsUp();
        };
        bookPage.onPrev = () => {
          this.dataModel.getWordsDown();
        };
      };
      categoryPage.onSection3 = () => {
        const bookPage = new BookPage(startPage.myNode);
        bookPage.render("Book page");
        this.dataModel = new DataModel(2);
        bookPage.onNext = () => {
          this.dataModel.getWordsUp();
        };
        bookPage.onPrev = () => {
          this.dataModel.getWordsDown();
        };
      };
      categoryPage.onSection4 = () => {
        const bookPage = new BookPage(startPage.myNode);
        bookPage.render("Book page");
        this.dataModel = new DataModel(5);
        bookPage.onNext = () => {
          this.dataModel.getWordsUp();
        };
        bookPage.onPrev = () => {
          this.dataModel.getWordsDown();
        };
      };
      categoryPage.onSection5 = () => {
        const bookPage = new BookPage(startPage.myNode);
        bookPage.render("Book page");
        this.dataModel = new DataModel(4);
        bookPage.onNext = () => {
          this.dataModel.getWordsUp();
        };
        bookPage.onPrev = () => {
          this.dataModel.getWordsDown();
        };
      };
      categoryPage.onSection6 = () => {
        const bookPage = new BookPage(startPage.myNode);
        bookPage.render("Book page");
        this.dataModel = new DataModel(5);
        bookPage.onNext = () => {
          this.dataModel.getWordsUp();
        };
        bookPage.onPrev = () => {
          this.dataModel.getWordsDown();
        };
      };
      categoryPage.onSection7 = () => {
        const bookPage = new BookPage(startPage.myNode);
        bookPage.render("Book page");
        this.dataModel = new DataModel(6);
        bookPage.onNext = () => {
          this.dataModel.getWordsUp();
        };
        bookPage.onPrev = () => {
          this.dataModel.getWordsDown();
        };
      };
    };
    startPage.onSprint = () => {
      startPage.destroy();
      const sprintPage = new SprintPage(startPage.myNode);
      sprintPage.renderCategory(); 

      // const resultPage = new ResultPage()
      // console.log('resultPage', resultPage)
      // resultPage.onHome = () => {
      //   startPage.destroy();
      //   startPage.render();
      // };
      // resultPage.onContinue = () => {
      //   startPage.destroy();
      //   const sprintPage = new SprintPage(startPage.myNode);
      //   sprintPage.renderCategory();
      // };
    };

    startPage.onAudiocall = () => {
      startPage.destroy();
      const audiocallPage = new AudiocallPage(startPage.myNode);
      audiocallPage.renderCategory();

      // const resultPage = new ResultPage();
      // resultPage.onHome = () => {
      //   console.log("resultPage", resultPage);
      //   startPage.destroy();
      //   startPage.render();
      // };
      // resultPage.onContinue = () => {
      //   startPage.destroy();
      //   const audiocallPage = new AudiocallPage(startPage.myNode);
      //   audiocallPage.renderCategory();
      // };
    };
    startPage.onStatistic = () => {
      startPage.destroy();
      const statisticPage = new StatisticPage(startPage.myNode);
      statisticPage.render("Statistic Page");
    };
  }
}
