import { expect, Locator } from '@playwright/test';
import { BrowserManagement } from '../browser/browser-management';

export class Element {
    locator: string;

    constructor(locator: string) {
        this.locator = locator;
    }

    getElement() {
        return BrowserManagement.page.locator(this.locator);
    }
    
    async doesElementHaveText(expectedText: string): Promise<void> {
        await expect(BrowserManagement.page.locator(this.locator)).toHaveText(expectedText);
    }

    async doesElementContainText(expectedText: string): Promise<void> {
        await expect(BrowserManagement.page.locator(this.locator)).toContainText(expectedText);
    }

    async click(timeout = 10000): Promise<void> {
        await BrowserManagement.page.locator(this.locator).click({ timeout: timeout });
    }

    async enter(text: string, timeout = 10000): Promise<void> {
        await BrowserManagement.page.locator(this.locator).fill(text, { timeout: timeout });
    }

    async selectOption(option: string, timeout = 10000): Promise<void> {
        await BrowserManagement.page.locator(this.locator).selectOption(option, { timeout: timeout });
    }

    async waitForElement(options?: Parameters<Locator['waitFor']>[0]): Promise<void> {
        await BrowserManagement.page.locator(this.locator).waitFor(options);
    }

    async getText(): Promise<string | null> {
        let text = await BrowserManagement.page.locator(this.locator).textContent();
        return text ? text.trim() : null;
    }

    async waitForElementVisible(timeout?: number): Promise<void> {
        await BrowserManagement.page.waitForSelector(this.locator, { state: 'visible', timeout });
    }

    async hover() {
        await BrowserManagement.page.locator(this.locator).hover();
    }

    async getAttribute(attributeName: string): Promise<string | null> {
        let value = await BrowserManagement.page.locator(this.locator).getAttribute(attributeName);
        return value ? value.trim() : null;
    }

    async verifyElementIsVisible() {
        await expect(BrowserManagement.page.locator(this.locator)).toBeVisible();
    }

    async verifyElementIsEnabled() {
        await expect(BrowserManagement.page.locator(this.locator)).toBeEnabled();
    }

    async verifyElementIsHidden() {
        await expect(BrowserManagement.page.locator(this.locator)).not.toBeVisible();
    }

    async isElementVisible(): Promise<boolean> {
        try {
            const isVisible = await BrowserManagement.page.locator(this.locator).isVisible();
            return isVisible;
        } catch (error) {
            return false;
        }
    }

    async isElementDisplayed(): Promise<boolean> {
        try {
            // Check if the element is both visible and has non-zero size
            const isVisible = await BrowserManagement.page.locator(this.locator).isVisible();
            const boundingBox = await BrowserManagement.page.locator(this.locator).boundingBox();
            const isDisplayed = isVisible && !!boundingBox;
            return isDisplayed;
        } catch (error) {
            console.error(`Error checking element display status: ${error}`);
            return false;
        }
    }

}
