import {Locator, Page} from '@playwright/test'
import { BasePage } from './BasePage';

export class BasketPage extends BasePage {
    private sizeListLocators: Locator;
    private removeButtonLocator: Locator;

    constructor(page: Page) {
        super(page);
        this.sizeListLocators = page.locator('.shop-cart-item-details-base__size');
        this.removeButtonLocator = page.locator('button[data-qa-action="remove-order-item"]');
    }

   
    async getSizesListInBasket(): Promise<string[]> {
        const locator = this.page.locator('span.shop-cart-item-details-base__size');
        
        await locator.first().waitFor({ timeout: 5000 });
        
        const sizes = await locator.allInnerTexts();
        console.log('sizes in basket:', sizes);
        return sizes;
      }

   
}