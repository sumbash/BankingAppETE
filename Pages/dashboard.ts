import { Page, expect } from '@playwright/test';

export class DashboardPage {
    constructor(private page: Page) { }

    async expectLoadingState() {
        await expect(this.page.locator('#dashboard-page-container')).toHaveAttribute('data-loading', 'true');

        const skeletonCards = this.page.locator('[data-testid="skeleton-card"]');
        const count = await skeletonCards.count();
        expect(count).toBeGreaterThan(0);
        for (let i = 0; i < count; i += 1) {
            await expect(skeletonCards.nth(i)).toBeVisible();
        }

    }

    async TotalBalanceCard() {
        const totalBalanceCard = this.page.locator('[data-testid="total-balance-card"]');
        await expect(totalBalanceCard).toBeVisible();
        await expect(totalBalanceCard).toContainText('$');

    }

    async AccountCard() {
        const accountCard = this.page.locator('[data-testid="account-card"]');
        await expect(accountCard).toBeVisible();
        const accountCount = await this.page.locator('#accounts-count').textContent();
        await expect(accountCount).toHaveText(/\d+/);

    }

    async quicknavigations() {

        await this.page.locator('#add-account-link').click();
        await expect(this.page).toHaveURL('https://qaplayground.com/bank/accounts?action=add');
        await expect(this.page.locator('#account-modal')).toBeVisible();
        await this.page.waitForTimeout(5000);

    }
    async transactiontable() {

        await this.page.waitForSelector('#recent-transactions-table', { timeout: 10000 });
        await expect(this.page.locator('#recent-transactions-table')).toBeVisible();

        const header = await this.page.locator('#recent-transactions-table thead tr th').allTextContents();
        console.log('Table Headers:', header);

        const rows = await this.page.locator('#recent-transactions-table tbody tr').count();
        expect(rows).toBeGreaterThan(0);
        expect(rows).toBeLessThanOrEqual(5);

        for (let i=0; i < rows; i += 1) {
            


        

    }

}


}