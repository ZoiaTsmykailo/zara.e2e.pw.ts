import {test,expect} from '../app/ui/fixtures/page.fixture';
//import {expect,  testWithCookies} from '../app/ui/fixtures/storage-state.fixture';
import { BasePage } from '../app/ui/pages/BasePage';



test('Add all available sizes to the basket - all available sizes should be added to the basket', async ({productPage,searchResultPage, page}) => {
    await searchResultPage.goToStore();
    await searchResultPage.clickSearch();
    await searchResultPage.choseWomanForSearch();
    await searchResultPage.findProduct('JOGGER');
    await productPage.getFirstProduct();
    const availableSizes = (await productPage.getAvailableSizes()).length;
    await productPage.addToBasketAllAvailableSizesProduct()
    await expect(page.locator('a[data-qa-id="layout-header-go-to-cart"]  span[data-qa-id="layout-header-go-to-cart-items-count"]')).toContainText(`${availableSizes}`);
})