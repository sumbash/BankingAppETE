import { Page, expect, Locator } from '@playwright/test';

export class TransactionTablePage {

    readonly page: Page;
    readonly table: Locator;
    readonly tablerow: Locator;
    readonly header: Locator;

  
    constructor(page: Page) { 

        this.page = page;
        this.table = this.page.getByTestId('recent-transactions-table');
        this.tablerow = this.page.locator('#recent-transactions-table tbody tr');
        this.header = this.table.locator('thead tr th');

    }

    async countrows() {


        await this.page.waitForSelector('#recent-transactions-table', { timeout: 10000 });
        await expect(this.table).toBeVisible();

        const headertext = await this.header.allTextContents();
        console.log('Table Headers:', headertext);

        const rowsCount = await this.tablerow.count();

        await expect(rowsCount).toBeGreaterThan(0);
        await expect(rowsCount).toBeLessThanOrEqual(5);

    }

    async validateTableData() {
        await this.page.waitForSelector('#recent-transactions-table', { timeout: 10000 });
        await expect(this.table).toBeVisible();

        const rowsCount = await this.tablerow.count();
        for (let i = 0; i < rowsCount; i += 1) {
            // Get the current row
            const row = this.tablerow.nth(i);

            // Assert Date column exists and has content
            const dateCell = row.locator('td').nth(0);
            await expect(dateCell).toBeVisible();
            const dateText = await dateCell.textContent();
            expect(dateText?.trim().length).toBeGreaterThan(0);

            // Assert Type column exists and contains valid transaction type
            const typeCell = row.locator('td').nth(1);
            await expect(typeCell).toBeVisible();
            const typeText = await typeCell.textContent();
            expect(typeText).toMatch(/Deposit|Withdrawal|Transfer/);

            // Assert Account Name column exists and has content
            const accountCell = row.locator('td').nth(2);
            await expect(accountCell).toBeVisible();
            const accountText = await accountCell.textContent();
            expect(accountText?.trim().length).toBeGreaterThan(0);

            // Assert Amount column exists and has content (should contain $ or number)
            const amountCell = row.locator('td').nth(3);
            await expect(amountCell).toBeVisible();
            const amountText = await amountCell.textContent();
            expect(amountText).toMatch(/[\$\d]/);

            // Assert Status column exists and has content
            const statusCell = row.locator('td').nth(4);
            await expect(statusCell).toBeVisible();
            const statusText = await statusCell.textContent();
            expect(statusText).toEqual('Completed');
        }

    }


}