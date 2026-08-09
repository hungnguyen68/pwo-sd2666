import { Element } from '../core/element/element';
import { expect } from '../fixture/page-fixture';
import { BasePage } from './base-page';
import { BookData } from '../data-object/ui/book-data';

export class BookPage extends BasePage {
    inputSearchBox: Element;
    buttonSearch: Element;
    bookElements: Element;
    buttonNextPage: Element;
    pageIndicator: Element;

    constructor() {
        super();
        this.inputSearchBox = new Element('#searchBox');
        this.buttonSearch = new Element("//input[@id='searchBox']/following-sibling::button");
        this.bookElements = new Element("//tbody/tr");
        this.buttonNextPage = new Element("//button[normalize-space(text())='Next']");
        this.pageIndicator = new Element("//button[normalize-space(text())='Previous']/following-sibling::span");
    }

    async fillSearchKeyword(bookName: string) {
        await this.inputSearchBox.enter(bookName);
    }

    async searchBook() {
        await this.buttonSearch.click();
    }

    async getAllBooks(): Promise<BookData[]> {
        let listBook: BookData[] = [];
        //loop through every page so books from all pages are collected, not just the current one
        while (true) {
            const rows = await this.bookElements.getElement().all();
            for (const row of rows) {
                const bookName = await row.locator('td:nth-child(2)').textContent();
                const bookAuthor = await row.locator('td:nth-child(3)').textContent();
                const bookPublisher = await row.locator('td:nth-child(4)').textContent();
                listBook.push({
                    title: bookName ? bookName.trim() : '',
                    author: bookAuthor ? bookAuthor.trim() : '',
                    publisher: bookPublisher ? bookPublisher.trim() : ''
                });
            }

            if (await this.buttonNextPage.getElement().isDisabled()) {
                break;
            }

            const currentPageText = await this.pageIndicator.getText();
            await this.buttonNextPage.getElement().click();
            await expect(this.pageIndicator.getElement()).not.toHaveText(currentPageText ?? '');
        }

        return listBook;
    }

    async verifySearchResultsContain(searchString: string, listBook: BookData[]) {
        for (const book of listBook) {
            const isTitleContains = book.title.toLowerCase().includes(searchString.toLowerCase());
            const isAuthorContains = book.author.toLowerCase().includes(searchString.toLowerCase());
            const isPublisherContains = book.publisher.toLowerCase().includes(searchString.toLowerCase());
            if (!isTitleContains && !isAuthorContains && !isPublisherContains) {
                throw new Error(`Search string "${searchString}" not found in book: ${JSON.stringify(book)}`);
            }
        }
    }
}