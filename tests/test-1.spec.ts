import { test, expect } from '@playwright/test';

test('test', async ({ page }) => {
  await page.goto('https://www.zara.com/ua/en/search?searchTerm=JOGGER&section=WOMAN');
  await page.locator('.onetrust-pc-dark-filter').click();
  await page.getByRole('button', { name: 'Accept All Cookies' }).click();
  await page.getByRole('link', { name: 'JOGGING TROUSERS WITH SLOGAN - Ecru by Zara - Image' }).click();
  await page.getByRole('button', { name: 'Add JOGGING TROUSERS WITH' }).click();
  await page.getByRole('link', { name: 'FLOWING JOGGERS - Sand by' }).click();
  await page.getByRole('button', { name: 'Add FLOWING JOGGERS' }).click();
  await page.getByRole('button', { name: 'XS' }).click();
  await page.getByRole('button', { name: 'close' }).click();
  await page.getByRole('button', { name: 'Add FLOWING JOGGERS' }).click();
  await page.getByRole('button', { name: 'S', exact: true }).click();
  await page.getByRole('button', { name: 'close' }).click();
  await page.getByRole('button', { name: 'Add FLOWING JOGGERS' }).click();
  await page.getByRole('button', { name: 'M', exact: true }).click();
  await page.getByRole('button', { name: 'close' }).click();
  await page.getByRole('button', { name: 'Add FLOWING JOGGERS' }).click();
  await page.getByRole('button', { name: 'L', exact: true }).click();
  await page.getByRole('button', { name: 'close' }).click();
  await page.getByRole('button', { name: 'Add FLOWING JOGGERS' }).click();
  await page.getByRole('button', { name: 'XL', exact: true }).click();
  await page.getByRole('button', { name: 'close' }).click();
  await page.getByRole('button', { name: 'Add FLOWING JOGGERS' }).click();
  await page.getByRole('button', { name: 'XXL' }).click();
  await page.getByRole('button', { name: 'close' }).click();
  await page.getByRole('link', { name: 'Products in basket: 5. Go to' }).click();
});