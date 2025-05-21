import { test, expect } from "../app/ui/fixtures/storage-state.fixture";
import { CookieModal } from "../app/ui/modals/cookie-modal/CookieModal";

test("C1ZARA User does not see cookie modal after accepting once", async ({
  page,
}) => {
  const cookieModal = new CookieModal(page);
  await page.goto(process.env.BASEURL!);

  await expect(cookieModal.modal).toBeHidden();
});

test("Nav1ZARA Should navigate to Zara homepage with correct URL and title", async ({
  pages,
  page,
}) => {
  await pages.searchResultPage.goTo();
  await pages.searchResultPage.goToStore();

  await expect(page).toHaveURL("https://www.zara.com/ua/en/");
  await expect(page).toHaveTitle(/ZARA Ukraine/);
});

test("Search1ZARA: Should find products by name using search ", async ({
  pages,
}) => {
  await pages.searchResultPage.goTo();
  await pages.searchResultPage.goToStore();
  await pages.searchResultPage.clickSearch();

  await pages.searchResultPage.findProduct("JOGGER");

  const countProducts = await pages.productPage.getCountOfProducts();
  expect(countProducts).toBeGreaterThan(0);
});
