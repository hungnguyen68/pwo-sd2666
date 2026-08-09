import { Element } from '../core/element/element';
import { BasePage } from './base-page';
import { LoginData } from '../data-object/ui/login-data';
import { DemoQAApi } from '../core/utils/api-client';

export class ProfilePage extends BasePage {
    inputSearchBox: Element;
    buttonSearch: Element;
    bookElements: Element;
    buttonNextPage: Element;
    pageIndicator: Element;
    userNameValue: Element;
    confirmDeleteButton: Element;

    constructor() {
        super();
        this.inputSearchBox = new Element('#searchBox');
        this.buttonSearch = new Element("//input[@id='searchBox']/following-sibling::button");
        this.bookElements = new Element("//tbody/tr");
        this.buttonNextPage = new Element("//button[normalize-space(text())='Next']");
        this.pageIndicator = new Element("//button[normalize-space(text())='Previous']/following-sibling::span");
        this.userNameValue = new Element('#userName-value');
        this.confirmDeleteButton = new Element("//button[@id='closeSmallModal-ok']");
    }

    async fillSearchKeyword(bookName: string) {
        await this.inputSearchBox.enter(bookName);
    }

    async searchBook() {
        await this.buttonSearch.click();
    }

    async getBookRow(bookName: string): Promise<Element> {
        return new Element(`//div[@id='books-wrapper']/following-sibling::div[1]//tr[.//a[normalize-space()='${bookName}']]`);
    }

    async getDeleteButtonForBook(bookName: string): Promise<Element> {
        const bookRow = await this.getBookRow(bookName);
        return new Element(`${bookRow.locator}//span[@title='Delete']`);
    }

    async deleteBook(bookName: string) {
        let deleteElement = await this.getDeleteButtonForBook(bookName);
        await deleteElement.click();
        await this.confirmDeleteButton.click();
    }

    async confirmDeleteBook() {
        await this.confirmDeleteButton.click();
    }

    async ensureBookExistsInAccount(loginData: LoginData, isbn: string) {
        const token = await DemoQAApi.generateToken(loginData.username, loginData.password);
        await DemoQAApi.addBookToUser(loginData.userid, isbn, token);
    }

    async verifyUserName(expectedUsername: string) {
        await this.userNameValue.doesElementHaveText(expectedUsername);
    }

    async verifyBookIsListed(bookName: string) {
        const bookRow = await this.getBookRow(bookName);
        await bookRow.verifyElementIsVisible();
    }

    async verifyBookIsDeleted(bookName: string) {
        const bookRow = await this.getBookRow(bookName);
        const isVisible = await bookRow.isElementVisible();
        if (isVisible) {
            throw new Error(`Book "${bookName}" is still visible`);
        }
    }
}