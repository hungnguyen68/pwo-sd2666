import { Element } from '../../core/element/element';

export class DatePicker {
    dropdownYear: Element;
    dropdownMonth: Element;

    constructor() {
        this.dropdownYear = new Element("//select[contains(@class,'datepicker__year')]");
        this.dropdownMonth = new Element("//select[contains(@class,'datepicker__month')]");
    }

    getDayElement(date: string) {
        return new Element(`//div[contains(@aria-label,'${date}')]`);
    }

    async selectYear(year: string) {
        await this.dropdownYear.selectOption(year);
    }

    async selectMonth(month: string) {
        await this.dropdownMonth.selectOption(month);
    }

    async selectDay(date: string) {
        const dayElement = this.getDayElement(date);
        await dayElement.click();
    }

    async selectDate(date: string): Promise<void> {
        const { year, month } = this.extractYearAndMonth(date);

        await this.selectYear(year);
        await this.selectMonth(month);
        await this.selectDay(date);
    }

    private extractYearAndMonth(date: string): { year: string; month: string } {
        const regex = /^([A-Za-z]+)\s+\d{1,2}(st|nd|rd|th)?,\s+(\d{4})$/;

        const match = date.match(regex);

        if (!match) {
            throw new Error(
                `Invalid date format: ${date}. Expected format: "June 24th, 2026"`,
            );
        }

        return {
            month: match[1],
            year: match[3],
        };
    }
}