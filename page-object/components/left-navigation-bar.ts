import { Element } from '../../core/element/element';

export class LeftNavigationBar {
    
    getMenuSubItem(subItem: string): Element {
        return new Element(`//a[contains(.,'${subItem}')]`);
    }

    async clickSubItem(subItem: string) {
        const subItemElement =  this.getMenuSubItem(subItem);
        await subItemElement.click();
    }
}   