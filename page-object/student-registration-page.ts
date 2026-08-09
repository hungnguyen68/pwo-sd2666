import { GROUP_DELIMITER } from '../constant/delimiter';
import { Element } from '../core/element/element';
import { formatDateForModal } from '../core/utils/date';
import { StudentFormData } from '../data-object/ui/student-form-data';
import { BasePage } from './base-page';

export class StudentRegistrationPage extends BasePage {
    inputFirstName: Element;
    inputLastName: Element;
    inputEmail: Element;
    inputMobile: Element;
    datePickerDateOfBirth: Element;
    inputSubjects: Element;
    textAreaCurrentAddress: Element;
    dropdownState: Element;
    dropdownCity: Element;
    buttonSubmit: Element;
    modalTitle: Element;

    constructor() {
        super();
        this.inputFirstName = new Element('#firstName');
        this.inputLastName = new Element('#lastName');
        this.inputEmail = new Element('#userEmail');
        this.inputMobile = new Element('#userNumber');
        this.datePickerDateOfBirth = new Element('#dateOfBirthInput');
        this.inputSubjects = new Element('#subjectsInput');
        this.textAreaCurrentAddress = new Element('#currentAddress');
        this.dropdownState = new Element('#state');
        this.dropdownCity = new Element('#city');
        this.buttonSubmit = new Element('#submit');
        this.modalTitle = new Element('#example-modal-sizes-title-lg');
    }

    getRadioButtonGenderElement(gender: string): Element {
        return new Element(`//label[text()='${gender}']//preceding-sibling::input`);
    }

    getSubjectOptionElement(subject: string): Element {
        return new Element(`//div[@role='option'][text()='${subject}']`);
    }

    getHobbyCheckboxElement(hobby: string): Element {
        return new Element(`//label[contains(@for, 'hobbies-checkbox')][text()='${hobby}']`);
    }

    getStateOptionElement(state: string): Element {
        return new Element(`//div[@id='state']//div[@role='option'][text()='${state}']`)
    }

    getCityOptionElement(city: string): Element {
        return new Element(`//div[@id='city']//div[@role='option'][text()='${city}']`)
    }

    getModalRowValueElement(label: string): Element {
        return new Element(`//td[text()='${label}']/following-sibling::td`);
    }

    async fillFirstName(firstName: string) {
        await this.inputFirstName.enter(firstName);
    }

    async fillLastName(lastName: string) {
        await this.inputLastName.enter(lastName);
    }

    async fillEmail(email: string) {
        await this.inputEmail.enter(email);
    }

    async selectGender(gender: string) {
        const radioButtonGenderElement = this.getRadioButtonGenderElement(gender);
        await radioButtonGenderElement.click();
    }

    async fillMobile(mobile: string) {
        await this.inputMobile.enter(mobile);
    }

    async selectDateOfBirth(date: string) {
        await this.datePickerDateOfBirth.click();
        await this.datePicker.selectDate(date);
    }

    async selectSubjects(studentFormData: StudentFormData) {
        if (studentFormData.subjects) {
            await this.inputSubjects.click();

            const listSubject = studentFormData.subjects.split(GROUP_DELIMITER);
            for (const subject of listSubject) {
                await this.inputSubjects.enter(subject);
                const subjectOptionElement = this.getSubjectOptionElement(subject);
                await subjectOptionElement.click();
            }
        }
    }

    async selectHobbies(studentFormData: StudentFormData) {
        if (studentFormData.hobbies) {
            const listHobby = studentFormData.hobbies.split(GROUP_DELIMITER);
            for (const hobby of listHobby) {
                const hobbyElement = this.getHobbyCheckboxElement(hobby);
                await hobbyElement.click();
            }
        }
    }

    async fillCurrentAddress(currentAddress: string) {
        await this.textAreaCurrentAddress.enter(currentAddress);
    }

    async selectState(state: string) {
        const stateOptionElement = this.getStateOptionElement(state);
        await this.dropdownState.click();
        await stateOptionElement.click();
    }

    async selectCity(city: string) {
        const cityOptionElement = this.getCityOptionElement(city);
        await this.dropdownCity.click();
        await cityOptionElement.click();
    }

    async clickSubmit() {
        await this.buttonSubmit.click();
    }

    async registerInputAllFields(studentFormData: StudentFormData) {
        await this.fillFirstName(studentFormData.firstName);
        await this.fillLastName(studentFormData.lastName);
        await this.fillEmail(studentFormData.email);
        await this.selectGender(studentFormData.gender);
        await this.fillMobile(studentFormData.mobile);
        await this.selectDateOfBirth(studentFormData.dateOfBirth);
        await this.selectSubjects(studentFormData);
        await this.selectHobbies(studentFormData);
        await this.fillCurrentAddress(studentFormData.currentAddress);
        await this.selectState(studentFormData.state);
        await this.selectCity(studentFormData.city)
        await this.clickSubmit();
    }

    async registerInputMandatoryFields(studentFormData: StudentFormData) {
        await this.fillFirstName(studentFormData.firstName);
        await this.fillLastName(studentFormData.lastName);
        await this.selectGender(studentFormData.gender);
        await this.fillMobile(studentFormData.mobile);
        await this.clickSubmit();
    }

    async verifyStudentFormDataIsDisplayed(studentFormData: StudentFormData) {
        await this.verifyInputUsernameIsVisible();
        await this.inputFirstName.doesElementHaveText(studentFormData.firstName);
    }

    async verifyInputUsernameIsVisible() {
        await this.inputFirstName.verifyElementIsVisible();
    }

    async verifyPostSubmitSuccess(studentFormData: StudentFormData, isMandatoryFieldsOnly: boolean = false) {
        await this.modalTitle.doesElementHaveText('Thanks for submitting the form');
        
        if (isMandatoryFieldsOnly) {
            await this.getModalRowValueElement('Student Name').doesElementHaveText(`${studentFormData.firstName} ${studentFormData.lastName}`);
            await this.getModalRowValueElement('Gender').doesElementHaveText(studentFormData.gender);
            await this.getModalRowValueElement('Mobile').doesElementHaveText(studentFormData.mobile);
            return;
        }

        await this.getModalRowValueElement('Student Name').doesElementHaveText(`${studentFormData.firstName} ${studentFormData.lastName}`);
        await this.getModalRowValueElement('Student Email').doesElementHaveText(studentFormData.email);
        await this.getModalRowValueElement('Gender').doesElementHaveText(studentFormData.gender);
        await this.getModalRowValueElement('Mobile').doesElementHaveText(studentFormData.mobile);
        await this.getModalRowValueElement('Date of Birth').doesElementHaveText(formatDateForModal(studentFormData.dateOfBirth));
        await this.getModalRowValueElement('Subjects').doesElementHaveText(studentFormData.subjects.split(GROUP_DELIMITER).join(', '));
        await this.getModalRowValueElement('Hobbies').doesElementHaveText(studentFormData.hobbies.split(GROUP_DELIMITER).join(', '));
        await this.getModalRowValueElement('Address').doesElementHaveText(studentFormData.currentAddress);
        await this.getModalRowValueElement('State and City').doesElementHaveText(`${studentFormData.state} ${studentFormData.city}`);
    }
}