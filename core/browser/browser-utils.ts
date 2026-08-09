import { BrowserManagement } from "./browser-management";

export class BrowserUtils{

    static async waitForTimeOut(number: number): Promise<void>{
        await BrowserManagement.page.waitForTimeout(number);
    } 

    static async waitForLoadState(): Promise<void>{
        await BrowserManagement.page.waitForLoadState('load');
    }

    static async reloadPage(){
        await BrowserManagement.page.reload();
    }

    static async navigateTo(url: string) {
        await BrowserManagement.page.goto(url);
    }
}