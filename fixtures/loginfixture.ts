import {test as BaseTest} from '@playwright/test';
import {LoginPage} from '../Pages/loginPage';

type MyFixtures = {
    loginPage: LoginPage;
}

export const test = BaseTest.extend<MyFixtures>({
    loginPage: async ({page}, use) => {
        const loginPage = new LoginPage(page); 
        loginPage.login('admin', 'admin123'); 

        await use(loginPage);       

        
    }
});