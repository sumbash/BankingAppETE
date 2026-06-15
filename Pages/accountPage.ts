import { Page, expect, Locator } from '@playwright/test';

export class AccountPage {
    readonly accountsPage: Locator;
    readonly openWizardButton: Locator;
    readonly accountModal: Locator;
    readonly acountname: Locator;
    readonly accounttype: Locator;
    readonly balance: Locator;
    readonly status: Locator;
    readonly saveButton: Locator;
    readonly rows: Locator;
    readonly firstaccountname: Locator;


    constructor(private page: Page) {
        this.accountsPage = this.page.locator('#accounts-page-container');
        this.openWizardButton = this.page.locator('[data-testid="quick-add-account"]');
        this.accountModal = this.page.locator('#account-modal');
        this.acountname = this.page.getByLabel('Account Name *');
        this.accounttype = this.page.getByRole('combobox', { name: 'Account Type *' });
        this.balance = this.page.getByLabel('Initial Balance *');
        this.status = this.page.getByTestId('status-active-radio');
        this.saveButton = this.page.locator('#save-account-btn');
        this.rows = this.page.locator('#accounts-table tbody tr');
        this.firstaccountname = this.page.locator('td[data-testid="account-name"]').first();
    }

    async navigateToAccounts() {
        await this.page.goto('https://qaplayground.com/bank/dashboard');
        await expect(this.page).toHaveURL('https://qaplayground.com/bank/dashboard');
    }

    async openNewAccount() {
        await this.openWizardButton.click();
        await expect(this.page).toHaveURL('https://qaplayground.com/bank/accounts?action=add');
        await expect(this.accountModal).toBeVisible();
        await this.acountname.fill('Test Account');
        await this.accounttype.click();
        await this.page.getByRole('option', { name: 'Savings Account' }).click();
        await this.balance.fill('10000');
        await this.status.check();
        await this.saveButton.click();
        
        // Wait for modal to close, indicating save was successful
        await expect(this.accountModal).not.toBeVisible({ timeout: 15000 });
        
        // Small delay to ensure data is synced
        await this.page.waitForTimeout(1000);
        
        // Navigate to accounts page to view the new account
        await this.page.goto('https://qaplayground.com/bank/accounts');
        await this.page.waitForURL('https://qaplayground.com/bank/accounts', { timeout: 10000 });
        
        // Wait for table rows to appear
        await this.page.locator('#accounts-table tbody tr').first().waitFor({ timeout: 10000 });
        
        // Verify the new account appears in the table
        await expect(this.page.locator('#accounts-table tbody tr').filter({ hasText: 'Test Account' })).toBeVisible();
    }

    async editAccount() {
        // Find the Test Account row specifically
        const testAccountRow = this.page.locator('#accounts-table tbody tr').filter({ hasText: 'Test Account' });
        
        // Get the account name cell in that row
        const accountNameCell = testAccountRow.locator('td[data-testid="account-name"]');
        
        // Verify it's editable
        await expect(accountNameCell).toHaveAttribute('data-editable', 'true');
        await expect(accountNameCell).toHaveAttribute('data-editing', 'false');
        
        // Double-click to enter edit mode
        await accountNameCell.dblclick();
        
        // Wait a moment for edit mode to activate
        await this.page.waitForTimeout(500);
        
        // Assert data-editing='true' on the cell BEFORE update
        await expect(accountNameCell).toHaveAttribute('data-editing', 'true');
        
        // Assert inline-edit-input is visible and focused
        const inlineInput = accountNameCell.locator('[data-testid="inline-edit-input"]');
        await expect(inlineInput).toBeVisible();
        await expect(inlineInput).toBeFocused();
        
        // Now select all text and type new value
        await this.page.keyboard.press('Control+A');
        await this.page.keyboard.type('Updated Account');
        
        // Press Enter to save
        await this.page.keyboard.press('Enter');
        
        // Wait for changes to save and page to update
        await this.page.waitForTimeout(1000);
        
        // Verify the change was saved by checking the table contains updated name
        await expect(this.page.locator('text=Updated Account')).toBeVisible();
    }
}
