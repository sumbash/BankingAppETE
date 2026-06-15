import { Page, test, expect } from '@playwright/test';
import { LoginPage } from '../Pages/loginPage';
import { DashboardPage } from '../Pages/dashboard';

test.describe('login functionality', () => {

      let loginPage: LoginPage;
      let dashboardPage: DashboardPage;

    test.beforeEach(async ({ page }) => {
  loginPage = new LoginPage(page);
  dashboardPage = new DashboardPage(page);
  await page.goto('https://qaplayground.com/bank');
  await page.waitForLoadState('networkidle');
});

// test.beforeEach(async ({ browser }) => {
//         page = await browser.newPage();
//         loginPage = new LoginPage(page);  // Instantiate here with page
//         await page.goto('https://qaplayground.com/bank');
//         await page.waitForLoadState('networkidle');
//     });

    test.afterEach(async ({ page }) => {
        await page.close();
    });

  test('should login successfully with valid credentials', async ({ page }) => {
  await loginPage.login('admin', 'admin123');
  await expect(page).toHaveURL('https://qaplayground.com/bank/dashboard');
  await dashboardPage.expectLoadingState();
});

  

  //   test('should not login with invalid credentials', async ({ page }) => {
 
  //   await loginPage.login();

  //   await expect(page).toHaveURL('https://qaplayground.com/bank/dashboard');
  // });


});