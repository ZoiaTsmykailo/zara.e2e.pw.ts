import { test as base } from '@playwright/test';
import {PageManager } from '../pages/PageManager';
import { ProductPage } from '../pages/ProductPage';
import { SearchResultPage } from '../pages/SearchResultPage';
type MyPages = {
    pages: PageManager;
    productPage: ProductPage;
    searchResultPage: SearchResultPage;
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
    }

})

export {expect} from '@playwright/test';