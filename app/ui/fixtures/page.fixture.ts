import { test as base } from '@playwright/test';
import {PageManager } from '../pages/PageManager';
import { ProductPage } from '../pages/ProductPage';
import { SearchResultPage } from '../pages/SearchResultPage';
import { BasketPage } from '../pages/BasketPage';
type MyPages = {
    pages: PageManager;
    productPage: ProductPage;
    searchResultPage: SearchResultPage;
    basketPage: BasketPage;

}

export const test = base.extend<MyPages>({
    pages: ({page}, use) => {

    },

    productPage: async ({page}, use) => {
        const productPage = new ProductPage(page);
        await use(productPage);
    },
    searchResultPage: async ({page}, use) => {
        const searchResultPage = new SearchResultPage(page);
        await use(searchResultPage);
    },
    basketPage: async ({page}, use) => {
        const basketPage = new BasketPage(page);
        await use(basketPage);
    },

})

export {expect} from '@playwright/test';