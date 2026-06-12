import {Page} from '@playwright/test';

export class LoginPage {
    
    constructor(private page: Page) {}
    
    async login(username: string , password: string) {
       await this.page.getByPlaceholder('Enter your username').fill(username);
        await this.page.getByPlaceholder('Enter your password').fill(password);
        await this.page.locator("//button[@id='login-btn']").click();
    }
   
    }
