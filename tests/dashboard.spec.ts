import { Page, test, expect } from '@playwright/test';
import { LoginPage } from '../Pages/loginPage';
import { DashboardPage } from '../Pages/dashboard';

test.describe('login functionality', async () => {

  let loginPage: LoginPage;
  let dashboardPage: DashboardPage;

  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    dashboardPage = new DashboardPage(page);
    await page.goto('https://qaplayground.com/bank');
    await page.waitForLoadState('networkidle');
  });

  test.afterEach(async ({ page }) => {
    await page.close();
  });


  test('should display loading state on dashboard', async ({ page }) => {
    await loginPage.login('admin', 'admin123');
    // await dashboardPage.expectLoadingState();
    // await dashboardPage.TotalBalanceCard();
    // //await dashboardPage.AccountCard();
    // await dashboardPage.quicknavigations();
    await dashboardPage.transactiontable();

  });



});