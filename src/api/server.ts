// https://react-learnwords-example.herokuapp.com/words?group=0&page=0
export const HOST = "https://react-learnwords-example.herokuapp.com";

export class Api {
  onSign: (content:string) => void;
  constructor() { }
  async createUser(user: {
    name?: string,
    email: string,
    password: string,
  }) {
    const rawResponse = await fetch(`${HOST}/users`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(user),
    });
    if (rawResponse.status === 200) {
      const content = await rawResponse.json();
      localStorage.setItem("user", `${content}`);
      // console.log("###content", content);
    } else {
      alert('регистрация не выполнена...')
    }
  };

  async signInUser(user: {
    email: string,
    password: string,
  }) {
    const rawResponse = await fetch(`${HOST}/signin`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(user),
    });
    if (rawResponse.status === 200) {
      const content = await rawResponse.json();
      localStorage.setItem("user", `${content}`);
      // console.log("###content", content);
      this.onSign(content);
    } else {
      alert('вход не выполнен...')
    }
  };

  async getWords(group: number, page: number) {
    const rawResponse = await fetch(`${HOST}/words?group=${group}&page=${page}`);
    if (rawResponse.status === 200) {
      const rawWards = await rawResponse.json();
      return rawWards;
    } else {
      alert('ошибка запроса слов...')
    }
  };
  async getWordsId(group: number, page: number) {
    console.log('empty')
  };

};
