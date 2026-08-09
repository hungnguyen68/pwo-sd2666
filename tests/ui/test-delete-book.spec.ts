// Generate test follow below scenario:
// 1. Navigate to login page https://demoqa.com/login
// 2. Fill in the login form with valid credentials reading from login-data.csv
// 3. Submit the login form
// 4. Verify that the user is redirected to the https://demoqa.com/profile page and the profile page contains the correct user information
// 5. Verify in profile page has book name `Git Pocket Guide`
// 6. Try to delete the book `Git Pocket Guide` and verify that the book is deleted successfully

import { BASE_URL } from '../../constant/url';
import { BrowserManagement } from '../../core/browser/browser-management';
import { BrowserUtils } from '../../core/browser/browser-utils';
import { CSVHelper } from '../../core/utils/csv';
import { LoginData } from '../../data-object/ui/login-data';
import { test, expect } from '../../fixture/page-fixture';

const loginDatas: LoginData[] = CSVHelper.readCSVFile('ui/login-data.csv');
const bookName = 'Git Pocket Guide';
const isbn = '9781449325862';

for (const loginData of loginDatas) {
    test(`@deleteBook Verify delete book "${bookName}" after login as ${loginData.username}`, async ({ loginPage, profilePage }) => {
        await profilePage.ensureBookExistsInAccount(loginData, isbn);
        await BrowserUtils.navigateTo(`${BASE_URL}/login`);
        await loginPage.fillLoginForm(loginData);
        await loginPage.submitLoginForm();
        await expect(BrowserManagement.getCurrentPage()).toHaveURL(`${BASE_URL}/profile`);
        await profilePage.verifyUserName(loginData.username);
        await profilePage.verifyBookIsListed(bookName);
        await profilePage.deleteBook(bookName);
        await profilePage.confirmDeleteBook();
        await BrowserUtils.waitForTimeOut(3000); // Wait for the deletion to be processed
        await profilePage.verifyBookIsDeleted(bookName);
    });
}