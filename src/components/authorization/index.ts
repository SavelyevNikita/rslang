import { api } from "./../../api/server";
import signInHtml from "./signin.html";
import registrationHTML from "./registration.html";
import "./index.scss";

export class AutorizationPopUp {
  wrapperHtml: HTMLDivElement;
  signInHtml: string;
  registrationHtml: string;

  constructor() {
    this.wrapperHtml = document.createElement("div");
    this.wrapperHtml.classList.add("form-wrapper");
    this.signInHtml = signInHtml;
    this.registrationHtml = registrationHTML;
  }
  signIn() {
    const email = (document.getElementById("userEmail") as HTMLInputElement)
      .value;
    const password = (
      document.getElementById("userPassword") as HTMLInputElement
    ).value;
    if (email && password) {
      const user = {
        email,
        password,
      };
      api.signInUser(user);
      this.destroy();
    }
  }

  openSignIn() {
    this.wrapperHtml.innerHTML = this.signInHtml;
    console.log("openSignIn");
    const buttonRegistration = document.getElementById("openRegistration");
    if (buttonRegistration) {
      buttonRegistration.onclick = () => this.openRegistration();
    }
    const buttonSubmit = document.getElementById("signIn");
    if (buttonSubmit) {
      buttonSubmit.onsubmit = (event) => {
        event.preventDefault();
        this.signIn();
      };
    }
  }

  registration() {
    const name = (document.getElementById("userName") as HTMLInputElement)
      .value;
    const email = (document.getElementById("userEmail") as HTMLInputElement)
      .value;
    const password = (
      document.getElementById("userPassword") as HTMLInputElement
    ).value;
    if (name && email && password) {
      console.log("name", name, "email", email, "password", password);
      const user = {
        name,
        email,
        password,
      };
      api.createUser(user);
      this.destroy();
    }
  }

  openRegistration() {
    this.wrapperHtml.innerHTML = this.registrationHtml;
    console.log("openRegistration");
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
    }
  }

  removeForm = (event: Event) => {
    if (!(event.target as HTMLElement).closest(".form-wrapper")) {
      console.log(event.target);
      this.destroy();
      document.removeEventListener("click", this.removeForm);
    }
  };
  render(node: HTMLElement) {
    if (!document.querySelector(".form-wrapper")) {
      node.appendChild(this.wrapperHtml);
      this.openSignIn();
    }
  }
  destroy() {
    this.wrapperHtml.remove();
  }
  signOut() {
    localStorage.setItem("user", ``);
  }
}
