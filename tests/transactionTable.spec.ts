import { Page, test, expect } from '@playwright/test';
import { LoginPage } from '../Pages/loginPage';
import { TransactionTablePage } from '../Pages/transactionTable';

test.describe('login functionality', () => {

    let loginPage: LoginPage;
    let transactiontablePage: TransactionTablePage;

    test.beforeEach(async ({ page }) => {
        loginPage = new LoginPage(page);
        transactiontablePage = new TransactionTablePage(page);
        await page.goto('https://qaplayground.com/bank');
        await page.waitForLoadState('networkidle');
        await loginPage.login('admin', 'admin123');
    });

    test.afterEach(async ({ page }) => {
        await page.close();
    });

    test('Should validate rows count in table.', async ({ page }) => {
        await transactiontablePage.countrows();
    });

       test('Should validate table data', async ({ page }) => {
        await transactiontablePage.validateTableData();
    });

});