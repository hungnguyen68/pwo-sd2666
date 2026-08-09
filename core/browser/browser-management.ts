import {APIRequestContext, Browser, BrowserContext, Page} from '@playwright/test';

export class BrowserManagement {
    static browser: Browser;
    static browserContext: BrowserContext;
    static page: Page;
    static request: APIRequestContext;

    static initializeBrowser(browser: Browser, browserContext: BrowserContext, page: Page, request: APIRequestContext): void {
        BrowserManagement.browser = browser;
        BrowserManagement.browserContext = browserContext;
        BrowserManagement.page = page;
        BrowserManagement.request = request;
    }

    static setCurrentContext(browserContext: BrowserContext): void {
        BrowserManagement.browserContext = browserContext;
    }

    static setCurrentPage(page: Page): void {
        BrowserManagement.page = page;
    }


    static getCurrentContext(): BrowserContext {
        return this.browserContext;
    }
    
    static getCurrentPage(): Page {
        return this.page;
    }

    static getCurrentRequest(): APIRequestContext{
        return this.request;
    }

    static async switchToTab(index: number): Promise<void> {
        await this.browserContext.waitForEvent('page', {timeout: 30000});
        const pages = this.browserContext.pages();
        if (index < 0 || index - 1 >= pages.length) {
            throw new Error(`Invalid tab index: ${index}. There are only ${pages.length} tabs open.`);
        }

        this.setCurrentPage(pages[index -1]);
        await pages[index - 1].bringToFront();
    }

    static async resetContextAndOpenNewPage(): Promise<void> {
        await this.browserContext.close();
        const newContext = await this.browser.newContext();
        this.setCurrentContext(newContext);
        const newPage = await newContext.newPage();
        this.setCurrentPage(newPage);
    }
    
}
