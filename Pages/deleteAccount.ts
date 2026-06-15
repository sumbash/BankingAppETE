import { Page, expect, Locator } from '@playwright/test';

export class DeleteAccountPage {
    readonly deleteModal: Locator;
    readonly deleteMessage: Locator;
    readonly cancelDeleteButton: Locator;
    readonly confirmDeleteButton: Locator;
    readonly successToast: Locator;

    constructor(private page: Page) {
        this.deleteModal = this.page.getByTestId('delete-modal');
        this.deleteMessage = this.page.getByTestId('delete-message');
        this.cancelDeleteButton = this.page.getByTestId('cancel-delete-button');
        this.confirmDeleteButton = this.page.getByTestId('confirm-delete-button');
        this.successToast = this.page.getByText('Account deleted successfully');
    }

    // Step 2-6: Test Cancel Delete Functionality
    async CanceldeleteAccount() {
        // Step 2: Locate the Test Account row
        const testAccountRow = this.page.locator('#accounts-table tbody tr').filter({ hasText: 'Test Account' });
        await testAccountRow.waitFor({ state: 'visible', timeout: 10000 });
        
        // Step 3: Click the Delete button (data-testid='delete-account-{id}')
        await testAccountRow.locator('button[data-testid^="delete-account-"]').click();
        
        // Step 4: Assert the delete confirmation dialog is visible
        await expect(this.deleteModal).toBeVisible({ timeout: 5000 });
        
        // Step 5: Assert the dialog message contains 'cannot be undone'
        await expect(this.deleteMessage).toContainText('cannot be undone');
        
        // Step 6: Click Cancel and verify dialog closes and account still exists
        await this.cancelDeleteButton.click();
        await expect(this.deleteModal).not.toBeVisible({ timeout: 5000 });
        
        // Verify account still exists in the table
        await expect(testAccountRow).toBeVisible();
    }

    // Step 3-9: Test Delete Functionality
    async deleteAccount() {
        // Step 2: Locate the Test Account row
        const testAccountRow = this.page.locator('#accounts-table tbody tr').filter({ hasText: 'Test Account' });
        await testAccountRow.waitFor({ state: 'visible', timeout: 10000 });
        
        // Step 3: Click the Delete button
        await testAccountRow.locator('button[data-testid^="delete-account-"]').click();
        
        // Step 4: Assert the delete confirmation dialog is visible
        await expect(this.deleteModal).toBeVisible({ timeout: 5000 });
        
        // Step 5: Assert the dialog message contains 'cannot be undone'
        await expect(this.deleteMessage).toContainText('cannot be undone');
        
        // Step 7: Click Confirm Delete
        await this.confirmDeleteButton.click();
        
        // Step 8: Assert the account row is no longer present in the accounts table
        await expect(this.page.locator('#accounts-table tbody tr').filter({ hasText: 'Test Account' })).toHaveCount(0);
        
        // Step 9: Assert success toast appears
        await expect(this.successToast).toBeVisible({ timeout: 5000 });
    }
}