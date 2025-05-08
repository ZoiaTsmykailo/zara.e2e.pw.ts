import { test,expect } from '../app/ui/fixtures/storage-state.fixture';
import { CookieModal } from '../app/ui/modals/cookie-modal/CookieModal';
import { BasePage } from '../app/ui/pages/BasePage';
import { BasketPage } from '../app/ui/pages/BasketPage';
import { ProductPage } from '../app/ui/pages/ProductPage';
import { SearchResultPage } from '../app/ui/pages/SearchResultPage';

test.beforeEach(async ({pageWithCookies}) => {
    const basePage = new BasePage(pageWithCookies);
    await basePage.goTo(); 
    
})
test.skip('User does not see cookie modal after accepting once', async ({ page }) => {
    const basePage = new BasePage(page);
    const cookieModal = new CookieModal(page);
  
    await basePage.goTo(); 
  
    await expect(cookieModal.modal).toBeHidden();
  });

  test("go to store", async ({page}) => {
    const searchResultPage = new SearchResultPage(page);
    await searchResultPage.goToStore();
    await searchResultPage.clickSearch();
    await searchResultPage.choseManForSearch();
    await searchResultPage.findProduct('sweatshirt');
    //const result = await searchResultPage.getProducts();
    //sweatshirt  JOGGER 
   // await searchResultPage.getProducts();
    
  });

  test("add JOGGER with different size to the ", async ({page}) => {
    const searchResultPage = new SearchResultPage(page);
    await searchResultPage.goToStore();
    await searchResultPage.clickSearch();
    await searchResultPage.choseWomanForSearch();
    await searchResultPage.findProduct('JOGGER');
    //const result = await searchResultPage.getProducts();
    //sweatshirt  JOGGER 
    //await searchResultPage.getProducts();
    const basket = page.getByRole('link', { name: /Products in basket/i });
  await expect(basket).toBeVisible();
  //await expect(basket).toContainText('4'); 
    
  });

  test('get all sizes on one product - all available sizes should be added', async ({page}) => {
    const searchResultPage = new SearchResultPage(page);
    const productPage = new ProductPage(page);
    await searchResultPage.goToStore();
    await searchResultPage.clickSearch();
    await searchResultPage.choseWomanForSearch();
    await searchResultPage.findProduct('JOGGER');
    await productPage.getFirstProduct();
    const availableSizes = await productPage.getAvailableSizes();
    console.log(availableSizes);
    console.log(availableSizes.length);
    if(availableSizes.length>3){

      for (const sizeElement of availableSizes){
        
        const sizeText = sizeElement.text;
      // const sizeButton =  page.getByRole('button', { name: sizeText, exact: true });
        
        const sizeButton = page.locator('button.size-selector-sizes-size__button').filter({
          has: page.locator('div.size-selector-sizes-size__label'),
          hasText: new RegExp(`^${sizeText}$`)
         });
        
        await sizeButton.click();
        await page.getByRole('button', { name: 'close' }).click();
        await page.locator(`span span:has-text("ADD")`).click();
        
    }
    availableSizes.forEach((item, index) => {
      console.log(`Індекс: ${index}, значення:`, item);
    });
  }
  await expect(page.locator('a[data-qa-id="layout-header-go-to-cart"]  span[data-qa-id="layout-header-go-to-cart-items-count"]')).toContainText(`${availableSizes.length}`);

  //переходимо у корзину

  await page.locator('a[data-qa-id="layout-header-go-to-cart"]  span[data-qa-id="layout-header-go-to-cart-items-count"]').click();
   const basketPage = new BasketPage(page);
   await basketPage.getSizesListInBasket();

   const text = await page.locator('span.shop-cart-item-details-base__size').allInnerTexts();
    console.log('Розміри:', text);
   
  
});



 