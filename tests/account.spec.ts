import { test } from '@playwright/test';
import { LoginPage } from '../Pages/loginPage';
import { AccountPage } from '../Pages/accountPage';

test.describe('account functionality', () => {
    let loginPage: LoginPage;
    let accountPage: AccountPage;

    test.beforeEach(async ({ page }) => {
        loginPage = new LoginPage(page);
        accountPage = new AccountPage(page);

        await page.goto('https://qaplayground.com/bank');
        await page.waitForLoadState('networkidle');
        await loginPage.login('admin', 'admin123');
    });

    test('Should open new account wizard', async () => {
        await accountPage.navigateToAccounts();
        await accountPage.openNewAccount();
    
    });

    test('Should edit account', async () => {
        await accountPage.navigateToAccounts();
        await accountPage.openNewAccount();
        await accountPage.editAccount();
    });
});
