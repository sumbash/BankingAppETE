import { Page, test, expect } from '@playwright/test';
import { LoginPage } from '../Pages/loginPage';
import { PinnedAccount } from '../Pages/pinnedAccount';

test.describe('login functionality', async () => {

    let loginPage: LoginPage;
    let pinnedAccountPage: PinnedAccount;

    test.beforeEach(async ({ page }) => {
        loginPage = new LoginPage(page);
        pinnedAccountPage = new PinnedAccount(page);
        await page.goto('https://qaplayground.com/bank');
        await page.waitForLoadState('networkidle');
        await loginPage.login('admin', 'admin123');
    });

    test.afterEach(async ({ page }) => {
        await page.close();
    });

    test('Should validate pinned accounts number', async ({ page }) => {
        await pinnedAccountPage.validatePinnedAccounts();
    });

    test('Should validate draggable attributes', async ({ page }) => {
        await pinnedAccountPage.validatedragable();
    });

})
