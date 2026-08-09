import { test as baseTest, expect as baseExpect } from '../core/fixture/base-fixture';
import { BookPage } from '../page-object/book-page';
import { StudentRegistrationPage } from '../page-object/student-registration-page';
import { ProfilePage } from '../page-object/profile-page';
import { LoginPage } from '../page-object/login-page';

export const test = baseTest.extend<{
    bookPage: BookPage;
    loginPage: LoginPage;
    profilePage: ProfilePage;
    studentRegistrationPage: StudentRegistrationPage;

}>({
    studentRegistrationPage: async ({ }, use) => {
        await use(new StudentRegistrationPage());
    },
    bookPage: async ({ }, use) => {
        await use(new BookPage());
    },
    profilePage: async ({ }, use) => {
        await use(new ProfilePage());
    },
    loginPage: async ({ }, use) => {
        await use(new LoginPage());
    }

});

export const expect = baseExpect;