import { StartPage } from './startPage/startPage'
export class Application {
  constructor() {
    const startPage = new StartPage();
    startPage.render(document.body);
    startPage.onHead = () => {
    }
  };

}