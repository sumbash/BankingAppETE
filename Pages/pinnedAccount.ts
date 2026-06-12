import { Page, expect, Locator } from '@playwright/test';

export class PinnedAccount {

    readonly page: Page;
    readonly pinnedtable: Locator;
    readonly pinnedaccounts: Locator;



    constructor(page: Page) {

        this.page = page;
        this.pinnedtable = this.page.locator('#pinned-accounts-drop-zone');
        this.pinnedaccounts = this.page.locator('[data-testid^="draggable-account-"]')

    }

    async validatePinnedAccounts() {

        await this.page.waitForSelector('#pinned-accounts-drop-zone', { timeout: 10000 });
        await expect(this.pinnedtable).toBeVisible();
        const pinnedAccounts = await this.pinnedaccounts.count();
        expect(pinnedAccounts).toBeGreaterThan(1);

    }

    async validatedragable() {
        const pinnedAccounts = await this.pinnedaccounts.count();
        for (let i = 0; i < pinnedAccounts; i += 1) {
            const account = this.pinnedaccounts.nth(i);
            await expect(account).toHaveAttribute('data-testid', `draggable-account-${i}`);


        }

    }

}