import{test,expect} from '../app/ui/fixtures/storage-state.fixture';

test('1ZARA: Add available sizes to the cart and delete every second product in the cart', async ({pages}) => {
  await pages.searchResultPage.goTo();
  await pages.searchResultPage.goToStore();
  await pages.searchResultPage.clickSearch();
  await pages.searchResultPage.findProduct('джинси');
  await pages.productPage.productClickLocator.first().waitFor({state: 'visible',timeout: 2000});
  const countProduct = await pages.productPage.getCountOfProducts();
  await pages.productPage.addAllSizesOfProduct(countProduct);
  await pages.productPage.clickBasketLink();
  const countProductsInBasket = await pages.basketPage.getCountOfProductsInBasket();
  await pages.basketPage.deleteEverySecondSizeInBasket(countProductsInBasket);
  const countProductsInBasketAfterDelete = await pages.basketPage.getCountOfProductsInBasket();
  
  expect(countProductsInBasket).toBeGreaterThan(countProductsInBasketAfterDelete);
  await pages.basketPage.buttonContinueLocator.click();
  expect(pages.logonPage.logonTitleLocator.waitFor({state:'visible', timeout:2000}));
  await pages.logonPage.logonRegistrationButtonLocator.click();
  await pages.logonPage.fillRegistrationForm('', '', '', '');
  await pages.logonPage.signUpSubmitButtonLocator.click();
  const errorEmail = await pages.logonPage.getErrorForInputByInputQualifier('email');
  await expect(errorEmail).toContainText('Required field.');
  const errorPassword = await pages.logonPage.getErrorForInputByInputQualifier('password')
  await expect(errorPassword).toContainText('Required field.');
  const errorFirstName = await pages.logonPage.getErrorForInputByInputQualifier('firstName');
  await expect(errorFirstName).toContainText('Required field.');
  await expect(await pages.logonPage.getErrorForInputByInputQualifier('lastName')).toContainText('Required field.');
});