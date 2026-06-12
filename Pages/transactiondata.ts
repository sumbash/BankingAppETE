import { Page, expect } from '@playwright/test';

export class TransactionPage {
    constructor(private page: Page) { }


    async transactionData() {

        await expect(
            this.page.locator('#dashboard-page-container')
        ).toHaveAttribute('data-loading', 'false');

        const totalbalance = await this.page.locator('#total-balance').textContent();

        await this.page.locator('#nav-accounts').click();

        await this.page.waitForTimeout(5000);

        await expect(this.page.locator('#accounts-table')).toBeVisible();

        const rows = await this.page.locator('#accounts-table tbody tr').count();

        console.log(`Number of accounts: ${rows}`);

        let total = 0;

        for (let i = 0; i < rows; i++) {

            const cell = this.page.locator(
                `#accounts-table tbody tr:nth-child(${i + 1}) td:nth-child(4)`
            );

            const balanceText = await cell.innerText();

            console.log(`Row ${i + 1}: ${balanceText}`);

            const value = parseFloat(
                balanceText.replace(/[^0-9.-]/g, '')
            );

            console.log(`Converted value: ${value}`);

            total += value;
        }

        console.log(`Total balance from accounts: ${total}`);
    }

}