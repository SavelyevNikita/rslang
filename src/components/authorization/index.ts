import { api } from "./../../api/server";
import signInHtml from "./signin.html";
import registrationHTML from "./registration.html";
import "./index.scss";
interface IUser {
  name?: string;
  email: string;
  password: string;
  userId?: string;
  token?: string;
  refreshToken?: string;
  message?: string;
}

export class AutorizationPopUp {
  wrapperHtml: HTMLDivElement;
  signInHtml: string;
  registrationHtml: string;
  name: string;
  email: string;
  password: string;
  user: IUser;
  onUser: (user: IUser) => void;
  constructor() {
    this.wrapperHtml = document.createElement("div");
    this.wrapperHtml.classList.add("form-wrapper");
    this.signInHtml = signInHtml;
    this.registrationHtml = registrationHTML;
    this.user = null;
  }
  async signIn() {
    const email = (document.getElementById("userEmail") as HTMLInputElement)
      .value;
    const password = (
      document.getElementById("userPassword") as HTMLInputElement
    ).value;
    if (email && password) {
      this.user = {
        email,
        password,
      };
      const onSign = await api.signInUser(this.user);
      if (onSign) {
        this.onUser(this.user);
        document.querySelector('.signin').textContent = onSign.name;
      }
      this.destroy();
    };
  };
  openSignIn() {
    this.wrapperHtml.innerHTML = this.signInHtml;
    const buttonRegistration = document.getElementById("openRegistration");
    if (buttonRegistration) {
      buttonRegistration.onclick = () => this.openRegistration();
    };
    const buttonSubmit = document.getElementById("signIn");
    if (buttonSubmit) {
      buttonSubmit.onsubmit = (event) => {
        event.preventDefault();
        this.signIn();
      };
    };
  };

  registration() {
    const name = (document.getElementById("userName") as HTMLInputElement)
      .value;
    const email = (document.getElementById("userEmail") as HTMLInputElement)
      .value;
    const password = (
      document.getElementById("userPassword") as HTMLInputElement
    ).value;
    if (name && email && password) {
      this.user = {
        name,
        email,
        password,
      };
      api.createUser(this.user);
      this.destroy();
    };
  };

  openRegistration() {
    this.wrapperHtml.innerHTML = this.registrationHtml;
    const buttonSignIn = document.getElementById("openSignIn");
    if (buttonSignIn) {
      buttonSignIn.onclick = () => this.openSignIn();
    }
    const buttonSubmit = document.getElementById("registration");
    if (buttonSubmit) {
      buttonSubmit.onsubmit = (event) => {
        event.preventDefault();
        this.registration();
      };
    };
  };

  removeForm = (event: Event) => {
    if (!(event.target as HTMLElement).closest(".form-wrapper")) {
      if (!(event.target as HTMLElement).closest(".form__container")) {
        this.destroy();
        document.removeEventListener("click", this.removeForm);
      };
    };
  };
  render(node: HTMLElement) {
    if (!document.querySelector(".form-wrapper")) {
      node.appendChild(this.wrapperHtml);
      this.openSignIn();
    };
  };
  destroy() {
    this.wrapperHtml.remove();
  };
  signOut() {
    localStorage.setItem("user", ``);
  };
};
