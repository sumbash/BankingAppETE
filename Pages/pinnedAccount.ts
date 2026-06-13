import { Page, expect, Locator } from '@playwright/test';

export class PinnedAccount {

    readonly page: Page;
    readonly pinnedtable: Locator;
    readonly pinnedaccounts: Locator;
    readonly dropzone: Locator;



    constructor(page: Page) {

        this.page = page;
        this.pinnedtable = this.page.locator('#pinned-accounts-drop-zone');
        this.pinnedaccounts = this.page.locator('[data-testid^="draggable-account-"]')
        this.dropzone = this.page.locator('[data-testid="drop-zone"]');

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

    async dragFirstToSecond() {
        const firstAccount = this.pinnedaccounts.nth(0);
        const secondAccount = this.pinnedaccounts.nth(1);

        const firstAccountText = await firstAccount.textContent();
        const secondAccountText = await secondAccount.textContent();

        await firstAccount.dragTo(secondAccount);

        const firstAccountTextAfter = await firstAccount.textContent();
        const secondAccountTextAfter = await secondAccount.textContent();   

        expect(firstAccountTextAfter).toBe(secondAccountText);

        await this.page.reload();
        await this.page.waitForSelector('#pinned-accounts-drop-zone', { timeout: 10000 });
        expect(firstAccountTextAfter).toBe(secondAccountText);



    }

}