import { DatePicker } from './components/date-picker';
import { LeftNavigationBar } from './components/left-navigation-bar';

export class BasePage {
    leftNavigationBar: LeftNavigationBar;
    datePicker: DatePicker;

    constructor() {
        this.leftNavigationBar = new LeftNavigationBar();
        this.datePicker = new DatePicker();
    }

    async clickSubItem(subItem: string) {
        await this.leftNavigationBar.clickSubItem(subItem);
    }
}