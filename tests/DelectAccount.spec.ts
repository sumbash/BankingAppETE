import { test } from '@playwright/test';
import { LoginPage } from '../Pages/loginPage';
import { AccountPage } from '../Pages/accountPage';
import { DeleteAccountPage } from '../Pages/deleteAccount'; 

test.describe('account functionality', () => {
    let loginPage: LoginPage;
    let accountPage: AccountPage;
    let delAccount : DeleteAccountPage

    test.beforeEach(async ({ page }) => {
        loginPage = new LoginPage(page);
        accountPage = new AccountPage(page);
        delAccount = new DeleteAccountPage(page)

        await page.goto('https://qaplayground.com/bank');
        await page.waitForLoadState('networkidle');
        await loginPage.login('admin', 'admin123');
    });

     test('Should Validate Cancel Delete Functionality', async () => {
        await accountPage.navigateToAccounts();
        await accountPage.openNewAccount();
        await delAccount.CanceldeleteAccount();
        await delAccount.deleteAccount();
    });

});
