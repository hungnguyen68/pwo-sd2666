import { BASE_URL } from '../../constant/url';
import { BrowserUtils } from '../../core/browser/browser-utils';
import { CSVHelper } from "../../core/utils/csv";
import { StudentFormData } from '../../data-object/ui/student-form-data';
import { test } from '../../fixture/page-fixture';

const registerInfos: StudentFormData[] = CSVHelper.readCSVFile('ui/student-form-data.csv');
const isMandatoryFieldsOnly = true;

for (const registerInfo of registerInfos) {
    test(`Verify register student form successfully ${registerInfo.firstName} ${registerInfo.lastName}`, async ({ studentRegistrationPage }) => {
        await BrowserUtils.navigateTo(`${BASE_URL}/forms`);
        await studentRegistrationPage.clickSubItem('Practice Form');
        await studentRegistrationPage.registerInputAllFields(registerInfo);
        await studentRegistrationPage.verifyPostSubmitSuccess(registerInfo);
    });
}

for (const registerInfo of registerInfos) {
    test(`Verify register student form with mandatory fields only successfully ${registerInfo.firstName} ${registerInfo.lastName}`, async ({ studentRegistrationPage }) => {
        await BrowserUtils.navigateTo(`${BASE_URL}/forms`);
        await studentRegistrationPage.clickSubItem('Practice Form');
        await studentRegistrationPage.registerInputMandatoryFields(registerInfo);
        await studentRegistrationPage.verifyPostSubmitSuccess(registerInfo, isMandatoryFieldsOnly);
    });
}