import { Element } from '../core/element/element';
import { BasePage } from './base-page';
import { LoginData } from '../data-object/ui/login-data';

export class LoginPage extends BasePage {
    inputUsername: Element;
    inputPassword: Element;
    buttonLogin: Element;

    constructor() {
        super();
        this.inputUsername = new Element('#userName');
        this.inputPassword = new Element('#password');
        this.buttonLogin = new Element("#login");
    }

    async fillLoginForm(loginData: LoginData) {
        await this.inputUsername.enter(loginData.username);
        await this.inputPassword.enter(loginData.password);
    }

    async submitLoginForm() {
        await this.buttonLogin.click();
    }
}