import { Page, test, expect } from '@playwright/test';
import { LoginPage } from '../Pages/loginPage';
import { TransactionPage } from '../Pages/transactiondata';

test.describe('login functionality', async () => {

    let loginPage: LoginPage;
    let transactionPage: TransactionPage;

    test.beforeEach(async ({ page }) => {
        loginPage = new LoginPage(page);
        transactionPage = new TransactionPage(page);
        await page.goto('https://qaplayground.com/bank');
        await page.waitForLoadState('networkidle');
    });

    test.afterEach(async ({ page }) => {
        await page.close();
    });


    test('should display loading state on dashboard', async ({ page }) => {
        await loginPage.login('admin', 'admin123');
        await transactionPage.transactionData();
    });


});



